const fs = require('node:fs/promises');
const path = require('node:path');
const { open } = require('./common.cjs');

const safe = value => String(value).replace(/https?:\/\/[^\s/@]+:[^\s/@]+@/g, 'https://[REDACTED]@');

async function main() {
  let qa;
  try {
    qa = await open(3, { viewport: { width: 390, height: 844 } });
    const { page, result, out, step, shot, scroll, finish, assert } = qa;
    page.on('popup', popup => popup.close().catch(() => {}));

    const response = await page.goto('https://bfsc.netlify.app/', { waitUntil: 'domcontentloaded' });
    await page.locator('#menuGrid .dish-card').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(350);
    result.page = { url: page.url(), title: await page.title(), httpStatus: response?.status(), viewport: { width: 390, height: 844 } };

    await step('Load production home at a 390px mobile viewport', async () => {
      assert.ok(response?.ok(), `Production returned ${response?.status() ?? 'no response'}`);
      assert.match(await page.title(), /Ăn gì đây/i);
      const layout = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        visibleCards: [...document.querySelectorAll('#menuGrid .dish-card')].filter(el => !!(el.offsetWidth || el.offsetHeight)).length,
        search: [...document.querySelectorAll('input')].filter(el => !!(el.offsetWidth || el.offsetHeight)).map(el => ({ type: el.type, placeholder: el.placeholder, ariaLabel: el.getAttribute('aria-label'), role: el.getAttribute('role') })),
        headerActions: [...document.querySelectorAll('header button, header a, [role="banner"] button, [role="banner"] a')].filter(el => !!(el.offsetWidth || el.offsetHeight)).map(el => ({ tag: el.tagName, text: (el.innerText || '').trim().slice(0, 70), ariaLabel: el.getAttribute('aria-label'), title: el.title, href: el.getAttribute('href') })),
      }));
      result.mobileLayout = layout;
      result.mobileStartScreenshot = await shot('mobile-home-top');
      assert.ok(layout.visibleCards > 0, 'No visible menu cards at mobile width');
      return { title: await page.title(), status: response.status(), ...layout, screenshot: result.mobileStartScreenshot };
    });

    await step('Check mobile horizontal overflow and header tap targets', async () => {
      const geometry = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        overflowPx: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        headerActions: [...document.querySelectorAll('header button, header a, [role="banner"] button, [role="banner"] a')]
          .filter(el => !!(el.offsetWidth || el.offsetHeight))
          .map(el => { const r = el.getBoundingClientRect(); return { name: (el.innerText || '').trim() || el.getAttribute('aria-label') || el.title || el.tagName, x: Math.round(r.x), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height), fullyInViewport: r.left >= 0 && r.right <= document.documentElement.clientWidth }; }),
      }));
      result.mobileHeaderGeometry = geometry;
      await shot('mobile-header-overflow');
      const offscreen = geometry.headerActions.filter(item => !item.fullyInViewport);
      assert.equal(geometry.overflowPx, 0, `Document overflows the 390px viewport by ${geometry.overflowPx}px`);
      assert.equal(offscreen.length, 0, `Header tap targets extend beyond viewport: ${JSON.stringify(offscreen)}`);
      return { ...geometry, screenshot: 'mobile-header-overflow.jpg' };
    });

    await step('Scroll the full mobile page and inspect the footer', async () => {
      await page.locator('#menu').scrollIntoViewIfNeeded().catch(() => {});
      let previousY = -1;
      for (let i = 0; i < 8; i++) {
        await scroll(620);
        await page.waitForTimeout(100);
        const y = await page.evaluate(() => window.scrollY);
        if (y === previousY) break;
        previousY = y;
      }
      const metrics = await page.evaluate(() => ({
        scrollY: window.scrollY,
        maxScrollY: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
        footerVisible: !!document.querySelector('footer') && (() => { const r = document.querySelector('footer').getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; })(),
        footerText: (document.querySelector('footer')?.innerText || '').trim().slice(0, 650),
        footerLinks: [...(document.querySelector('footer')?.querySelectorAll('a[href]') || [])].filter(el => !!(el.offsetWidth || el.offsetHeight)).map(el => ({ text: (el.innerText || '').trim().slice(0, 70), href: el.getAttribute('href'), target: el.target || '' })),
      }));
      await shot('mobile-footer');
      assert.ok(metrics.footerVisible || metrics.scrollY >= metrics.maxScrollY - 4, 'Could not reach the end of the mobile page');
      return { ...metrics, screenshot: 'mobile-footer.jpg' };
    });

    await step('Search no-results state and clear it using visible controls', async () => {
      await page.locator('#menu').scrollIntoViewIfNeeded();
      const search = page.getByRole('searchbox', { name: 'Tìm món trong thực đơn' });
      await search.waitFor({ state: 'visible' });
      const initialCount = await page.locator('#menuGrid .dish-card').count();
      await search.fill('zzqv-mobile-no-results-984');
      await page.waitForTimeout(180);
      const noResultsCount = await page.locator('#menuGrid .dish-card').count();
      const noResultsText = (await page.locator('#menu').innerText()).slice(-420);
      await shot('mobile-search-no-results');
      assert.equal(noResultsCount, 0, 'Unexpected cards remain after an unmatched search');
      const clear = page.getByRole('button', { name: 'Xóa tìm kiếm' });
      await clear.waitFor({ state: 'visible' });
      await clear.click();
      await page.waitForTimeout(150);
      const restored = await page.locator('#menuGrid .dish-card').count();
      const clearedValue = await search.inputValue();
      await shot('mobile-search-cleared');
      assert.equal(clearedValue, '', 'Clear-search action left text in the search field');
      assert.equal(restored, initialCount, 'Clearing search did not restore the initial menu count');
      return { initialCount, noResultsCount, noResultsText, clearedValue, restored, screenshots: ['mobile-search-no-results.jpg', 'mobile-search-cleared.jpg'] };
    });

    await step('Check whether the mobile category strip scrolls horizontally', async () => {
      await page.locator('#menu').scrollIntoViewIfNeeded();
      const category = page.getByRole('button', { name: 'Tất cả', exact: true });
      await category.waitFor({ state: 'visible' });
      const candidate = await category.evaluate(el => {
        for (let node = el.parentElement, depth = 0; node && depth < 6; node = node.parentElement, depth++) {
          const r = node.getBoundingClientRect();
          const scrollable = node.scrollWidth > node.clientWidth + 4 && node.clientWidth > 0 && r.width > 0 && r.height > 0;
          if (scrollable) return { id: node.id || '', className: typeof node.className === 'string' ? node.className : '', scrollLeft: node.scrollLeft, scrollWidth: node.scrollWidth, clientWidth: node.clientWidth, rect: { x: r.x, y: r.y, width: r.width, height: r.height } };
        }
        return null;
      });
      if (!candidate) {
        return { horizontalCategoryOverflow: false, note: 'No horizontally overflowing category ancestor was visible at 390px; no swipe was needed.' };
      }
      const before = candidate.scrollLeft;
      const x = Math.max(2, Math.min(388, candidate.rect.x + candidate.rect.width / 2));
      const y = Math.max(2, Math.min(842, candidate.rect.y + candidate.rect.height / 2));
      await page.mouse.move(x, y);
      await page.mouse.wheel(420, 0);
      await page.waitForTimeout(180);
      const afterWheel = await category.evaluate(el => {
        for (let node = el.parentElement, depth = 0; node && depth < 6; node = node.parentElement, depth++) if (node.scrollWidth > node.clientWidth + 4 && node.clientWidth > 0) return node.scrollLeft;
        return 0;
      });
      if (afterWheel === before) {
        await page.mouse.move(x + 90, y);
        await page.mouse.down();
        await page.mouse.move(Math.max(2, x - 90), y, { steps: 6 });
        await page.mouse.up();
        await page.waitForTimeout(150);
      }
      const after = await category.evaluate(el => {
        for (let node = el.parentElement, depth = 0; node && depth < 6; node = node.parentElement, depth++) if (node.scrollWidth > node.clientWidth + 4 && node.clientWidth > 0) return node.scrollLeft;
        return 0;
      });
      await shot('mobile-category-strip');
      assert.ok(after > before, `Visible overflowing category strip did not move horizontally (before=${before}, after=${after})`);
      return { horizontalCategoryOverflow: true, candidate, afterWheel, after, movedBy: after - before, screenshot: 'mobile-category-strip.jpg' };
    });

    await step('Open and close a menu detail from a mobile card', async () => {
      await page.locator('#menu').scrollIntoViewIfNeeded();
      const card = page.locator('#menuGrid .dish-card').first();
      await card.scrollIntoViewIfNeeded();
      const cardText = (await card.innerText()).trim().split('\n').map(s => s.trim()).filter(Boolean).slice(0, 5);
      await card.click();
      const done = page.locator('#resultDoneBtn');
      await done.waitFor({ state: 'visible' });
      const detail = (await page.locator('[role="dialog"]').innerText().catch(() => page.locator('body').innerText())).slice(0, 800);
      const detailScreenshot = await shot('mobile-detail-open');
      const doneBox = await done.boundingBox();
      assert.ok(doneBox && doneBox.width >= 24 && doneBox.height >= 24, 'Detail close action is too small to tap comfortably');
      await done.click();
      await done.waitFor({ state: 'hidden' });
      return { cardText, detailExcerpt: detail, closeTargetSize: { width: doneBox.width, height: doneBox.height }, detailScreenshot, closed: true };
    });

    await step('Open budget panel, apply a visible budget, and reset it', async () => {
      const panel = page.locator('#budgetPanel');
      await panel.scrollIntoViewIfNeeded();
      const summary = panel.locator('summary');
      const wasOpen = await panel.evaluate(el => el.open);
      if (!wasOpen) await summary.click();
      const clear = page.locator('#clearBudgetBtn');
      const preset = page.getByRole('button', { name: '50.000đ', exact: true });
      await preset.waitFor({ state: 'visible' });
      await preset.click();
      await page.waitForTimeout(300);
      const appliedSummary = (await summary.innerText()).trim();
      const screenshot = await shot('mobile-budget-applied');
      const input = page.locator('#budgetInput');
      let clearedValue = 'not cleared';
      let resetSummary = 'not reset';
      try {
        assert.match(appliedSummary, /50[.]000/);
      } finally {
        if (await clear.isVisible().catch(() => false)) {
          await clear.click();
          await page.waitForFunction(() => document.querySelector('#budgetPanel summary')?.innerText.includes('Không giới hạn'), null, { timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(350);
          clearedValue = await input.inputValue();
          resetSummary = (await summary.innerText()).trim();
        }
      }
      result.budgetInteraction = { appliedSummary, clearedValue, resetSummary, screenshot };
      assert.equal(clearedValue, '');
      assert.match(resetSummary, /Không giới hạn/i);
      return { wasOpen, appliedSummary, clearedValue, resetSummary, screenshot };
    });

    await step('Open and close header settings using the visible mobile action', async () => {
      const visible = await page.evaluate(() => [...document.querySelectorAll('header button, header a, [role="banner"] button, [role="banner"] a')]
        .filter(el => !!(el.offsetWidth || el.offsetHeight))
        .map(el => ({ tag: el.tagName, text: (el.innerText || '').trim(), ariaLabel: el.getAttribute('aria-label') || '', title: el.title || '', rect: (() => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })() })));
      const settings = page.getByRole('button', { name: 'Đổi giao diện & cài đặt', exact: true }).first();
      if (await settings.count() === 0 || !(await settings.isVisible().catch(() => false))) {
        result.headerActionInventory = visible;
        throw new Error(`No visible header settings button found; visible header actions: ${JSON.stringify(visible)}`);
      }
      const box = await settings.boundingBox();
      assert.ok(box && box.width >= 24 && box.height >= 24, 'Header settings button is too small to tap comfortably');
      await settings.click();
      await page.waitForTimeout(120);
      const menu = page.locator('[role="dialog"], [role="menu"], #settingsPanel, details[open]').filter({ has: page.locator('body') }).first();
      const openedText = await page.locator('body').innerText();
      const openScreenshot = await shot('mobile-header-settings-open');
      const close = page.getByRole('button', { name: /đóng|close|xong/i }).last();
      if (await close.isVisible().catch(() => false)) await close.click();
      else await settings.click();
      await page.waitForTimeout(100);
      const closedScreenshot = await shot('mobile-header-settings-closed');
      return { headerActions: visible, target: { width: box.width, height: box.height }, visibleOverlayCount: await page.locator('[role="dialog"], [role="menu"]').count(), settingsTextPresent: /cài đặt|settings/i.test(openedText), openScreenshot, closedScreenshot, closedBy: await close.isVisible().catch(() => false) ? 'visible close action' : 'toggle button' };
    });

    await step('Use same-page footer navigation and return to the top', async () => {
      await scroll(1500); await scroll(1500); await scroll(1500);
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      const links = footer.locator('a[href^="#"]');
      const linkCount = await links.count();
      if (linkCount === 0) {
        const inventory = await footer.locator('a[href]').evaluateAll(els => els.filter(el => !!(el.offsetWidth || el.offsetHeight)).map(el => ({ text: (el.innerText || '').trim(), href: el.getAttribute('href'), target: el.target || '' })));
        result.footerLinkInventory = inventory;
        throw new Error(`No visible same-page footer navigation link found; footer links: ${JSON.stringify(inventory)}`);
      }
      const firstLink = links.first();
      const linkText = (await firstLink.innerText()).trim();
      const href = await firstLink.getAttribute('href');
      await firstLink.click();
      await page.waitForFunction(() => location.hash === '#home' && window.scrollY <= 100, null, { timeout: 5000 });
      const afterNavigation = { href, hash: await page.evaluate(() => location.hash), scrollY: await page.evaluate(() => window.scrollY) };
      await shot('mobile-footer-navigation');
      const heading = page.getByRole('heading', { name: 'Món chính hôm nay', exact: true });
      await heading.waitFor({ state: 'visible' });
      const headingBox = await heading.boundingBox();
      const finalY = await page.evaluate(() => window.scrollY);
      await shot('mobile-return-top');
      assert.equal(afterNavigation.hash, '#home', `Footer navigation did not return to #home: ${afterNavigation.hash}`);
      assert.ok(finalY <= 100 && headingBox && headingBox.y >= 0 && headingBox.y < 844, `Home heading is not in the viewport after footer navigation (scrollY=${finalY}, heading=${JSON.stringify(headingBox)})`);
      return { linkText, afterNavigation, finalY, headingBox, screenshot: 'mobile-return-top.jpg' };
    });
  } catch (error) {
    if (qa) qa.result.runnerError = safe(error.message);
    else console.error('Journey setup failed; proxy credentials were not printed.');
  } finally {
    if (qa) {
      await qa.finish();
      const r = qa.result;
      const report = [
        '# Tester 4: mobile navigation journey', '',
        '- Target: production BFSC (`https://bfsc.netlify.app/`)',
        `- Viewport: 390 × 844 CSS pixels`,
        `- Observed public IP/country: ${r.before?.ip ?? 'unavailable'} / ${r.before?.country ?? 'unavailable'} (provider expected ${r.expectedCountry}; ${r.countryMismatch === false ? 'match' : 'mismatch'})`,
        ...(r.countryMismatch ? ['- Country warning: the observed IP geolocation differs from the proxy provider label; only the observed country is reported.'] : []),
        `- Post-run IP/country stable: ${r.ipStable === true ? 'yes' : 'no'}`,
        `- Steps: ${r.steps.length}; passed: ${r.steps.filter(s => s.status === 'passed').length}; failed: ${r.steps.filter(s => s.status === 'failed').length}`,
        `- Page errors: ${r.pageErrors.length}; failed requests: ${r.failedRequests.length}; popup(s) closed without interaction: ${r.popups.length}`,
        '', '## Findings', '',
        `- Mobile layout observation: ${JSON.stringify(r.mobileLayout ?? 'not recorded')}`,
        `- Confirmed mobile layout issue: ${r.mobileHeaderGeometry?.overflowPx > 0 ? `document width ${r.mobileHeaderGeometry.documentWidth}px exceeds the ${r.mobileHeaderGeometry.viewportWidth}px viewport by ${r.mobileHeaderGeometry.overflowPx}px; offscreen header controls: ${r.mobileHeaderGeometry.headerActions.filter(item => !item.fullyInViewport).map(item => `${item.name} (x=${item.x}, right=${item.right})`).join(', ') || 'none'}. See mobile-header-overflow.jpg.` : 'none observed.'}`,
        '- The journey exercised production search empty/clear, a horizontal category strip when present, menu detail close, budget apply/reset, settings open/close, footer same-page navigation, and return-to-top.',
        `- Product issues confirmed: ${r.mobileHeaderGeometry?.overflowPx > 0 ? 'one mobile horizontal overflow/tappable-header issue; other failures require locator/harness triage' : 'none automatically; review each failed step to distinguish product behavior from locator/interaction mismatch'}.`,
        `- Failed requests: ${r.failedRequests.length ? r.failedRequests.map(x => { try { return `${new URL(x.url).hostname} (${x.error})`; } catch { return x.error; } }).join(', ') : 'none'}. Uncaught page errors: ${r.pageErrors.length ? r.pageErrors.join('; ') : 'none observed.'}`,
        '', '## Step record', '',
        ...r.steps.map((s, i) => `### ${i + 1}. ${s.name}\n\n- Status: **${s.status}**\n- Evidence: \`${JSON.stringify(s.observed ?? s.error ?? '').slice(0, 1400)}\``),
        '', '## Screenshots', '',
        ...['mobile-home-top.jpg','mobile-header-overflow.jpg','mobile-footer.jpg','mobile-search-no-results.jpg','mobile-search-cleared.jpg','mobile-category-strip.jpg','mobile-detail-open.jpg','mobile-budget-applied.jpg','mobile-header-settings-open.jpg','mobile-header-settings-closed.jpg','mobile-footer-navigation.jpg','mobile-return-top.jpg'].filter(name => r.steps.some(s => JSON.stringify(s.observed ?? '').includes(name)) || r.mobileStartScreenshot === name || (name === 'mobile-header-overflow.jpg' && !!r.mobileHeaderGeometry) || (name === 'mobile-budget-applied.jpg' && !!r.budgetInteraction)).map(name => `- \`${name}\``),
        '', '## Uncaught page errors', '', r.pageErrors.length ? r.pageErrors.map(e => `- ${e}`).join('\n') : '- None observed.',
        '', 'Screenshots and detailed UI observations are beside this report; see `results.json`.', '',
      ];
      await fs.writeFile(path.join(qa.out, 'report.md'), report.join('\n'), 'utf8').catch(() => {});
    }
  }
}

main().catch(error => { console.error(`Journey failed: ${safe(error.message)}; proxy credentials were not printed.`); process.exitCode = 1; });
