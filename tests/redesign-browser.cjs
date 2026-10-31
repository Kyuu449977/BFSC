const {chromium}=require('../tools/country-qa/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),report={layouts:[],palettes:[],flows:[],errors:[]};
 try{
  const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce',viewport:{width:1440,height:1000},timezoneId:'Asia/Ho_Chi_Minh'});
  await context.route('**/*',r=>new URL(r.request().url()).origin==='http://localhost:8080'?r.continue():r.abort());
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto('http://localhost:8080');await page.waitForFunction(()=>window.engine&&!document.querySelector('#singleBtn').disabled);
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:950});
   for(const appearance of ['light','dark'])for(const lang of ['vi','en','ja','ko','zh']){
    await page.evaluate(({appearance,lang})=>{AppearancePreferences.apply({...AppearancePreferences.read(),theme:'system',appearance,language:lang});window.applyLanguage(lang);},{appearance,lang});
    const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,cards:document.querySelectorAll('#menuGrid .dish-card').length,columns:getComputedStyle(document.querySelector('#menuGrid')).gridTemplateColumns.split(' ').length}));
    assert.ok(layout.scroll<=layout.width+1,JSON.stringify({width,appearance,lang,layout}));assert.equal(layout.cards,6);
    assert.equal(layout.columns,width<640?2:width<1100?3:3);report.layouts.push({width,appearance,lang});
   }
  }
  await page.setViewportSize({width:390,height:844});
  for(const theme of ['system','orange','green','blue','rose','custom'])for(const appearance of ['light','dark']){
   const contrast=await page.evaluate(({theme,appearance})=>{
    AppearancePreferences.apply({...AppearancePreferences.read(),theme,appearance,customColor:'#ffcc00'});
    const css=getComputedStyle(document.documentElement),color=k=>css.getPropertyValue(k).trim();
    return {text:contrastRatio(color('--ink'),color('--cream')),secondary:contrastRatio(color('--muted'),color('--card-bg')),accent:contrastRatio(color('--orange'),color('--card-bg')),button:contrastRatio(color('--orange'),color('--primary-ink'))};
   },{theme,appearance});
   for(const value of Object.values(contrast))assert.ok(value>=4.5,JSON.stringify({theme,appearance,contrast}));report.palettes.push({theme,appearance,contrast});
  }
  await page.evaluate(()=>{AppearancePreferences.apply({...AppearancePreferences.read(),theme:'system',appearance:'light',language:'vi'});window.applyLanguage('vi');});
  await page.locator('#mobileMenuBtn').click();assert.equal(await page.locator('#settingsDialog').isVisible(),true);
  assert.equal(await page.locator('#settingsDialog .settings-group').count(),5);
  await page.locator('#themeBtn').click();assert.equal(await page.locator('#themeDialog').isVisible(),true);
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'mobileMenuBtn');
  await page.locator('#mobileMenuBtn').click();await page.locator('#soundBtn').click();assert.equal(await page.locator('#settingsDialog').isVisible(),true);await page.keyboard.press('Escape');
  report.flows.push('settings grouping, nested tool, focus return, sound toggle, Escape');
  for(const [id,count]of [['singleBtn',1],['tripleBtn',3],['comboBtn',3]]){
   await page.locator('#'+id).click();await page.waitForFunction(n=>document.querySelector('#resultDialog').open&&document.querySelectorAll('#resultGrid .result-card').length===n,count);
   await page.screenshot({path:`artifacts/redesign/result-${count}-${id}.png`});
   assert.ok(await page.locator('#placesLinks a').count());await page.locator('#resultDoneBtn').click();
  }
  report.flows.push('one/three/combo selection and Maps results');
  await page.locator('#customWheelBtn').click();await page.locator('#customWheelInput').fill('Phở\nBún chả');
  await page.locator('#customWheelUniverseBtn').click();assert.equal(await page.locator('#universeDishDialog').isVisible(),true);await page.locator('#universeSelectAllBtn').click();await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  report.flows.push('custom wheel and picker');
  await page.locator('#addDishBtn').click();await page.locator('#customDishName').fill('Test giữ nội dung');
  await page.locator('#customDishMealControl').click();assert.equal(await page.locator('#customDishMealOptions').isVisible(),true);
  assert.equal(await page.locator('#customDishMealOptions').evaluate(e=>e.closest('dialog').id),'addDishDialog');await page.keyboard.press('Escape');
  assert.equal(await page.locator('#customDishName').inputValue(),'Test giữ nội dung');await page.keyboard.press('Escape');
  report.flows.push('add-dish fields, accessible modal select; no server write');
  for(const [width,appearance]of [[1440,'light'],[390,'light'],[390,'dark']]){
   await page.setViewportSize({width,height:950});await page.evaluate(a=>AppearancePreferences.apply({...AppearancePreferences.read(),theme:'system',appearance:a}),appearance);
   for(const img of await page.locator('#menuGrid img').all())await img.scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`artifacts/redesign/home-${width}-${appearance}.png`,fullPage:true});
   await page.locator('#mobileMenuBtn').click();await page.screenshot({path:`artifacts/redesign/settings-${width}-${appearance}.png`});await page.keyboard.press('Escape');
  }
  await page.setViewportSize({width:1440,height:950});await page.evaluate(()=>document.documentElement.style.zoom='2');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);await page.evaluate(()=>document.documentElement.style.zoom='');
  report.flows.push('200% desktop zoom');
  await Promise.all([page.waitForURL('**collection=true**'),page.locator('#collectionNav').click()]);await page.waitForFunction(()=>window.engine&&!document.querySelector('#singleBtn').disabled);
  assert.ok(new URL(page.url()).searchParams.get('collection')==='true');report.flows.push('collection opens menu route');
  assert.deepEqual(report.errors,[]);
  fs.writeFileSync('artifacts/redesign/acceptance.json',JSON.stringify(report,null,2));console.log(JSON.stringify({layouts:report.layouts.length,palettes:report.palettes.length,flows:report.flows,errors:report.errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
