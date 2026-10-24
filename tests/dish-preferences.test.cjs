const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  fs = require('fs'),
  vm = require('vm');
function app(saved = {}, blocked = false) {
  const context = vm.createContext({
    localStorage: {
      getItem: (k) => {
        if (blocked) throw Error('denied');
        return saved[k] ?? null;
      },
      setItem: (k, v) => {
        if (blocked) throw Error('denied');
        saved[k] = v;
      },
    },
    console,
  });
  vm.runInContext(
    ['src/js/data.js', 'src/js/dish-preferences.js', 'src/js/gacha.js']
      .map((f) => fs.readFileSync(f, 'utf8'))
      .join('\n') + ';this.engine=gachaEngine;this.db=FOOD_DATABASE;',
    context
  );
  context.saved = saved;
  return context;
}
test('hidden dish is excluded across meal copies; favorite/eaten do not alter collection', () => {
  const a = app(),
    all = a.engine.getAllDishesList(),
    dish = all.find((d) => d.name === 'Bánh ướt'),
    p = a.engine.preferences;
  p.set(dish, 'hidden', true);
  p.set(dish, 'favorite', true);
  p.set(dish, 'eaten', Date.now());
  for (const copy of all.filter((d) => d.name === dish.name))
    assert.equal(p.state(copy).hidden, true);
  for (const hour of [5, 11, 14, 18]) {
    vm.runInContext(`Date=class extends Date {getHours(){return ${hour}}}`, a);
    const plan = a.engine.prepareSelection();
    for (const choices of [plan.singles, plan.triples, plan.combos])
      assert.ok(choices.every((c) => c.every((i) => i.dish.name !== dish.name)));
  }
  assert.equal(Object.keys(a.engine.collection).length, 0);
  const reload = app(a.saved);
  assert.equal(reload.engine.preferences.state(dish).favorite, true);
  assert.ok(reload.engine.preferences.state(dish).eaten > 0);
  p.set(dish, 'hidden', false);
  assert.equal(p.state(dish).hidden, false);
});
test('cravings filter mains only, preserve combo groups and budget; stale plans fail', () => {
  const a = app(),
    p = a.engine.preferences,
    before = JSON.stringify(a.db);
  vm.runInContext('Date=class extends Date {getHours(){return 11}}', a);
  const old = a.engine.prepareSelection();
  p.configure('craving', 'rice');
  assert.throws(() => a.engine.drawDishes({ prepared: old }), /thay đổi/);
  const plan = a.engine.prepareSelection({ budget: 100000 });
  assert.ok(plan.singles.length);
  assert.ok(plan.singles.every((c) => c[0].dish.tags.includes('rice')));
  for (const c of plan.combos) {
    assert.ok(c[0].dish.tags.includes('rice'));
    assert.equal(c[1].source, 'snacks');
    assert.equal(c[2].source, 'drinks');
    assert.ok(a.engine.totalPrice(c).min <= 100000);
  }
  assert.ok(a.engine.prepareSelection({ mode: 'drinks' }).singles.length > 0);
  assert.equal(JSON.stringify(a.db), before);
});
test('recent meals have lower priority, without violating budget or blocking a sole option', () => {
  const a = app(),
    p = a.engine.preferences,
    plan = a.engine.prepareSelection({ mode: 'snacks' }),
    first = plan.singles[0][0],
    second = plan.singles[1][0];
  p.configure('avoidRecent', true);
  p.set(first.dish, 'eaten', Date.now());
  for (let i = 0; i < 10; i++)
    assert.equal(a.engine.pick([[first], [second]])[0].dish.id, second.dish.id);
  assert.equal(a.engine.pick([[first]])[0].dish.id, first.dish.id);
  assert.equal(p.recent(first.dish, Date.now() + 4 * 86400000), false);
});
test('all hidden/empty taste never silently falls back; damaged or blocked storage survives', () => {
  const a = app();
  for (const d of a.engine.getAllDishesList()) a.engine.preferences.set(d, 'hidden', true);
  const plan = a.engine.prepareSelection();
  assert.equal(plan.singles.length + plan.triples.length + plan.combos.length, 0);
  assert.throws(() => a.engine.drawCombo({ prepared: plan }), /Không có lựa chọn/);
  for (const value of ['null', '[]', '"unknown"', 'broken'])
    assert.equal(app({ food_case_personal_craving: value }).engine.preferences.craving, 'all');
  const b = app({}, true),
    dish = b.engine.getAllDishesList()[0];
  assert.equal(b.engine.preferences.set(dish, 'favorite', true), false);
  assert.equal(b.engine.preferences.state(dish).favorite, true);
  assert.throws(() => b.engine.preferences.configure('craving', 'invalid'));
});
