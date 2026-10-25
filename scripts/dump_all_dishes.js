const fs = require('fs');

let content = fs.readFileSync('src/js/data.js', 'utf-8');

// data.js defines FOOD_DATABASE, REGIONAL_DATABASES, etc.
// Let's strip export or module if any, and evaluate in a sandbox
const sandbox = {
  window: {},
  document: { addEventListener: () => {} },
  navigator: { language: 'vi-VN' }
};

const script = new Function('sandbox', `
  with(sandbox) {
    ${content}
    return { FOOD_DATABASE, REGIONAL_DATABASES, DISH_TRANSLATIONS };
  }
`);

const { FOOD_DATABASE, REGIONAL_DATABASES, DISH_TRANSLATIONS } = script(sandbox);

const report = {
  vi: [],
  ja: [],
  ko: [],
  zh: [],
  en: []
};

// 1. VI
for (const sessionKey of Object.keys(FOOD_DATABASE)) {
  const session = FOOD_DATABASE[sessionKey];
  if (!session || !session.dishes) continue;
  for (const d of session.dishes) {
    report.vi.push({
      id: d.id,
      session: sessionKey,
      name: d.name,
      image: d.image,
      type: d.type
    });
  }
}

// 2. International
for (const reg of ['ja', 'ko', 'zh', 'en']) {
  const rdb = REGIONAL_DATABASES[reg];
  if (!rdb) continue;
  for (const sessionKey of Object.keys(rdb)) {
    const session = rdb[sessionKey];
    if (!session || !session.dishes) continue;
    for (const d of session.dishes) {
      report[reg].push({
        id: d.id,
        session: sessionKey,
        name: d.name,
        image: d.image,
        type: d.type
      });
    }
  }
}

fs.writeFileSync('scripts/all_dishes_dump.json', JSON.stringify(report, null, 2), 'utf-8');
console.log('Successfully dumped all dishes:');
console.log(`vi: ${report.vi.length}`);
console.log(`ja: ${report.ja.length}`);
console.log(`ko: ${report.ko.length}`);
console.log(`zh: ${report.zh.length}`);
console.log(`en: ${report.en.length}`);
