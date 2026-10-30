const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function load() {
  const c = vm.createContext({});
  vm.runInContext(
    ['data', 'dish-i18n', 'regional-dish-locales', 'ui-copy']
      .map((n) => fs.readFileSync(`src/js/${n}.js`, 'utf8'))
      .join('\n') +
      `
    globalThis.api = { names: getDishName, descriptions: getDishDesc, quotes: getDishQuote,
      translations: DISH_TRANSLATIONS, copy: UICopy,
      dishes: Object.values(REGIONAL_DATABASES).flatMap(db => Object.values(db).flatMap(g => g.dishes || [])) };
    `,
    c
  );
  return c.api;
}
const vietnamese = /[ĐđĂăƠơƯưẠ-ỹ]/u;
test('all 382 built-in dishes have actual target-language names and descriptions', () => {
  const api = load();
  assert.equal(api.dishes.length, 382);
  for (const dish of api.dishes) {
    for (const lang of ['vi', 'en', 'ja', 'ko', 'zh']) {
      const name = api.names(dish, lang),
        desc = api.descriptions(dish, lang);
      assert.ok(name?.trim() && desc?.trim(), `${dish.id}/${lang}`);
      if (lang === 'vi') continue;
      assert.ok(api.translations[dish.id]?.[lang]?.name, `explicit name ${dish.id}/${lang}`);
      assert.ok(api.translations[dish.id]?.[lang]?.desc, `explicit description ${dish.id}/${lang}`);
      assert.equal(
        vietnamese.test(name + ' ' + desc),
        false,
        `${dish.id}/${lang}: Vietnamese stored as a translation`
      );
      assert.equal(
        vietnamese.test(api.quotes(dish, lang)),
        false,
        `${dish.id}/${lang}: untranslated quote`
      );
      if (lang === 'ja')
        assert.match(name, /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
      if (lang === 'ko') assert.match(name, /\p{Script=Hangul}/u);
      if (lang === 'zh') assert.match(name, /\p{Script=Han}/u);
    }
  }
});
test('names retain translated qualifiers and custom user content is preserved', () => {
  const api = load();
  const dish = api.dishes.find((d) => d.id === 'ja_m_1');
  assert.match(api.names(dish, 'en'), /\(TKG\)/);
  const custom = {
    id: 'custom_example',
    isUserCustom: true,
    name: 'Món mẹ nấu',
    desc: 'Công thức nhà',
    quote: 'Ghi chú riêng',
  };
  assert.equal(api.names(custom, 'en'), custom.name);
  assert.equal(api.descriptions(custom, 'ja'), custom.desc);
  assert.equal(api.quotes(custom, 'ko'), custom.quote);
});
test('dynamic UI messages and domain errors follow the selected display language', () => {
  const { copy } = load();
  for (const lang of ['en', 'ja', 'ko', 'zh']) {
    for (const key of [
      'selected',
      'listCount',
      'wheelTitle',
      'offlineReady',
      'budgetChecking',
      'saveResultError',
      'drinkAll',
    ]) {
      const value = copy.text(key, lang, { n: 3 });
      assert.notEqual(value, key);
      assert.equal(vietnamese.test(value), false, `${key}/${lang}`);
      assert.equal(value.includes('{n}'), false);
    }
    assert.equal(vietnamese.test(copy.error('Ngân sách phải là số tiền hợp lệ.', lang)), false);
  }
});
