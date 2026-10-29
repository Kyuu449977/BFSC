const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const { isIP } = require('node:net');
const root = path.resolve(__dirname, '../..');

function validate(config) {
  assert.equal(config.targets?.length, 5, 'Need exactly five targets');
  const countries = new Set();
  for (const target of config.targets) {
    assert.match(target.country, /^[A-Z]{2}$/);
    assert(!countries.has(target.country), 'Country must be unique');
    countries.add(target.country);
    const server = new URL(target.proxy?.server);
    assert(['http:', 'https:'].includes(server.protocol), 'Use HTTP(S) proxy');
    assert(!server.username && !server.password, 'Credentials must be separate');
    assert(server.port, 'Proxy port required');
    assert(target.proxy.username && target.proxy.password, 'Credentials required');
  }
}

async function verify(context) {
  // This page and BFSC share the same proxied context. Never fall back to direct.
  const page = await context.newPage();
  try {
    const response = await page.goto('https://api.country.is/', { waitUntil: 'domcontentloaded' });
    assert(response?.ok(), 'Location lookup unavailable');
    const data = JSON.parse(await page.locator('body').innerText());
    assert(isIP(data.ip), 'Location lookup did not return an IP');
    assert.match(data.country, /^[A-Z]{2}$/);
    return { ip: data.ip, country: data.country };
  } finally { await page.close(); }
}

async function smoke(context, output, result) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', () => errors.push('uncaught_page_error'));
  // Record and close unsolicited tabs; no interaction with ads or challenges.
  page.on('popup', popup => { result.popupCount++; popup.close().catch(() => {}); });
  const response = await page.goto('https://bfsc.netlify.app/', { waitUntil: 'domcontentloaded' });
  assert(response?.ok(), 'BFSC document failed');
  await page.locator('#menuGrid button').first().waitFor({ state: 'visible' });
  result.regionObserved = await page.locator('#tzPill').innerText();
  result.featuredObserved = await page.locator('#featuredName').innerText();
  result.initialCardCount = await page.locator('#menuGrid button').count();
  await page.screenshot({ path: path.join(output, `${result.country}-home.jpg`), fullPage: true, type: 'jpeg' });
  const more = page.locator('#loadMoreBtn');
  if (await more.isVisible()) {
    await more.click();
    await page.waitForFunction(n => document.querySelectorAll('#menuGrid button').length > n, result.initialCardCount);
    result.loadMore = 'passed';
  } else result.loadMore = 'not_available';
  await page.locator('#menuGrid button').first().click();
  const dialog = page.getByRole('dialog').filter({ visible: true });
  await dialog.first().waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await dialog.first().waitFor({ state: 'hidden' });
  result.detailAndEscape = 'passed';
  result.pageErrorCount = errors.length;
  await page.screenshot({ path: path.join(output, `${result.country}-end.jpg`), fullPage: true, type: 'jpeg' });
  const after = await verify(context);
  assert.equal(after.ip, result.ip, 'Proxy IP changed during test');
  assert.equal(after.country, result.country, 'Proxy country changed during test');
  assert.equal(errors.length, 0, 'Uncaught page errors observed');
}

async function main() {
  const configPath = process.env.BFSC_PROXY_CONFIG || path.join(root, '.private/country-proxies.json');
  let config;
  try { config = JSON.parse(await fs.readFile(configPath, 'utf8')); validate(config); }
  catch { console.error('Invalid or missing local proxy configuration; credentials were not printed.'); process.exitCode = 1; return; }
  if (process.argv.includes('--validate')) {
    console.log(`Configuration valid: ${config.targets.map(t => t.country).join(', ')}. Network not tested.`);
    return;
  }
  const { chromium } = require('playwright');
  const output = path.join(root, 'artifacts/country-qa', new Date().toISOString().replace(/[:.]/g, '-'));
  await fs.mkdir(output, { recursive: true });
  const results = [];
  const sessions = [];
  try {
    // Independent processes and fresh contexts; no personal browser profile or extensions.
    for (const target of config.targets) {
      const result = { country: target.country, status: 'blocked', stage: 'launch', popupCount: 0 };
      results.push(result);
      let browser;
      try {
        browser = await chromium.launch({ headless: !process.argv.includes('--headed'), proxy: target.proxy });
        const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
        context.setDefaultTimeout(15000);
        context.setDefaultNavigationTimeout(30000);
        result.stage = 'verify_ip_country';
        const observed = await verify(context);
        result.ip = observed.ip;
        result.observedCountry = observed.country;
        assert.equal(observed.country, target.country, 'Country mismatch');
        sessions.push({ browser, context, result });
      } catch {
        result.failure = 'Proxy/browser unavailable or country verification failed';
        if (browser) await browser.close().catch(() => {});
      }
    }
    for (const session of sessions) {
      const { context, result } = session;
      if (results.filter(r => r.ip === result.ip).length !== 1) {
        result.failure = 'Duplicate public IP; BFSC test skipped';
        continue;
      }
      try {
        result.stage = 'bfsc_smoke';
        await smoke(context, output, result);
        result.status = 'passed';
        result.stage = 'complete';
      } catch {
        result.status = 'failed';
        result.failure = 'Smoke assertion, page load or post-test IP verification failed';
        const page = context.pages()[0];
        if (page) await page.screenshot({ path: path.join(output, `${result.country}-failure.jpg`), type: 'jpeg' }).catch(() => {});
      }
    }
  } finally {
    await Promise.allSettled(sessions.map(s => s.browser.close()));
    await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ results, note: 'Observed UI region is recorded, not asserted: the app regional contract must be specified separately.' }, null, 2));
    console.table(results.map(({country, ip, observedCountry, status, stage}) => ({country, ip, observedCountry, status, stage})));
    console.log(`Report: ${output}`);
    if (results.some(r => r.status !== 'passed')) process.exitCode = 1;
  }
}
if (require.main === module) main().catch(() => { console.error('Runner failed; no proxy credentials printed.'); process.exitCode = 1; });
module.exports = { validate };
