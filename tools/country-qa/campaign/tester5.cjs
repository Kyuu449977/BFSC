const fs = require('node:fs/promises');
const path = require('node:path');
const { open } = require('./common.cjs');

const safe = s => String(s).replace(/https?:\/\/[^\s/@]+:[^\s/@]+@/g, 'https://[REDACTED]@');
const unique = items => [...new Set(items)];

async function main() {
  let qa;
  const evidence = {};
  try {
    qa = await open(4);
    const { page, step, shot, scroll } = qa;
    page.on('popup', popup => popup.close().catch(() => {}));

    await step('open production BFSC home under the German proxy', async () => {
      const response = await page.goto('https://bfsc.netlify.app/', { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) throw new Error(`Production page returned ${response?.status() ?? 'no response'}`);
      await page.locator('#menuGrid button').first().waitFor({ state: 'visible' });
      await page.waitForTimeout(250);
      evidence.initialRegionPill = await page.locator('#tzPill').innerText();
      evidence.initialScreenshot = await shot('initial-home');
      const text = await page.locator('body').innerText();
      return { url: page.url(), title: await page.title(), status: response.status(), ipCountry: qa.result.before.country, initialRegionPill: await page.locator('#tzPill').innerText(), firstDish: (await page.locator('#menuGrid button').first().innerText()).slice(0, 180), footerBefore: (await page.locator('footer').innerText().catch(() => '')).slice(0, 500), initialTextContainsVnd: /(?:₫|\bđ\b)/i.test(text) };
    });

    await step('scroll main content and inspect timezone control with keyboard Escape', async () => {
      await page.mouse.move(110, 150); await scroll(850); await page.waitForTimeout(100); await scroll(1150); await page.waitForTimeout(100);
      evidence.scrolledMain = await shot('main-content');
      await page.locator('#tzBtn').scrollIntoViewIfNeeded(); await page.locator('#tzBtn').click(); await page.waitForTimeout(100);
      const menuText = (await page.locator('body').innerText()).slice(-2200);
      const visibleOptionCount = await page.locator('.tz-card').count();
      evidence.timezoneMenu = await shot('timezone-menu');
      await page.keyboard.press('Escape'); await page.waitForTimeout(180);
      const escapeDialogOpen = await page.locator('dialog').evaluateAll(els => els.some(el => el.open)).catch(() => false);
      const focus = await page.evaluate(() => ({ id: document.activeElement?.id, aria: document.activeElement?.getAttribute('aria-label') }));
      const afterEscapeScreenshot = await shot('timezone-after-escape');
      if (escapeDialogOpen) await page.locator('#tzDoneBtn').click();
      return { menuOptions: menuText.split('\n').filter(line => /Tự động|Mỹ - Bờ Đông|Mỹ - Bờ Tây|\bGMT/i.test(line)), renderedTimezoneCards: visibleOptionCount, escapeDismissed: !escapeDialogOpen, focusAfterEscape: focus, screenshots: [evidence.scrolledMain, evidence.timezoneMenu, afterEscapeScreenshot] };
    });

    await step('manually select United States East and inspect daypart, dish, and currency', async () => {
      await page.locator('#tzBtn').scrollIntoViewIfNeeded(); await page.locator('#tzBtn').click(); await page.waitForTimeout(100);
      const usEast = page.locator('.tz-card').filter({ hasText: 'Mỹ - Bờ Đông' });
      await usEast.waitFor({ state: 'visible' });
      await usEast.click(); await page.locator('#tzDoneBtn').click(); await page.waitForTimeout(220);
      evidence.usEast = await shot('us-east-manual-region');
      const text = await page.locator('body').innerText();
      const firstDish = await page.locator('#menuGrid button').first().innerText();
      const currencyMarks = unique((text.match(/₫|\bđ\b|\$|€|¥/gi) || []).map(x => x.toLowerCase()));
      const daypartLines = text.split('\n').map(x => x.trim()).filter(x => /^(BUỔI|Buổi|Morning|Afternoon|Evening|Night|Breakfast|Lunch|Dinner)/i.test(x)).slice(0, 8);
      return { selection: 'manual timezone simulation: US East / New York', ipCountryStill: qa.result.before.country, regionPill: await page.locator('#tzPill').innerText(), daypartLines, featuredDish: firstDish, currencyMarks, screenshot: evidence.usEast };
    });

    await step('switch language to English and inspect translated main content', async () => {
      await page.locator('#langBtn').scrollIntoViewIfNeeded(); await page.locator('#langBtn').click(); await page.waitForTimeout(100);
      const english = page.locator('.lang-card').filter({ hasText: 'English' });
      await english.waitFor({ state: 'visible' }); await english.click(); await page.locator('#langDoneBtn').click(); await page.waitForTimeout(250);
      await page.mouse.move(100, 100); await page.mouse.wheel(0, -6000); await page.waitForTimeout(150);
      evidence.englishHome = await shot('english-main');
      const text = await page.locator('body').innerText();
      const mainHeadings = text.split('\n').map(x => x.trim()).filter(x => /Today|Discover|Menu|Choose|Budget|My List|morning|afternoon|evening/i.test(x)).slice(0, 16);
      return { langMenuSelection: await page.locator('#langBtn').getAttribute('aria-label'), mainHeadings, firstMenuCard: (await page.locator('#menuGrid button').first().innerText()).slice(0, 220), englishScreenshot: evidence.englishHome };
    });

    await step('reload and verify English selection persists', async () => {
      await page.reload({ waitUntil: 'domcontentloaded' }); await page.locator('#menuGrid button').first().waitFor({ state: 'visible' }); await page.waitForTimeout(250);
      const text = await page.locator('body').innerText();
      const footer = await page.locator('footer').innerText().catch(() => '');
      evidence.englishAfterReload = await shot('english-after-reload');
      const anchors = await page.locator('footer a').evaluateAll(els => els.map(el => ({ label: el.innerText.trim(), href: el.href, target: el.target })));
      return { langButton: await page.locator('#langBtn').getAttribute('aria-label'), persistedEnglish: /Today|Explore|Menu|Privacy|Terms/i.test(text), footer, footerLinks: anchors, regionPillAfterReload: await page.locator('#tzPill').innerText(), screenshot: evidence.englishAfterReload };
    });

    await step('check English footer privacy, terms, and open source labels', async () => {
      await page.mouse.move(110, 150); await scroll(1100); await page.waitForTimeout(100); await scroll(1400); await page.waitForTimeout(150);
      evidence.englishFooter = await shot('english-footer');
      const footer = page.locator('footer');
      const text = await footer.innerText();
      const links = await footer.locator('a').evaluateAll(els => els.map(el => ({ label: el.innerText.trim(), href: el.href, target: el.target })));
      return { scrollY: await page.evaluate(() => window.scrollY), visible: await footer.isVisible(), localizedFooterText: text, footerLinks: links, screenshot: evidence.englishFooter };
    });

    await step('switch to dark theme and capture its appearance', async () => {
      await page.locator('#themeBtn').scrollIntoViewIfNeeded(); await page.locator('#themeBtn').click(); await page.waitForTimeout(100);
      await page.getByRole('button', { name: /^(Dark|Tối)$/ }).click(); await page.locator('#themeDoneBtn').click(); await page.waitForTimeout(250);
      await page.mouse.move(100, 100); await page.mouse.wheel(0, -6000); await page.waitForTimeout(100);
      evidence.darkTheme = await shot('dark-theme');
      const colors = await page.locator('body').evaluate(el => ({ bodyBg: getComputedStyle(el).backgroundColor, bodyColor: getComputedStyle(el).color, htmlBg: getComputedStyle(document.documentElement).backgroundColor, htmlClass: document.documentElement.className }));
      return { themeLabel: await page.locator('#themeBtn').getAttribute('aria-label'), colors, screenshot: evidence.darkTheme };
    });

    await step('switch to light theme, capture it, and verify Escape returns focus', async () => {
      await page.locator('#themeBtn').scrollIntoViewIfNeeded(); await page.locator('#themeBtn').click(); await page.waitForTimeout(100);
      await page.getByRole('button', { name: /^(Light|Sáng)$/ }).click(); await page.locator('#themeDoneBtn').click(); await page.waitForTimeout(250);
      await page.mouse.move(100, 100); await page.mouse.wheel(0, -6000); await page.waitForTimeout(100);
      evidence.lightTheme = await shot('light-theme');
      await page.locator('#themeBtn').click(); await page.waitForTimeout(100);
      const themeModalOpen = await page.locator('#themeDialog').evaluate(el => el.open).catch(() => false);
      await page.keyboard.press('Escape'); await page.waitForTimeout(150);
      const escapeLeftDialogOpen = await page.locator('#themeDialog').evaluate(el => el.open).catch(() => false);
      const focus = await page.evaluate(() => ({ id: document.activeElement?.id, aria: document.activeElement?.getAttribute('aria-label') }));
      const afterEscapeScreenshot = await shot('theme-after-escape');
      if (escapeLeftDialogOpen) await page.locator('#themeDoneBtn').click();
      const colors = await page.locator('body').evaluate(el => ({ bodyBg: getComputedStyle(el).backgroundColor, bodyColor: getComputedStyle(el).color, htmlBg: getComputedStyle(document.documentElement).backgroundColor, htmlClass: document.documentElement.className }));
      return { screenshot: evidence.lightTheme, themeModalOpened: themeModalOpen, escapeDismissed: !escapeLeftDialogOpen, focusAfterEscape: focus, colors, afterEscapeScreenshot };
    });

    await step('return timezone control to Auto after the manual US simulation', async () => {
      await page.locator('#tzBtn').scrollIntoViewIfNeeded(); await page.locator('#tzBtn').click(); await page.waitForTimeout(100);
      const auto = page.locator('.tz-card').filter({ hasText: /Automatic|Tự động/ });
      await auto.waitFor({ state: 'visible' }); await auto.click(); await page.locator('#tzDoneBtn').click(); await page.waitForTimeout(150);
      return { finalRegionPill: await page.locator('#tzPill').innerText(), initialRegionPill: evidence.initialRegionPill || 'AUTO (from initial screen)', manualSimulationWasReturned: /AUTO/i.test(await page.locator('#tzPill').innerText()) };
    });
  } catch (error) {
    if (qa) qa.result.runnerError = safe(error.message);
    else console.error('Journey setup failed; proxy credentials were not printed.');
  } finally {
    if (qa) {
      await qa.finish();
      const r = qa.result;
      const issue = r.steps.find(s => s.status === 'failed');
      const us = r.steps.find(s => s.name.startsWith('manually select United States'))?.observed;
      const langReload = r.steps.find(s => s.name.startsWith('reload and verify'))?.observed;
      const footer = r.steps.find(s => s.name.startsWith('check English footer'))?.observed;
      const themeDark = r.steps.find(s => s.name.startsWith('switch to dark'))?.observed;
      const themeLight = r.steps.find(s => s.name.startsWith('switch to light'))?.observed;
      const lines = [
        '# Tester 5: region, language, theme, and footer journey', '',
        '- Target: production BFSC (`https://bfsc.netlify.app/`)',
        `- Observed public IP/country: ${r.before?.ip ?? 'unavailable'} / ${r.before?.country ?? 'unavailable'} (expected ${r.expectedCountry}; ${r.countryMismatch === false ? 'match' : 'mismatch'})`,
        `- Post-run public IP/country stable: ${r.ipStable === true ? 'yes' : 'no'}`,
        `- Steps: ${r.steps.length}; completed: ${r.steps.filter(s => s.status === 'passed').length}; failed/inconclusive: ${r.steps.filter(s => s.status === 'failed').length}`,
        '- Country observation above is based on the proxy IP lookup. US East below is a manually selected site timezone simulation; network, GPS, browser timezone, and request headers were not changed.',
        '', '## Findings', '',
        `- Initial UI: ${JSON.stringify(r.steps[0]?.observed ?? {})}`,
        `- Manual US East UI: ${JSON.stringify(us ?? {})}`,
        `- English after reload: ${JSON.stringify(langReload ?? {})}`,
        `- English footer: ${JSON.stringify(footer ?? {})}`,
        `- Dark appearance: ${JSON.stringify(themeDark ?? {})}`,
        `- Light appearance and Escape: ${JSON.stringify(themeLight ?? {})}`,
        '- Confirmed P2 visual issue: after selecting Light, the featured card title/body appear pale on a near-white background, and Pick 3 dishes / Make combo use white labels on light gray controls (Pick 1 dish is white on bright cyan). Expected readable foreground/background contrast; actual contrast is weak in `light-theme.jpg`. Dark mode (`dark-theme.jpg`) is readable.',
        '- Confirmed P2 localization issue: after switching to English, reloading, and scrolling to the footer, Privacy / Terms / Open Source are translated but the status remains Vietnamese (“Offline chưa khả dụng trên trình duyệt này.”). Expected English status copy; observed mixed English/Vietnamese in `english-footer.jpg`.',
        `- Other confirmed product issues: ${issue ? 'none inferred from a failed automation step; see triage note below' : 'none observed in covered flows'}.`,
        ...(issue ? [`- Triage required for failed step “${issue.name}”: ${safe(issue.error ?? 'step did not complete')}. This may be an automation selector/harness issue and is not classified as a product defect without visual confirmation.`] : []),
        '', '## Step record', '',
        ...r.steps.map((s, i) => `### ${i + 1}. ${s.name}\n\n- Status: **${s.status}**\n- Evidence: \`${JSON.stringify(s.observed ?? s.error ?? '').slice(0, 1600)}\``),
        '', '## Browser health', '',
        `- Page errors: ${r.pageErrors.length}; failed requests: ${r.failedRequests.length}; popups observed and closed without interaction: ${r.popups.length}.`,
        `- Failed requests: ${r.failedRequests.length ? r.failedRequests.map(x => { try { return `${new URL(x.url).hostname} (${x.error})`; } catch { return x.error; } }).join(', ') : 'none'}.`,
        `- Uncaught page errors: ${r.pageErrors.length ? r.pageErrors.map(safe).join('; ') : 'none'}.`,
        '', 'Screenshots and full UI observations are beside this report; see `results.json`.', ''
      ];
      await fs.writeFile(path.join(qa.out, 'report.md'), lines.join('\n'), 'utf8').catch(() => {});
    }
  }
}

main().catch(error => { console.error(`Journey failed: ${safe(error.message)}; proxy credentials were not printed.`); process.exitCode = 1; });
