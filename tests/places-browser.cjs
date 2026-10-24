const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const root = path.join(process.cwd(), 'public');
  const mime = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.woff2': 'font/woff2',
  };
  const server = http
    .createServer((req, res) => {
      const file = path.join(
        root,
        req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]
      );
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
      res.end(fs.readFileSync(file));
    })
    .listen(8099);
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [],
      apiRequests = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('request', (r) => {
      if (r.url().includes('/api/places') || r.url().includes('places.googleapis.com'))
        apiRequests.push(r.url());
    });
    await page.addInitScript(() => {
      window.gpsCalls = 0;
      navigator.geolocation.getCurrentPosition = () => {
        window.gpsCalls++;
        throw Error('GPS must not be requested');
      };
    });
    await page.goto('http://localhost:8099');
    await page.locator('#findFeaturedBtn').click();
    assert.equal(await page.locator('#placesLinks a').count(), 1);
    const verifyLinks = async () => {
      for (const link of await page.locator('#placesLinks a').all()) {
        const url = new URL(await link.getAttribute('href'));
        assert.equal(url.origin, 'https://www.google.com');
        assert.equal(url.pathname, '/maps/search/');
        assert.equal(url.searchParams.get('api'), '1');
        assert.ok(url.searchParams.get('query').includes('gần đây'));
        assert.equal(url.searchParams.has('key'), false);
        assert.equal(await link.getAttribute('target'), '_blank');
        assert.ok((await link.getAttribute('rel')).includes('noopener'));
      }
    };
    await verifyLinks();
    await page.keyboard.press('Escape');
    await page.locator('#comboBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    const resultNames = await page.locator('#resultGrid h3').allTextContents();
    assert.equal(await page.locator('#placesLinks a').count(), 3);
    const linkText = await page.locator('#placesLinks').textContent();
    for (const name of resultNames) assert.ok(linkText.includes(name));
    await verifyLinks();
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true
      );
      assert.equal(
        await page.locator('#resultDialog').evaluate((d) => d.scrollWidth <= d.clientWidth),
        true
      );
    }
    await context.setOffline(true);
    await page.waitForFunction(() =>
      document.querySelector('#placesStatus').textContent.includes('Internet')
    );
    await context.setOffline(false);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#nearbyPanel').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'artifacts/maps-links-mobile.png' });
    assert.equal(await page.evaluate(() => window.gpsCalls), 0);
    assert.deepEqual(apiRequests, []);
    assert.deepEqual(errors, []);
    console.log(
      'PASS: Maps links for single/combo, correct queries, no key, no Places API requests, no GPS prompts, four viewports, offline message; no browser errors.'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
