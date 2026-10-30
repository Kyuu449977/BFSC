const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/upgrade-acceptance');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  let n = new URL(req.url, 'http://x').pathname;
  if (n === '/api/custom-dishes') {
    res.setHeader('Content-Type', 'application/json');
    return res.end('[]');
  }
  if (n === '/') n = '/index.html';
  if (n.includes('..')) {
    res.writeHead(404);
    return res.end();
  }
  let p = path.join(root, 'public', n);
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader(
    'Content-Type',
    {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.woff2': 'font/woff2',
    }[path.extname(p)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(p));
});
(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`,
    report = { matrix: [], errors: [], webkit: 'not run' };
  const engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
  const browser = await (engineName === 'webkit' ? webkit : chromium).launch({ headless: true });
  try {
    for (const [region, tz, count] of [
      ['vi', 'Asia/Ho_Chi_Minh', 162],
      ['ja', 'Asia/Tokyo', 55],
      ['ko', 'Asia/Seoul', 55],
      ['zh', 'Asia/Shanghai', 55],
      ['en', 'America/New_York', 55],
    ])
      for (const lang of ['vi', 'en', 'ja', 'ko', 'zh']) {
        const ctx = await browser.newContext({
          reducedMotion: 'reduce',
          viewport: { width: 390, height: 844 },
        });
        await ctx.route('**/*', (route) =>
          new URL(route.request().url()).origin === origin ? route.continue() : route.abort()
        );
        await ctx.addInitScript(
          ({ tz, lang }) => {
            localStorage.setItem('food_case_setting_timezone', JSON.stringify(tz));
            localStorage.setItem('food_case_setting_language', JSON.stringify(lang));
          },
          { tz, lang }
        );
        const p = await ctx.newPage();
        p.on('pageerror', (e) => report.errors.push(e.message));
        await p.goto(origin);
        await p.waitForFunction(
          () => window.engine && !document.getElementById('singleBtn').disabled
        );
        const state = await p.evaluate(() => ({
          region: engine.currentRegion,
          count: engine.getAllDishesList().length,
          lang: document.documentElement.lang,
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        if (
          state.region !== region ||
          state.count !== count ||
          state.lang !== lang ||
          state.width > state.viewport + 1
        )
          throw Error(JSON.stringify(state));
        await p.setViewportSize({ width: 320, height: 568 });
        const narrow = await p.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        if (narrow.documentWidth > narrow.viewport + 1)
          throw Error('320px locale overflow: ' + JSON.stringify({ region, lang, ...narrow }));
        state.narrowWidth = narrow.documentWidth;
        await p.setViewportSize({ width: 390, height: 844 });
        await p.locator('#singleBtn').click();
        await p.locator('#resultDialog').waitFor();
        if ((await p.locator('#resultGrid .result-card').count()) !== 1) throw Error('bad result');
        const resultText = await p.locator('#resultDialog').innerText();
        if (/\b(?:undefined|NaN)\b/.test(resultText))
          throw Error('Invalid result copy ' + region + '/' + lang);
        const saved = await p.evaluate(() =>
          Object.values(engine.collection).reduce((a, b) => a + b, 0)
        );
        if (saved !== 1) throw Error('collection not saved');
        await p.reload();
        await p.waitForFunction(
          () => window.engine && !document.getElementById('singleBtn').disabled
        );
        const reloaded = await p.evaluate(() =>
          Object.values(engine.collection).reduce((a, b) => a + b, 0)
        );
        if (reloaded !== 1) throw Error('collection lost');
        report.matrix.push({ ...state, saved, reloaded });
        await ctx.close();
      }
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    await ctx.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const p = await ctx.newPage();
    p.on('pageerror', (e) => report.errors.push(e.message));
    await p.goto(origin);
    await p.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
    await p.evaluate(() => navigator.serviceWorker.ready);
    await p.waitForFunction(() => !!navigator.serviceWorker.controller);
    await ctx.setOffline(true);
    await p.reload();
    await p.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
    await p.locator('#comboBtn').click();
    await p.locator('#resultDialog').waitFor();
    report.offlineCombo = await p.locator('.result-card').count();
    await ctx.close();
    try {
      const w = await webkit.launch({ headless: true });
      report.webkit = 'engine available';
      await w.close();
    } catch (e) {
      report.webkit = 'unavailable: ' + e.message.split('\n')[0];
    }
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(path.join(out, engineName + '-matrix.json'), JSON.stringify(report, null, 2));
  }
  console.log(
    JSON.stringify({
      matrix: report.matrix.length,
      errors: report.errors,
      offlineCombo: report.offlineCombo,
      webkit: report.webkit,
    })
  );
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
