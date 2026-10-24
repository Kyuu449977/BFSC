const { chromium } = require('playwright'),
  fs = require('fs'),
  assert = require('assert/strict'),
  { execFileSync } = require('child_process');
(async () => {
  const evidence = {
    date: '2026-10-24',
    timezone: 'Asia/Saigon',
    localOrigin: 'http://127.0.0.1:8080',
    staticOrigin: 'http://127.0.0.1:8106',
  };
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext({
        reducedMotion: 'reduce',
        serviceWorkers: 'block',
        timezoneId: 'Asia/Ho_Chi_Minh',
      }),
      p = await context.newPage(),
      errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    for (const origin of [evidence.localOrigin, evidence.staticOrigin]) {
      await p.goto(origin);
      await p.locator('#comboBtn').click();
      await p.locator('#resultDialog').waitFor({ state: 'visible' });
      assert.equal(await p.locator('.result-card').count(), 3);
      await p.keyboard.press('Escape');
      assert.equal((await fetch(origin + '/SERVER.PY')).status, 404);
      assert.equal((await fetch(origin + '/missing.js')).status, 404);
      assert.equal((await fetch(origin + '/artifacts/audit-fixes-evidence.json')).status, 404);
    }
    assert.deepEqual(errors, []);
    evidence.smoke =
      'Python preview and public-only static serving both select complete combos, missing assets/source/artifacts return 404';
  } finally {
    await browser.close();
  }
  const stats = () =>
    JSON.parse(
      execFileSync(
        'powershell.exe',
        [
          '-NoProfile',
          '-NonInteractive',
          '-Command',
          '$previewOwner = (Get-NetTCPConnection -State Listen -LocalPort 8080 | Select-Object -First 1).OwningProcess; Get-Process -Id $previewOwner | Select-Object Id,CPU,WorkingSet64,PeakWorkingSet64 | ConvertTo-Json -Compress',
        ],
        { encoding: 'utf8', windowsHide: true }
      )
    );
  evidence.processBefore = stats();
  evidence.bursts = [];
  for (const concurrency of [20, 100]) {
    let next = 0;
    const elapsed = [],
      errors = [],
      started = performance.now();
    await Promise.all(
      Array.from({ length: concurrency }, async () => {
        while (next < 100) {
          const request = next++,
            t = performance.now();
          try {
            const r = await fetch(evidence.localOrigin + '/api/server-info');
            await r.text();
            if (r.status !== 200) errors.push({ request, status: r.status });
          } catch (error) {
            errors.push({ request, error: String(error), cause: String(error.cause) });
          }
          elapsed.push(performance.now() - t);
        }
      })
    );
    elapsed.sort((a, b) => a - b);
    evidence.bursts.push({
      requests: 100,
      concurrency,
      totalMs: performance.now() - started,
      p50ms: elapsed[49],
      p95ms: elapsed[94],
      p99ms: elapsed[98],
      errors,
    });
    assert.deepEqual(errors, []);
  }
  evidence.processAfter = stats();
  evidence.cpuSecondsDelta = evidence.processAfter.CPU - evidence.processBefore.CPU;
  const recovery = await fetch(evidence.localOrigin + '/');
  await recovery.text();
  evidence.recovered = recovery.ok;
  assert.ok(evidence.recovered);
  evidence.limitations =
    'Loopback Windows development machine; sampled working set and lifetime peak, not high-frequency memory/CPU utilization or production throughput/DDoS testing.';
  fs.writeFileSync('artifacts/public-smoke-evidence.json', JSON.stringify(evidence, null, 2));
  console.log(
    'PASS: localhost:8080 fixed preview, public-only static combo/source/asset checks; 100 requests at concurrency 20 and 100 both completed, recovery and process resource snapshots recorded.'
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
