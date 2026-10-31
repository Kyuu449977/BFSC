const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function catalog() {
  const context = vm.createContext({});
  vm.runInContext(
    fs.readFileSync('src/js/data.js', 'utf8') +
      '\nglobalThis.beforeTranslations=JSON.parse(JSON.stringify(DISH_TRANSLATIONS));globalThis.beforeIds=new Set(Object.keys(DISH_TRANSLATIONS));\n' +
      fs.readFileSync('src/js/dish-i18n.js', 'utf8') +
      '\nglobalThis.dishes=Object.values(REGIONAL_DATABASES).flatMap(db=>Object.values(db).flatMap(group=>group.dishes||[]));globalThis.names=getDishName;globalThis.descs=getDishDesc;globalThis.translations=DISH_TRANSLATIONS;',
    context
  );
  return context;
}

test('all 350 catalog dishes resolve a nonempty name and description in every supported language', () => {
  const app = catalog();
  const dishes = [...new Map(app.dishes.map((d) => [d.id, d])).values()];
  assert.equal(dishes.length, 350);
  for (const dish of dishes)
    for (const lang of ['vi', 'en', 'ja', 'ko', 'zh']) {
      assert.ok(app.names(dish, lang).trim(), `${dish.id} name ${lang}`);
      assert.ok(app.descs(dish, lang).trim(), `${dish.id} description ${lang}`);
    }
});

test('the retained Vietnamese dishes receive localized names without replacing existing translations', () => {
  const app = catalog();
  const missing = [...new Set(app.dishes.map((d) => d.id))].filter((id) => !app.beforeIds.has(id));
  assert.equal(missing.length, 87);
  for (const id of missing)
    for (const lang of ['en', 'ja', 'ko', 'zh']) {
      const text = app.translations[id]?.[lang]?.name;
      assert.ok(text && text.trim(), `${id} ${lang}`);
      const description = app.translations[id]?.[lang]?.desc;
      assert.ok(description && description.trim(), `${id} explicit description ${lang}`);
    }
  for (const id of app.beforeIds)
    assert.deepEqual(
      JSON.parse(JSON.stringify(app.translations[id])),
      JSON.parse(JSON.stringify(app.beforeTranslations[id]))
    );
  assert.equal(app.translations.nuoc_coca_original.en.name, 'Coca-Cola Original');
});
