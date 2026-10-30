const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
const { chromium } = require('playwright');
const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  assert = require('assert/strict');
(async () => {
  let api = true;
  const server = http
    .createServer((req, res) => {
      if (req.url.startsWith('/api/server-info')) {
        if (api) {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ lan_url: 'http://192.168.1.50:8097', public_url: '' }));
        }
        res.writeHead(404);
        return res.end();
      }
      const url = decodeURIComponent(req.url.split('?')[0]);
      const p = path.join(process.cwd(), 'public', url === '/' ? 'index.html' : url);
      if (!fs.existsSync(p) || !fs.statSync(p).isFile()) {
        res.writeHead(404);
        return res.end();
      }
      const mime = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json',
        '.webp': 'image/webp',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.woff2': 'font/woff2',
      };
      res.setHeader('Content-Type', mime[path.extname(p)] || 'application/octet-stream');
      res.end(fs.readFileSync(p));
    })
    .listen(8097);
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value) => {
            window.copiedUrl = value;
          },
        },
      });
    });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://localhost:8097');
      await page.waitForLoadState('networkidle');
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `overflow ${width}`
      );
    }
    await page.screenshot({
      path: path.join(process.cwd(), 'artifacts/preview-desktop.png'),
      fullPage: false,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: path.join(process.cwd(), 'artifacts/preview-mobile.png'),
      fullPage: false,
    });
    await page.locator('#tripleBtn').focus();
    await page.evaluate(() => {
      document.getElementById('tripleBtn').click();
      document.getElementById('tripleBtn').click();
    });
    await page.waitForTimeout(200);
    const strip = await page.locator('#reelTrack .reel-card span').allTextContents();
    assert.equal(strip.length, 32);
    assert.ok(
      strip.every((name, i) => i === 0 || name !== strip[i - 1]),
      'adjacent reel dishes must differ'
    );
    assert.equal(await page.locator('#singleBtn').isDisabled(), true);
    await page.setViewportSize({ width: 360, height: 844 });
    await page.locator('#skipBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#resultGrid article').count(), 3);
    assert.equal(
      await page.locator('#resultGrid h3').first().textContent(),
      strip[26],
      'resize/skip preserves reel winner'
    );
    assert.equal(
      await page.evaluate(() =>
        Object.values(JSON.parse(localStorage.food_case_collection)).reduce((a, b) => a + b, 0)
      ),
      3
    );
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'tripleBtn');
    await page.locator('#comboBtn').click();
    await page.locator('#skipBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#resultGrid .dish-source').count(), 3);
    assert.equal(new Set(await page.locator('#resultGrid .dish-source').allTextContents()).size, 3);
    await page.keyboard.press('Escape');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#singleBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#resultDialog').evaluate((d) => d.open), true);
    await page.keyboard.press('Escape');
    await page
      .locator('.dish-card')
      .filter({ has: page.locator('.uncollected') })
      .first()
      .click();
    assert.ok((await page.locator('#resultGrid .collected').textContent()).includes('x0'));
    await page.keyboard.press('Escape');
    await clickTool(page, 'soundBtn');
    await page.reload();
    assert.equal(await page.locator('#soundBtn').getAttribute('aria-pressed'), 'true');
    await clickTool(page, 'shareBtn');
    assert.equal(await page.evaluate(() => window.copiedUrl), 'http://localhost:8097/');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async () => {
            throw Error('blocked');
          },
        },
      })
    );
    await clickTool(page, 'shareBtn');
    await page.locator('#shareDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#shareUrl').inputValue(), 'http://localhost:8097/');
    await page.keyboard.press('Escape');
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      await caches.open('hom-nay-an-gi-v1');
      await caches.open('other-app');
      const registration = await navigator.serviceWorker.getRegistration();
      await registration.unregister();
    });
    await page.reload();
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForTimeout(300);
    const cachesBefore = await page.evaluate(() => caches.keys());
    assert.equal(cachesBefore.includes('hom-nay-an-gi-v1'), false);
    assert.equal(cachesBefore.includes('other-app'), true);
    console.log('PASS: cache upgrade removes only old app caches');
    await context.setOffline(true);
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(() => document.fonts.check('600 16px "Be Vietnam Pro"', 'Ăn gì đây')),
      true
    );
    assert.equal(
      await page.evaluate(() =>
        fetch('/assets/icons.svg')
          .then((r) => r.text())
          .then((t) => t.includes('id="utensils"'))
      ),
      true
    );
    await page.locator('#singleBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    assert.equal(
      await page.evaluate(() =>
        fetch('/images/missing.webp')
          .then((r) => r.headers.get('content-type'))
          .catch(() => null)
      ),
      null
    );
    assert.equal(
      await page.evaluate(() =>
        fetch('/api/server-info')
          .then((r) => r.ok)
          .catch(() => false)
      ),
      false
    );
    await context.setOffline(false);
    api = false;
    const staticContext = await browser.newContext({ serviceWorkers: 'block' });
    const staticPage = await staticContext.newPage();
    await staticPage.goto('http://localhost:8097');
    await staticPage.emulateMedia({ reducedMotion: 'reduce' });
    await staticPage.locator('#comboBtn').click();
    await staticPage.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await staticPage.locator('#resultGrid article').count(), 3);
    await staticContext.close();
    const blockedContext = await browser.newContext({
      serviceWorkers: 'block',
      reducedMotion: 'reduce',
    });
    await blockedContext.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('Blocked', 'SecurityError');
        },
      });
    });
    const blockedPage = await blockedContext.newPage();
    await blockedPage.goto('http://localhost:8097');
    await blockedPage.locator('#singleBtn').click();
    await blockedPage.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await blockedPage.locator('#resultGrid article').count(), 1);
    await blockedContext.close();
    assert.deepEqual(errors, []);
    console.log(
      'PASS: 4 viewports, resize+skip, triple/unique, combo, reduced motion, x0, focus, settings, share/copy, offline, missing image/API, static hosting; no browser errors'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
