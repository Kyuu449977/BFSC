const { chromium } = require('../tools/country-qa/node_modules/playwright');
const assert = require('node:assert/strict'), fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const report=[];
  try {
    for (const width of [390,768,1680]) {
      const ctx=await browser.newContext({viewport:{width,height:950},serviceWorkers:'block',reducedMotion:'no-preference',timezoneId:'Asia/Ho_Chi_Minh'});
      await ctx.addInitScript(()=>{Object.defineProperty(navigator,'deviceMemory',{get:()=>4});});
      const page=await ctx.newPage(), errors=[],adRequests=[];
      page.on('pageerror',e=>errors.push(e.message));
      await ctx.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(/quge5|bauval/.test(url.hostname)) {
          adRequests.push(url.href);
          return route.fulfill({contentType:'text/javascript',body:'window.__providerStubLoaded = true;'});
        }
        return url.origin==='http://localhost:8080' ? route.continue() : route.abort();
      });
      await page.goto('http://localhost:8080');
      await page.waitForFunction(()=>window.engine && !document.querySelector('#singleBtn').disabled);
      assert.deepEqual(await page.evaluate(()=>({active:engine.getAllDishesList().length,all:Catalog.getAllDishes().length})),{active:130,all:350});
      assert.equal(await page.locator('[data-ad-key]').count(),3);
      const images=await page.evaluate(async()=>{
        const list=engine.getAllDishesList();
        const failed=[];
        for(let i=0;i<list.length;i+=4) await Promise.all(list.slice(i,i+4).map(d=>new Promise(resolve=>{
          const img=new Image();img.onload=resolve;img.onerror=()=>{failed.push(d.id);resolve();};img.src=Attribution.imageFor(d);
        })));
        return failed;
      });
      assert.deepEqual(images,[]);
      await page.locator('#singleBtn').click();
      await page.waitForFunction(()=>document.querySelector('#reelTrack').children.length===12);
      await page.locator('#skipBtn').click();
      await page.locator('#resultDoneBtn').click();
      await page.locator('#comboBtn').click();
      await page.waitForFunction(()=>document.querySelector('#resultDialog').open && document.querySelectorAll('#resultGrid .result-card').length===3);
      assert.equal(await page.locator('#resultGrid .result-card').count(),3);
      await page.locator('#resultDoneBtn').click();
      await page.locator('#customWheelBtn').click();
      await page.locator('#customWheelInput').fill('Phá»Ÿ tÃ¡i lÄƒn\nBÃ¡nh cuá»‘n');
      await page.locator('#customWheelUniverseBtn').click();
      const first=page.locator('.universe-dish-item').first();
      await first.evaluate(el=>{window.savedUniverseRow=el;});
      await page.locator('#universeSelectAllBtn').click();
      assert.equal(await first.evaluate(el=>el===window.savedUniverseRow),true);
      await page.locator('#universeDishSearch').fill('Coca-Cola');
      await page.waitForFunction(()=>document.querySelectorAll('.universe-dish-item').length===2);
      await page.keyboard.press('Escape');await page.keyboard.press('Escape');
      await page.locator('#responsiveSponsors').scrollIntoViewIfNeeded();
      await page.waitForTimeout(3000);
      assert.ok(adRequests.some(u=>u.includes('quge5.com')),'Monetag delayed loader');
      assert.ok(adRequests.some(u=>u.includes('bauval.org')),'Adsterra lazy loader');
      assert.deepEqual(errors,[]);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:`artifacts/performance/final-${width}.png`,fullPage:true});
      report.push({width,images:130,lightReel:12,combo:3,reusedUniverseRows:true,adRequests,errors});
      await ctx.close();
    }
    fs.writeFileSync('artifacts/performance/final-browser.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify(report));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
