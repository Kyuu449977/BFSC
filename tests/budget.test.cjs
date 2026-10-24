const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app() {
  const c = vm.createContext({ localStorage: { getItem: () => null, setItem: () => {} } });
  vm.runInContext(
    fs.readFileSync('src/js/data.js', 'utf8') +
      '\n' +
      fs.readFileSync('src/js/gacha.js', 'utf8') +
      '\nglobalThis.engine=gachaEngine;globalThis.db=FOOD_DATABASE;',
    c
  );
  return c;
}
test('all catalog price ranges are numeric and agree with the displayed reference prices', () => {
  const a = app();
  for (const d of a.engine.getAllDishesList()) {
    const nums = d.price.match(/\d[\d.]*/g).map((n) => Number(n.replace(/\./g, '')));
    assert.deepEqual(JSON.parse(JSON.stringify(a.engine.prices(d))), {
      min: nums[0],
      max: nums.at(-1),
    });
  }
});
test('precomputed options respect whole-roll minimum prices, uniqueness and categories without mutation', () => {
  const a = app(),
    before = JSON.stringify(a.db);
  for (const mode of ['main', 'snacks', 'drinks'])
    for (const unique of [true, false])
      for (const budget of [0, 15000, 30000, 50000, 100000, 200000, null]) {
        const p = a.engine.prepareSelection({ mode, unique, budget });
        for (const [type, choices] of Object.entries({
          singles: p.singles,
          triples: p.triples,
          combos: p.combos,
        }))
          for (const r of choices) {
            const total = a.engine.totalPrice(r);
            if (budget !== null) assert.ok(total.min <= budget);
            assert.equal(r.length, type === 'singles' ? 1 : 3);
            if (type === 'triples' && unique)
              assert.equal(new Set(r.map((x) => x.dish.id)).size, 3);
            if (type === 'combos')
              assert.equal(r.map((x) => x.source).join(','), `${p.period},snacks,drinks`);
            else assert.ok(r.every((x) => x.source === p.key));
          }
      }
  assert.equal(JSON.stringify(a.db), before);
  assert.equal(Object.keys(a.engine.collection).length, 0);
});
test('exact threshold is affordable even if upper reference price exceeds budget; no unaffordable fallback', () => {
  const a = app();
  const d = a.db.snacks.dishes[0];
  const p = a.engine.prepareSelection({ mode: 'snacks', budget: d.priceMin });
  assert.ok(p.singles.some((r) => r[0].dish.id === d.id));
  assert.ok(d.priceMax > d.priceMin);
  const none = a.engine.prepareSelection({ mode: 'snacks', budget: 0 });
  assert.equal(none.singles.length + none.triples.length + none.combos.length, 0);
  assert.throws(
    () => a.engine.drawDishes({ mode: 'snacks', budget: 0, prepared: none }),
    /Không có lựa chọn/
  );
  assert.throws(() => a.engine.drawCombo({ budget: 0, prepared: none }), /Không có lựa chọn/);
});
test('minimum total for distinct triples differs from repeated triples, and stale plans are rejected', () => {
  const a = app();
  const p = a.engine.prepareSelection({ mode: 'drinks', unique: true, budget: 50000 });
  const repeated = a.engine.prepareSelection({ mode: 'drinks', unique: false, budget: 50000 });
  assert.ok(p.minimums.triple >= repeated.minimums.triple);
  assert.throws(
    () => a.engine.drawDishes({ mode: 'drinks', unique: true, budget: 30000, prepared: p }),
    /thay đổi/
  );
  assert.throws(
    () => a.engine.drawDishes({ mode: 'snacks', unique: true, budget: 50000, prepared: p }),
    /thay đổi/
  );
  assert.throws(
    () => a.engine.drawDishes({ mode: 'drinks', unique: false, budget: 50000, prepared: p }),
    /thay đổi/
  );
  vm.runInContext('Date=class {getHours(){return 5}}', a);
  const morning = a.engine.prepareSelection();
  vm.runInContext('Date=class {getHours(){return 18}}', a);
  assert.throws(() => a.engine.drawCombo({ prepared: morning }), /thay đổi/);
});
test('unknown prices are excluded with a cap and validation rejects invalid amounts', () => {
  const a = app();
  const d = a.db.drinks.dishes[0];
  delete d.priceMin;
  const p = a.engine.prepareSelection({ mode: 'drinks', budget: 500000 });
  assert.ok(p.singles.every((r) => r[0].dish.id !== d.id));
  assert.ok(p.minimums.single > 0);
  assert.ok(p.minimums.combo > 0);
  for (const budget of [-1, NaN, Infinity, 1.5, '50000'])
    assert.throws(() => a.engine.prepareSelection({ budget }), /Ngân sách/);
});
