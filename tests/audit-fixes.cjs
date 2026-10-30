const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
const { chromium } = require('playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  os = require('node:os'),
  { spawn } = require('node:child_process');
const root = process.cwd(),
  port = 8105,
  base = 'http://127.0.0.1:' + port;
const bundled = path.join(
  os.homedir(),
  '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
);
const python = process.env.PYTHON_BIN || (fs.existsSync(bundled) ? bundled : 'python');
(async () => {
  const server = spawn(python, ['-B', 'server.py'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let log = '';
  server.stdout.on('data', (d) => (log += d));
  server.stderr.on('data', (d) => (log += d));
  let browser;
  const evidence = {};
  try {
    let ready = false;
    for (let i = 0; i < 80; i++) {
      try {
        const response = await fetch(base + '/');
        await response.text();
        if (response.ok) {
          ready = true;
          break;
        }
      } catch (_) {}
      await new Promise((r) => setTimeout(r, 100));
    }
    assert.ok(ready, 'Python preview did not start: ' + log);
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const c = await browser.newContext({
        reducedMotion: 'reduce',
        serviceWorkers: 'block',
        viewport: { width: 390, height: 844 },
      }),
      errors = [];
    c.on('page', (page) => page.on('pageerror', (e) => errors.push(e.message)));
    const a = await c.newPage();
    await a.addInitScript(() => {
      if (!localStorage.getItem('food_case_collection'))
        localStorage.setItem('food_case_collection', JSON.stringify({ sang_5_1: 7 }));
    });
    await a.goto(base);
    await a.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    const total = (p) =>
      p.evaluate(() => Object.values(gachaEngine.collection).reduce((x, y) => x + y, 0));
    const waitTotal = (p, n) =>
      p.waitForFunction(
        (n) => Object.values(gachaEngine.collection).reduce((x, y) => x + y, 0) === n,
        n
      );
    const roll = async (p, kind = 'single') => {
      await p.locator('#' + kind + 'Btn').click();
      await p.locator('#resultDialog').waitFor({ state: 'visible' });
      await p.keyboard.press('Escape');
    };
    assert.equal(await total(a), 7);
    await roll(a);
    const b = await c.newPage();
    await b.goto(base);
    await b.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await total(b), 8);
    await roll(a);
    await roll(b);
    await Promise.all([waitTotal(a, 10), waitTotal(b, 10)]);
    for (let i = 0; i < 10; i++) await Promise.all([roll(a), roll(b)]);
    await Promise.all([waitTotal(a, 30), waitTotal(b, 30)]);
    await Promise.all(
      [a, b].map((p) =>
        p.evaluate(async () =>
          Promise.all(
            Array.from({ length: 20 }, () =>
              gachaEngine.commitResults(gachaEngine.drawDishes({ mode: 'drinks' }))
            )
          )
        )
      )
    );
    await Promise.all([waitTotal(a, 70), waitTotal(b, 70)]);
    await a.evaluate(() => {
      for (let i = 0; i < 1000; i++) document.getElementById('tripleBtn').click();
    });
    await a.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(await a.locator('.result-card').count(), 3);
    await a.keyboard.press('Escape');
    await Promise.all([waitTotal(a, 73), waitTotal(b, 73)]);
    await a.evaluate(async () => {
      const results = gachaEngine.drawCombo();
      await Promise.all([gachaEngine.commitResults(results), gachaEngine.commitResults(results)]);
      await gachaEngine.commitResults(results);
    });
    await Promise.all([waitTotal(a, 76), waitTotal(b, 76)]);
    await Promise.all([a.reload(), b.reload()]);
    await Promise.all(
      [a, b].map((p) => p.waitForFunction(() => !document.getElementById('singleBtn').disabled))
    );
    await Promise.all([waitTotal(a, 76), waitTotal(b, 76)]);
    console.log('PASS: migration + tab concurrency + spam + reload');
    evidence.collection = { migrated: 7, expected: 76, tabA: await total(a), tabB: await total(b) };
    await a.locator('#budgetPanel summary').click();
    await a.locator('#budgetInput').fill('100000');
    await a.waitForFunction(() =>
      document.getElementById('budgetLabel').textContent.includes('100.000')
    );
    if (!(await b.locator('#budgetPanel').evaluate((e) => e.open)))
      await b.locator('#budgetPanel summary').click();
    await b.locator('#uniqueInput').uncheck();
    await clickTool(b, 'soundBtn');
    await Promise.all([a.reload(), b.reload()]);
    for (const p of [a, b]) {
      await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
      assert.equal(await p.locator('#budgetInput').inputValue(), '100000');
      assert.equal(await p.locator('#uniqueInput').isChecked(), false);
      assert.equal(await p.locator('#soundBtn').getAttribute('aria-pressed'), 'true');
    }
    console.log('PASS: independent settings across tabs');
    evidence.settings = 'budget/unique/sound retained across independent tab updates and reload';
    await a.locator('#budgetPanel summary').click();
    await a.locator('#budgetInput').fill('0');
    await a.waitForFunction(
      () => document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
    );
    assert.ok((await a.locator('#menuEmptyMessage').textContent()).includes('ngân sách'));
    await a.locator('#budgetInput').fill('abc');
    await a.waitForFunction(
      () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'true'
    );
    assert.ok(
      (await a.locator('#budgetPreviewNote').textContent()).includes('ngân sách trước: 0đ')
    );
    assert.equal(await a.locator('#singleBtn').isDisabled(), true);
    await a.locator('#resetMenuBudget').click();
    await a.waitForFunction(() => !document.getElementById('singleBtn').disabled);
    assert.equal(await a.locator('#budgetLabel').textContent(), 'Không giới hạn');
    await a.locator('#collectionNav').click();
    await a.locator('#homeNav').click();
    assert.equal(await a.locator('#collectionToggle').getAttribute('aria-pressed'), 'false');
    assert.equal(await a.locator('#menuTitle').textContent(), 'Khám phá thực đơn');
    assert.equal(await a.locator('.maps-callout').getAttribute('href'), '#home');
    assert.ok((await a.locator('#findFeaturedBtn').textContent()).includes('Xem món'));
    await a.locator('#dishSearch').fill('<img src=x onerror="window.auditXss=1">');
    assert.equal(await a.evaluate(() => window.auditXss), undefined);
    await a.locator('#clearSearch').click();
    const img = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
    await img.route(/\.(webp|jpe?g|png)(\?|$)/, (r) => r.abort());
    const ip = await img.newPage();
    await ip.goto(base);
    await ip.waitForFunction(
      () =>
        document.getElementById('featuredImage').getAttribute('src') ===
          'assets/image-unavailable.svg' &&
        document.getElementById('featuredImage').naturalWidth > 0
    );
    await ip.locator('#singleBtn').click();
    await ip.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.ok(await ip.locator('.result-card h3').textContent());
    await img.close();
    const denied = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
    await denied.addInitScript(() => {
      Object.defineProperty(window, 'indexedDB', {
        get() {
          throw new DOMException('Denied', 'SecurityError');
        },
      });
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('Denied', 'SecurityError');
        },
      });
    });
    const dp = await denied.newPage();
    await dp.goto(base);
    await dp.locator('#singleBtn').click();
    await dp.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.ok((await dp.locator('#toast').textContent()).includes('Không lưu được'));
    assert.equal(await dp.locator('#resultSaveNotice').isVisible(), true);
    await denied.close();
    for (const width of [320, 360, 390, 768, 1440]) {
      await a.setViewportSize({ width, height: 900 });
      assert.equal(
        await a.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        'overflow ' + width
      );
    }
    await a.setViewportSize({ width: 390, height: 844 });
    await a.evaluate(() => scrollTo(0, 0));
    await a.screenshot({ path: 'artifacts/audit-fixes-mobile.png', fullPage: false });
    console.log('PASS: budget / navigation / image fallback / denied storage / CSP');
    evidence.ui =
      'budget reasons/recovery, invalid old-budget notice, home reset, image failure, Maps labels, XSS payload and denied storage passed';
    const sw = await browser.newContext({ reducedMotion: 'reduce' });
    await sw.route('**/images/buoi_sang/pho_bo.webp*', (r) => r.abort());
    const sp = await sw.newPage();
    await sp.goto(base);
    await sp.evaluate(() =>
      Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) => setTimeout(() => reject(Error('SW did not activate')), 15000)),
      ])
    );
    await sp.waitForFunction(() =>
      document.getElementById('offlineReadiness').textContent.includes('sẵn sàng')
    );
    const before = await sp.evaluate(async () => {
      const keys = await caches.keys();
      const cache = await caches.open(keys.find((k) => k.startsWith('hom-nay-an-gi-v')));
      return (await cache.keys()).length;
    });
    await sp.evaluate(async () => {
      for (let i = 0; i < 30; i++) await fetch('/style.css?cache_probe=' + i);
      await fetch('/missing.json').catch(() => {});
      await fetch('/api/server-info');
    });
    const after = await sp.evaluate(async () => {
      const keys = await caches.keys();
      const cache = await caches.open(keys.find((k) => k.startsWith('hom-nay-an-gi-v')));
      return (await cache.keys()).length;
    });
    assert.equal(before, after);
    await sw.setOffline(true);
    await sp.reload();
    await sp.locator('#singleBtn').click();
    await sp.locator('#resultDialog').waitFor({ state: 'visible' });
    assert.equal(
      await sp.evaluate(() =>
        fetch('/images/never-exists.webp')
          .then((r) => r.headers.get('Content-Type'))
          .catch(() => null)
      ),
      null
    );
    evidence.offline = {
      before,
      after,
      partialImageFailure: 'app shell installs and works offline',
    };
    await sw.close();
    const latencies = [],
      failures = [];
    let current = 0;
    await Promise.all(
      Array.from({ length: 20 }, async () => {
        while (current < 100) {
          const i = current++,
            started = performance.now();
          try {
            const r = await fetch(base + '/api/server-info');
            await r.text();
            if (!r.ok) failures.push({ i, status: r.status });
          } catch (e) {
            failures.push({ i, error: String(e), cause: String(e.cause) });
          }
          latencies.push(performance.now() - started);
        }
      })
    );
    latencies.sort((x, y) => x - y);
    const recovery = await fetch(base + '/');
    await recovery.text();
    evidence.burst = {
      requests: 100,
      concurrency: 20,
      failures,
      p50ms: latencies[49],
      p95ms: latencies[94],
      p99ms: latencies[98],
      recovered: recovery.ok,
    };
    assert.equal(failures.length, 0);
    assert.ok(evidence.burst.recovered);
    assert.deepEqual(errors, []);
    evidence.errors = errors;
    fs.writeFileSync('artifacts/audit-fixes-evidence.json', JSON.stringify(evidence, null, 2));
    console.log(
      'PASS: Python real server + CSP, legacy migration, sequential/concurrent tab commits (76/76), 1,000-click spam, settings, UI fixes, storage denial, partial-cache offline, bounded query cache and 100-request controlled burst.'
    );
  } finally {
    await browser?.close();
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
