const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app() {
  const c = vm.createContext({
    console,
    setTimeout,
    localStorage: { getItem: () => null, setItem() {} },
    sessionStorage: { getItem: () => null, setItem() {} },
  });
  c.window = c;
  c.addEventListener = () => {};
  vm.runInContext(
    [
      'src/js/data.js',
      'src/js/money.js',
      'src/js/catalog.js',
      'src/js/dish-preferences.js',
      'src/js/collection.js',
      'src/js/gacha.js',
    ]
      .map((f) => fs.readFileSync(f, 'utf8'))
      .join('\n') +
      '\nglobalThis.engine=gachaEngine;globalThis.money=Money;globalThis.catalog=Catalog;',
    c
  );
  return c;
}
test('catalog prices are numeric ranges and totals preserve minor-unit precision', () => {
  const a = app();
  for (const d of a.engine.getAllDishesList()) {
    const p = a.engine.prices(d);
    assert.ok(p && Number.isFinite(p.min) && p.max >= p.min);
  }
  const d = { id: 'decimal', name: 'Decimal', priceMin: 1.23, priceMax: 2.57 };
  a.engine.setRegion('en');
  assert.deepEqual(JSON.parse(JSON.stringify(a.engine.prices(d))), { min: 1.23, max: 2.57 });
  assert.deepEqual(JSON.parse(JSON.stringify(a.engine.totalPrice([{ dish: d }, { dish: d }]))), {
    min: 2.46,
    max: 5.14,
  });
});
test('prepared pools respect budgets, uniqueness, categories and minimums without eager triples', async () => {
  const a = app(),
    db = a.catalog.getRegion('vi');
  for (const source of ['snacks', 'drinks']) db[source].dishes = db[source].dishes.slice(0, 8);
  for (const mode of ['main', 'snacks', 'drinks'])
    for (const unique of [true, false])
      for (const budget of [0, 30000, 100000, null]) {
        const p = a.engine.prepareSelection({ mode, unique, budget });
        assert.equal(p.triples, undefined);
        assert.equal(p.combos, undefined);
        assert.ok(
          p.pools.single.every(
            (item) => budget === null || a.engine.prices(item.dish)?.min <= budget
          )
        );
        assert.equal(typeof p.availability.triple, 'boolean');
        assert.ok(p.minimumsMinor.triple === null || typeof p.minimumsMinor.triple === 'number');
      }
  const p = a.engine.prepareSelection({ mode: 'snacks', budget: 100000 });
  const draw = await a.engine.drawDishes({ mode: 'snacks', count: 3, budget: 100000, prepared: p });
  assert.equal(draw.length, 3);
  assert.equal(new Set(draw.map((x) => x.dish.id)).size, 3);
  assert.ok(a.engine.totalPrice(draw).min <= 100000);
});
test('budget threshold is inclusive and bad amounts are rejected', async () => {
  const a = app(),
    d = a.catalog.getRegion('vi').snacks.dishes[0],
    price = a.engine.prices(d).min,
    p = a.engine.prepareSelection({ mode: 'snacks', budget: price });
  assert.ok(p.pools.single.some((x) => x.dish.id === d.id));
  if (price > 0)
    assert.ok(
      !a.engine
        .prepareSelection({ mode: 'snacks', budget: price - 1 })
        .pools.single.some((x) => x.dish.id === d.id)
    );
  for (const budget of [-1, NaN, Infinity, '50000'])
    assert.throws(() => a.engine.prepareSelection({ budget }), /Ngân sách/);
  await assert.rejects(a.engine.drawDishes({ mode: 'snacks', budget: 0 }), /Không có lựa chọn/);
});
test('minimum distinct triple is not cheaper than repeatable triple; stale plan rejects', () => {
  const a = app(),
    unique = a.engine.prepareSelection({ mode: 'drinks', unique: true, budget: 50000 }),
    repeat = a.engine.prepareSelection({ mode: 'drinks', unique: false, budget: 50000 });
  assert.ok(unique.minimumsMinor.triple >= repeat.minimumsMinor.triple);
  assert.throws(() => a.engine.assertPlan(unique, 'drinks', true, 30000), /thay đổi/);
});
