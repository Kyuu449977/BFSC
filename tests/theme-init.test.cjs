const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  vm = require('node:vm'),
  fs = require('node:fs');
test('early theme restore validates storage, supports legacy keys and tolerates storage denial', () => {
  for (const [storage, theme, appearance] of [
    [{ food_case_settings: '{"theme":"green","appearance":"dark"}' }, 'green', 'dark'],
    [
      { food_case_setting_theme: '"blue"', food_case_setting_appearance: '"system"' },
      'blue',
      'dark',
    ],
    [
      { food_case_setting_theme: '"invalid"', food_case_setting_appearance: 'broken' },
      'orange',
      'light',
    ],
    [null, 'orange', 'light'],
  ]) {
    const document = { documentElement: { dataset: {} }, querySelector: () => ({ content: '' }) };
    const context = vm.createContext({
      document,
      matchMedia: () => ({ matches: true }),
      localStorage: {
        getItem: (key) => {
          if (!storage) throw Error('denied');
          return storage[key] ?? null;
        },
      },
    });
    vm.runInContext(fs.readFileSync('src/js/theme-init.js', 'utf8'), context);
    assert.equal(document.documentElement.dataset.theme, theme);
    assert.equal(document.documentElement.dataset.appearance, appearance);
  }
});
