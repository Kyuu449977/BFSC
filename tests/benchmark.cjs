const { chromium } = require('playwright');
const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  cp = require('child_process');
(async () => {
  const baselineRef = process.env.BASELINE_REF || 'c9e8d728818d4534ab47efc2cedbe971c58cfab0';
  const originals = {};
  for (const f of [
    'index.html',
    'style.css',
    'data.js',
    'audio.js',
    'animation.js',
    'gacha.js',
    'app.js',
    'sw.js',
    'manifest.json',
  ])
    originals[f] = cp.execFileSync('git', ['show', `${baselineRef}:${f}`]);
  const server = http
    .createServer((req, res) => {
      let url = decodeURIComponent(req.url.split('?')[0]);
      const old = url.startsWith('/before/');
      url = url.replace(/^\/(before|after)\//, '');
      if (!url) url = 'index.html';
      const f = path.join(process.cwd(), 'public', url);
      const data =
        old && originals[url]
          ? originals[url]
          : fs.existsSync(f) && fs.statSync(f).isFile()
            ? fs.readFileSync(f)
            : null;
      if (!data) {
        res.writeHead(404);
        return res.end();
      }
      res.setHeader(
        'Content-Type',
        {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.jpg': 'image/jpeg',
          '.webp': 'image/webp',
          '.json': 'application/json',
        }[path.extname(url)] || 'application/octet-stream'
      );
      res.end(data);
    })
    .listen(8098);
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const report = {
      baselineRef,
      environment:
        'Headless Edge; localhost; 390x844; fresh browser context each run; service workers blocked; no throttling',
      before: [],
      after: [],
    };
    for (const version of ['before', 'after'])
      for (let i = 0; i < 3; i++) {
        const c = await browser.newContext({
          viewport: { width: 390, height: 844 },
          serviceWorkers: 'block',
        });
        const p = await c.newPage();
        const start = Date.now();
        await p.goto(`http://localhost:8098/${version}/`);
        await p.waitForLoadState('load');
        if (version === 'before') await p.locator('#preloader').waitFor({ state: 'hidden' });
        else await p.locator('#singleBtn').waitFor({ state: 'visible' });
        const ready = Date.now() - start;
        const metrics = await p.evaluate(() => ({
          loadMs: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
          transferBytes: performance
            .getEntriesByType('resource')
            .reduce((n, r) => n + r.transferSize, 0),
        }));
        report[version].push({ ...metrics, readyMs: ready });
        await c.close();
      }
    fs.writeFileSync('artifacts/performance.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
