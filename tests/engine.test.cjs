const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app(saved = '{}', session = {}) {
  const storage = { food_case_collection: saved };
  const c = vm.createContext({
    console,
    setTimeout,
    localStorage: { getItem: (k) => storage[k] ?? null, setItem: (k, v) => (storage[k] = v) },
    sessionStorage: { getItem: (k) => session[k] ?? null, setItem: (k, v) => (session[k] = v) },
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
      .join('\n') + '\nglobalThis.engine=gachaEngine;globalThis.catalog=Catalog;',
    c
  );
  return c;
}
test('all-region catalog IDs remain stable while menu list is active-region scoped', () => {
  const a = app(),
    all = a.catalog.getAllDishes(),
    active = a.engine.getAllDishesList();
  assert.equal(all.length, 350);
  assert.ok(all.length > active.length);
  assert.equal(active.length, a.engine.getDishesFrom(a.catalog.getRegion('vi')).length);
  a.engine.setRegion('ja');
  assert.ok(a.engine.getAllDishesList().every((d) => d.id.startsWith('ja_')));
  assert.equal(a.engine.getCollectionStats().total, a.engine.getAllDishesList().length);
});
test('async draws are pure, unique, mode-correct, and commit one count per result', async () => {
  const a = app(),
    before = JSON.stringify(a.catalog.getRegion('vi'));
  for (const mode of ['main', 'snacks', 'drinks']) {
    const results = await a.engine.drawDishes({ mode, count: 3 });
    assert.equal(new Set(results.map((r) => r.dish.id)).size, 3);
    assert.ok(
      results.every((r) =>
        mode === 'main'
          ? ['morning', 'lunch', 'afternoon', 'dinner'].includes(r.source)
          : r.source === mode
      )
    );
  }
  assert.equal(JSON.stringify(a.catalog.getRegion('vi')), before);
  const results = await a.engine.drawCombo();
  assert.equal(results[1].source, 'snacks');
  assert.equal(results[2].source, 'drinks');
  await a.engine.commitResults(results);
  await a.engine.commitResults(results);
  assert.equal(
    Object.values(a.engine.collection).reduce((x, y) => x + y, 0),
    3
  );
});
test('legacy positive unknown collection counts survive and custom registration accepts IDs', () => {
  const a = app('{"old_custom":4,"bad":-2}');
  assert.equal(a.engine.collection.old_custom, 4);
  assert.equal(a.engine.collection.bad, undefined);
  a.engine.registerIds(['old_custom', 'new_custom']);
  assert.ok(a.engine.store.ids.has('new_custom'));
});
test('stale prepared plan is rejected and insufficient unique pool rejects asynchronously', async () => {
  const a = app(),
    plan = a.engine.prepareSelection({ mode: 'snacks' });
  a.engine.preferences.configure('craving', 'rice');
  await assert.rejects(a.engine.drawDishes({ mode: 'snacks', prepared: plan }), /thay đổi/);
  const db = a.catalog.getRegion('vi');
  db.snacks.dishes = db.snacks.dishes.slice(0, 2);
  await assert.rejects(a.engine.drawDishes({ mode: 'snacks', count: 3 }), /Không đủ/);
});
test('draw history persists valid exposure and last reveal; malformed session data is ignored', async () => {
  const session = {},
    a = app('{}', session),
    results = await a.engine.drawDishes({ mode: 'snacks' });
  await a.engine.commitResults(results);
  const id = results[0].dish.id,
    reloaded = app('{}', session);
  assert.equal(reloaded.engine.drawHistory[id], 1);
  assert.ok(reloaded.engine.lastDraw.has(id));
  for (const value of ['null', '[]', 'broken', '{"counts":{"bad":-1},"last":[null]}']) {
    const bad = app('{}', { food_case_draw_history: value });
    assert.equal(Object.keys(bad.engine.drawHistory).length, 0);
    assert.equal(bad.engine.lastDraw.size, 0);
  }
});
test('meal period boundaries remain local-time based', () => {
  for (const [hour, expected] of [
    [3, 'dinner'],
    [4, 'morning'],
    [10, 'morning'],
    [11, 'lunch'],
    [13, 'lunch'],
    [14, 'afternoon'],
    [16, 'afternoon'],
    [17, 'dinner'],
    [22, 'dinner'],
  ]) {
    const a = app();
    vm.runInContext(`Date=class extends Date {getHours(){return ${hour}}}`, a);
    assert.equal(a.getCurrentMealPeriod(), expected);
  }
});
