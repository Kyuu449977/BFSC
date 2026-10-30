const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/upgrade-acceptance');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  let n = new URL(req.url, 'http://x').pathname;
  if (n === '/api/custom-dishes' && req.method === 'POST') {
    res.writeHead(404);
    return res.end();
  }
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
    errors = [],
    checks = [];
  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
    });
    await ctx.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(origin);
    await p.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
    await p.locator('#customWheelBtn').click();
    await p.locator('#customWheelInput').fill('Pizza riêng\nPhở riêng');
    await p.locator('#customWheelSpinActionBtn').click();
    await p.locator('#resultDialog').waitFor();
    await p.locator('#rerollBtn').click();
    await p.locator('#resultDialog').waitFor();
    const name = await p.locator('#resultGrid h3').innerText();
    if (!['Pizza riêng', 'Phở riêng'].includes(name)) throw Error('wrong custom reroll');
    await p.keyboard.press('Escape');
    checks.push('custom reroll remains custom');
    await p.locator('#addDishBtn').click();
    await p.locator('#customDishName').fill('Món kiểm thử riêng');
    await p.locator('#customDishPrice').fill('35000');
    await p.locator('#submitCustomDishBtn').click();
    await p.waitForFunction(() => !document.getElementById('addDishDialog').open);
    let added = await p.evaluate(() =>
      engine.getAllDishesList().some((d) => d.name === 'Món kiểm thử riêng')
    );
    if (!added) throw Error('custom lost');
    await p.reload();
    await p.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
    await p.waitForFunction(() =>
      engine.getAllDishesList().some((d) => d.name === 'Món kiểm thử riêng')
    );
    checks.push('custom static fallback saves and reloads');
    const second = await ctx.newPage();
    await second.goto(origin);
    await second.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    await clickTool(p, 'tzBtn');
    await p.locator('[data-timezone-choice="Asia/Tokyo"]').click();
    await second.waitForFunction(() => engine.currentRegion === 'ja');
    checks.push('timezone cross-tab');
    await p.keyboard.press('Escape');
    await clickTool(p, 'langBtn');
    await p.locator('[data-lang-choice="en"]').click();
    await second.waitForFunction(() => document.documentElement.lang === 'en');
    checks.push('language cross-tab');
    await ctx.close();
    if (errors.length) throw Error(errors.join(';'));
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(path.join(out, 'features.json'), JSON.stringify({ checks, errors }, null, 2));
  }
  console.log({ checks, errors });
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
