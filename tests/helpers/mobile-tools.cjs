// Exercise the same disclosure a phone user must open; never force-click hidden tools.
async function openTools(page) {
  const toggle = page.locator('#mobileMenuBtn');
  if ((await toggle.isVisible()) && (await toggle.getAttribute('aria-expanded')) !== 'true')
    await toggle.click();
}
async function clickTool(page, id) {
  await openTools(page);
  await page.locator('#' + id).click();
}
module.exports = { openTools, clickTool };
