const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { auditPage } = require('./helpers/responsive-audit.cjs');
const root = path.resolve(__dirname, '../public');
const out = path.join(__dirname, '../artifacts/responsive-qa');
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
const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.json': 'application/json',
};
const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(root, requestPath === '/' ? 'index.html' : requestPath);
  if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
async function runBrowser(name, type, baseUrl) {
  const browser = await type.launch({ headless: true });
  const errors = [],
    checks = [];
  try {
    const context = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/*', (route) =>
      route.request().url().startsWith(baseUrl) ? route.continue() : route.abort()
    );
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => window.engine && !document.getElementById('singleBtn').disabled);
      const data = await page.evaluate(() => {
        const rect = (element) => {
          const r = element.getBoundingClientRect();
          return {
            left: Math.round(r.left),
            right: Math.round(r.right),
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            width: Math.round(r.width),
            height: Math.round(r.height),
          };
        };
        const grid = document.querySelector('.menu-grid'),
          cards = [...document.querySelectorAll('.dish-card')];
        return {
          width: innerWidth,
          height: innerHeight,
          clientWidth: document.documentElement.clientWidth,
          documentWidth: document.documentElement.scrollWidth,
          columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
          toolbar: [...document.querySelectorAll('.tools > button')].map(rect),
          toolLabelCount: document.querySelectorAll('.tool-label').length,
          brand: rect(document.querySelector('.brand')),
          card: cards.length ? rect(cards[0]) : null,
          aspect: cards.length ? getComputedStyle(cards[0].querySelector('img')).aspectRatio : null,
        };
      });
      assert.ok(
        data.documentWidth <= data.clientWidth,
        `${name} document overflow ${width}x${height}: ${data.documentWidth}/${data.clientWidth}`
      );
      assert.equal(data.toolLabelCount, 8, `${name} tool labels at ${width}x${height}`);
      assert.equal(
        data.columns,
        width < 360 ? 1 : width < 600 ? 2 : width < 900 ? 3 : 4,
        `${name} grid tracks at ${width}x${height}`
      );
      assert.equal(data.aspect, '4 / 3');
      for (const [index, tool] of data.toolbar.entries())
        assert.ok(
          tool.left >= 0 && tool.right <= data.clientWidth,
          `${name} toolbar item ${index} outside width at ${width}x${height}`
        );
      await page.screenshot({
        path: path.join(out, `${name}-viewport-${width}x${height}.png`),
        fullPage: true,
      });
      if (width === 390 && height === 844) {
        const fold = await page.evaluate(() => ({
          buttonBottom: document.getElementById('singleBtn').getBoundingClientRect().bottom,
          navTop: document.querySelector('.mobile-nav').getBoundingClientRect().top,
        }));
        assert.ok(
          fold.buttonBottom <= fold.navTop,
          `${name} primary action covered by navigation in initial viewport`
        );
      }
      checks.push({ kind: 'viewport', ...data });
      const diagnostic = await auditPage(page, {
        requested: { width, height },
        pairs: [
          { id: 'description-photo', a: '#featuredDesc', b: '#featuredImage' },
          { id: 'closed-budget-menu', a: '#budgetPanel .disclosure-body', b: '#menu' },
          { id: 'closed-budget-ad', a: '#budgetPanel .disclosure-body', b: '.ad-shelf-section' },
          { id: 'page-bottom-nav', a: 'main', b: '.mobile-nav' },
        ],
        allowances: [{ kind: 'fixed-navigation', overlay: '.mobile-nav', underlay: 'main' }],
        controls: ['#singleBtn', '#addDishBtn', '#loadMoreBtn'],
        meta: {
          engine: name,
          scenario: 'initial-responsive-page',
          steps: [
            'fresh context',
            'load page',
            'inspect closed disclosures',
            'scroll and trial critical controls',
          ],
        },
        screenshot: path.join(out, `${name}-audit-${width}x${height}.png`),
      });
      assert.equal(diagnostic.measurement, 'valid');
      assert.equal(diagnostic.stability.stable, true);
      assert.equal(diagnostic.elements['#featuredDesc'].painted, false);
      assert.equal(diagnostic.elements['#budgetPanel .disclosure-body'].painted, false);
      for (const control of diagnostic.interactions)
        assert.equal(
          control.status,
          'actionable',
          `${name} ${control.selector}: ${control.status}`
        );
      checks.push({ kind: 'responsive-diagnostics', ...diagnostic });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      for (const [id, expected] of [
        ['singleBtn', 1],
        ['tripleBtn', 3],
        ['comboBtn', 3],
      ]) {
        await page.locator(`#${id}`).click();
        if (await page.locator('#spinDialog').isVisible()) await page.locator('#skipBtn').click();
        await page.locator('#resultDialog').waitFor({ state: 'visible' });
        const draw = await page.evaluate(() => {
          const d = document.querySelector('#resultDialog'),
            r = d.getBoundingClientRect(),
            footer = d.querySelector('.result-actions').getBoundingClientRect(),
            content = d.querySelector('#resultScroll').getBoundingClientRect();
          return {
            cards: d.querySelectorAll('#resultGrid .result-card').length,
            width: Math.round(r.width),
            height: Math.round(r.height),
            overflow: d.scrollWidth > d.clientWidth,
            footerInside: footer.bottom <= r.bottom + 1,
            contentWidth: content.width <= d.clientWidth,
          };
        });
        assert.equal(draw.cards, expected, `${name} ${id} result count at ${width}x${height}`);
        assert.equal(
          draw.overflow,
          false,
          `${name} ${id} horizontal overflow at ${width}x${height}`
        );
        assert.equal(draw.footerInside, true, `${name} ${id} footer bounds at ${width}x${height}`);
        assert.equal(draw.contentWidth, true, `${name} ${id} content bounds at ${width}x${height}`);
        if (width === 390)
          await page.screenshot({
            path: path.join(out, `${name}-dialog-${id}.png`),
            fullPage: false,
          });
        checks.push({ kind: 'draw', viewport: `${width}x${height}`, mode: id, ...draw });
        await page.keyboard.press('Escape');
      }
      for (const [button, dialogId] of [
        ['themeBtn', 'themeDialog'],
        ['langBtn', 'languageDialog'],
        ['tzBtn', 'timezoneDialog'],
        ['shareBtn', 'shareDialog'],
      ]) {
        await page.evaluate((id) => document.getElementById(id).showModal(), dialogId);
        const bounds = await page.locator(`#${dialogId}`).evaluate((d) => {
          const r = d.getBoundingClientRect();
          return {
            width: Math.round(r.width),
            height: Math.round(r.height),
            inside:
              r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1,
          };
        });
        assert.equal(
          bounds.inside,
          true,
          `${name} ${dialogId} outside viewport ${width}x${height}`
        );
        if (width === 390)
          await page.screenshot({
            path: path.join(out, `${name}-${dialogId}.png`),
            fullPage: false,
          });
        checks.push({
          kind: 'dialog',
          viewport: `${width}x${height}`,
          button,
          id: dialogId,
          ...bounds,
        });
        await page.keyboard.press('Escape');
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('body *')].filter(
        (el) =>
          !el.closest('svg') &&
          !['IMG', 'SOURCE'].includes(el.tagName) &&
          [...el.childNodes].some(
            (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
          )
      );
      for (const el of nodes) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (Number.isFinite(size) && size > 0)
          el.style.setProperty('font-size', `${size * 2}px`, 'important');
      }
    });
    const zoom = await page.evaluate(() => {
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
        };
      };
      return {
        clientWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        toolbar: [...document.querySelectorAll('.tools > button')].map(rect),
        chooseButtons: [...document.querySelectorAll('.choose .actions button')].map(rect),
        single: rect(document.querySelector('#singleBtn')),
        overflows: [...document.querySelectorAll('body *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > innerWidth + 1 && !el.closest('svg');
          })
          .slice(0, 12)
          .map((el) => ({
            tag: el.tagName,
            id: el.id,
            className: String(el.className).slice(0, 90),
            ...rect(el),
          })),
      };
    });
    assert.ok(
      zoom.documentWidth <= zoom.clientWidth,
      `${name} 200% text document overflow ${zoom.documentWidth}/${zoom.clientWidth}`
    );
    assert.ok(
      zoom.toolbar.every((r) => r.left >= 0 && r.right <= zoom.clientWidth),
      `${name} 200% text toolbar bounds`
    );
    assert.ok(
      zoom.chooseButtons.every((r) => r.left >= 0 && r.right <= zoom.clientWidth),
      `${name} 200% text primary action bounds`
    );
    await page.screenshot({ path: path.join(out, `${name}-text-200.png`), fullPage: false });
    checks.push({ kind: 'text-200', ...zoom });
    assert.deepEqual(errors, [], `${name} page errors`);
    fs.writeFileSync(
      path.join(out, `${name}-report.json`),
      JSON.stringify({ checks, errors }, null, 2)
    );
    return {
      engine: name,
      viewportChecks: checks.filter((x) => x.kind === 'viewport').length,
      diagnosticChecks: checks.filter((x) => x.kind === 'responsive-diagnostics').length,
      drawChecks: checks.filter((x) => x.kind === 'draw').length,
      dialogChecks: checks.filter((x) => x.kind === 'dialog').length,
      text200: checks.filter((x) => x.kind === 'text-200').length,
      errors,
    };
  } finally {
    await browser.close();
  }
}
(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}/`;
  try {
    const results = [];
    results.push(await runBrowser('chromium', chromium, baseUrl));
    results.push(await runBrowser('webkit', webkit, baseUrl));
    fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
