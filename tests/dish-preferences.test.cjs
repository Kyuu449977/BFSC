const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app(saved = {}) {
  const c = vm.createContext({
    console,
    setTimeout,
    localStorage: { getItem: (k) => saved[k] ?? null, setItem: (k, v) => (saved[k] = v) },
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
      '\nglobalThis.engine=gachaEngine;globalThis.db=FOOD_DATABASE;globalThis.catalog=Catalog;',
    c
  );
  c.saved = saved;
  return c;
}
test('hidden/favorite/eaten preference follows same-name dish copies across regions', () => {
  const a = app(),
    all = a.catalog.getAllDishes(),
    dish = all.find((d) => d.name === 'Bánh ướt'),
    prefs = a.engine.preferences;
  prefs.set(dish, 'hidden', true);
  prefs.set(dish, 'favorite', true);
  prefs.set(dish, 'eaten', Date.now());
  for (const copy of all.filter((d) => d.name === dish.name))
    assert.equal(prefs.state(copy).hidden, true);
  assert.equal(Object.keys(a.engine.collection).length, 0);
  const reload = app(a.saved);
  assert.equal(reload.engine.preferences.state(dish).favorite, true);
  assert.ok(reload.engine.preferences.state(dish).eaten > 0);
});
test('craving filters main pools; combo retains snack and drink groups; prepared plan is stale after change', () => {
  const a = app();
  const old = a.engine.prepareSelection();
  a.engine.preferences.configure('craving', 'rice');
  assert.throws(() => a.engine.assertPlan(old, 'main', true, null), /thay đổi/);
  const plan = a.engine.prepareSelection({ budget: 100000 });
  assert.ok(plan.pools.single.every((x) => x.dish.tags.includes('rice')));
  assert.ok(plan.pools.snacks.every((x) => x.source === 'snacks'));
  assert.ok(plan.pools.drinks.every((x) => x.source === 'drinks'));
});
test('recent dishes lose ranking when alternatives exist, while the sole choice remains selectable', async () => {
  const a = app(),
    p = a.engine.preferences,
    plan = a.engine.prepareSelection({ mode: 'snacks' }),
    first = plan.pools.single[0];
  p.configure('avoidRecent', true);
  p.set(first.dish, 'eaten', Date.now());
  for (let i = 0; i < 5; i++)
    assert.notEqual(
      (
        await a.engine.drawDishes({
          mode: 'snacks',
          prepared: a.engine.prepareSelection({ mode: 'snacks' }),
        })
      )[0].dish.id,
      first.dish.id
    );
  assert.equal(p.recent(first.dish, Date.now() + 4 * 86400000), false);
  const db = a.catalog.getRegion('vi');
  db.snacks.dishes = db.snacks.dishes.filter((d) => d.id === first.dish.id);
  const only = await a.engine.drawDishes({ mode: 'snacks' });
  assert.equal(only[0].dish.id, first.dish.id);
});
test('all hidden and invalid storage never silently falls back', () => {
  const a = app();
  for (const d of a.engine.getAllDishesList()) a.engine.preferences.set(d, 'hidden', true);
  const p = a.engine.prepareSelection();
  assert.equal(p.availability.single, false);
  assert.equal(p.availability.triple, false);
  for (const value of ['null', '[]', '"unknown"', 'broken'])
    assert.equal(app({ food_case_personal_craving: value }).engine.preferences.craving, 'all');
});
