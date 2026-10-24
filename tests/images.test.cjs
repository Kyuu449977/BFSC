const fs = require('fs'),
  vm = require('vm');
const { test } = require('node:test'),
  assert = require('node:assert/strict');
test('all dish images exist, match their attribution record and use local assets', () => {
  const c = vm.createContext({});
  vm.runInContext(fs.readFileSync('src/js/data.js', 'utf8') + ';globalThis.db=FOOD_DATABASE', c);
  const sources = JSON.parse(fs.readFileSync('src/images/sources.json', 'utf8'));
  const all = Object.values(c.db).flatMap((g) => g.dishes);
  assert.equal(Object.keys(sources).length, 89);
  let photos = 0,
    illustrations = 0;
  for (const dish of all) {
    const s = sources[dish.id];
    assert.equal(s.name, dish.name);
    assert.equal(s.file, dish.image);
    assert.ok(fs.existsSync('src/' + s.file));
    assert.ok(s.artist && s.license);
    if (s.kind === 'photo') {
      photos++;
      assert.ok(s.source.startsWith('https://'));
      assert.ok(s.original.startsWith('https://'));
      assert.ok(dish.image.endsWith('.webp'));
      assert.notEqual(dish.imageKind, 'illustration');
    } else {
      illustrations++;
      assert.equal(dish.imageKind, 'illustration');
      assert.ok(fs.readFileSync('src/' + s.file, 'utf8').includes('MINH HỌA'));
    }
  }
  assert.equal(photos, 89);
  assert.equal(illustrations, 0);
  const sw = fs.readFileSync('src/sw.js', 'utf8');
  for (const d of all) assert.ok(sw.includes('./' + d.image));
});
