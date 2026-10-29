const fs=require('node:fs/promises');
const path=require('node:path');
const assert=require('node:assert/strict');
const {isIP}=require('node:net');
const {chromium}=require('./node_modules/playwright');
const root=path.resolve(__dirname,'../..');
async function main(){
  const config=JSON.parse(await fs.readFile(path.join(root,'.private/country-proxies.json'),'utf8'));
  const target=config.targets.find(t=>t.country==='US');
  assert(target?.proxy,'US proxy missing');
  const dir=path.join(root,'artifacts/network-change',new Date().toISOString().replace(/[:.]/g,'-'));
  await fs.mkdir(dir,{recursive:true});
  const results=[];
  for(const phase of [{name:'device-egress'},{name:'us-proxy',proxy:target.proxy}]){
    const r={phase:phase.name,startedAt:new Date().toISOString(),scope:'Isolated browser traffic, not system-wide VPN'};
    results.push(r);
    let browser;
    try{
      browser=await chromium.launch({headless:true,...(phase.proxy?{proxy:phase.proxy}:{})});
      const context=await browser.newContext({viewport:{width:1365,height:900}});
      context.setDefaultTimeout(15000);context.setDefaultNavigationTimeout(30000);
      const identity=async suffix=>{
        const p=await context.newPage();
        try{
          const response=await p.goto('https://api.country.is/',{waitUntil:'domcontentloaded'});
          assert(response?.ok(),'Country endpoint unavailable');
          const data=JSON.parse(await p.locator('body').innerText());
          assert(isIP(data.ip),'Missing country endpoint IP');assert.match(data.country,/^[A-Z]{2}$/);
          await p.screenshot({path:path.join(dir,`${phase.name}-${suffix}-country.jpg`),type:'jpeg'});
          await p.goto('https://api.ipify.org/',{waitUntil:'domcontentloaded'});
          const secondIP=(await p.locator('body').innerText()).trim();
          assert(isIP(secondIP),'Missing independent IP');
          return {ip:data.ip,country:data.country,independentIP:secondIP,ipAgrees:data.ip===secondIP,differentAddressFamilies:isIP(data.ip)!==isIP(secondIP)};
        }finally{await p.close();}
      };
      r.before=await identity('before');
      assert(r.before.ipAgrees||(!phase.proxy&&r.before.differentAddressFamilies),'Independent same-family IP endpoints disagree');
      if(r.before.differentAddressFamilies)r.addressFamilyNote='The device has both IPv6 and IPv4 egress; endpoints selected different address families. This is not a proxy country mismatch.';
      if(phase.proxy)assert.equal(r.before.country,'US','US proxy country mismatch');
      const page=await context.newPage();
      const documentRequests=[];
      page.on('request',req=>{if(req.isNavigationRequest()&&req.frame()===page.mainFrame())documentRequests.push({url:req.url(),method:req.method()});});
      const response=await page.goto('https://bfsc.netlify.app/',{waitUntil:'domcontentloaded'});
      r.site={status:response?.status(),url:page.url(),deviceTimezone:await page.evaluate(()=>Intl.DateTimeFormat().resolvedOptions().timeZone)};
      assert(response?.ok(),'BFSC document did not load');
      await page.locator('#menuGrid button').first().waitFor({state:'visible'});
      await page.screenshot({path:path.join(dir,`${phase.name}-bfsc.jpg`),type:'jpeg'});
      await page.mouse.move(100,150);await page.mouse.wheel(0,900);
      await page.locator('#dishSearch').pressSequentially('Bún bò Huế');
      await page.waitForFunction(()=>document.querySelectorAll('#menuGrid button').length===1);
      r.site.searchResult=await page.locator('#menuGrid').innerText();
      r.site.regionLabel=await page.locator('#tzPill').innerText();
      r.site.documentRequests=documentRequests;
      r.after=await identity('after');
      r.ipStable=r.before.ip===r.after.ip&&r.before.independentIP===r.after.independentIP&&(r.after.ipAgrees||(!phase.proxy&&r.after.differentAddressFamilies));
      assert(r.ipStable,'IP not stable through BFSC usage');
      r.status='verified';
    }catch(error){
      r.status='not_verified';
      r.failureCode=String(error.message).match(/net::ERR_[A-Z_]+/)?.[0]||'Probe or page assertion failed';
    }finally{if(browser)await browser.close().catch(()=>{});}
  }
  const changed=results.every(r=>r.status==='verified')&&results[0].before.ip!==results[1].before.ip&&results[0].before.country!==results[1].before.country;
  await fs.writeFile(path.join(dir,'results.json'),JSON.stringify({changed,results,note:'This does not prove which IP the private admin recorded; that requires a matching server-side record. No account login was performed.'},null,2));
  console.log(JSON.stringify({changed,results,dir},null,2));
  if(!changed)process.exitCode=1;
}
main().catch(()=>{console.error('Verification failed; credentials were not logged');process.exitCode=1;});
