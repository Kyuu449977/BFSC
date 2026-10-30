/* P2: real viewport/state matrix on isolated origins and storage, no live ads. */
const assert = require('node:assert/strict');
const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const { auditPage, probeControl } = require('./helpers/responsive-audit.cjs');
const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/responsive-p2');
fs.mkdirSync(out, { recursive: true });
const viewports = [
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
];
const groups = ['base', 'comparison', 'menu', 'ads', 'interaction'];
const selected = process.env.BFSC_P2_GROUP || 'all';
if (selected !== 'all' && !groups.includes(selected)) throw Error('Unknown BFSC_P2_GROUP');
const engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
if (!['chromium', 'webkit'].includes(engineName)) throw Error('Unknown engine');
const report = {
  engine: engineName,
  groups: selected === 'all' ? groups : [selected],
  cases: [],
  failures: [],
  pageErrors: [],
};
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
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.webp': 'image/webp',
      '.woff2': 'font/woff2',
    }[path.extname(file)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(file));
});
let origin, browser;
const artifact = (id) => path.join(out, `${engineName}-${id}.png`);
const save = () =>
  fs.writeFileSync(
    path.join(out, `${engineName}-${selected}.json`),
    JSON.stringify(report, null, 2)
  );
async function setup(
  width,
  height,
  { appearance = 'light', language = 'vi', adMode = 'ready', motion = 'reduce' } = {}
) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: motion,
    serviceWorkers: 'block',
  });
  const adRequests = {},
    gates = [];
  let released = adMode !== 'delayed';
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    const match = url.href.match(/^https:\/\/bauval\.org\/22\/([a-f0-9]{32})$/);
    if (!match) return route.abort();
    adRequests[match[1]] = (adRequests[match[1]] || 0) + 1;
    if (adMode === 'blocked') return route.abort();
    if (!released) await new Promise((resolve) => gates.push(resolve));
    return route.fulfill({
      contentType: 'text/javascript',
      body: `if(atOptions.key!==${JSON.stringify(match[1])})throw Error('Ad options collision');document.write('<div class="fixture-ad" style="width:'+atOptions.width+'px;height:'+atOptions.height+'px;background:#eee">Ad fixture</div>');`,
    });
  });
  await context.addInitScript(
    ({ appearance, language }) => {
      localStorage.setItem('food_case_setting_appearance', JSON.stringify(appearance));
      localStorage.setItem('food_case_setting_timezone', JSON.stringify('Asia/Ho_Chi_Minh'));
      localStorage.setItem('food_case_setting_language', JSON.stringify(language));
      localStorage.setItem('food_case_setting_muted', 'true');
      // Test-only deterministic lunch time; never changes source or the OS clock.
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
      let seed = 0xbf5c;
      Math.random = () => {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        return (seed >>> 0) / 4294967296;
      };
    },
    { appearance, language }
  );
  const page = await context.newPage();
  page.setDefaultTimeout(6000);
  page.on('pageerror', (e) => report.pageErrors.push(e.message));
  await page.goto(origin, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  const releaseAds = () => {
    released = true;
    for (const resolve of gates.splice(0)) resolve();
  };
  return { page, context, adRequests, releaseAds };
}
async function record(id, group, page, fn) {
  const row = { id, group, passed: false };
  try {
    Object.assign(row, await fn());
    row.passed = true;
  } catch (error) {
    row.error = error.message;
    row.stack = error.stack;
    row.diagnostic = error.diagnostic;
    row.screenshot = artifact(id + '-failure');
    await page.screenshot({ path: row.screenshot }).catch(() => {});
    report.failures.push({ id, error: row.error, screenshot: row.screenshot });
  }
  report.cases.push(row);
  save();
}
async function assertFlow(page) {
  const flow = await page.evaluate(() => {
    const box = (s) => {
      const r = document.querySelector(s).getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        width: r.width,
        height: r.height,
      };
    };
    const overlaps = (a, b) =>
      Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
      Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
    const budget = box('#budgetPanel'),
      menu = box('#menu'),
      ad = box('.ad-shelf-section'),
      desc = box('#featuredDesc'),
      photo = box('#featuredImage');
    return {
      client: document.documentElement.clientWidth,
      width: document.documentElement.scrollWidth,
      budget,
      menu,
      ad,
      desc,
      photo,
      descriptionVisible: document.getElementById('featuredDesc').checkVisibility(),
      adVisible: document.querySelector('.ad-shelf-section').checkVisibility(),
      descriptionPhoto:
        document.getElementById('featuredDesc').checkVisibility() && overlaps(desc, photo),
      budgetMenu: overlaps(budget, menu),
      budgetAd:
        document.querySelector('.ad-shelf-section').checkVisibility() && overlaps(budget, ad),
    };
  });
  assert.ok(flow.width <= flow.client + 1, `horizontal overflow ${flow.width}/${flow.client}`);
  assert.equal(flow.descriptionPhoto, false, 'visible description must not intersect photo');
  assert.equal(flow.budgetMenu, false, 'budget must not overlap menu');
  assert.equal(flow.budgetAd, false, 'budget must not overlap advert');
  return flow;
}
async function actionable(page, selectors) {
  const results = [];
  for (const selector of selectors) {
    const result = await probeControl(page, selector);
    results.push(result);
    if (result.status !== 'actionable') {
      const error = new Error(`${selector}: ${result.status}`);
      error.diagnostic = result;
      throw error;
    }
  }
  return results;
}
async function setDetails(page, selector, expanded) {
  if ((await page.locator(selector).evaluate((el) => el.open)) !== expanded)
    await page.locator(selector + ' > summary').click();
}
async function closeDialogs(page) {
  while (await page.locator('dialog[open]').count()) await page.keyboard.press('Escape');
}
async function matrix(group, sizes) {
  for (const [width, height] of sizes)
    for (const appearance of ['light', 'dark']) {
      const env = await setup(width, height, { appearance });
      const p = env.page;
      try {
        for (const [description, budget] of [
          [false, false],
          [true, false],
          [false, true],
          [true, true],
        ]) {
          const id = `${group}-${width}x${height}-${appearance}-d${+description}b${+budget}`;
          await record(id, group, p, async () => {
            await setDetails(p, '.featured-description', description);
            await setDetails(p, '#budgetPanel', budget);
            const flow = await assertFlow(p);
            await p.locator('#budgetPanel').scrollIntoViewIfNeeded();
            const audit = await auditPage(p, {
              requested: { width, height },
              pairs: [
                { a: '#featuredDesc', b: '#featuredImage' },
                { a: '#budgetPanel .disclosure-body', b: '.ad-shelf-section' },
                { a: '#budgetPanel .disclosure-body', b: '#menu' },
              ],
              selectors: ['#budgetPanel'],
              meta: { engine: engineName, group, appearance, description, budget },
              screenshot: artifact(id),
            });
            assert.equal(audit.measurement, 'valid');
            assert.equal(audit.stability.stable, true);
            const controls = await actionable(
              p,
              budget
                ? [
                    '#budgetInput',
                    '#clearBudgetBtn',
                    '#cravingInputControl',
                    '#resetTasteBtn',
                    '#singleBtn',
                    '#addDishBtn',
                    '#loadMoreBtn',
                  ]
                : ['#singleBtn', '#addDishBtn', '#loadMoreBtn']
            );
            return { width, height, appearance, description, budget, flow, audit, controls };
          });
        }
      } finally {
        env.releaseAds();
        await env.context.close();
      }
      console.log(`${engineName} ${group} ${width}x${height} ${appearance}`);
    }
}
async function menuCase(width, height, appearance, language, id) {
  const env = await setup(width, height, { appearance, language }),
    p = env.page;
  try {
    await record(id, 'menu', p, async () => {
      const before = await p.locator('#home').evaluate((el) => el.offsetTop);
      if (width < 900) {
        assert.equal(await p.locator('#toolNav').isVisible(), false);
        await p.locator('#mobileMenuBtn').focus();
        await p.keyboard.press('Enter');
        assert.equal(await p.locator('#mobileMenuBtn').getAttribute('aria-expanded'), 'true');
        await p.keyboard.press('Tab');
        assert.equal(await p.evaluate(() => document.activeElement.id), 'tzBtn');
        const bounds = await p.locator('#toolNav').evaluate((el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        });
        assert.ok(bounds.left >= -1 && bounds.right <= width + 1 && bounds.bottom <= height + 1);
        const rows = await p.locator('#toolNav > button').evaluateAll((nodes) =>
          nodes
            .filter((n) => !n.hidden)
            .map((n) => {
              const r = n.getBoundingClientRect();
              return { x: r.x, y: r.y, h: r.height };
            })
        );
        assert.equal(rows.length, 8);
        assert.ok(
          rows.every(
            (r, i) =>
              r.h >= 44 &&
              (!i || (Math.abs(r.x - rows[0].x) < 1 && r.y >= rows[i - 1].y + rows[i - 1].h))
          )
        );
        assert.equal(await p.locator('#home').evaluate((el) => el.offsetTop), before);
        const controls = await actionable(p, ['#soundBtn']);
        await p.locator('#themeBtn').click();
        await p.locator('#themeDialog[open]').waitFor();
        await p.keyboard.press('Escape');
        assert.equal(await p.evaluate(() => document.activeElement.id), 'themeBtn');
        await p.keyboard.press('Escape');
        assert.equal(await p.evaluate(() => document.activeElement.id), 'mobileMenuBtn');
        await p.keyboard.press('Tab');
        assert.equal(
          await p.evaluate(() =>
            document.getElementById('toolNav').contains(document.activeElement)
          ),
          false
        );
        await openTools(p);
        const outside = await p.locator('#toolNav').evaluate((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.max(1, r.left / 2), y: (r.top + Math.min(r.bottom, innerHeight)) / 2 };
        });
        await p.mouse.click(outside.x, outside.y);
        assert.equal(await p.locator('#toolNav').isVisible(), false);
        await p.setViewportSize({ width: 901, height });
        await p.locator('#toolNav').waitFor({ state: 'visible' });
        await p.setViewportSize({ width, height });
        await p.locator('#toolNav').waitFor({ state: 'hidden' });
        await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await openTools(p);
        await p.screenshot({ path: artifact(id) });
        return { width, height, appearance, language, controls, bounds, screenshot: artifact(id) };
      }
      assert.equal(await p.locator('#toolNav').isVisible(), true);
      assert.equal(await p.locator('#mobileMenuBtn').isVisible(), false);
      await p.setViewportSize({ width: 899, height });
      await p.locator('#toolNav').waitFor({ state: 'hidden' });
      await p.setViewportSize({ width, height });
      await p.locator('#toolNav').waitFor({ state: 'visible' });
      return { width, height, appearance, language };
    });
  } finally {
    env.releaseAds();
    await env.context.close();
  }
}
async function menus() {
  for (const [w, h] of [
    [320, 568],
    [390, 844],
    [667, 375],
    [768, 1024],
    [899, 844],
    [900, 844],
    [901, 844],
  ])
    for (const theme of ['light', 'dark']) await menuCase(w, h, theme, 'vi', `menu-${w}-${theme}`);
  for (const [w, h] of [
    [390, 844],
    [768, 1024],
  ])
    for (const theme of ['light', 'dark'])
      for (const lang of ['vi', 'en', 'ja', 'ko', 'zh'])
        await menuCase(w, h, theme, lang, `menu-language-${w}-${theme}-${lang}`);
}
async function ads() {
  for (const [w, h] of [
    [320, 568],
    [390, 844],
    [768, 1024],
    [1024, 768],
  ])
    for (const adMode of ['ready', 'delayed', 'blocked']) {
      const env = await setup(w, h, { adMode }),
        p = env.page;
      try {
        await record(`ads-${w}-${adMode}`, 'ads', p, async () => {
          await p.locator('#responsiveSponsors').scrollIntoViewIfNeeded();
          const side = p.locator('#responsiveSponsors [data-ad-key]');
          assert.equal(await side.count(), 2);
          for (const slot of await side.all()) {
            const key = await slot.getAttribute('data-ad-key');
            await p.locator(`[data-ad-key="${key}"][data-ad-mounted="true"]`).waitFor({ state: 'attached' });
          }
          if (adMode === 'delayed') {
            await p.locator('#singleBtn').click();
            await p.locator('#resultDialog[open]').waitFor();
            await p.locator('#resultDoneBtn').click();
            env.releaseAds();
          }
          for (const slot of await side.all()) {
            if (adMode === 'blocked')
              await slot.locator('[data-copy="sponsorUnavailable"]').waitFor();
            else await slot.frameLocator('iframe').locator('.fixture-ad').waitFor();
          }
          const flow = await assertFlow(p);
          const dimensions = await side.evaluateAll((nodes) =>
            nodes.map((n) => ({
              width: n.getBoundingClientRect().width,
              height: n.getBoundingClientRect().height,
              expectedWidth: Number(n.dataset.adWidth),
              expectedHeight: Number(n.dataset.adHeight),
            }))
          );
          if (adMode !== 'blocked')
            for (const d of dimensions) {
              assert.equal(d.width, d.expectedWidth);
              assert.equal(d.height, d.expectedHeight);
            }
          if (adMode === 'blocked') {
            await p.locator('#singleBtn').click();
            await p.locator('#resultDialog[open]').waitFor();
            await p.locator('#resultDoneBtn').click();
          }
          for (const count of Object.values(env.adRequests)) assert.equal(count, 1);
          await p.screenshot({ path: artifact(`ads-${w}-${adMode}`) });
          return { w, h, adMode, flow, dimensions, adRequests: env.adRequests };
        });
      } finally {
        env.releaseAds();
        await env.context.close();
      }
    }
}
async function doubleText(page) {
  await page.evaluate(() => {
    const nodes = [...document.querySelectorAll('body *')].filter(
      (el) =>
        !el.closest('svg') &&
        [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
    );
    const sizes = nodes.map((el) => parseFloat(getComputedStyle(el).fontSize));
    nodes.forEach((el, i) => {
      if (Number.isFinite(sizes[i]))
        el.style.setProperty('font-size', sizes[i] * 2 + 'px', 'important');
    });
  });
}
async function interactions() {
  for (const [w, h] of [
    [320, 568],
    [390, 844],
    [667, 375],
    [768, 1024],
    [1440, 900],
  ])
    for (const appearance of ['light', 'dark']) {
      const env = await setup(w, h, { appearance }),
        p = env.page;
      try {
        await record(`interaction-${w}-${appearance}`, 'interaction', p, async () => {
          await setDetails(p, '#budgetPanel', true);
          await p.locator('#budgetInput').fill('-1');
          await p.waitForFunction(
            () => document.getElementById('budgetInput').getAttribute('aria-invalid') === 'true'
          );
          await actionable(p, ['#clearBudgetBtn']);
          await p.locator('#clearBudgetBtn').click();
          await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
          await p.locator('#budgetInput').fill('0');
          await p.waitForFunction(
            () =>
              !document.getElementById('budgetStatus').getAttribute('aria-busy') ||
              document.getElementById('budgetStatus').getAttribute('aria-busy') === 'false'
          );
          assert.equal(await p.locator('#singleBtn').isDisabled(), true);
          await p.locator('#clearBudgetBtn').click();
          await p.waitForFunction(() => !document.getElementById('singleBtn').disabled);
          await p.locator('#dishSearch').fill('no-such-dish-p2');
          assert.equal(await p.locator('#menuGrid .dish-card').count(), 0);
          await actionable(p, ['#resetMenuFilters']);
          await p.locator('#resetMenuFilters').click();
          assert.ok(await p.locator('#menuGrid .dish-card').count());
          await p.locator('#addDishBtn').click();
          await p.locator('#addDishDialog[open]').waitFor();
          await p.locator('#customDishName').focus();
          await p.setViewportSize({ width: w, height: Math.min(h, 360) });
          await actionable(p, ['#customDishName', '#customDishDesc', '#submitCustomDishBtn']);
          await p.keyboard.press('Escape');
          await p.setViewportSize({ width: w, height: h });
          await p.locator('#singleBtn').click();
          await p.locator('#resultDialog[open]').waitFor();
          await actionable(p, ['#resultDoneBtn', '#resultDialog .dialog-heading [data-close]']);
          await p.locator('#resultDoneBtn').click();
          await p.locator('.featured-description > summary').click();
          await p
            .locator('#featuredName')
            .evaluate((el) => (el.textContent = 'LongDishName'.repeat(10)));
          await p
            .locator('#featuredDesc')
            .evaluate(
              (el) =>
                (el.textContent = 'Mô tả hương vị rất dài để kiểm tra khả năng xuống dòng. '
                  .repeat(40)
                  .slice(0, 2000))
            );
          const normal = await assertFlow(p);
          await doubleText(p);
          const enlarged = await assertFlow(p);
          const controls = await actionable(p, [
            '#singleBtn',
            '#clearBudgetBtn',
            '#addDishBtn',
            '#loadMoreBtn',
          ]);
          if (w < 900) {
            await openTools(p);
            await actionable(p, ['#soundBtn']);
            await p.keyboard.press('Escape');
          }
          await p.screenshot({ path: artifact(`interaction-${w}-${appearance}`) });
          return {
            w,
            h,
            appearance,
            normal,
            enlarged,
            controls,
            keyboard: 'viewport-height simulation, not a physical keyboard',
          };
        });
      } finally {
        env.releaseAds();
        await env.context.close();
      }
    }
}
(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await { chromium, webkit }[engineName].launch();
  try {
    for (const group of report.groups) {
      if (group === 'base') await matrix(group, viewports);
      if (group === 'comparison')
        await matrix(group, [
          [500, 844],
          [752, 844],
          [1008, 844],
          [1424, 844],
        ]);
      if (group === 'menu') await menus();
      if (group === 'ads') await ads();
      if (group === 'interaction') await interactions();
    }
    assert.deepEqual(report.pageErrors, []);
    assert.equal(report.failures.length, 0, JSON.stringify(report.failures, null, 2));
  } finally {
    save();
    server.closeAllConnections();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  console.log(`${engineName} ${selected}: ${report.cases.length} cases passed`);
})().catch((error) => {
  console.error(error);
  report.infrastructureError = error.message;
  save();
  server.closeAllConnections();
  server.close();
  process.exitCode = 1;
});
