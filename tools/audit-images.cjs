const { chromium } = require('playwright'),
  fs = require('fs');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1000, height: 2200 } });
    await page.goto('http://localhost:8080');
    await page.evaluate(async () => {
      const sources = await (await fetch('images/sources.json')).json();
      document.body.innerHTML =
        '<main style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:10px">' +
        Object.values(sources)
          .map(
            (s) =>
              '<article><img src="' +
              s.file +
              '" style="width:230px;height:173px;object-fit:cover"><div style="font-size:12px">' +
              s.name +
              ' · ' +
              (s.kind === 'illustration' ? 'Minh họa' : 'Ảnh tham khảo') +
              '</div></article>'
          )
          .join('') +
        '</main>';
      await Promise.all([...document.images].map((i) => i.decode()));
    });
    await page.screenshot({ path: 'artifacts/food-images-final.png', fullPage: true });
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
