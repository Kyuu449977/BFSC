const { chromium } = require('playwright'),
  assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      }),
      page = await context.newPage(),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:8080');
    await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await page.locator('#budgetPanel .theme-options').count(), 0);
    await page.locator('#themeBtn').click();
    for (const appearance of ['light', 'dark'])
      for (const theme of ['green', 'blue', 'rose', 'orange']) {
        await page.locator(`[data-appearance-choice=${appearance}]`).click();
        await page.locator(`[data-theme-choice=${theme}]`).click();
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
        assert.equal(await page.locator('html').getAttribute('data-appearance'), appearance);
        assert.equal(await page.locator('.theme-options [aria-pressed=true]').count(), 1);
        assert.equal(
          await page
            .locator('#singleBtn')
            .evaluate(
              (e) =>
                getComputedStyle(e).backgroundColor ===
                getComputedStyle(document.querySelector('.brand-mark')).backgroundColor
            ),
          true,
          'primary uses accent in ' + appearance + ' ' + theme
        );
      }
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.locator('[data-appearance-choice=system]').click();
    assert.equal(await page.locator('html').getAttribute('data-appearance'), 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForFunction(() => document.documentElement.dataset.appearance === 'light');
    await page.locator('[data-appearance-choice=dark]').click();
    await page.locator('[data-theme-choice=blue]').focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'themeBtn');
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'blue');
    assert.equal(await page.locator('html').getAttribute('data-appearance'), 'dark');
    for (const width of [320, 360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        'header fits ' + width
      );
      await page.locator('#themeBtn').click();
      assert.equal(
        await page.locator('#themeDialog').evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
        true
      );
      await page.keyboard.press('Escape');
    }
    const second = await context.newPage();
    await second.goto('http://localhost:8080');
    await second.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    await page.locator('#themeBtn').click();
    await page.locator('[data-theme-choice=green]').click();
    await second.waitForFunction(() => document.documentElement.dataset.theme === 'green');
    await page.keyboard.press('Escape');
    await page.locator('#comboBtn').click();
    await page.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.result-card').count(), 3);
    await page.keyboard.press('Escape');
    const denied = await browser.newContext({ serviceWorkers: 'block' });
    await denied.addInitScript(() =>
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw Error('denied');
        },
      })
    );
    const p = await denied.newPage();
    await p.goto('http://localhost:8080');
    await p.locator('#themeBtn').click();
    await p.locator('[data-theme-choice=rose]').click();
    await p.locator('[data-appearance-choice=dark]').click();
    assert.equal(await p.locator('html').getAttribute('data-theme'), 'rose');
    assert.equal(await p.locator('html').getAttribute('data-appearance'), 'dark');
    assert.deepEqual(errors, []);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/dark-theme-mobile.png', fullPage: true });
    console.log(
      'PASS navbar control, all 8 light/dark palettes, system changes, persistence, keyboard/Escape focus, cross-tab, blocked storage, responsive header/dialog and combo'
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
