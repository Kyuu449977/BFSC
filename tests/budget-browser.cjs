const { chromium } = require('playwright'),
  http = require('node:http'),
  fs = require('node:fs'),
  path = require('node:path'),
  assert = require('node:assert/strict');
(async () => {
  const mime = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.png': 'image/png',
    '.json': 'application/json',
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
      res.setHeader('Content-Type', mime[path.extname(file)] || 'text/plain');
      res.end(fs.readFileSync(file));
    })
    .listen(8095);
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      serviceWorkers: 'block',
      reducedMotion: 'reduce',
    });
    const page = await context.newPage(),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:8095');
    await page.locator('#singleBtn').waitFor();
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await page.locator('#budgetPanel summary').click();
    await page.locator('#budgetInput').fill('30000');
    assert.equal(await page.locator('#singleBtn').isDisabled(), true);
    assert.equal(await page.locator('#tripleBtn').isDisabled(), true);
    assert.equal(await page.locator('#comboBtn').isDisabled(), true);
    await page.waitForFunction(
      () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
    );
    assert.equal(await page.locator('#tripleBtn').isDisabled(), true);
    assert.equal(
      await page.locator('#comboBtn').isDisabled(),
      await page.evaluate(() => gachaEngine.prepareSelection({ budget: 30000 }).combos.length === 0)
    );
    await page.locator('#budgetInput').fill('50000');
    await page.locator('[data-mode="drinks"]').click();
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await page.locator('#tripleBtn').isDisabled(), false);
    await page.locator('#tripleBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    const total = await page.locator('#resultCost strong').textContent();
    assert.ok(total.includes('Tổng giá từ'));
    const min = Number(total.replace(/\D/g, ''));
    assert.ok(min <= 50000);
    assert.equal(await page.locator('.result-card').count(), 3);
    assert.equal(new Set(await page.locator('.result-card h3').allTextContents()).size, 3);
    await page.keyboard.press('Escape');
    await page.locator('#budgetInput').fill('50000');
    await page.locator('#budgetInput').fill('0');
    await page.waitForFunction(
      () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
    );
    for (const id of ['singleBtn', 'tripleBtn', 'comboBtn'])
      assert.equal(await page.locator('#' + id).isDisabled(), true);
    assert.equal(await page.locator('.dish-card').count(), 0);
    assert.equal(await page.locator('#featuredName').textContent(), 'Chưa có món phù hợp');
    for (const invalid of ['-50000', 'abc', '1.5', '9'.repeat(20)]) {
      await page.locator('#budgetInput').fill(invalid);
      await page.waitForFunction(
        () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'true'
      );
      assert.equal(await page.locator('#singleBtn').isDisabled(), true);
    }
    await page.locator('#budgetInput').fill('100.000');
    await page.waitForFunction(() => !document.getElementById('comboBtn').disabled);
    assert.equal(
      JSON.parse(await page.evaluate(() => localStorage.getItem('food_case_settings'))).budget,
      100000
    );
    await page.locator('#comboBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.result-card').count(), 3);
    assert.ok(
      Number((await page.locator('#resultCost strong').textContent()).replace(/\D/g, '')) <= 100000
    );
    const sources = await page.locator('.result-card .dish-source').allTextContents();
    assert.equal(new Set(sources).size, 3);
    await page.keyboard.press('Escape');
    await page.reload();
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await page.locator('#budgetInput').inputValue(), '100000');
    await page.locator('#budgetPanel summary').click();
    await page.locator('#clearBudgetBtn').click();
    await page.waitForFunction(
      () => document.getElementById('budgetLabel').textContent === 'Không giới hạn'
    );
    assert.equal(await page.locator('#comboBtn').isDisabled(), false);
    for (const width of [320, 360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        'budget overflow ' + width
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/budget-mobile.png', fullPage: true });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('[data-budget="100000"]').click();
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await page.locator('#singleBtn').click();
    await page.locator('#spinDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#budgetInput').isDisabled(), true);
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.locator('#skipBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.result-card').count(), 1);
    assert.equal(await page.locator('#budgetInput').isDisabled(), false);
    assert.deepEqual(errors, []);
    console.log(
      'PASS: budget debounce, latest input, invalid/zero/exact formatted amounts, whole-roll triples/combo, persistence/clear, resize/skip and 5 responsive widths.'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
