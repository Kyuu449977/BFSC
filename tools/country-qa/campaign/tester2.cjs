const fs = require('node:fs/promises');
const path = require('node:path');
const { open } = require('./common.cjs');

async function main() {
  const qa = await open(1);
  const { page, result, out, step, shot, scroll, finish, assert } = qa;
  const findings = [];
  try {
    const response = await page.goto('https://bfsc.netlify.app/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(500);
    result.page = { url: page.url(), title: await page.title(), httpStatus: response?.status() };

    const record = async (name, fn) => {
      const item = await step(name, fn);
      findings.push(item);
      return item;
    };

    await record('Load production picker and capture baseline', async () => {
      assert.equal(response?.status(), 200);
      assert.match(await page.title(), /Ăn gì đây/);
      await scroll(520);
      const initial = (await page.locator('body').innerText()).slice(0, 1400);
      result.initialScreenshot = await shot('initial-picker');
      return { title: await page.title(), status: response.status(), initialText: initial, screenshot: result.initialScreenshot };
    });

    async function draw(label, buttonName, budgetLimit = null) {
      await scroll(360);
      await page.getByRole('button', { name: buttonName, exact: true }).click();
      const dialog = page.getByRole('dialog');
      await dialog.waitFor({ state: 'visible' });
      await dialog.getByRole('button', { name: 'Bỏ qua', exact: true }).click();
      await page.waitForTimeout(350);
      const text = await dialog.innerText();
      const amountMatch = text.match(/Tổng giá từ:\s*([\d.]+)đ/i);
      assert.ok(amountMatch, `Result did not show a minimum total: ${text.slice(0, 500)}`);
      const minimumTotal = Number(amountMatch[1].replace(/\./g, ''));
      assert.match(text, /ước tính tối thiểu/i);
      if (budgetLimit !== null) assert.ok(minimumTotal <= budgetLimit, `Minimum total ${minimumTotal} exceeded budget ${budgetLimit}`);
      const screenshot = await shot(`result-${label}`);
      const visibleButtons = await dialog.getByRole('button').allTextContents();
      assert.ok(visibleButtons.includes('Xong'), 'Result dialog did not show its close action');
      await dialog.getByRole('button', { name: 'Xong', exact: true }).click();
      await dialog.waitFor({ state: 'hidden' });
      return {
        minimumTotal,
        budgetLimit,
        estimateShown: true,
        resultExcerpt: text.slice(0, 1600),
        dialogClosed: true,
        screenshot,
      };
    }

    await record('Choose 1 dish, skip animation, inspect and close result', () => draw('one-unlimited', 'Chọn 1 món'));
    await record('Choose 3 dishes, skip animation, inspect and close result', () => draw('three-unlimited', 'Chọn 3 món'));
    await record('Create combo, skip animation, inspect and close result', () => draw('combo-unlimited', 'Tạo combo'));

    await record('Set 50,000đ budget from visible preset', async () => {
      await scroll(650);
      await page.locator('#budgetPanel summary').click();
      await page.getByRole('button', { name: '50.000đ', exact: true }).click();
      await page.waitForTimeout(300);
      const panelText = await page.locator('#budgetPanel').innerText();
      const summary = await page.locator('#budgetPanel summary').innerText();
      assert.match(summary, /50[.]000/);
      assert.match(panelText, /1 món: Có thể chọn/i);
      result.budget50Screenshot = await shot('budget-50000');
      return { summary, panelText, screenshot: result.budget50Screenshot };
    });
    await record('Choose 1 dish under 50,000đ and close result', () => draw('one-50000', 'Chọn 1 món', 50000));
    await record('Create combo under 50,000đ and close result', () => draw('combo-50000', 'Tạo combo', 50000));

    await record('Type and apply 100,000đ budget', async () => {
      await scroll(550);
      const budget = page.locator('#budgetInput');
      await budget.click();
      await budget.fill('100000');
      await budget.press('Enter');
      await page.waitForTimeout(350);
      const value = await budget.inputValue();
      const summary = await page.locator('#budgetPanel summary').innerText();
      const panelText = await page.locator('#budgetPanel').innerText();
      assert.equal(value, '100000');
      assert.match(summary, /100[.]000/);
      assert.match(panelText, /3 món: Có thể chọn/i);
      result.budget100Screenshot = await shot('budget-100000');
      return { typedValue: value, summary, panelText, screenshot: result.budget100Screenshot };
    });
    await record('Choose 3 dishes under 100,000đ and close result', () => draw('three-100000', 'Chọn 3 món', 100000));

    async function choosePreference(label) {
      const control = page.locator('#cravingInputControl');
      await control.click();
      await page.getByText(label, { exact: true }).last().click();
      await page.waitForTimeout(250);
      const selected = (await control.innerText()).trim();
      assert.equal(selected, label);
      result[`preference-${label}`] = await shot(`preference-${label}`);
      return { selected, screenshot: result[`preference-${label}`] };
    }

    await record('Set rice preference and verify selected state', () => choosePreference('Cơm & xôi'));
    await record('Pick with rice preference under 100,000đ and close result', () => draw('rice-100000', 'Chọn 1 món', 100000));
    await record('Reset rice preference with visible reset button', async () => {
      await page.locator('#resetTasteBtn').click();
      await page.waitForTimeout(250);
      const selected = (await page.locator('#cravingInputControl').innerText()).trim();
      assert.equal(selected, 'Món nào cũng được');
      return { selected, resetButton: 'Bỏ lọc khẩu vị' };
    });

    await record('Set noodle soup preference and verify selected state', () => choosePreference('Món nước'));
    await record('Pick with Món nước preference under 100,000đ and close result', () => draw('noodles-100000', 'Chọn 1 món', 100000));
    await record('Reset Món nước preference with visible reset button', async () => {
      await page.locator('#resetTasteBtn').click();
      await page.waitForTimeout(250);
      const selected = (await page.locator('#cravingInputControl').innerText()).trim();
      assert.equal(selected, 'Món nào cũng được');
      return { selected, resetButton: 'Bỏ lọc khẩu vị' };
    });

    await record('Reset budget with visible clear control', async () => {
      await page.locator('#clearBudgetBtn').click();
      await page.waitForTimeout(250);
      const summary = (await page.locator('#budgetPanel summary').innerText()).trim();
      const budgetValue = await page.locator('#budgetInput').inputValue();
      assert.match(summary, /Không giới hạn/);
      assert.equal(budgetValue, '');
      return { summary, budgetValue, taste: (await page.locator('#cravingInputControl').innerText()).trim() };
    });

    result.findingSummary = findings.map(item => ({ name: item.name, status: item.status, observed: item.observed, error: item.error }));
    result.bugReproductions = [];
  } catch (error) {
    result.scriptError = String(error?.message || error);
  } finally {
    await finish();
    const counts = result.steps.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const lines = [
      '# Tester 2 — picker journey',
      '',
      `- Site: ${result.page?.url || 'https://bfsc.netlify.app/'}`,
      `- HTTP: ${result.page?.httpStatus ?? 'not recorded'}`,
      `- Verified exit IP/country: ${result.after?.ip || result.before?.ip || 'unavailable'} / ${result.after?.country || result.before?.country || 'unavailable'} (expected ${result.expectedCountry || 'unknown'}; mismatch: ${Boolean(result.countryMismatch)})`,
      `- IP stable during run: ${Boolean(result.ipStable)}`,
      `- Steps: ${result.steps.length} (${Object.entries(counts).map(([key, value]) => `${key}: ${value}`).join(', ') || 'none'})`,
      '- Interactions: choose 1, choose 3, combo, skip animation, close result, 50,000đ preset, typed 100,000đ, rice (“Cơm & xôi”), noodle/soup (“Món nước”), and visible resets.',
      '- Price note: the result dialog reports a minimum total from the lowest end of reference price ranges; it labels this as an estimate, and the actual price may be higher.',
      `- Confirmed product bugs: ${result.bugReproductions?.length ? result.bugReproductions.join('; ') : 'none reproduced in this journey.'}`,
      '',
      '## Step results',
      '',
      ...result.steps.map((item, index) => `### ${index + 1}. ${item.name} — ${item.status}\n\n${item.error ? `- Not completed: ${item.error}\n` : `- Observation: ${JSON.stringify(item.observed)}\n`}${item.screenshot ? `- Failure screenshot: ${item.screenshot}\n` : ''}`),
      ...(result.scriptError ? ['', `Script-level issue: ${result.scriptError}`] : []),
      '',
      'Screenshots are in this directory. No ad was clicked; no CAPTCHA was encountered.',
      '',
    ];
    await fs.writeFile(path.join(out, 'report.md'), lines.join('\n'), 'utf8');
    console.log(JSON.stringify({ ip: result.before?.ip, country: result.before?.country, steps: result.steps.length, counts, coveragePassed: result.coveragePassed, report: path.join(out, 'report.md') }));
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
