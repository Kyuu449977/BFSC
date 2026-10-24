const { chromium } = require('playwright'),
  fs = require('fs'),
  http = require('http'),
  path = require('path'),
  assert = require('assert/strict');
(async () => {
  const mime = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.woff2': 'font/woff2',
  };
  const server = http
    .createServer((req, res) => {
      const f = path.join(
        process.cwd(),
        'public',
        req.url === '/' ? 'index.html' : req.url.split('?')[0]
      );
      if (!fs.existsSync(f) || !fs.statSync(f).isFile()) {
        res.writeHead(404);
        return res.end();
      }
      res.setHeader('Content-Type', mime[path.extname(f)] || 'text/plain');
      res.end(fs.readFileSync(f));
    })
    .listen(8094);
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      serviceWorkers: 'block',
    });
    const page = await context.newPage(),
      errors = [],
      outside = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('request', (r) => {
      if (!r.url().startsWith('http://localhost:8094')) outside.push(r.url());
    });
    await page.goto('http://localhost:8094');
    assert.equal(await page.evaluate(() => typeof Motion.animate), 'function');
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await page.locator('#soundBtn').hover();
    await page.mouse.down();
    assert.equal(
      await page.locator('#soundBtn').evaluate((e) => e.classList.contains('is-pressing')),
      true
    );
    await page.mouse.up();
    assert.equal(await page.locator('.press-wave').count(), 0);
    assert.equal(
      await page.locator('#soundBtn').evaluate((e) => e.getAnimations().length > 0),
      true
    );
    await page.waitForFunction(
      () => document.getElementById('soundBtn').getAnimations().length === 0
    );
    await page.locator('#soundBtn').focus();
    const before = await page.locator('#soundBtn').getAttribute('aria-pressed');
    await page.keyboard.press('Space');
    assert.notEqual(await page.locator('#soundBtn').getAttribute('aria-pressed'), before);
    await page.locator('#findFeaturedBtn').click();
    assert.equal(await page.locator('#resultDialog').evaluate((e) => e.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'findFeaturedBtn');
    for (const q of ['ph', 'pho', 'bun', '']) await page.locator('#dishSearch').fill(q);
    await page.waitForFunction(() => document.getAnimations().length === 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#soundBtn').click();
    assert.equal(await page.locator('.press-wave').count(), 0);
    await page.locator('#findFeaturedBtn').click();
    await page.waitForFunction(() =>
      document.getAnimations().every((a) => a.playState !== 'running')
    );
    await page.keyboard.press('Escape');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('#findFeaturedBtn').click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() =>
      document.getAnimations().every((a) => a.playState !== 'running')
    );
    await page.keyboard.press('Escape');
    await page.locator('#budgetPanel summary').click();
    await page.locator('[data-budget="100000"]').click();
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    });
    assert.equal(
      await page
        .locator('#filters button')
        .evaluateAll((buttons) => buttons.every((b) => b.scrollWidth <= b.clientWidth + 1)),
      true,
      'filter text must fit inside scrollable pills'
    );
    await page.screenshot({ path: 'artifacts/professional-mobile.png', fullPage: true });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(outside, []);
    console.log(
      'PASS: real local photos, Motion library, pointer/keyboard feedback, subtle press feedback without Material ripple, rapid filtering, modal focus, reduced-motion and cancellation, responsive screenshot; no external runtime requests or JS errors.'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
