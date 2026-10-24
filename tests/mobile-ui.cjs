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
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.json': 'application/json',
  };
  const server = http
    .createServer((req, res) => {
      const url = req.url.split('?')[0];
      const file = path.join(root, url === '/' ? 'index.html' : url);
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.setHeader('Content-Type', mime[path.extname(file)] || 'text/plain');
      res.end(fs.readFileSync(file));
    })
    .listen(8096);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      serviceWorkers: 'block',
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [],
      external = [],
      missing = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('request', (r) => {
      if (!r.url().startsWith('http://localhost:8096')) external.push(r.url());
    });
    page.on('response', (r) => {
      if (r.status() >= 400) missing.push(r.url());
    });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: async (payload) => {
          window.sharedPayload = payload;
        },
      });
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value) => {
            window.copiedPayload = value;
          },
        },
      });
    });
    await page.goto('http://localhost:8096');
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.dish-card').count(), 12);
    assert.equal(await page.locator('#qrBtn,#qrDialog').count(), 0);
    assert.equal(await page.locator('.mobile-nav').isVisible(), true);
    await page.locator('#loadMoreBtn').click();
    assert.equal(await page.locator('.dish-card').count(), 24);
    await page.locator('#dishSearch').fill('pho');
    assert.ok((await page.locator('.dish-name').allTextContents()).some((s) => s.includes('Phở')));
    await page.locator('#dishSearch').fill('zzzz-not-a-food');
    assert.equal(await page.locator('.dish-card').count(), 0);
    assert.ok((await page.locator('#menuStatus').textContent()).includes('Chưa tìm thấy'));
    await page.locator('#clearSearch').click();
    assert.equal(await page.locator('.dish-card').count(), 12);
    await page.locator('#collectionNav').click();
    assert.equal(await page.locator('.dish-card').count(), 0);
    assert.ok((await page.locator('#menuTitle').textContent()).includes('Bộ sưu tập'));
    await page.locator('#homeNav').click();
    await page.locator('#singleBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await page.locator('#collectionNav').click();
    assert.equal(await page.locator('.dish-card').count(), 1);
    await page.locator('#menuNav').click();
    assert.equal(await page.locator('#collectionToggle').getAttribute('aria-pressed'), 'false');
    await page.locator('#shareBtn').click();
    assert.equal(await page.evaluate(() => window.sharedPayload.url), 'http://localhost:8096/');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'share', { configurable: true, value: undefined })
    );
    await page.locator('#shareBtn').click();
    assert.equal(await page.evaluate(() => window.copiedPayload), 'http://localhost:8096/');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async () => {
            throw Error('denied');
          },
        },
      })
    );
    await page.locator('#shareBtn').click();
    await page.locator('#shareDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#shareUrl').inputValue(), 'http://localhost:8096/');
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      event.prompt = async () => {
        window.installPromptCalled = true;
      };
      event.userChoice = Promise.resolve({ outcome: 'dismissed' });
      window.dispatchEvent(event);
    });
    await page.locator('#installBtn').click();
    assert.equal(await page.evaluate(() => window.installPromptCalled), true);
    await page.locator('#installBtn').click();
    await page.locator('#installDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#installSteps li').count(), 3);
    await page.keyboard.press('Escape');
    for (const [width, height] of [
      [320, 740],
      [360, 800],
      [390, 844],
      [844, 390],
      [768, 1024],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height });
      await page.locator('#homeNav').evaluate((el) => el.click());
      await page.evaluate(() => scrollTo(0, 0));
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `overflow ${width}x${height}`
      );
      assert.equal(await page.locator('.mobile-nav').isVisible(), width <= 600);
      if (width === 390) await page.screenshot({ path: 'artifacts/mobile-home.png' });
      if (width === 768) await page.screenshot({ path: 'artifacts/tablet-home.png' });
      await page.locator('#findFeaturedBtn').click();
      assert.equal(
        await page.locator('#resultDialog').evaluate((d) => d.scrollWidth <= d.clientWidth),
        true
      );
      await page.keyboard.press('Escape');
    }
    const ios = await browser.newContext({
      viewport: { width: 390, height: 844 },
      serviceWorkers: 'block',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
    });
    const iosPage = await ios.newPage();
    await iosPage.goto('http://localhost:8096');
    await iosPage.locator('#installBtn').click();
    assert.ok((await iosPage.locator('#installSteps').textContent()).includes('Safari'));
    await ios.close();
    const standalone = await browser.newContext({ serviceWorkers: 'block' });
    await standalone.addInitScript(() =>
      Object.defineProperty(navigator, 'standalone', { value: true })
    );
    const standalonePage = await standalone.newPage();
    await standalonePage.goto('http://localhost:8096');
    assert.equal(await standalonePage.locator('#installBtn').isVisible(), false);
    await standalone.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    assert.deepEqual(missing, []);
    console.log(
      'PASS: 6 viewports incl. 320px and landscape, pagination, accent-free search, collection navigation, native/copy/manual sharing, install prompt/manual iOS/standalone, local fonts/icons; no QR, external requests, missing assets or JS errors.'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
