const { chromium } = require('playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  os = require('node:os'),
  { spawn } = require('node:child_process');
(async () => {
  const bundled = path.join(
    os.homedir(),
    '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
  );
  const child = spawn(
    process.env.PYTHON_BIN || (fs.existsSync(bundled) ? bundled : 'python'),
    ['-B', 'server.py'],
    { env: { ...process.env, PORT: '8107' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  let browser;
  try {
    let ready = false;
    for (let i = 0; i < 80; i++) {
      try {
        const response = await fetch('http://127.0.0.1:8107');
        await response.text();
        if (response.ok) {
          ready = true;
          break;
        }
      } catch (_) {}
      await new Promise((r) => setTimeout(r, 100));
    }
    assert.ok(ready, log);
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
    const context = await browser.newContext({
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
        timezoneId: 'Asia/Ho_Chi_Minh',
      }),
      page = await context.newPage(),
      errors = [],
      measurements = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const [width, height] of [
      [320, 568],
      [360, 640],
      [390, 844],
      [430, 932],
      [568, 320],
      [844, 390],
      [768, 1024],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto('http://127.0.0.1:8107');
      await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
      await page.evaluate(() => document.fonts.ready);
      const measure = await page.evaluate(() => {
        const rect = (id) => {
          const r = document.getElementById(id).getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, height: r.height };
        };
        const nav = document.querySelector('.mobile-nav').getBoundingClientRect();
        return {
          width: innerWidth,
          height: innerHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          single: rect('singleBtn'),
          triple: rect('tripleBtn'),
          combo: rect('comboBtn'),
          navTop: nav.height ? nav.top : innerHeight,
        };
      });
      assert.equal(measure.overflow, false);
      if (width <= 600 || height <= 500)
        for (const id of ['single', 'triple', 'combo'])
          assert.ok(
            measure[id].bottom <= measure.navTop,
            `${id} below fold/navigation at ${width}x${height}: ${JSON.stringify(measure)}`
          );
      measurements.push(measure);
      if (width === 320) {
        const longest = await page.evaluate(() => {
          const name = document.getElementById('featuredName'),
            price = document.getElementById('featuredPrice'),
            old = [name.textContent, price.textContent];
          let bottom = 0;
          for (const dish of gachaEngine.getAllDishesList()) {
            name.textContent = dish.name;
            price.textContent = dish.price;
            bottom = Math.max(
              bottom,
              document.getElementById('comboBtn').getBoundingClientRect().bottom
            );
          }
          name.textContent = old[0];
          price.textContent = old[1];
          return bottom;
        });
        assert.ok(
          longest <= measure.navTop,
          'all current dish names/prices fit the compact layout'
        );
      }

      await page.locator('#tripleBtn').click();
      await page.locator('#resultDialog').waitFor({ state: 'visible' });
      assert.equal(await page.locator('.result-card').count(), 3);
      assert.equal(await page.locator('#resultGrid .dish-more:not([open])').count(), 3);
      const modal = await page.evaluate(() => {
        const d = document.getElementById('resultDialog').getBoundingClientRect(),
          f = document.querySelector('.result-actions').getBoundingClientRect(),
          scroll = document.getElementById('resultScroll');
        return {
          fits: d.bottom <= innerHeight + 1 && d.top >= 0,
          footerVisible: f.bottom <= d.bottom && f.top >= d.top,
          scrollFits: scroll.scrollWidth <= scroll.clientWidth + 1,
        };
      });
      assert.deepEqual(
        modal,
        { fits: true, footerVisible: true, scrollFits: true },
        `modal ${width}x${height}`
      );
      const background = await page.evaluate(() => scrollY);
      await page.mouse.move(2, 2);
      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(50);
      assert.equal(
        await page.evaluate(() => scrollY),
        background,
        'background must stay locked while result is open'
      );
      await page.locator('#resultGrid .dish-more summary').first().click();
      assert.equal(
        await page
          .locator('#resultGrid .dish-more')
          .first()
          .evaluate((e) => e.open),
        true
      );
      assert.ok((await page.locator('#resultGrid .dish-more p').first().textContent()).length > 20);
      await page.locator('#resultScroll').evaluate((e) => (e.scrollTop = e.scrollHeight));
      assert.equal(await page.locator('#placesLinks a').count(), 3);
      assert.equal(await page.locator('#rerollBtn').isVisible(), true);
      await page.locator('#rerollBtn').click();
      await page.locator('#resultDialog').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#resultScroll').evaluate((e) => e.scrollTop), 0);
      if (width === 390) await page.screenshot({ path: 'artifacts/mobile-compact-results.png' });
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'tripleBtn');
      assert.equal(
        await page.evaluate(() => document.documentElement.classList.contains('dialog-open')),
        false
      );
      await page.locator('#budgetPanel summary').click();
      await page.locator('#budgetInput').fill('0');
      await page.waitForFunction(
        () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
      );
      assert.equal(await page.locator('#singleBtn').isDisabled(), true);
      await page.locator('#budgetInput').fill('abc');
      await page.waitForFunction(
        () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'true'
      );
      assert.equal(await page.locator('#budgetPreviewNote').isVisible(), true);
      await page.locator('#clearBudgetBtn').click();
      await page.waitForFunction(() => !document.getElementById('singleBtn').disabled);
      await page.locator('#uniqueInput').uncheck();
      assert.equal(await page.locator('#uniqueInput').isChecked(), false);
      await page.locator('#uniqueInput').check();
      await page.locator('#budgetPanel summary').click();
      await page.locator('#findFeaturedBtn').click();
      assert.equal(await page.locator('.dish-more').evaluate((e) => e.open), true);
      assert.equal(await page.locator('#rerollBtn').isVisible(), false);
      await page.keyboard.press('Escape');
      await page.locator('#collectionNav').evaluate((e) => e.click());
      await page.locator('#homeNav').evaluate((e) => e.click());
      assert.equal(await page.locator('#collectionToggle').getAttribute('aria-pressed'), 'false');
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 360) await page.screenshot({ path: 'artifacts/mobile-compact-home.png' });
      if (width === 844) await page.screenshot({ path: 'artifacts/mobile-compact-landscape.png' });
    }
    await page.setViewportSize({ width: 390, height: 420 });
    await page.locator('#budgetPanel summary').click();
    await page.locator('#budgetInput').fill('50.000');
    await page.waitForFunction(
      () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'false'
    );
    assert.equal(
      await page.locator('#budgetInput').evaluate((e) => getComputedStyle(e).fontSize),
      '16px'
    );
    assert.equal(
      await page.evaluate(
        () =>
          document.getElementById('budgetInput').getBoundingClientRect().bottom <
          document.querySelector('.mobile-nav').getBoundingClientRect().top
      ),
      true,
      'focused money input must remain above bottom navigation in short viewport'
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true
    );
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      'artifacts/mobile-compact-checks.json',
      JSON.stringify(
        {
          date: '2026-10-24',
          environment: 'Edge headless with touch/mobile emulation, not physical iOS/Android',
          measurements,
          errors,
        },
        null,
        2
      )
    );
    console.log(
      'PASS: compact first-fold actions, 8 responsive sizes incl. short landscape, fixed modal actions, scroll/details/Maps, reroll reset/focus, advanced options, budget recovery, 16px input and short viewport; no JS errors.'
    );
  } finally {
    await browser?.close();
    child.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
