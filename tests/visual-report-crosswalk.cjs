/* Diagnose every exported group without treating truncated HTML as complete evidence. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const { inspectPage, probeControl, waitForLayout } = require('./helpers/responsive-audit.cjs');
const fixture = require('./fixtures/visual-diff-2026-10-29.json');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'artifacts/responsive-p3');
const engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
assert.ok(['chromium', 'webkit'].includes(engineName));
fs.mkdirSync(out, { recursive: true });
const report = {
  engine: engineName,
  sourceHash: fixture.sha256,
  groups: fixture.groups,
  observations: [],
  errors: [],
};
const save = () =>
  fs.writeFileSync(path.join(out, `${engineName}-crosswalk.json`), JSON.stringify(report, null, 2));
const server = http.createServer((req, res) => {
  const name = new URL(req.url, 'http://test').pathname;
  if (name === '/api/custom-dishes') {
    res.setHeader('Content-Type', 'application/json');
    return res.end('[]');
  }
  const file = path.resolve(root, 'public', '.' + (name === '/' ? '/index.html' : name));
  if (
    !file.startsWith(path.join(root, 'public') + path.sep) ||
    !fs.existsSync(file) ||
    !fs.statSync(file).isFile()
  ) {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader(
    'Content-Type',
    {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
      '.webp': 'image/webp',
      '.json': 'application/json',
    }[path.extname(file)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await { chromium, webkit }[engineName].launch();
  try {
    for (const width of [500, 752, 1008]) {
      const context = await browser.newContext({
        viewport: { width, height: 844 },
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      });
      try {
        await context.route('**/*', (route) => {
          const url = new URL(route.request().url());
          if (url.origin === origin) return route.continue();
          if (/^https:\/\/bauval\.org\/22\/[a-f0-9]{32}$/.test(url.href))
            return route.fulfill({
              contentType: 'text/javascript',
              body: "document.write('<div style=\"width:'+atOptions.width+'px;height:'+atOptions.height+'px;background:#eee\">Ad fixture</div>')",
            });
          return route.abort();
        });
        await context.addInitScript(() => {
          localStorage.setItem('food_case_setting_appearance', '"light"');
          localStorage.setItem('food_case_setting_timezone', '"Asia/Ho_Chi_Minh"');
          localStorage.setItem('food_case_setting_language', '"vi"');
          const NativeDate = Date,
            fixed = NativeDate.parse('2026-10-29T05:30:00Z');
          window.Date = class extends NativeDate {
            constructor(...args) {
              super(...(args.length ? args : [fixed]));
            }
            static now() {
              return fixed;
            }
          };
        });
        const page = await context.newPage();
        page.setDefaultTimeout(6000);
        page.on('pageerror', (e) => report.errors.push(e.message));
        await page.goto(origin, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(
          () =>
            window.engine &&
            !document.getElementById('singleBtn').disabled &&
            document.fonts.status === 'loaded'
        );
        for (const [description, budget] of [
          [false, false],
          [true, false],
          [false, true],
          [true, true],
        ]) {
          for (const [selector, open] of [
            ['.featured-description', description],
            ['#budgetPanel', budget],
          ]) {
            if ((await page.locator(selector).evaluate((el) => el.open)) !== open)
              await page.locator(selector + ' > summary').click();
          }
          for (const group of fixture.groups.filter((g) => g.actualWidth === width)) {
            const pairs = group.partners.map((b) => ({ a: group.a, b }));
            const before = await page.evaluate(inspectPage, {
              requested: page.viewportSize(),
              selectors: [group.a],
            });
            if (before.elements[group.a].found && before.elements[group.a].painted)
              await page.locator(group.a).scrollIntoViewIfNeeded();
            const stability = await waitForLayout(page, [group.a]);
            assert.equal(stability.stable, true, `${group.id}: layout not settled`);
            const audit = await page.evaluate(inspectPage, {
              requested: page.viewportSize(),
              pairs,
            });
            assert.equal(audit.measurement, 'valid');
            assert.equal(audit.horizontalOverflow, false);
            const navigation = await page.evaluate(
              (pairs) =>
                pairs.map((pair) => {
                  const a = document.querySelector(pair.a),
                    b = document.querySelector(pair.b);
                  const navA = a?.closest('nav'),
                    navB = b?.closest('nav');
                  return !!(
                    (navA && getComputedStyle(navA).position === 'fixed') ||
                    (navB && getComputedStyle(navB).position === 'fixed')
                  );
                }),
              pairs
            );
            const row = {
              id: group.id,
              width,
              description,
              budget,
              omittedPartners: group.omittedPartners,
              stability,
              abbreviated: group.partnerSelectorSource === 'abbreviated',
              audit,
              navigation,
            };
            if (audit.candidates.some((c) => c.classification === 'visible-overlap')) {
              row.screenshot = `${engineName}-crosswalk-${group.id}-d${+description}b${+budget}.png`;
              await page.screenshot({ path: path.join(out, row.screenshot) });
            }
            report.observations.push(row);
          }
          const controls = [];
          for (const selector of [
            '#singleBtn',
            '#addDishBtn',
            '#loadMoreBtn',
            ...(width < 600 ? ['#homeNav', '#menuNav', '#collectionNav'] : []),
            ...(budget ? ['#clearBudgetBtn', '#resetTasteBtn', '#cravingInputControl'] : []),
          ]) {
            const probe = await probeControl(page, selector);
            assert.equal(probe.status, 'actionable', `${width} ${selector}: ${probe.status}`);
            controls.push(probe);
          }
          if (width >= 600) assert.equal(await page.locator('.mobile-nav').isVisible(), false);
          report.observations.at(-1).controls = controls;
          save();
        }
        console.log(`${engineName}: crosswalk ${width}px complete`);
      } finally {
        await context.close();
      }
    }
    assert.equal(report.observations.length, 216);
    assert.deepEqual(report.errors, []);
    report.complete = true;
  } finally {
    save();
    await browser.close();
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  }
})().catch((e) => {
  report.failure = e.stack;
  save();
  console.error(e);
  server.closeAllConnections();
  server.close();
  process.exitCode = 1;
});
