// Isolated, bounded profiling: no writes to the real custom-dish store.
const fs = require('node:fs'), http = require('node:http'), path = require('node:path');
const { chromium } = require('../tools/country-qa/node_modules/playwright');
const label = process.argv[2] || 'after';
const baselineAnimation = require('node:child_process').execFileSync('git', ['show','HEAD:src/js/animation.js'], {encoding:'utf8'});
const server = http.createServer((req, res) => {
  let name = new URL(req.url, 'http://local').pathname;
  if (name === '/api/custom-dishes') { res.setHeader('Content-Type', 'application/json'); return res.end('[]'); }
  if (name === '/') name = '/index.html';
  if (name === '/animation.js' && label === 'before') { res.setHeader('Content-Type','text/javascript'); return res.end(baselineAnimation); }
  const file = path.resolve('public', '.' + name);
  if (!file.startsWith(path.resolve('public') + path.sep) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'})[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  try {
    const ctx = await browser.newContext({serviceWorkers:'block', viewport:{width:390,height:844}, reducedMotion:'no-preference'});
    await ctx.addInitScript(() => { Object.defineProperty(navigator,'deviceMemory',{get:()=>4}); Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>4}); });
    await ctx.route('**/*', r => new URL(r.request().url()).origin === origin ? r.continue() : r.abort());
    const page = await ctx.newPage(); const errors=[];
    page.on('pageerror', e => errors.push(e.message));
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});
    await cdp.send('Performance.enable');
    await page.goto(origin);
    await page.waitForFunction(() => window.engine && !document.querySelector('#singleBtn').disabled);
    await page.evaluate(() => {
      window.profileTasks=[];
      new PerformanceObserver(list => window.profileTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});
      const dialog=document.createElement('dialog'); dialog.id='profileDialog';
      const viewport=document.createElement('div'); viewport.className='reel-viewport'; viewport.style.width='350px';
      const track=document.createElement('div'); track.className='reel-track'; viewport.append(track); dialog.append(viewport); document.body.append(dialog);
      window.profileReel = new FoodRoulette(track, viewport);
    });
    const runs=[];
    for (let i=0;i<30;i++) {
      runs.push(await page.evaluate(async () => {
        const reel=window.profileReel, pool=Catalog.getAllDishes().slice(0,20);
        document.querySelector('#profileDialog').showModal();
        const start=performance.now();
        await new Promise(resolve=>reel.start(pool[0],pool,resolve));
        const elapsed=performance.now()-start, cards=reel.track.children.length;
        document.querySelector('#profileDialog').close(); reel.release();
        return {elapsed,cards,remainingCards:reel.track.children.length,light:!!reel.light};
      }));
      if ((i+1)%10===0) console.log(label, i+1, 'draws');
    }
    const tasks=await page.evaluate(()=>window.profileTasks);
    const result={label,cpuSlowdown:6,runs,errors,longTaskCount:tasks.length,longTaskMs:tasks.reduce((s,t)=>s+t.duration,0),dom:await cdp.send('Memory.getDOMCounters'),metrics:(await cdp.send('Performance.getMetrics')).metrics};
    fs.mkdirSync('artifacts/performance',{recursive:true});
    fs.writeFileSync(`artifacts/performance/${label}.json`,JSON.stringify(result,null,2));
    console.log(JSON.stringify({label,longTaskMs:result.longTaskMs,errors,remainingCards:runs.at(-1).remainingCards}));
    if(errors.length || runs.some(r=>r.remainingCards || r.cards === 0)) throw Error('Repeated-draw lifecycle regression');
  } finally { await browser.close(); server.close(); }
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
