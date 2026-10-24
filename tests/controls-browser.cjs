const { chromium } = require('playwright'),
  assert = require('node:assert/strict'),
  http = require('node:http'),
  fs = require('node:fs'),
  path = require('node:path');
(async () => {
  const mime = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.json': 'application/json',
    '.png': 'image/png',
  };
  const server = http
    .createServer((req, res) => {
      const file = path.join(
        process.cwd(),
        'public',
        req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]
      );
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404);
        return res.end();
      }
      res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
      res.end(fs.readFileSync(file));
    })
    .listen(8109);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const c = await browser.newContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: 'block',
        hasTouch: true,
      }),
      p = await c.newPage(),
      errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto('http://localhost:8109');
    await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(
      await p.locator('#uniqueInput').evaluate((e) => getComputedStyle(e).appearance),
      'none'
    );
    assert.equal(await p.locator('#cravingInput').getAttribute('aria-hidden'), 'true');
    await p.locator('#budgetPanel summary').click();
    await p.waitForFunction(
      () => document.getElementById('budgetPanel').getAnimations().length === 0
    );
    await p.locator('#cravingInputControl').click();
    assert.equal(await p.locator('#cravingInputOptions').isVisible(), true);
    await p.keyboard.press('ArrowDown');
    await p.keyboard.press('Enter');
    assert.equal(await p.locator('#cravingInput').inputValue(), 'rice');
    assert.equal(await p.locator('#cravingInputControl').getAttribute('aria-expanded'), 'false');
    await p.locator('#cravingInputControl').click();
    await p.keyboard.press('End');
    await p.keyboard.press('Enter');
    assert.equal(await p.locator('#cravingInput').inputValue(), 'mild');
    await p.locator('#cravingInputControl').click();
    await p.keyboard.press('Escape');
    assert.equal(await p.locator('#cravingInputOptions').isVisible(), false);
    assert.equal(await p.evaluate(() => document.activeElement.id), 'cravingInputControl');
    await p.locator('#cravingInputControl').click();
    await p.keyboard.press('Tab');
    assert.equal(await p.locator('#cravingInputOptions').isVisible(), false);
    await p.locator('#cravingInputControl').focus();
    await p.keyboard.type('cay');
    await p.keyboard.press('Enter');
    assert.equal(await p.locator('#cravingInput').inputValue(), 'spicy');
    await p.locator('#resetTasteBtn').click();
    assert.equal(
      await p.locator('#cravingInputControl .custom-select-label').textContent(),
      'Món nào cũng được'
    );
    await p.locator('#uniqueInput').focus();
    await p.keyboard.press('Space');
    assert.equal(await p.locator('#uniqueInput').isChecked(), false);
    await p.keyboard.press('Space');
    assert.equal(await p.locator('#uniqueInput').isChecked(), true);
    for (const [width, height] of [
      [320, 568],
      [360, 640],
      [390, 844],
      [568, 320],
      [768, 1024],
      [1440, 900],
    ]) {
      await p.setViewportSize({ width, height });
      await p.locator('#cravingInputControl').click();
      const fits = await p.locator('#cravingInputOptions').evaluate((e) => {
        const r = e.getBoundingClientRect();
        return (
          r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1
        );
      });
      assert.equal(fits, true, `popup ${width}x${height}`);
      await p.keyboard.press('Escape');
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true
      );
    }
    await p.setViewportSize({ width: 390, height: 844 });
    await p.locator('#cravingInputControl').click();
    await p.waitForFunction(
      () =>
        !document.getElementById('cravingInputOptions').hidden &&
        getComputedStyle(document.getElementById('cravingInputOptions')).opacity === '1' &&
        document.getElementById('cravingInputOptions').getAnimations().length === 0
    );
    await p.screenshot({ path: 'artifacts/custom-controls-mobile.png' });
    await p.locator('#title').click();
    assert.equal(await p.locator('#cravingInputOptions').isVisible(), false);
    await p.locator('#budgetPanel summary').click();
    await p.locator('#budgetPanel summary').click();
    await p.locator('#budgetPanel summary').click();
    await p.waitForFunction(
      () => document.getElementById('budgetPanel').getAnimations().length === 0
    );
    assert.equal(await p.locator('#budgetPanel').evaluate((e) => e.open), false);
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.locator('#budgetPanel summary').click();
    await p.locator('#cravingInputControl').click();
    assert.equal(
      await p.locator('#cravingInputOptions').evaluate((e) => e.getAnimations().length),
      0
    );
    await p.keyboard.press('Escape');
    await p.locator('#personalViewControl').click();
    await p.keyboard.press('End');
    await p.keyboard.press('Enter');
    assert.equal(await p.locator('#personalView').inputValue(), 'hidden');
    await p.locator('#personalViewControl').click();
    await p.keyboard.press('Home');
    await p.keyboard.press('Enter');
    await p.locator('#themeBtn').click();
    await p.locator('[data-appearance-choice=dark]').click();
    await p.keyboard.press('Escape');
    await p.locator('#cravingInputControl').click();
    assert.equal(
      await p.locator('#cravingInputOptions').evaluate((e) => getComputedStyle(e).backgroundColor),
      'rgb(36, 42, 50)'
    );
    await p.screenshot({ path: 'artifacts/custom-controls-dark.png' });
    await p.keyboard.press('Escape');
    assert.equal(await p.locator('button[title]').count(), 0);
    await p.locator('#themeBtn').scrollIntoViewIfNeeded();
    await p.locator('#themeBtn').focus();
    await p.keyboard.press('Tab');
    await p.keyboard.press('Tab');
    await p.getByRole('tooltip').waitFor({ state: 'visible' });
    assert.ok((await p.getByRole('tooltip').textContent()).includes('Chia sẻ'));
    await p.keyboard.press('Escape');
    assert.equal(await p.getByRole('tooltip').count(), 0);
    assert.deepEqual(errors, []);
    console.log(
      'PASS custom select pointer/keyboard/typeahead/Escape/Tab/outside-click, checkbox, rapid disclosures, 6 responsive popup sizes and reduced motion'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
