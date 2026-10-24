const { chromium } = require('playwright'),
  http = require('node:http'),
  fs = require('node:fs'),
  path = require('node:path'),
  assert = require('node:assert/strict');
(async () => {
  const mime = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
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
    .listen(8108);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const c = await browser.newContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      }),
      p = await c.newPage(),
      errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto('http://localhost:8108');
    await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    const first = p.locator('#menuGrid .dish-card').first(),
      name = await first.locator('.dish-name').textContent();
    await first.click();
    await p.locator('[data-personal-field=favorite]').click();
    await p.locator('[data-personal-field=eaten]').click();
    assert.equal(
      await p.locator('[data-personal-field=eaten]').getAttribute('aria-pressed'),
      'true'
    );
    assert.equal(await p.evaluate(() => Object.keys(gachaEngine.collection).length), 0);
    await p.locator('[data-personal-field=hidden]').click();
    await p.waitForFunction(
      () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
    );
    await p.keyboard.press('Escape');
    await p.locator('#personalView').selectOption('hidden');
    assert.ok((await p.locator('.dish-name').allTextContents()).includes(name));
    await p.locator('#menuGrid .dish-card').first().click();
    await p.locator('[data-personal-field=hidden]').click();
    await p.keyboard.press('Escape');
    await p.locator('#personalView').selectOption('favorite');
    assert.ok((await p.locator('.dish-name').allTextContents()).includes(name));
    await p.locator('#personalView').selectOption('eaten');
    assert.ok((await p.locator('.dish-name').allTextContents()).includes(name));
    await p.reload();
    await p.locator('#personalView').selectOption('favorite');
    assert.ok((await p.locator('.dish-name').allTextContents()).includes(name));
    await p.locator('#budgetPanel summary').click();
    await p.locator('#cravingInput').selectOption('rice');
    await p.locator('#avoidRecentInput').check();
    await p.waitForFunction(
      () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
    );
    const eligible = await p.evaluate(() => {
      const plan = gachaEngine.prepareSelection();
      return [...plan.singles, ...plan.combos].every((choice) =>
        choice[0].dish.tags.includes('rice')
      );
    });
    assert.equal(eligible, true);
    await p.locator('#resetTasteBtn').click();
    await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await p.locator('#cravingInput').inputValue(), 'all');
    const second = await c.newPage();
    await second.goto('http://localhost:8108');
    await second.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await p.locator('#personalView').selectOption('favorite');
    await p.locator('#menuGrid .dish-card').first().click();
    await p.locator('[data-personal-field=favorite]').click();
    await second.locator('#personalView').selectOption('favorite');
    await second.waitForFunction(
      () => document.querySelectorAll('#menuGrid .dish-card').length === 0
    );
    await p.keyboard.press('Escape');
    await p.locator('#personalView').selectOption('all');
    await p.locator('#budgetPanel summary').click();
    await p.evaluate(() => scrollTo(0, 0));
    await p.locator('#tripleBtn').click();
    await p.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await p.locator('[data-personal-field]').count(), 9);
    assert.equal(
      await p.locator('#resultDialog').evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
      true
    );
    await p.keyboard.press('Escape');
    assert.deepEqual(errors, []);
    console.log(
      'PASS favorite/eaten/hidden/restore, reload, cross-tab, craving eligibility, reset, recent toggle, independent collection and triple mobile dialog'
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
