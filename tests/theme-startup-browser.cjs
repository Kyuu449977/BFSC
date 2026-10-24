const { chromium } = require('playwright'),
  assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const c = await browser.newContext({ serviceWorkers: 'block' });
    await c.addInitScript(() => {
      localStorage.setItem('food_case_setting_theme', '"rose"');
      localStorage.setItem('food_case_setting_appearance', '"dark"');
    });
    const p = await c.newPage();
    let release;
    const gate = new Promise((r) => (release = r));
    await p.route('**/app.js', async (route) => {
      await gate;
      await route.continue();
    });
    await p.goto('http://localhost:8080', { waitUntil: 'commit' });
    await p.waitForFunction(() => document.documentElement.dataset.theme === 'rose');
    assert.equal(await p.locator('html').getAttribute('data-appearance'), 'dark');
    assert.notEqual(await p.evaluate(() => document.readyState), 'complete');
    release();
    await p.waitForLoadState('load');
    for (const path of ['privacy.html', 'terms.html', 'credits.html', '']) {
      await p.goto('http://localhost:8080/' + path);
      assert.equal(await p.locator('html').getAttribute('data-theme'), 'rose');
      assert.equal(await p.locator('html').getAttribute('data-appearance'), 'dark');
    }
    console.log(
      'PASS saved appearance applied before app finishes loading and retained across legal pages and home'
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
