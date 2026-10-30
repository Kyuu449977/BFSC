const assert = require('node:assert/strict');
const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const { clickTool, openTools } = require('./helpers/mobile-tools.cjs');
const { auditPage } = require('./helpers/responsive-audit.cjs');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/mobile-performance');
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
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.woff2': 'font/woff2',
    }[path.extname(file)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(file));
});
const sideKeys = ['2fa1aad79e63d9f6bd0be7cac4dac344', '2918a9336085127fa16fef6efad46ac4'];
(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
  const browser = await { chromium, webkit }[engineName].launch();
  const report = { engine: engineName, viewports: [], stress: [], errors: [] };
  report.dropdownDiagnostics = [];
  async function setup(viewport, adFailure = false) {
    const context = await browser.newContext({
      viewport,
      serviceWorkers: 'block',
      reducedMotion: 'no-preference',
    });
    const requests = {};
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      const match = url.href.match(/^https:\/\/bauval\.org\/22\/([a-f0-9]{32})$/);
      if (!match) return route.abort();
      const key = match[1];
      requests[key] = (requests[key] || 0) + 1;
      if (adFailure) return route.abort();
      // A deterministic provider-shaped fixture. No live ad is clicked or requested.
      return route.fulfill({
        contentType: 'text/javascript',
        body: `if(atOptions.key!==${JSON.stringify(key)})throw Error('Ad options collision');document.write('<div class="fixture-ad" style="width:'+atOptions.width+'px;height:'+atOptions.height+'px;background:#eee;display:grid;place-items:center">Advertisement fixture</div>');`,
      });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', (error) => report.errors.push(error.message));
    await page.goto(origin);
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    return { context, page, requests };
  }
  try {
    for (const [width, height] of [
      [320, 568],
      [360, 800],
      [375, 667],
      [390, 844],
      [430, 932],
      [667, 375],
      [844, 390],
      [768, 1024],
      [1024, 768],
      [1440, 900],
      [1920, 1080],
    ]) {
      const { context, page, requests } = await setup({ width, height });
      if (width < 900) {
        assert.equal(
          await page.locator('#toolNav').isVisible(),
          false,
          'mobile tools initially collapsed'
        );
        const beforeMenu = await page.evaluate(() => ({
          home: document.getElementById('home').offsetTop,
          header: document.querySelector('.header').getBoundingClientRect().height,
        }));
        await page.locator('#mobileMenuBtn').click();
        const afterMenu = await page.evaluate(() => ({
          home: document.getElementById('home').offsetTop,
          header: document.querySelector('.header').getBoundingClientRect().height,
        }));
        assert.deepEqual(
          afterMenu,
          beforeMenu,
          'dropdown overlays content without changing document layout'
        );
        assert.equal(await page.locator('#mobileMenuBtn').getAttribute('aria-expanded'), 'true');
        const dropdown = await auditPage(page, {
          requested: { width, height },
          pairs: [{ id: 'open-menu-page', a: '#toolNav', b: '#home' }],
          allowances: [{ kind: 'dropdown', overlay: '#toolNav', underlay: '#home' }],
          controls: ['#soundBtn'],
          meta: {
            engine: engineName,
            scenario: 'open-vertical-dropdown',
            steps: [
              'load page',
              'click hamburger',
              'inspect overlay',
              'scroll and trial final tool',
            ],
          },
          screenshot: path.join(out, `${engineName}-audit-dropdown-${width}x${height}.png`),
        });
        assert.equal(dropdown.measurement, 'valid');
        assert.equal(dropdown.stability.stable, true);
        assert.equal(dropdown.candidates[0].classification, 'intentional-overlap');
        assert.equal(dropdown.interactions[0].status, 'actionable');
        report.dropdownDiagnostics.push(dropdown);
        for (const id of [
          'tzBtn',
          'langBtn',
          'themeBtn',
          'mapsHeaderBtn',
          'installBtn',
          'shareBtn',
          'bgmBtn',
          'soundBtn',
        ])
          assert.equal(await page.locator('#' + id).isVisible(), true, `${id} available`);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#toolNav').isVisible(), false);
        assert.equal(await page.evaluate(() => document.activeElement.id), 'mobileMenuBtn');
        await clickTool(page, 'themeBtn');
        await page.locator('#themeDialog').waitFor({ state: 'visible' });
        await page.keyboard.press('Escape');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'themeBtn');
        await page.locator('#mobileMenuBtn').click();
      } else assert.equal(await page.locator('#toolNav').isVisible(), true);
      await page.locator('#responsiveSponsors .vine-card').first().scrollIntoViewIfNeeded();
      for (const key of sideKeys)
        await page
          .locator(`[data-ad-key="${key}"][data-ad-mounted="true"]`)
          .waitFor({ state: 'attached' });
      const ads = await page.locator('#responsiveSponsors .vine-card').evaluateAll((nodes) =>
        nodes.map((node) => {
          const r = node.getBoundingClientRect(),
            f = node.querySelector('iframe');
          return {
            width: r.width,
            height: r.height,
            left: r.left,
            right: r.right,
            frameWidth: Number(f?.width),
            frameHeight: Number(f?.height),
          };
        })
      );
      assert.equal(ads.length, 2);
      for (const [index, ad] of ads.entries()) {
        assert.equal(ad.width, 160);
        assert.equal(ad.frameWidth, 160);
        assert.equal(ad.height, index ? 300 : 600);
        assert.equal(ad.frameHeight, index ? 300 : 600);
        assert.ok(ad.left >= -1 && ad.right <= width + 1, 'banner fits viewport without scaling');
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      for (const key of sideKeys)
        assert.equal(requests[key], 1, 'each provider script requested once');
      if (width === 390)
        await page.screenshot({ path: path.join(out, `${engineName}-mobile-sponsors.png`) });
      if (await page.locator('#homeNav').isVisible()) await page.locator('#homeNav').click();
      else await page.locator('.brand').click();
      if (width === 390) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: path.join(out, `${engineName}-mobile-menu-closed.png`) });
        await openTools(page);
        await page.screenshot({ path: path.join(out, `${engineName}-mobile-menu-open.png`) });
      }
      report.viewports.push({ width, height, ads, menu: true, noOverflow: true });
      await context.close();
    }
    // Stress the actual UI with motion enabled, alternate natural completion and skip.
    const { context, page, requests } = await setup({ width: 390, height: 844 });
    const cdp = engineName === 'chromium' ? await context.newCDPSession(page) : null;
    async function snapshot(round) {
      if (cdp) await cdp.send('HeapProfiler.collectGarbage');
      const state = await page.evaluate(() => ({
        nodes: document.getElementsByTagName('*').length,
        reel: document.getElementById('reelTrack').children.length,
        animations: document.getAnimations().length,
        results: document.querySelectorAll('.result-card').length,
        counts: Object.values(engine.collection).reduce((a, b) => a + b, 0),
      }));
      if (cdp) {
        const { metrics } = await cdp.send('Performance.getMetrics');
        state.heap = metrics.find((m) => m.name === 'JSHeapUsedSize')?.value;
      }
      report.stress.push({ round, ...state });
      return state;
    }
    if (cdp) await cdp.send('Performance.enable');
    await page.locator('#responsiveSponsors').scrollIntoViewIfNeeded();
    for (const key of sideKeys)
      await page
        .locator(`[data-ad-key="${key}"][data-ad-mounted="true"]`)
        .waitFor({ state: 'attached' });
    const start = Date.now();
    for (let round = 1; round <= 120; round++) {
      await page.locator(['#singleBtn', '#tripleBtn', '#comboBtn'][(round - 1) % 3]).click();
      await page.locator('#spinDialog').waitFor({ state: 'visible' });
      if (round % 40 === 0)
        await page.locator('#resultDialog[open]').waitFor({ state: 'visible' }); // real 2.5s animation
      else await page.locator('#skipBtn').click();
      await page.locator('#resultDialog[open]').waitFor({ state: 'visible' });
      assert.equal(await page.locator('.result-card').count(), round % 3 === 1 ? 1 : 3);
      await page.locator('#resultDoneBtn').click();
      await page.waitForFunction(() => document.getElementById('reelTrack').children.length === 0);
      if ([20, 60, 120].includes(round)) await snapshot(round);
    }
    report.durationMs = Date.now() - start;
    assert.equal(report.stress[2].counts, 280, 'one atomic collection increment per result');
    assert.ok(
      report.stress[2].nodes <= report.stress[0].nodes + 25,
      'DOM does not grow per reroll'
    );
    assert.ok(
      report.stress[2].animations <= report.stress[0].animations + 5,
      'active animations stay bounded'
    );
    if (cdp)
      assert.ok(
        report.stress[2].heap <= report.stress[0].heap + 5 * 1024 * 1024,
        'heap after GC does not grow with old result cards'
      );
    for (const key of sideKeys) assert.equal(requests[key], 1, 'reroll never reloads ads');
    await openTools(page);
    await page.locator('#mobileMenuBtn').click();
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.locator('#toolNav').waitFor({ state: 'visible' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#toolNav').waitFor({ state: 'hidden' });
    for (const key of sideKeys)
      assert.equal(requests[key], 1, 'responsive resize preserves the mounted banner');
    await context.close();
    const blocked = await setup({ width: 390, height: 844 }, true);
    await blocked.page.locator('#responsiveSponsors').scrollIntoViewIfNeeded();
    for (const key of sideKeys)
      await blocked.page
        .locator(`[data-ad-key="${key}"][data-ad-state="unavailable"]`)
        .waitFor({ state: 'attached' });
    await blocked.page.locator('#singleBtn').click();
    await blocked.page.locator('#skipBtn').click();
    await blocked.page.locator('#resultDialog[open]').waitFor({ state: 'visible' });
    assert.ok(
      await blocked.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)
    );
    report.blockedAdsStillUsable = true;
    await blocked.context.close();
    assert.deepEqual(report.errors, []);
  } finally {
    fs.writeFileSync(path.join(out, `${engineName}.json`), JSON.stringify(report, null, 2));
    server.closeAllConnections();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log(
    `${engineName}: ${report.viewports.length} viewports, 120 draws, ad isolation and blocked-ad fallback passed`
  );
})().catch((error) => {
  console.error(error);
  server.closeAllConnections();
  server.close();
  process.exitCode = 1;
});
