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
      'system',
      'light',
    ],
    [null, 'system', 'light'],
  ]) {
    const document = {
      documentElement: { dataset: {}, style: { removeProperty() {}, setProperty() {} } },
      querySelector: () => ({ content: '' }),
      addEventListener() {},
    };
    const context = vm.createContext({
      document,
      window: {
        addEventListener() {},
        matchMedia: () => ({ addEventListener() {} }),
        setInterval() {},
      },
      matchMedia: () => ({ matches: true }),
      Date: class extends Date {
        constructor(...args) {
          super(...(args.length ? args : [0]));
        }
        getHours() {
          return 10;
        }
        getMinutes() {
          return 0;
        }
      },
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

test('system appearance follows OS independently from time and custom accents keep AA contrast', () => {
  for (const [hour, osDark, mode, expected] of [
    [23, false, 'system', 'light'],
    [10, true, 'system', 'dark'],
    [23, false, 'auto', 'dark'],
    [4, true, 'auto', 'light'],
  ]) {
    const values = {};
    const document = {
      documentElement: {
        dataset: {},
        style: {
          removeProperty() {},
          setProperty(k, v) {
            values[k] = v;
          },
        },
      },
      querySelector: () => ({ content: '' }),
      addEventListener() {},
    };
    const c = vm.createContext({
      document,
      window: {
        addEventListener() {},
        matchMedia: () => ({ addEventListener() {} }),
        setInterval() {},
      },
      matchMedia: () => ({ matches: osDark }),
      localStorage: { getItem: () => null },
      Date: class extends Date {
        getHours() {
          return hour;
        }
        getMinutes() {
          return 0;
        }
      },
    });
    vm.runInContext(
      fs.readFileSync('src/js/theme-init.js', 'utf8') +
        ';globalThis.preferences=AppearancePreferences;globalThis.ratio=contrastRatio;',
      c
    );
    c.preferences.apply({ appearance: mode, theme: 'custom', customColor: '#ffff00' });
    assert.equal(document.documentElement.dataset.appearance, expected);
    const bg = expected === 'dark' ? '#293344' : '#ffffff';
    assert.ok(c.ratio(values['--orange'], bg) >= 4.5);
    assert.ok(c.ratio(values['--orange'], values['--primary-ink']) >= 4.5);
    assert.equal(values['--custom-accent'], '#ffff00');
  }
});
