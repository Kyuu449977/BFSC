const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium, webkit } = require('../tools/country-qa/node_modules/playwright');
const { auditPage, probeControl } = require('./helpers/responsive-audit.cjs');
const out = path.resolve('artifacts/responsive-audit-p1');
fs.mkdirSync(out, { recursive: true });
const fixture = `<!doctype html><html lang="en"><head><style>
*{box-sizing:border-box}body{margin:0;height:1800px;font:16px Arial}summary{height:20px;line-height:20px}
#fold{position:absolute;left:20px;top:20px;width:166px}#hiddenDesc{width:166px;height:58px;background:tomato}
#photo{position:absolute;left:20px;top:40px;width:166px;height:58px;background:navy}
#first{position:absolute;left:250px;top:100px;width:100px;height:80px;background:navy}
#second{position:absolute;left:260px;top:120px;width:100px;height:80px;background:tomato}
#clip{position:absolute;left:20px;top:220px;width:100px;height:60px;overflow:hidden}
#clipChild{position:absolute;left:80px;top:0;width:100px;height:40px;background:gold}
#outsideClip{position:absolute;left:150px;top:220px;width:40px;height:40px;background:navy}
#blocked{position:absolute;left:250px;top:260px;width:100px;height:44px}
#blocker{position:absolute;left:250px;top:260px;width:100px;height:44px;background:tomato;z-index:2}
#free{position:absolute;left:250px;top:330px;width:100px;height:44px}
#inertArea{position:absolute;left:20px;top:330px}#transparent{position:absolute;top:390px;opacity:0}
#below{position:absolute;top:1400px;left:20px;width:100px;height:44px}
#underlay{position:absolute;top:460px;left:20px;width:200px;height:100px;background:navy}
#drop{position:absolute;top:460px;left:20px;width:200px;height:100px;background:gold;z-index:3}
#trigger{position:absolute;top:420px;left:20px}#fixed{position:fixed;bottom:0;width:100%;height:40px;background:gray}
#fixedContent{position:absolute;left:20px;top:750px;width:150px;height:40px;background:navy}
</style></head><body>
<details id="fold"><summary id="summary"><span id="summaryText">More</span></summary><div id="hiddenDesc">Hidden description</div></details><div id="photo"></div>
<div id="first"></div><div id="second"></div><div id="clip"><div id="clipChild"></div></div><div id="outsideClip"></div>
<button id="blocked">Blocked</button><div id="blocker"></div><button id="free"><span id="freeText">Free</span></button>
<div id="inertArea" inert><button id="inertButton">Inert</button></div><button id="transparent">Transparent</button>
<div style="visibility:hidden;position:absolute;left:380px;top:400px"><button id="visibleOverride" style="visibility:visible">Visible child</button></div>
<button id="below">Below fold</button><button id="trigger" aria-controls="drop" aria-expanded="true">Menu</button>
<div id="scrollport" style="position:absolute;left:380px;top:20px;width:100px;height:50px;overflow:auto"><div style="height:200px"></div><button id="insideScroll" style="width:80px;height:44px">Scroll tool</button></div>
<div id="underlay"></div><nav id="drop">Dropdown</nav><div id="fixedContent"></div><nav id="fixed">Navigation</nav>
<script>window.clicks={free:0,blocked:0};free.onclick=()=>clicks.free++;blocked.onclick=()=>clicks.blocked++;</script>
</body></html>`;
for (const [engine, type] of Object.entries({ chromium, webkit })) {
  test(`${engine}: responsive diagnostics reject hidden geometry and retain real failures`, async (t) => {
    const browser = await type.launch();
    t.after(() => browser.close());
    const page = await browser.newPage({
      viewport: { width: 500, height: 800 },
      reducedMotion: 'reduce',
    });
    await page.setContent(fixture);
    const pairs = [
      { id: 'hidden-description', a: '#hiddenDesc', b: '#photo' },
      { id: 'true-overlap', a: '#first', b: '#second' },
      { id: 'clipped-overlap', a: '#clipChild', b: '#outsideClip' },
      { id: 'parent-child', a: '#free', b: '#freeText' },
      { id: 'dropdown', a: '#drop', b: '#underlay' },
      { id: 'fixed-navigation', a: '#fixed', b: '#fixedContent' },
      { id: 'missing', a: '#missing', b: '#photo' },
    ];
    const options = {
      requested: { width: 500, height: 800 },
      selectors: ['#summary', '#inertButton', '#transparent', '#below', '#clipChild', '#visibleOverride'],
      pairs,
      allowances: [
        { kind: 'dropdown', overlay: '#drop', underlay: '#underlay' },
        { kind: 'fixed-navigation', overlay: '#fixed', underlay: '#fixedContent' },
      ],
      meta: { engine, scenario: 'controlled-regressions' },
    };
    const report = await auditPage(page, {
      ...options,
      screenshot: path.join(out, `${engine}-closed.png`),
    });
    const byId = Object.fromEntries(report.candidates.map((row) => [row.id, row]));
    assert.equal(report.measurement, 'valid');
    assert.equal(report.stability.stable, true);
    assert.equal(report.elements['#hiddenDesc'].painted, false);
    assert.ok(report.elements['#hiddenDesc'].reasons.includes('closed-details-content'));
    assert.equal(byId['hidden-description'].classification, 'rejected');
    if (engine === 'chromium')
      assert.equal(
        byId['hidden-description'].rawIntersectionArea,
        9628,
        'reproduces the exported report false positive'
      );
    assert.equal(report.elements['#summary'].painted, true, 'closed summary is still displayed');
    assert.equal(byId['true-overlap'].classification, 'visible-overlap');
    assert.equal(byId['true-overlap'].visibleIntersectionArea, 5400);
    await page.locator('#second').evaluate((el) => (el.style.left = '349.5px'));
    const thinEdge = await auditPage(page, {
      requested: { width: 500, height: 800 },
      pairs: [pairs[1]],
    });
    assert.equal(
      thinEdge.candidates[0].reason,
      'edge-contact',
      'subpixel edge contact is not a meaningful overlap'
    );
    await page.locator('#second').evaluate((el) => (el.style.left = '260px'));
    assert.equal(byId['clipped-overlap'].reason, 'clipped-away');
    assert.equal(report.elements['#clipChild'].visibleRect.width, 20);
    assert.equal(report.elements['#clipChild'].clipped, true);
    assert.equal(byId['parent-child'].reason, 'ancestor-descendant');
    assert.equal(byId.dropdown.classification, 'intentional-overlap');
    assert.equal(byId['fixed-navigation'].classification, 'intentional-overlap');
    assert.equal(byId.missing.classification, 'insufficient-evidence');
    assert.equal(report.elements['#inertButton'].painted, true);
    assert.equal(report.elements['#inertButton'].interactive, false);
    assert.equal(report.elements['#transparent'].painted, false);
    assert.equal(report.elements['#visibleOverride'].painted, true, 'visibility can be overridden on a child');
    assert.equal(report.elements['#below'].painted, true);
    assert.equal(report.elements['#below'].inViewport, false);
    const free = await probeControl(page, '#free');
    assert.equal(free.status, 'actionable');
    assert.ok(
      free.hits.every((hit) => hit.reachesTarget),
      'text descendants are valid hits'
    );
    await page.locator('#free').click();
    assert.equal(await page.evaluate(() => clicks.free), 1, 'a real click reaches the handler');
    const blocked = await probeControl(page, '#blocked', {
      screenshot: path.join(out, `${engine}-blocked-control.png`),
    });
    assert.equal(blocked.status, 'interaction-blocked');
    assert.ok(blocked.hits.every((hit) => hit.blocker === '#blocker'));
    await assert.rejects(page.locator('#blocked').click({ timeout: 250 }));
    assert.equal(
      await page.evaluate(() => clicks.blocked),
      0,
      'blocked real click cannot reach handler'
    );
    const below = await probeControl(page, '#below');
    assert.equal(below.before.inViewport, false);
    assert.equal(below.status, 'actionable', 'below-fold content can scroll into reach');
    const insideScroll = await probeControl(page, '#insideScroll');
    assert.equal(insideScroll.before.hasVisibleArea, false);
    assert.equal(
      insideScroll.before.interactive,
      true,
      'scroll clipping does not make a control intrinsically disabled'
    );
    assert.equal(
      insideScroll.status,
      'actionable',
      'a fully clipped control can be scrolled into reach'
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    const invalid = await auditPage(page, { ...options, requested: { width: 320, height: 800 } });
    assert.equal(invalid.measurement, 'invalid-measurement');
    assert.equal(invalid.conclusion, 'invalid-measurement-no-breakpoint-conclusion');
    const onePixel = await auditPage(page, { requested: { width: 499, height: 800 } });
    assert.equal(onePixel.measurement, 'invalid-measurement');
    const badSelector = await auditPage(page, {
      requested: { width: 500, height: 800 },
      pairs: [{ a: '???', b: '#photo' }],
    });
    assert.equal(badSelector.candidates[0].classification, 'insufficient-evidence');
    assert.equal(badSelector.elements['???'].reason, 'invalid-selector');
    await page.locator('#fold').evaluate((el) => (el.open = true));
    const expanded = await auditPage(page, {
      requested: { width: 500, height: 800 },
      pairs: [pairs[0]],
      screenshot: path.join(out, `${engine}-expanded.png`),
    });
    assert.equal(expanded.elements['#hiddenDesc'].painted, true);
    assert.equal(
      expanded.candidates[0].classification,
      'visible-overlap',
      'opening the description removes the hidden exemption'
    );
    await page.locator('#trigger').evaluate((el) => el.setAttribute('aria-expanded', 'false'));
    const noBlanketAllowance = await auditPage(page, { ...options, pairs: [pairs[4]] });
    assert.equal(noBlanketAllowance.candidates[0].classification, 'visible-overlap');
    await page.evaluate(() => {
      const modal = document.createElement('dialog');
      modal.id = 'modal';
      modal.textContent = 'Modal';
      document.body.append(modal);
      modal.showModal();
    });
    // Place the fixture under the native modal to make the relation measurable.
    await page.evaluate(() => {
      const r = document.getElementById('modal').getBoundingClientRect();
      Object.assign(document.getElementById('underlay').style, {
        top: r.top + 'px',
        left: r.left + 'px',
        width: r.width + 'px',
        height: r.height + 'px',
      });
    });
    const modalOverlap = await auditPage(page, {
      requested: { width: 500, height: 800 },
      pairs: [{ a: '#modal', b: '#underlay' }],
      allowances: [{ kind: 'dialog', overlay: '#modal', underlay: '#underlay' }],
    });
    assert.equal(modalOverlap.candidates[0].classification, 'intentional-overlap');
    await page.locator('#modal').evaluate((el) => el.close());
    await page
      .locator('#first')
      .evaluate((el) =>
        el.animate({ transform: ['translateX(0px)', 'translateX(100px)'] }, { duration: 1000 })
      );
    const unstable = await auditPage(page, {
      requested: { width: 500, height: 800 },
      selectors: ['#first'],
      stabilityTimeout: 60,
    });
    assert.equal(unstable.stability.stable, false);
    assert.equal(unstable.conclusion, 'unstable-layout-no-layout-conclusion');
    fs.writeFileSync(
      path.join(out, `${engine}-fixtures.json`),
      JSON.stringify(
        {
          closed: report,
          interactions: [free, blocked, below, insideScroll],
          invalid,
          onePixel,
          badSelector,
          expanded,
          noBlanketAllowance,
          modalOverlap,
          unstable,
          thinEdge,
        },
        null,
        2
      )
    );
  });
}
