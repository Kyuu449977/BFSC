const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const { isIP } = require('node:net');
const { chromium } = require('../node_modules/playwright');
const root = path.resolve(__dirname, '../../..');

async function open(index, options = {}) {
  const config = JSON.parse(await fs.readFile(path.join(root, '.private/country-proxies.json'), 'utf8'));
  const target = config.targets[index];
  assert(target?.proxy?.server, 'Missing target');
  const out = path.join(root, 'artifacts/country-user-journeys-20261029', `tester${index + 1}`);
  await fs.mkdir(out, {recursive:true});
  const result = {tester:index+1, expectedCountry:target.country, method:'Playwright real browser UI journey; no mocks', steps:[], pageErrors:[], failedRequests:[], popups:[]};
  const clean = text => {
    let value = String(text);
    for (const field of ['username', 'password']) if(target.proxy[field]) value = value.split(target.proxy[field]).join('[REDACTED]');
    return value.replace(/https?:\/\/[^\s/@]+:[^\s/@]+@/g, 'https://[REDACTED]@');
  };
  const save = () => fs.writeFile(path.join(out, 'results.json'), JSON.stringify(result,null,2));
  const browser = await chromium.launch({headless:true, proxy:target.proxy});
  const context = await browser.newContext({viewport:options.viewport || {width:1440,height:900}});
  context.setDefaultTimeout(12000);
  context.setDefaultNavigationTimeout(30000);
  const identity = async () => {
    const p=await context.newPage();
    try {
      const response=await p.goto('https://api.country.is/',{waitUntil:'domcontentloaded'});
      assert(response?.ok(),'IP lookup unavailable');
      const data=JSON.parse(await p.locator('body').innerText());
      assert(isIP(data.ip),'Invalid public IP');
      assert.match(data.country,/^[A-Z]{2}$/);
      return {ip:data.ip,country:data.country};
    } finally {await p.close();}
  };
  try {result.before=await identity();} catch(error) {
    result.blocked=clean(error.message); await save(); await browser.close(); throw new Error('IP verification failed; see local results');
  }
  result.countryMismatch=result.before.country!==target.country;
  const page=await context.newPage();
  page.on('pageerror',error=>result.pageErrors.push(clean(error.message)));
  page.on('requestfailed',request=>result.failedRequests.push({url:clean(request.url()),error:clean(request.failure()?.errorText)}));
  context.on('page',p=>{if(p!==page) result.popups.push({url:clean(p.url())});});
  const shot=async name=>{
    const filename=name.replace(/[^a-zA-Z0-9_-]/g,'_')+'.jpg';
    await page.screenshot({path:path.join(out,filename),type:'jpeg',fullPage:false});
    return filename;
  };
  const step=async(name,fn)=>{
    const record={name}; result.steps.push(record);
    try {record.observed=await fn(); record.status='passed';}
    catch(error){record.status='failed';record.error=clean(error.message); try{record.screenshot=await shot('failure-'+result.steps.length);}catch{} }
    await save(); return record;
  };
  const scroll=async pixels=>{await page.mouse.move(110,150);await page.mouse.wheel(0,pixels);};
  const finish=async()=>{
    try {result.after=await identity();result.ipStable=result.before.ip===result.after.ip;}
    catch(error){result.afterError=clean(error.message);result.ipStable=false;}
    result.finished=true;
    result.coveragePassed=result.steps.every(s=>s.status==='passed');
    await save(); await browser.close();
    console.log(JSON.stringify({tester:result.tester,ip:result.before.ip,country:result.before.country,countryMismatch:result.countryMismatch,steps:result.steps.length,coveragePassed:result.coveragePassed,ipStable:result.ipStable,out}));
  };
  await save();
  return {page,context,browser,result,out,step,shot,scroll,finish,save,assert};
}
module.exports={open};
