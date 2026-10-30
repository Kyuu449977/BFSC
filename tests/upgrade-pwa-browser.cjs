const { openTools, clickTool } = require('./helpers/mobile-tools.cjs');
const fs = require('node:fs'),
  path = require('node:path'),
  http = require('node:http');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const root = path.resolve(__dirname, '..'),
  out = path.join(root, 'artifacts/upgrade-acceptance');
fs.mkdirSync(out, { recursive: true });
const workerSource = fs.readFileSync(path.join(root, 'public/sw.js'), 'utf8');
const cacheVersion = workerSource.match(/\$\{CACHE_PREFIX\}(v[^`]+)`/)[1];
const baseCache = 'hom-nay-an-gi-' + cacheVersion;
let workerSuffix = '',
  missingOptional = true,
  missingEssential = false;
const server = http.createServer((req, res) => {
  let n = new URL(req.url, 'http://x').pathname;
  if (n === '/api/custom-dishes') {
    res.setHeader('Content-Type', 'application/json');
    return res.end('[]');
  }
  if (missingEssential && n === '/money.js') {
    res.writeHead(404);
    return res.end();
  }
  if (missingOptional && n === '/images/buoi_sang/pho_bo.webp') {
    res.writeHead(404);
    return res.end();
  }
  if (n === '/sw.js') {
    res.setHeader('Content-Type', 'text/javascript');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(
      workerSource.replace(
        '${CACHE_PREFIX}' + cacheVersion,
        '${CACHE_PREFIX}' + cacheVersion + workerSuffix
      )
    );
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
    checks = [],
    errors = [];
  const engineName = process.env.BFSC_TEST_ENGINE || 'chromium';
  const browser = await (engineName === 'webkit' ? webkit : chromium).launch({ headless: true });
  try {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    await ctx.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(origin);
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    const status = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const listener = (e) => {
            if (e.data?.type === 'OFFLINE_STATUS') {
              navigator.serviceWorker.removeEventListener('message', listener);
              resolve(e.data);
            }
          };
          navigator.serviceWorker.addEventListener('message', listener);
          navigator.serviceWorker.controller.postMessage({ type: 'OFFLINE_STATUS' });
        })
    );
    if (!status.ready || status.missing < 1)
      throw Error('Partial-cache status incorrect: ' + JSON.stringify(status));
    checks.push('optional photo failure preserves app-shell readiness and reports missing assets');
    await page.evaluate(async () => {
      await (await caches.open('unrelated-application')).put('/fixture', new Response('keep'));
      await fetch('/api/custom-dishes');
    });
    const apiCached = await page.evaluate(async () => {
      for (const key of await caches.keys()) {
        if (
          key.startsWith('hom-nay-an-gi-') &&
          (await (await caches.open(key)).match('/api/custom-dishes'))
        )
          return true;
      }
      return false;
    });
    if (apiCached) throw Error('API cached');
    checks.push('API responses excluded from cache');
    await page.locator('#customWheelBtn').click();
    await page.locator('#customWheelInput').fill('Unfinished choice A\nUnfinished choice B');
    await page.evaluate(() => {
      window.workerEvents = [];
      const track = (w) => {
        if (w) {
          window.workerEvents.push(w.state);
          w.addEventListener('statechange', () => window.workerEvents.push(w.state));
        }
      };
      navigator.serviceWorker.getRegistration().then((r) => {
        r.addEventListener('updatefound', () => track(r.installing));
      });
    });
    workerSuffix = '-acceptance';
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      await registration.update();
    });
    await page.locator('#updateAppBtn').waitFor({ timeout: 30000 });
    await page.evaluate(async () => {
      window.testRegistration = await navigator.serviceWorker.getRegistration();
    });
    await page.waitForFunction(() => !!window.testRegistration.waiting);
    await page.locator('#updateAppBtn').evaluate((button) => button.click());
    if (!(await page.locator('#customWheelDialog').evaluate((d) => d.open)))
      throw Error('Dirty dialog closed by update');
    const debugState = await page.evaluate(async () => ({
      events: window.workerEvents,
      keys: await caches.keys(),
      toast: document.getElementById('toast').textContent,
    }));
    if (
      !(await page.evaluate(
        async () => !!(await navigator.serviceWorker.getRegistration()).waiting
      ))
    )
      throw Error(JSON.stringify(debugState));
    checks.push('update waits while custom form is open');
    await page.keyboard.press('Escape');
    await Promise.all([page.waitForEvent('load'), page.locator('#updateAppBtn').click()]);
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    const keys = await page.evaluate(() => caches.keys());
    if (
      !keys.includes('unrelated-application') ||
      keys.includes(baseCache) ||
      !keys.includes(baseCache + workerSuffix)
    )
      throw Error('Cache cleanup incorrect ' + keys);
    checks.push('explicit safe update reloads and preserves unrelated cache');
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForFunction(
      () => window.engine && !document.getElementById('singleBtn').disabled
    );
    await page.locator('#comboBtn').click();
    await page.locator('#resultDialog').waitFor();
    if ((await page.locator('.result-card').count()) !== 3) throw Error('Offline combo incomplete');
    checks.push('updated app chooses complete combo offline after partial photo install');
    await page.keyboard.press('Escape');
    await clickTool(page, 'langBtn');
    await page.locator('[data-lang-choice="ja"]').click();
    await page.locator('#langDoneBtn').click();
    const offlineNames = await page.evaluate(() =>
      Catalog.getAllDishes().map((dish) => getDishName(dish, 'ja'))
    );
    if (offlineNames.length !== 382 || offlineNames.some((name) => /[ĐđĂăƠơƯưẠ-ỹ]/u.test(name)))
      throw Error('Offline localized catalog is incomplete');
    checks.push('all 382 translated dish names remain available after switching language offline');
    await ctx.close();
    missingEssential = true;
    const failedContext = await browser.newContext();
    await failedContext.route('**/*', (r) =>
      new URL(r.request().url()).origin === origin ? r.continue() : r.abort()
    );
    const failedPage = await failedContext.newPage();
    await failedPage.goto(origin + '/terms.html');
    const failedState = await failedPage.evaluate(async () => {
      const registration = await navigator.serviceWorker.register('./sw.js');
      const worker = registration.installing;
      if (!worker) return { active: !!registration.active, state: registration.waiting?.state };
      const state = await new Promise((resolve) => {
        if (worker.state === 'redundant') return resolve(worker.state);
        worker.addEventListener('statechange', () => {
          if (worker.state === 'redundant' || worker.state === 'activated') resolve(worker.state);
        });
      });
      return { state, active: !!registration.active };
    });
    if (failedState.active || failedState.state !== 'redundant')
      throw Error('Essential failure incorrectly activated ' + JSON.stringify(failedState));
    checks.push('missing essential script prevents false offline activation');
    await failedContext.close();
    if (errors.length) throw Error(errors.join(';'));
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(
      path.join(out, engineName + '-pwa.json'),
      JSON.stringify({ checks, errors }, null, 2)
    );
  }
  console.log({ engineName, checks, errors });
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
