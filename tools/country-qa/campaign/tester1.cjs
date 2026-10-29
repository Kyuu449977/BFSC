const fs = require('node:fs/promises');
const path = require('node:path');
const {open} = require('./common.cjs');

(async()=>{
  const t = await open(0);
  try {
    const {page, result} = t;
    const response = await page.goto('https://bfsc.netlify.app/', {waitUntil:'domcontentloaded'});
    await page.getByRole('searchbox', {name:'Tìm món trong thực đơn'}).waitFor({state:'visible'});
    await page.locator('#menuGrid .dish-card').first().waitFor({state:'visible'});
    await page.waitForTimeout(700);
    const menuStart = await t.shot('01-menu-start');

    await t.step('Production menu loads and shows the dish list', async()=>{
      const count = await page.locator('#menuGrid .dish-card').count();
      const summary = await page.locator('#menu').innerText();
      t.assert.ok(response?.ok(), `Expected HTTP 200, got ${response?.status()}`);
      t.assert.ok(count > 0, 'Expected visible dish cards after menu load');
      t.assert.match(summary, /Đang xem\s+\d+\s*\/\s*\d+ món/);
      return {expected:'Menu page responds and renders dish cards with a result count', actual:{httpStatus:response.status(), visibleCards:count, summary:summary.match(/Đang xem[^\n]*/)?.[0]}, screenshot:menuStart};
    });

    const search = page.getByRole('searchbox', {name:'Tìm món trong thực đơn'});
    await t.step('Accent-insensitive search finds Bún bò Huế from “bun bo hue”', async()=>{
      await search.fill('bun bo hue');
      await page.waitForTimeout(250);
      const cards = page.locator('#menuGrid .dish-card');
      const count = await cards.count();
      const names = await page.locator('#menuGrid .dish-name').allTextContents();
      t.assert.equal(count, 1);
      t.assert.ok(names.some(name=>name.trim()==='Bún bò Huế'), `Expected Bún bò Huế, actual ${names.join(', ')}`);
      return {expected:'Unaccented query matches the accented dish name', actual:{query:'bun bo hue', count, names}, screenshot:await t.shot('02-search-unaccented')};
    });

    await t.step('Accented search finds the same dish', async()=>{
      await search.fill('Bún bò Huế');
      await page.waitForTimeout(200);
      const cards = page.locator('#menuGrid .dish-card');
      const count = await cards.count();
      const names = await page.locator('#menuGrid .dish-name').allTextContents();
      t.assert.equal(count, 1);
      t.assert.ok(names.some(name=>name.trim()==='Bún bò Huế'));
      return {expected:'Accented query returns the matching dish', actual:{query:'Bún bò Huế', count, names}, screenshot:await t.shot('03-search-accented')};
    });

    await t.step('No-results query shows zero dish cards', async()=>{
      await search.fill('zzqv-none-xyz-987');
      await page.waitForTimeout(200);
      const count = await page.locator('#menuGrid .dish-card').count();
      const menuText = await page.locator('#menu').innerText();
      t.assert.equal(count, 0);
      return {expected:'An unmatched query returns zero dish cards and a visible empty state', actual:{query:'zzqv-none-xyz-987', count, visibleMenuText:menuText.slice(-350)}, screenshot:await t.shot('04-search-no-results')};
    });

    await t.step('Clear-search control restores the unfiltered menu', async()=>{
      const clear = page.getByRole('button', {name:'Xóa tìm kiếm'});
      t.assert.ok(await clear.isVisible(), 'Expected clear-search control to appear for a non-empty query');
      await clear.click();
      await page.waitForTimeout(200);
      const inputValue = await search.inputValue();
      const count = await page.locator('#menuGrid .dish-card').count();
      t.assert.equal(inputValue, '');
      t.assert.equal(count, 12);
      return {expected:'Clear button empties search and restores the initial 12 cards', actual:{inputValue, count}, screenshot:await t.shot('05-search-cleared')};
    });

    const categories = ['Món Ăn Vặt','Đồ Uống & Nước Ngọt','Buổi Trưa'];
    for (let i=0; i<categories.length; i++) {
      const category = categories[i];
      await t.step(`Category filter selects ${category}`, async()=>{
        const filter = page.getByRole('button', {name:category, exact:true});
        await filter.click();
        await page.waitForTimeout(250);
        const pressed = await filter.getAttribute('aria-pressed');
        const sources = (await page.locator('#menuGrid .dish-source').allTextContents()).map(s=>s.trim());
        t.assert.equal(pressed, 'true');
        t.assert.ok(sources.length > 0, `Expected results for category ${category}`);
        t.assert.ok(sources.every(source=>source===category), `Category mismatch: ${sources.join(', ')}`);
        return {expected:`Visible dishes are limited to ${category}`, actual:{pressed, visibleCards:sources.length, sourceLabels:[...new Set(sources)]}, screenshot:await t.shot(`06-category-${i+1}`)};
      });
    }

    await t.step('All-categories filter restores the mixed menu', async()=>{
      const all = page.getByRole('button', {name:'Tất cả', exact:true});
      await all.click();
      await page.waitForTimeout(200);
      const count = await page.locator('#menuGrid .dish-card').count();
      t.assert.equal(await all.getAttribute('aria-pressed'), 'true');
      t.assert.equal(count, 12);
      return {expected:'Selecting All restores the first 12 unfiltered dishes', actual:{count, sources:[...new Set((await page.locator('#menuGrid .dish-source').allTextContents()).map(s=>s.trim()))]}};
    });

    const more = page.getByRole('button', {name:'Xem thêm món', exact:true});
    await page.locator('#menuGrid').scrollIntoViewIfNeeded();
    const wheelDeltas = [480, 740, 520];
    for (let i=0; i<wheelDeltas.length; i++) {
      await t.step(`Load more after wheel scroll ${i+1}`, async()=>{
        await t.scroll(wheelDeltas[i]);
        let box = await more.boundingBox();
        if (box && box.y > 790) await t.scroll(box.y - 720);
        else if (box && box.y < 120) await t.scroll(box.y - 180);
        await more.scrollIntoViewIfNeeded();
        box = await more.boundingBox();
        const scrollY = await page.evaluate(()=>window.scrollY);
        const before = await page.locator('#menuGrid .dish-card').count();
        t.assert.ok(box && box.y >= 0 && box.y < 900, 'Expected load-more button visible after wheel scrolling');
        await more.click();
        await page.waitForFunction(previous=>document.querySelectorAll('#menuGrid .dish-card').length > previous, before, {timeout:5000});
        const after = await page.locator('#menuGrid .dish-card').count();
        t.assert.ok(after > before, `Expected more than ${before} cards, got ${after}`);
        return {expected:'Load more appends additional dish cards', actual:{wheelDelta:wheelDeltas[i], scrollYBeforeClick:scrollY, buttonY:box.y, cardsBefore:before, cardsAfter:after}, screenshot: i===2 ? await t.shot('07-load-more-three-scrolls') : undefined};
      });
    }

    const detailCards = [
      {name:'Bún bò Huế', shot:'08-detail-bun-bo-hue'},
      {name:'Phở tái lăn', shot:'09-detail-pho-tai-lan'}
    ];
    for (const dish of detailCards) {
      await t.step(`Open ${dish.name} details and close with Escape`, async()=>{
        const card = page.locator('#menuGrid .dish-card').filter({hasText:dish.name}).first();
        await card.scrollIntoViewIfNeeded();
        await card.click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor({state:'visible'});
        const detailText = await dialog.innerText();
        t.assert.ok(detailText.includes(dish.name), `Expected details for ${dish.name}`);
        const screenshot = await t.shot(dish.shot);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(650);
        const afterEscape = await page.evaluate(dishName=>{
          const d=[...document.querySelectorAll('[role="dialog"]')].find(el=>(el.innerText||'').includes(dishName));
          if(!d) return {elementPresent:false, visuallyVisible:false};
          const s=getComputedStyle(d), r=d.getBoundingClientRect(), opacity=Number.parseFloat(s.opacity||'1');
          return {elementPresent:true, ariaHidden:d.getAttribute('aria-hidden'), display:s.display, visibility:s.visibility, opacity, width:r.width, height:r.height, visuallyVisible:s.display!=='none'&&s.visibility!=='hidden'&&opacity>0.05&&r.width>0&&r.height>0};
        }, dish.name);
        const roleVisibleAfterEscape = await page.getByRole('dialog').isVisible();
        const afterScreenshot = await t.shot(`10-escape-${dish.shot.replace('08-detail-','').replace('09-detail-','')}`);
        t.assert.equal(afterEscape.visuallyVisible, false, 'Expected Escape to visually close dish details');
        return {expected:`${dish.name} detail opens and Escape closes it`, actual:{roleVisibleAfterEscape, ...afterEscape, detailExcerpt:detailText.slice(0,260), afterScreenshot}, screenshot};
      });
    }
  } finally {
    const {result, out} = t;
    await t.finish();
    const failures = result.steps.filter(s=>s.status==='failed');
    const stepLines = result.steps.map((s,i)=>{
      const observed = s.observed && typeof s.observed==='object' ? s.observed : {};
      const expected = observed.expected || 'UI behavior described by the step name';
      const actual = observed.actual !== undefined ? JSON.stringify(observed.actual) : (s.error || 'no observation recorded');
      const severity = s.status==='passed' ? 'none' : (/locator|Timeout|waiting for/i.test(s.error||'') ? 'suspected · harness/action timeout' : 'needs triage');
      return `${i+1}. **${s.status.toUpperCase()} — ${s.name}**\n   - Expected: ${expected}\n   - Actual: ${actual}\n   - Severity: ${severity}${observed.screenshot ? `\n   - Evidence: \`${observed.screenshot}\`` : (s.screenshot ? `\n   - Evidence: \`${s.screenshot}\`` : '')}`;
    }).join('\n');
    const report = [
      '# BFSC country journey — tester 1',
      '',
      `- Target: https://bfsc.netlify.app/`,
      `- Verified public IP: ${result.before?.ip || 'unavailable'} (${result.before?.country || 'unknown'}); expected ${result.expectedCountry}; mismatch: ${Boolean(result.countryMismatch)}; IP stable pre/post: ${Boolean(result.ipStable)}`,
      `- Coverage: ${result.steps.length} steps; ${result.steps.length-failures.length} passed, ${failures.length} failed.`,
      '',
      '## Confirmed bugs',
      failures.length ? failures.map(s=>`- ${s.name}: ${s.error || 'observed outcome did not meet expected behavior'} (unconfirmed; see limits/evidence).`).join('\n') : '- None observed in this journey.',
      '',
      '## Suspicions / limits',
      '- An automated locator or timing failure is not classified as a confirmed product defect until the rendered state is checked manually.',
      '- No ads or external links were clicked.',
      '',
      '## Steps and evidence',
      stepLines,
      '',
      'Screenshots and structured observations are stored beside this report in `results.json`.'
    ].join('\n');
    await fs.writeFile(path.join(out, 'report.md'), report, 'utf8');
  }
})().catch(error=>{console.error(error.message);process.exitCode=1;});


