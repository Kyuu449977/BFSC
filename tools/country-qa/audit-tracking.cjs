const fs=require('node:fs/promises');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('./node_modules/playwright');
const root=path.resolve(__dirname,'../..');
const safeURL=value=>{try{const u=new URL(value);return u.origin+u.pathname;}catch{return 'non-http';}};
(async()=>{
  const config=JSON.parse(await fs.readFile(path.join(root,'.private/country-proxies.json'),'utf8'));
  const target=config.targets.find(t=>t.country==='US');
  const dir=path.join(root,'artifacts/tracking-audit',new Date().toISOString().replace(/[:.]/g,'-'));
  await fs.mkdir(dir,{recursive:true});
  const report={startedAt:new Date().toISOString(),requests:[],consoleErrors:[],mode:process.argv.includes('--headed')?'headed':'headless',note:'One diagnostic visit. No ad clicks, anti-bot evasion, request bodies, auth headers or URL query values recorded. This trace does not reveal private admin ingestion.'};
  const browser=await chromium.launch({headless:!process.argv.includes('--headed'),proxy:target.proxy});
  try{
    const context=await browser.newContext({viewport:{width:1365,height:900}});
    context.setDefaultTimeout(15000);context.setDefaultNavigationTimeout(30000);
    const ipPage=await context.newPage();
    await ipPage.goto('https://api.country.is/');
    const data=JSON.parse(await ipPage.locator('body').innerText());
    report.identity={ip:data.ip,country:data.country};assert.equal(data.country,'US');
    await ipPage.screenshot({path:path.join(dir,'us-ip-before.jpg'),type:'jpeg'});
    await ipPage.close();
    const page=await context.newPage();
    const byRequest=new Map();
    page.on('request',req=>{const r={url:safeURL(req.url()),type:req.resourceType(),method:req.method()};byRequest.set(req,r);report.requests.push(r);});
    page.on('response',response=>{const r=byRequest.get(response.request());if(r)r.status=response.status();});
    page.on('requestfailed',req=>{const r=byRequest.get(req);if(r)r.failure=req.failure()?.errorText;});
    page.on('console',msg=>{if(msg.type()==='error')report.consoleErrors.push(msg.text().replace(/https?:\/\/[^\s'"<>]+/g,safeURL).slice(0,1600));});
    const response=await page.goto('https://bfsc.netlify.app/',{waitUntil:'domcontentloaded'});
    report.bfscVisitAt=new Date().toISOString();
    report.siteStatus=response.status();
    const headers=await response.allHeaders();
    report.contentSecurityPolicy=headers['content-security-policy'];
    await page.locator('#menuGrid button').first().waitFor({state:'visible'});
    await page.screenshot({path:path.join(dir,'bfsc-home.jpg'),type:'jpeg'});
    await page.mouse.move(100,150);await page.mouse.wheel(0,1000);
    await page.locator('#dishSearch').fill('Bún bò Huế');
    await page.waitForFunction(()=>document.querySelectorAll('#menuGrid button').length===1);
    await page.locator('#menuGrid button').first().click();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(15000);
    await page.screenshot({path:path.join(dir,'bfsc-after-interaction.jpg'),type:'jpeg'});
    report.scriptSources=await page.locator('script[src]').evaluateAll(nodes=>nodes.map(n=>{const u=new URL(n.src);return u.origin+u.pathname;}));
    report.finishedAt=new Date().toISOString();
    const after=await context.newPage();
    await after.goto('https://api.country.is/');
    const afterData=JSON.parse(await after.locator('body').innerText());
    report.after={ip:afterData.ip,country:afterData.country};
    assert.equal(report.after.ip,report.identity.ip);assert.equal(report.after.country,'US');
    await after.screenshot({path:path.join(dir,'us-ip-after.jpg'),type:'jpeg'});
    await fs.writeFile(path.join(dir,'trace.json'),JSON.stringify(report,null,2));
    const thirdParty=report.requests.filter(r=>!r.url.startsWith('https://bfsc.netlify.app/'));
    console.log(JSON.stringify({dir,identity:report.identity,after:report.after,bfscVisitAt:report.bfscVisitAt,mode:report.mode,siteStatus:report.siteStatus,thirdParty,consoleErrors:report.consoleErrors},null,2));
  }finally{await browser.close();}
})().catch(async error=>{
  let message=String(error.message).split('\n')[0];
  try{
    const config=JSON.parse(await fs.readFile(path.join(root,'.private/country-proxies.json'),'utf8'));
    for(const t of config.targets)for(const k of ['username','password'])if(t.proxy[k])message=message.split(t.proxy[k]).join('[REDACTED]');
  }catch{message='Diagnostic failed';}
  console.error(message);process.exitCode=1;
});
