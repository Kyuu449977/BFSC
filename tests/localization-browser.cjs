const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
/* Isolated browser contexts, read-only public server, no production/user data. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'artifacts/localization-qa');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://test').pathname);
  if (pathname === '/api/custom-dishes') {
    res.setHeader('Content-Type', 'application/json');
    return res.end('[]');
  }
  const file = path.resolve(root, 'public', '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(path.join(root, 'public') + path.sep) || !fs.existsSync(file)) {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader(
    'Content-Type',
    {
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.html': 'text/html',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.webp': 'image/webp',
      '.woff2': 'font/woff2',
    }[path.extname(file)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(file));
});
async function assertNoVietnamese(page, scope = 'body') {
  const leaks = await page.locator(scope).evaluate((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT),
      leaks = [];
    while (walker.nextNode()) {
      const node = walker.currentNode,
        parent = node.parentElement;
      if (
        !parent ||
        !parent.checkVisibility() ||
        parent.closest('script,style,[data-lang-choice],[data-tz-choice]')
      )
        continue;
      const text = node.textContent.trim().replace(/(?<!\p{L})đ(?!\p{L})/gu, ''); // VND currency symbol is not UI prose.
      if (/[ĐđĂăƠơƯưẠ-ỹ]/u.test(text)) leaks.push(text);
    }
    const attributes = [];
    for (const node of el.querySelectorAll(
      '[aria-label],[title],[placeholder],[alt],[data-tooltip]'
    )) {
      if (!node.checkVisibility() || node.closest('[data-tz-choice],[data-lang-choice]')) continue;
      for (const key of ['aria-label', 'title', 'placeholder', 'alt', 'data-tooltip']) {
        if (key === 'data-tooltip' && node.hasAttribute('aria-label')) continue;
        const value = node.getAttribute(key);
        if (value && /[ĐđĂăƠơƯưẠ-ỹ]/u.test(value)) attributes.push(`${key}: ${value}`);
      }
    }
    return [...leaks, ...attributes];
  });
  assert.deepEqual(leaks, [], `Untranslated UI at ${scope}`);
}
(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const name = process.env.BFSC_TEST_ENGINE || 'chromium';
  const browser = await { chromium, webkit }[name].launch();
  const report = { engine: name, matrix: [], errors: [] };
  try {
    for (const [region, timezone] of [
      ['vi', 'Asia/Ho_Chi_Minh'],
      ['ja', 'Asia/Tokyo'],
      ['ko', 'Asia/Seoul'],
      ['zh', 'Asia/Shanghai'],
      ['en', 'America/New_York'],
    ]) {
      for (const language of ['vi', 'en', 'ja', 'ko', 'zh']) {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          reducedMotion: 'reduce',
          serviceWorkers: 'block',
        });
        await context.route('**/*', (route) =>
          new URL(route.request().url()).origin === origin ? route.continue() : route.abort()
        );
        await context.addInitScript(
          ({ language, timezone }) => {
            localStorage.setItem('food_case_setting_language', JSON.stringify(language));
            localStorage.setItem('food_case_setting_timezone', JSON.stringify(timezone));
            // Deterministic manual-share fallback on both engines; do not invoke OS sharing.
            Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
            Object.defineProperty(navigator, 'clipboard', {
              value: {
                writeText: async () => {
                  throw new Error('clipboard unavailable in fixture');
                },
              },
              configurable: true,
            });
          },
          { language, timezone }
        );
        const page = await context.newPage();
        page.setDefaultTimeout(6000);
        page.on('pageerror', (error) => report.errors.push(error.message));
        await page.goto(origin);
        await page.waitForFunction(
          () => window.engine && !document.getElementById('singleBtn').disabled
        );
        assert.equal(await page.evaluate(() => engine.currentRegion), region);
        assert.equal(await page.locator('html').getAttribute('lang'), language);
        assert.equal(
          await page.locator('#customWheelBtn > svg.icon').count(),
          1,
          'translation preserves the button icon'
        );
        for (const width of [320, 390]) {
          await page.setViewportSize({ width, height: 844 });
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            `${region}/${language} overflow at ${width}px`
          );
        }
        const currentDish = await page.evaluate(() => {
          const dish = engine.getAllDishesList()[0];
          return { id: dish.id, name: getDishName(dish), desc: getDishDesc(dish) };
        });
        if (language !== 'vi') await assertNoVietnamese(page);
        await page.locator('#collectionNav').click();
        if (language !== 'vi') await assertNoVietnamese(page);
        await page.locator('#menuNav').click();
        await page.locator('#filters [data-filter="drinks"]').click();
        if (language !== 'vi') await assertNoVietnamese(page);
        await page.locator('#filters [data-filter="all"]').click();
        await page.locator('#budgetPanel > summary').click();
        await page.locator('#budgetInput').fill('-1');
        await page.waitForFunction(
          () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'true'
        );
        if (language !== 'vi') await assertNoVietnamese(page);
        await page.locator('#clearBudgetBtn').click();
        await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
        await page.locator('#budgetPanel > summary').click();
        await page.locator('#dishSearch').fill(currentDish.name);
        assert.ok((await page.locator('#menuGrid').innerText()).includes(currentDish.name));
        await page.locator('#dishSearch').fill('');
        await page.locator('#customWheelBtn').click();
        if (language !== 'vi') await assertNoVietnamese(page, '#customWheelDialog');
        await page.locator('#customWheelSpinActionBtn').click();
        if (language !== 'vi') await assertNoVietnamese(page, '#customWheelDialog');
        await page.locator('#customWheelUniverseBtn').click();
        assert.ok((await page.locator('#universeDishList').innerText()).includes(currentDish.name));
        if (language !== 'vi') await assertNoVietnamese(page, '#universeDishDialog');
        await page.locator('#universeDishSearch').fill(currentDish.name);
        await page.locator('#universeDishList input').first().check();
        await page.locator('#universeConfirmBtn').click();
        assert.equal(await page.locator('#customWheelInput').inputValue(), currentDish.name);
        await page.keyboard.press('Escape');
        await page.locator('#singleBtn').click();
        await page.locator('#resultDialog').waitFor({ state: 'visible' });
        if (language !== 'vi') await assertNoVietnamese(page, '#resultDialog');
        const result = await page.locator('#resultGrid h3').innerText();
        const maps = await page.locator('#placesLinks').innerText();
        assert.ok(maps.includes(result), 'Maps uses the displayed dish translation');
        await page.keyboard.press('Escape');
        await openTools(page);
        for (const button of ['themeBtn', 'shareBtn', 'addDishBtn', 'installBtn']) {
          if (!(await page.locator('#' + button).isVisible())) continue;
          await page.locator('#' + button).click();
          if (button === 'shareBtn')
            await page.locator('#shareDialog').waitFor({ state: 'visible' });
          // Share may use clipboard without opening a dialog.
          const dialogs = page.locator('dialog[open]');
          if (await dialogs.count()) {
            if (language !== 'vi') await assertNoVietnamese(page, 'dialog[open]');
            await page.locator('dialog[open] [data-close]').first().click();
            await page.locator('dialog[open]').waitFor({ state: 'hidden' });
          }
        }
        if (region === 'vi' && language !== 'vi')
          await page.screenshot({ path: path.join(out, `${name}-${language}.png`) });
        report.matrix.push({
          region,
          language,
          search: true,
          customPicker: true,
          result: true,
          dialogs: true,
        });
        await context.close();
      }
    }
    // Verify in-place language switches, not only startup/reload localization.
    const context = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
    await context.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(error.message));
    await page.goto(origin);
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    const originalRegion = await page.evaluate(() => engine.currentRegion);
    for (const language of ['en', 'ja', 'ko', 'zh', 'vi']) {
      await clickTool(page, 'langBtn');
      await page.locator(`[data-lang-choice="${language}"]`).click();
      await page.locator('#langDoneBtn').click();
      assert.equal(await page.locator('html').getAttribute('lang'), language);
      assert.equal(await page.evaluate(() => engine.currentRegion), originalRegion);
      if (language !== 'vi') await assertNoVietnamese(page);
    }
    for (const file of ['privacy', 'terms', 'credits']) {
      await page.goto(`${origin}/${file}.html`);
      for (const language of ['en', 'ja', 'ko', 'zh', 'vi']) {
        await page.locator('.legal-lang-select').selectOption(language);
        if (language !== 'vi') {
          const leaks = await page.locator('main').evaluate((el) => {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT),
              leaks = [];
            while (walker.nextNode()) {
              const node = walker.currentNode;
              // Published author/source/license metadata and language autonyms remain verbatim.
              if (node.parentElement.closest('.photo-credits,.legal-lang-select')) continue;
              if (/[ĐđĂăƠơƯưẠ-ỹ]/u.test(node.textContent)) leaks.push(node.textContent.trim());
            }
            return leaks;
          });
          assert.deepEqual(leaks, [], `${file}/${language} legal text`);
          if (file === 'credits') {
            assert.equal(await page.locator('[data-dish-id]').count(), 382);
            const names = await page.locator('[data-dish-id] > strong').allTextContents();
            assert.equal(
              names.some((name) => /[ĐđĂăƠơƯưẠ-ỹ]/u.test(name)),
              false
            );
          }
        }
      }
    }
    report.inPlaceSwitches = 5;
    report.legalCombinations = 15;
    await context.close();
    assert.deepEqual(report.errors, []);
  } finally {
    fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(report, null, 2));
    server.closeAllConnections();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log(`${name}: ${report.matrix.length}/25 language/region combinations passed`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
  server.close();
});
