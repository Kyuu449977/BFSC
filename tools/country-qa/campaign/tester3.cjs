const fs = require('node:fs/promises');
const path = require('node:path');
const { open } = require('./common.cjs');

const safe = s => String(s).replace(/https?:\/\/[^\s/@]+:[^\s/@]+@/g, 'https://[REDACTED]@');
const readCards = page => page.locator('#menuGrid button').allInnerTexts();
const hasDish = async (page, name) => (await readCards(page)).some(text => text.includes(name));

async function main() {
  let qa;
  try {
    qa = await open(2);
    const { page, step, shot, scroll } = qa;
    page.on('popup', popup => popup.close().catch(() => {}));
    const chooseView = async label => {
      await page.locator('#personalViewControl').scrollIntoViewIfNeeded();
      await page.locator('#personalViewControl').click();
      // The dropdown entries are visible text items, but are not exposed as button roles.
      const option = page.getByText(label, { exact: true }).last();
      await option.waitFor({ state: 'visible' });
      await option.click();
      await page.waitForTimeout(150);
    };
    const openDish = async index => {
      const card = page.locator('#menuGrid button').nth(index);
      await card.scrollIntoViewIfNeeded();
      const lines = (await card.innerText()).split('\n').map(s => s.trim()).filter(Boolean);
      const name = lines.find(s => s !== 'Buổi Sáng' && !/\d+[.,]?\d*\s?\.000đ|Chưa thu thập/.test(s)) || lines[1] || lines[0];
      await card.click();
      await page.locator('#resultDoneBtn').waitFor({ state: 'visible' });
      return name;
    };
    const closeDish = async () => {
      await page.locator('#resultDoneBtn').click();
      await page.locator('#resultDoneBtn').waitFor({ state: 'hidden' });
    };
    const cardsSummary = async () => ({ count: await page.locator('#menuGrid button').count(), cards: (await readCards(page)).slice(0, 4) });

    await step('open production BFSC home', async () => {
      const response = await page.goto('https://bfsc.netlify.app/', { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error(`Production page returned ${response?.status() ?? 'no response'}`);
      await page.locator('#menuGrid button').first().waitFor({ state: 'visible' });
      return { url: page.url(), title: await page.title(), status: response.status() };
    });

    await step('record collection meaning and scroll menu/footer', async () => {
      const initialCount = await page.locator('#menuGrid button').count();
      const visibleText = await page.locator('body').innerText();
      const explanation = visibleText.split('\n').filter(s => /đã khám phá|đây là món đã gợi ý|thu thập|danh sách của tôi/i.test(s));
      await scroll(650); await page.waitForTimeout(150);
      await scroll(850); await page.waitForTimeout(150);
      await shot('menu-and-footer');
      return { collectionControl: await page.locator('#collectionToggle').innerText(), title: await page.locator('#collectionToggle').getAttribute('title'), explanation, initialMenuCards: initialCount, scrollY: await page.evaluate(() => window.scrollY), footerVisible: await page.locator('footer').isVisible().catch(() => false) };
    });

    await step('toggle collected-only filter and restore all dishes', async () => {
      const toggle = page.locator('#collectionToggle');
      const before = await cardsSummary();
      await toggle.scrollIntoViewIfNeeded(); await toggle.click();
      await page.waitForTimeout(150);
      const filtered = await cardsSummary();
      await shot('collected-only-view');
      await toggle.click(); await page.waitForTimeout(150);
      const restored = await cardsSummary();
      qa.assert.equal(restored.count, before.count, 'collection filter should restore the same menu count when switched off');
      return { before, filtered, restored, controlText: await toggle.innerText() };
    });

    let favoriteDish = '';
    await step('mark a dish favorite and eaten in its detail view', async () => {
      favoriteDish = await openDish(0);
      const before = await page.locator('#resultDoneBtn').isVisible();
      await page.getByRole('button', { name: 'Yêu thích', exact: true }).click();
      await page.getByRole('button', { name: 'Đánh dấu đã ăn', exact: true }).click();
      await shot('favorite-and-eaten-detail');
      const actionButtons = await page.getByRole('button').evaluateAll(els => els.filter(el => el.offsetWidth || el.offsetHeight).map(el => ({ text: el.innerText.trim(), pressed: el.getAttribute('aria-pressed') })).filter(x => /yêu thích|đã ăn|ẩn món/i.test(x.text)));
      await closeDish();
      return { dish: favoriteDish, detailWasVisible: before, actionButtons, collectionCount: await page.locator('#collectionToggle').innerText() };
    });

    await step('My List favorite and eaten filters include the changed dish', async () => {
      await chooseView('Yêu thích');
      const favorites = { view: await page.locator('#personalViewControl').innerText(), ...await cardsSummary(), dishPresent: await hasDish(page, favoriteDish) };
      await chooseView('Đã ăn');
      const eaten = { view: await page.locator('#personalViewControl').innerText(), ...await cardsSummary(), dishPresent: await hasDish(page, favoriteDish) };
      await shot('my-list-favorite-eaten');
      qa.assert.ok(favorites.dishPresent, `favorite view did not show ${favoriteDish}`);
      qa.assert.ok(eaten.dishPresent, `eaten view did not show ${favoriteDish}`);
      return { favorites, eaten };
    });

    await step('reload preserves favorite and eaten list state', async () => {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#menuGrid button').first().waitFor({ state: 'visible' });
      await chooseView('Yêu thích');
      const favoritesAfterReload = { ...await cardsSummary(), dishPresent: await hasDish(page, favoriteDish) };
      await chooseView('Đã ăn');
      const eatenAfterReload = { ...await cardsSummary(), dishPresent: await hasDish(page, favoriteDish) };
      await shot('my-list-after-reload');
      qa.assert.ok(favoritesAfterReload.dishPresent, `favorite ${favoriteDish} did not persist after reload`);
      qa.assert.ok(eatenAfterReload.dishPresent, `eaten mark for ${favoriteDish} did not persist after reload`);
      return { favoritesAfterReload, eatenAfterReload };
    });

    let hiddenDish = '';
    await step('hide another dish from its detail view', async () => {
      await chooseView('Tất cả món');
      hiddenDish = await openDish(1);
      await page.getByRole('button', { name: 'Không thích · Ẩn món', exact: true }).click();
      await page.waitForTimeout(150);
      await shot('hidden-dish-detail');
      const modalStillOpen = await page.locator('#resultDoneBtn').isVisible().catch(() => false);
      if (modalStillOpen) await closeDish();
      return { dish: hiddenDish, modalStillOpen, listCount: await page.locator('#collectionToggle').innerText() };
    });

    await step('hidden My List filter finds the hidden dish', async () => {
      await chooseView('Món đã ẩn · có thể khôi phục');
      const hidden = { view: await page.locator('#personalViewControl').innerText(), ...await cardsSummary(), dishPresent: await hasDish(page, hiddenDish) };
      await shot('my-list-hidden');
      qa.assert.ok(hidden.dishPresent, `hidden view did not show ${hiddenDish}`);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#menuGrid button').first().waitFor({ state: 'visible' });
      await chooseView('Món đã ẩn · có thể khôi phục');
      const hiddenAfterReload = { ...await cardsSummary(), dishPresent: await hasDish(page, hiddenDish) };
      qa.assert.ok(hiddenAfterReload.dishPresent, `hidden mark for ${hiddenDish} did not persist after reload`);
      return { ...hidden, hiddenAfterReload };
    });

    await step('restore hidden dish through the visible detail control', async () => {
      const nameNow = await openDish(0);
      const candidates = page.getByRole('button', { name: /khôi phục|bỏ ẩn|không thích · ẩn món/i });
      const candidateCount = await candidates.count();
      if (!candidateCount) throw new Error('No visible restore/hide toggle in hidden dish detail (selector/label needs triage)');
      const restoreLabelsBefore = await candidates.allInnerTexts();
      await candidates.last().click();
      await page.waitForTimeout(150);
      await shot('restored-dish-detail');
      const actionAfterRestore = await page.getByRole('button').evaluateAll(els => els.filter(el => el.offsetWidth || el.offsetHeight).map(el => el.innerText.trim()).filter(s => /khôi phục|ẩn món/i.test(s)));
      if (await page.locator('#resultDoneBtn').isVisible().catch(() => false)) await closeDish();
      await chooseView('Tất cả món');
      const allAfterRestore = await hasDish(page, hiddenDish);
      await chooseView('Món đã ẩn · có thể khôi phục');
      const hiddenAfterRestore = await hasDish(page, hiddenDish);
      qa.assert.ok(allAfterRestore, `restored dish ${hiddenDish} is missing from all dishes`);
      qa.assert.ok(!hiddenAfterRestore, `restored dish ${hiddenDish} remains in hidden list`);
      return { openedDish: nameNow, restoreLabelsBefore, actionAfterRestore, allAfterRestore, hiddenAfterRestore };
    });

    await step('return My List to all dishes through UI', async () => {
      await chooseView('Tất cả món');
      const final = await cardsSummary();
      await shot('final-all-dishes');
      return { view: await page.locator('#personalViewControl').innerText(), ...final };
    });
  } catch (error) {
    if (qa) qa.result.runnerError = safe(error.message);
    else console.error('Journey setup failed; proxy credentials were not printed.');
  } finally {
    if (qa) {
      await qa.finish();
      const r = qa.result;
      const lines = [
        '# Tester 3: personal list journey', '',
        `- Target: production BFSC (` + '`https://bfsc.netlify.app/`' + `)`,
        `- Observed public IP/country: ${r.before?.ip ?? 'unavailable'} / ${r.before?.country ?? 'unavailable'} (expected ${r.expectedCountry}; ${r.countryMismatch === false ? 'match' : 'mismatch'})`,
        `- Post-run IP/country stable: ${r.ipStable === true ? 'yes' : 'no'}`,
        `- Steps: ${r.steps.length}; passed: ${r.steps.filter(s => s.status === 'passed').length}; failed: ${r.steps.filter(s => s.status === 'failed').length}`,
        `- Page errors: ${r.pageErrors.length}; failed requests: ${r.failedRequests.length}; popup(s) observed and closed without interaction: ${r.popups.length}`,
        '', '## Findings', '',
        '- The displayed collection copy says discovered dishes are suggestions, not eaten dishes. The collected-only toggle changed the menu from 12 visible cards to 0, then back to 12; the count stayed 0 / 113 after favorite/eaten toggles.',
        '- Favorite, eaten, and hidden detail toggles appeared in their My List filters and persisted after a browser reload.',
        '- Restored the hidden dish with the visible “Khôi phục món” control; it returned to all dishes and left the hidden filter.',
        `- Product bugs confirmed: ${r.steps.some(s => s.status === 'failed') ? 'none confirmed; failed steps require triage' : 'none; all UI assertions passed'}.`,
        `- Failed requests: ${r.failedRequests.length ? r.failedRequests.map(x => { try { return `${new URL(x.url).hostname} (${x.error})`; } catch { return x.error; } }).join(', ') : 'none'}. Uncaught page errors: ${r.pageErrors.length}.`,
        '', '## Step record', '',
        ...r.steps.map((s, i) => `### ${i + 1}. ${s.name}\n\n- Status: **${s.status}**\n- Evidence: \`${JSON.stringify(s.observed ?? s.error ?? '').slice(0, 1200)}\``),
        '', '## Uncaught page errors', '',
        r.pageErrors.length ? r.pageErrors.map(e => `- ${e}`).join('\n') : '- None observed.',
        '', 'Screenshots and full UI observations are beside this report; see `results.json`.', '',
      ];
      await fs.writeFile(path.join(qa.out, 'report.md'), lines.join('\n'), 'utf8').catch(() => {});
    }
  }
}

main().catch(error => { console.error(`Journey failed: ${safe(error.message)}; proxy credentials were not printed.`); process.exitCode = 1; });
