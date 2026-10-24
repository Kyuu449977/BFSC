const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const vm = require('vm');
function app(saved = '{}', blocked = false) {
  const storage = { food_case_collection: saved };
  const context = vm.createContext({
    localStorage: {
      getItem: (k) => {
        if (blocked) throw Error();
        return storage[k];
      },
      setItem: (k, v) => {
        if (blocked) throw Error();
        storage[k] = v;
      },
    },
    console,
  });
  vm.runInContext(
    fs.readFileSync('src/js/data.js', 'utf8') +
      '\n' +
      fs.readFileSync('src/js/gacha.js', 'utf8') +
      '\nglobalThis.engine=gachaEngine;globalThis.db=FOOD_DATABASE;globalThis.period=getCurrentMealPeriod;',
    context
  );
  return context;
}
test('89 catalog entries; draw is pure, unique and correct category', () => {
  const a = app();
  const before = JSON.stringify(a.db);
  assert.equal(a.engine.getAllDishesList().length, 89);
  for (const mode of ['main', 'snacks', 'drinks'])
    for (let i = 0; i < 50; i++) {
      const results = a.engine.drawDishes({ mode, count: 3, unique: true });
      assert.equal(new Set(results.map((r) => r.dish.id)).size, 3);
      assert.ok(results.every((r) => r.source === (mode === 'main' ? a.period() : mode)));
    }
  assert.equal(JSON.stringify(a.db), before);
  assert.equal(Object.keys(a.engine.collection).length, 0);
});
test('combo has three categories and commits only once including duplicate dishes', () => {
  const a = app();
  const results = a.engine.drawCombo();
  assert.equal(results.map((r) => r.source).join(','), `${a.period()},snacks,drinks`);
  a.engine.commitResults(results);
  a.engine.commitResults(results);
  assert.equal(
    Object.values(a.engine.collection).reduce((x, y) => x + y, 0),
    3
  );
  const duplicates = [results[0], { ...results[0] }];
  a.engine.commitResults(duplicates);
  assert.equal(a.engine.collection[results[0].dish.id], 3);
});
test('collection migration validates values and survives blocked storage', () => {
  const a = app();
  const id = a.engine.getAllDishesList()[0].id;
  for (const invalid of ['null', '[]', 'broken', '"text"'])
    assert.equal(Object.keys(app(invalid).engine.collection).length, 0);
  const b = app(JSON.stringify({ [id]: 3, unknown: 99 }));
  assert.equal(b.engine.collection[id], 3);
  assert.equal(Object.keys(b.engine.collection).length, 1);
  assert.equal(Object.keys(app(JSON.stringify({ [id]: -2 })).engine.collection).length, 0);
  const c = app('{}', true);
  assert.equal(c.engine.commitResults(c.engine.drawCombo()).saved, false);
  assert.equal(c.engine.getCollectionStats().unlocked, 3);
});
test('insufficient unique dishes does not mutate collection or pool', () => {
  const a = app();
  a.db.snacks.dishes = a.db.snacks.dishes.slice(0, 2);
  assert.throws(() => a.engine.drawDishes({ mode: 'snacks', count: 3, unique: true }), /Không đủ/);
  assert.equal(a.engine.drawDishes({ mode: 'snacks', count: 3, unique: false }).length, 3);
  assert.equal(a.db.snacks.dishes.length, 2);
});
test('meal period boundaries', () => {
  for (const [hour, expected] of [
    [4, 'dinner'],
    [5, 'morning'],
    [10, 'morning'],
    [11, 'lunch'],
    [13, 'lunch'],
    [14, 'afternoon'],
    [17, 'afternoon'],
    [18, 'dinner'],
    [23, 'dinner'],
  ]) {
    const a = app();
    vm.runInContext(`Date = class { getHours() { return ${hour}; } }`, a);
    assert.equal(a.period(), expected);
  }
});
test('Google search catalog stays consistent with food IDs and names', () => {
  const a = app();
  const catalog = JSON.parse(fs.readFileSync('backend/data/dish-search.json', 'utf8'));
  const dishes = a.engine.getAllDishesList();
  assert.equal(Object.keys(catalog).length, dishes.length);
  for (const dish of dishes) {
    assert.equal(catalog[dish.id].name, dish.name);
    assert.ok(catalog[dish.id].query.includes(dish.name));
  }
});

test('single draws explore every eligible dish before repeating; duplicate commit does not advance history', () => {
  const a = app(),
    ids = new Set();
  const size = a.db.snacks.dishes.length;
  for (let i = 0; i < size; i++) {
    const results = a.engine.drawDishes({ mode: 'snacks' });
    assert.equal(ids.has(results[0].dish.id), false);
    ids.add(results[0].dish.id);
    a.engine.commitResults(results);
    a.engine.commitResults(results);
    assert.equal(a.engine.drawHistory[results[0].dish.id], 1);
  }
  const last = [...a.engine.lastDraw][0];
  assert.notEqual(a.engine.drawDishes({ mode: 'snacks' })[0].dish.id, last);
});
test('triples and combos minimize previous overlap without changing eligible budget candidates', () => {
  const a = app();
  for (const combo of [false, true]) {
    let previous = new Set();
    for (let i = 0; i < 20; i++) {
      const plan = a.engine.prepareSelection({ mode: 'snacks', budget: 200000 });
      const eligible = combo ? plan.combos : plan.triples;
      const results = combo
        ? a.engine.drawCombo({ budget: 200000, prepared: plan })
        : a.engine.drawDishes({ mode: 'snacks', count: 3, budget: 200000, prepared: plan });
      const overlap = (items) =>
        items.reduce((n, item) => n + Number(previous.has(item.dish.id)), 0);
      assert.equal(overlap(results), Math.min(...eligible.map(overlap)));
      assert.ok(a.engine.totalPrice(results).min <= 200000);
      assert.equal(new Set(results.map((r) => r.dish.id)).size, 3);
      a.engine.commitResults(results);
      previous = new Set(results.map((r) => r.dish.id));
    }
  }
});
test('draw without reveal is pure and a single eligible dish remains selectable', () => {
  const a = app();
  a.db.snacks.dishes = a.db.snacks.dishes.slice(0, 1);
  const result = a.engine.drawDishes({ mode: 'snacks' });
  assert.equal(Object.keys(a.engine.drawHistory).length, 0);
  a.engine.commitResults(result);
  assert.equal(a.engine.drawDishes({ mode: 'snacks' })[0].dish.id, result[0].dish.id);
});
test('session history survives reload, validates stored values, and tolerates denied storage', () => {
  const storage = {};
  function session(blocked = false) {
    const a = vm.createContext({
      console,
      localStorage: { getItem: () => null, setItem() {} },
      sessionStorage: {
        getItem: (k) => {
          if (blocked) throw Error();
          return storage[k];
        },
        setItem: (k, v) => {
          if (blocked) throw Error();
          storage[k] = v;
        },
      },
    });
    vm.runInContext(
      fs.readFileSync('src/js/data.js', 'utf8') +
        '\n' +
        fs.readFileSync('src/js/gacha.js', 'utf8') +
        '\nglobalThis.engine=gachaEngine;',
      a
    );
    return a.engine;
  }
  const first = session(),
    results = first.drawDishes({ mode: 'snacks' });
  first.commitResults(results);
  const second = session();
  assert.equal(second.drawHistory[results[0].dish.id], 1);
  assert.notEqual(second.drawDishes({ mode: 'snacks' })[0].dish.id, results[0].dish.id);
  for (const invalid of ['null', '[]', 'broken', '{"counts":{"unknown":20},"last":["unknown"]}']) {
    storage.food_case_draw_history = invalid;
    const engine = session();
    assert.equal(Object.keys(engine.drawHistory).length, 0);
    assert.equal(engine.lastDraw.size, 0);
  }
  const denied = session(true);
  assert.doesNotThrow(() => denied.commitResults(denied.drawCombo()));
});
