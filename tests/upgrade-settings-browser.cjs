const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/upgrade-acceptance');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  let n = new URL(req.url, 'http://x').pathname;
  if (n === '/api/custom-dishes') {
    res.setHeader('Content-Type', 'application/json');
    return res.end('[]');
  }
  if (n === '/') n = '/index.html';
  if (n.includes('..')) {
    res.writeHead(404);
    return res.end();
  }
  let p = path.join(root, 'public', n);
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) {
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
      '.png': 'image/png',
      '.woff2': 'font/woff2',
    }[path.extname(p)] || 'application/octet-stream'
  );
  res.end(fs.readFileSync(p));
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`,
    engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
  const report = { engine: engineName, themes: [], legal: [], errors: [] };
  const browser = await (engineName === 'webkit' ? webkit : chromium).launch({ headless: true });
  try {
    const ctx = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
      colorScheme: 'light',
    });
    await ctx.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const page = await ctx.newPage();
    page.on('pageerror', (e) => report.errors.push(e.message));
    await page.goto(origin);
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    for (const appearance of ['light', 'dark'])
      for (const theme of ['system', 'orange', 'green', 'blue', 'rose', 'custom']) {
        const state = await page.evaluate(
          ({ appearance, theme }) => {
            AppearancePreferences.apply({
              appearance,
              theme,
              customColor: '#ffff00',
              timezone: 'auto',
              language: 'vi',
            });
            const css = getComputedStyle(document.documentElement),
              accent = css.getPropertyValue('--orange').trim(),
              ink = css.getPropertyValue('--primary-ink').trim();
            return {
              appearance: document.documentElement.dataset.appearance,
              theme: document.documentElement.dataset.theme,
              contrast: contrastRatio(accent, ink),
              width: document.documentElement.scrollWidth,
              viewport: innerWidth,
            };
          },
          { appearance, theme }
        );
        if (
          state.appearance !== appearance ||
          state.theme !== theme ||
          state.contrast < 4.5 ||
          state.width > state.viewport + 1
        )
          throw Error('Theme issue ' + JSON.stringify(state));
        report.themes.push(state);
      }
    for (const colorScheme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme });
      const appearance = await page.evaluate(() => {
        AppearancePreferences.apply({ appearance: 'system', theme: 'green' });
        return document.documentElement.dataset.appearance;
      });
      if (appearance !== colorScheme) throw Error('System appearance ignores OS');
    }
    for (const name of ['privacy', 'terms', 'credits']) {
      await page.evaluate(() => localStorage.setItem('food_case_setting_language', '"vi"'));
      await page.goto(origin + '/' + name + '.html');
      const title = await page.locator('.legal-page h1').innerText();
      await page.locator('.legal-lang-select').selectOption('en');
      if ((await page.locator('.legal-page h1').innerText()) === title)
        throw Error('English title unchanged ' + name);
      await page.locator('.legal-lang-select').selectOption('vi');
      if ((await page.locator('.legal-page h1').innerText()) !== title)
        throw Error('Vietnamese title not restored ' + name);
      if (
        name === 'privacy' &&
        !(await page.locator('#externalDataNote').innerText()).startsWith('Nếu bạn')
      )
        throw Error('Vietnamese privacy note not restored');
      report.legal.push(name + ' en→vi');
    }
    await ctx.close();
    if (report.errors.length) throw Error(report.errors.join(';'));
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(
      path.join(out, engineName + '-settings.json'),
      JSON.stringify(report, null, 2)
    );
  }
  console.log({
    engine: engineName,
    themes: report.themes.length,
    legal: report.legal,
    errors: report.errors,
  });
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
