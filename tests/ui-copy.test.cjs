const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('all upgrade copy used by HTML is available in five languages', () => {
  const c = vm.createContext({});
  vm.runInContext(fs.readFileSync('src/js/ui-copy.js', 'utf8') + ';globalThis.copy=UICopy;', c);
  const html = fs.readFileSync('src/index.html', 'utf8');
  const keys = [...new Set([...html.matchAll(/data-copy="([^"]+)"/g)].map((m) => m[1]))];
  assert.ok(keys.length >= 20);
  for (const key of keys)
    for (const lang of ['vi', 'en', 'ja', 'ko', 'zh']) {
      const value = c.copy.text(key, lang);
      assert.ok(value && value !== key, `${key} ${lang}`);
    }
});
