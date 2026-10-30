const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function app(saved = '{}') {
  const storage = { food_case_collection: saved };
  const context = vm.createContext({
    console,
    setTimeout,
    localStorage: {
      getItem: (k) => storage[k] ?? null,
      setItem: (k, v) => {
        storage[k] = v;
      },
    },
    sessionStorage: { getItem: () => null, setItem() {} },
  });
  context.window = context;
  context.addEventListener = () => {};
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
      '\nglobalThis.engine=gachaEngine;globalThis.catalog=Catalog;globalThis.money=Money;',
    context
  );
  return context;
}

test('minor money parsing handles zero and two decimal currencies', () => {
  const a = app();
  assert.equal(a.money.scale('VND'), 1);
  assert.equal(a.money.scale('JPY'), 1);
  assert.equal(a.money.scale('KRW'), 1);
  assert.equal(a.money.scale('USD'), 100);
  assert.equal(a.money.scale('CNY'), 100);
  assert.equal(a.money.parse('1,234.56', 'USD'), 123456);
  assert.equal(a.money.parse('¥1,234', 'JPY'), 1234);
  assert.equal(a.money.parse('1.234 ₫', 'VND'), 1234);
  assert.equal(a.money.parse('-1', 'USD'), null);
  assert.equal(a.money.parse('abc50', 'USD'), null);
  assert.equal(a.money.parse('1,5', 'USD'), null);
  assert.equal(a.money.parseBudget('1,234.56', 'en'), 1234.56);
  assert.equal(a.money.parseBudget('', 'en'), null);
  assert.deepEqual(
    JSON.parse(JSON.stringify(a.money.getRange({ priceMin: 1.23, priceMax: 2.57 }, 'USD'))),
    { min: 123, max: 257 }
  );
  assert.match(a.money.formatMinor(1234, 'vi'), /đ/);
});

test('catalog exposes stable all-region IDs and can register custom region dishes', () => {
  const a = app(),
    ids = a.catalog.allDishes().map((d) => d.id);
  assert.ok(ids.length > a.engine.getDishesFrom(a.catalog.getRegion('vi')).length);
  const before = a.catalog.getRevision();
  a.catalog.registerRegion('custom', {
    lunch: { name: 'Custom', dishes: [{ id: 'custom_1', name: 'One' }] },
  });
  assert.equal(a.catalog.getDish('custom_1').name, 'One');
  assert.ok(a.catalog.getRevision() > before);
  a.engine.setRegion('custom');
  assert.ok(a.engine.getAllDishesList().some((d) => d.id === 'custom_1'));
});

test('prepared plans hold pools and metadata, not eager combination arrays', async () => {
  const a = app(),
    engine = a.engine;
  const plan = engine.prepareSelection({ mode: 'snacks', budget: 100000 });
  assert.ok(Array.isArray(plan.pools.single));
  assert.ok(Array.isArray(plan.pools.snacks));
  assert.equal(plan.triples, undefined);
  assert.equal(plan.combos, undefined);
  assert.equal(plan.eligibleSingleCount, plan.pools.single.length);
  assert.ok('triple' in plan.minimumsMinor);
  const result = await engine.drawDishes({
    mode: 'snacks',
    count: 3,
    budget: 100000,
    prepared: plan,
  });
  assert.equal(result.length, 3);
  assert.ok(engine.totalPrice(result).min <= 100000);
  const comboPlan = engine.prepareSelection({ budget: 100000 });
  const combo = await engine.drawCombo({ budget: 100000, prepared: comboPlan });
  assert.ok(['morning', 'lunch', 'afternoon', 'dinner'].includes(combo[0].source));
  assert.equal(combo[1].source, 'snacks');
  assert.equal(combo[2].source, 'drinks');
});

test('collection keeps positive unknown legacy counts and supports registered IDs', () => {
  const a = app('{"custom_old":7,"known_bad":-2}');
  assert.equal(a.engine.collection.custom_old, 7);
  assert.equal(a.engine.collection.known_bad, undefined);
  a.engine.registerIds(['custom_old', 'new_id']);
  assert.ok(a.engine.store.ids.has('new_id'));
});

test('currency parser rejects ambiguous USD decimal precision and engine rejects fractional VND', () => {
  const a = app();
  vm.runInContext('globalThis.money = Money', a);
  assert.equal(a.money.parseBudget('   ', 'vi'), null);
  assert.equal(a.money.parseBudget('1,234.50', 'en'), 1234.5);
  for (const input of ['1.234', '1,50', 'abc50', '1e3', '-2'])
    assert.throws(() => a.money.parseBudget(input, 'en'));
  assert.throws(() => a.engine.prepareSelection({ budget: 1.5 }), /Ngân sách/);
});

test('reservoir tie selection uses injected RNG and catalog revision invalidates prepared pools', async () => {
  const a = app();
  const database = a.catalog.getRegion('vi');
  database.snacks.dishes = [
    { id: 'fixture_a', name: 'Fixture A', price: 100 },
    { id: 'fixture_b', name: 'Fixture B', price: 100 },
    { id: 'fixture_c', name: 'Fixture C', price: 100 },
  ];
  a.engine.random = () => 0;
  assert.equal((await a.engine.drawDishes({ mode: 'snacks' }))[0].dish.id, 'fixture_c');
  a.engine.random = () => 0.999999;
  assert.equal((await a.engine.drawDishes({ mode: 'snacks' }))[0].dish.id, 'fixture_a');
  const plan = a.engine.prepareSelection({ mode: 'snacks' });
  a.catalog.upsertCustom({
    id: 'custom_fixture',
    name: 'Fixture custom',
    mealId: 'snacks',
    region: 'vi',
    price: 100,
  });
  await assert.rejects(a.engine.drawDishes({ mode: 'snacks', prepared: plan }), /thay đổi/);
});

test('missing-price dishes remain selectable only without a budget', async () => {
  const a = app();
  a.catalog.getRegion('vi').snacks.dishes = [{ id: 'fixture_unknown', name: 'Unknown price' }];
  const free = a.engine.prepareSelection({ mode: 'snacks' });
  assert.equal(free.availability.single, true);
  assert.equal(
    (await a.engine.drawDishes({ mode: 'snacks', prepared: free }))[0].dish.id,
    'fixture_unknown'
  );
  const capped = a.engine.prepareSelection({ mode: 'snacks', budget: 1000 });
  assert.equal(capped.availability.single, false);
  await assert.rejects(
    a.engine.drawDishes({ mode: 'snacks', budget: 1000, prepared: capped }),
    /Không có lựa chọn/
  );
});

test('unique-set enumeration preserves every valid ordered outcome without visiting all permutations', () => {
  const { engine } = app();
  const pool = [
    { id: 'a', name: 'Alias', price: 100 },
    { id: 'a2', name: 'Alias', price: 200 },
    { id: 'b', name: 'B', price: 100 },
    { id: 'c', name: 'C', price: 200 },
    { id: 'd', name: 'D', price: 300 },
  ].map((dish) => ({ dish }));
  const naive = [];
  for (const a of pool)
    for (const b of pool)
      for (const c of pool)
        if (
          new Set([a, b, c].map((x) => x.dish.name)).size === 3 &&
          [a, b, c].reduce((n, x) => n + x.dish.price, 0) <= 600
        )
          naive.push([a, b, c].map((x) => x.dish.id).join(','));
  const sets = [...engine.combinations(Array(3).fill(pool), 3, true, 600)];
  const expanded = [];
  for (const [a, b, c] of sets)
    for (const permutation of [
      [a, b, c],
      [a, c, b],
      [b, a, c],
      [b, c, a],
      [c, a, b],
      [c, b, a],
    ])
      expanded.push(permutation.map((x) => x.dish.id).join(','));
  assert.deepEqual(expanded.sort(), naive.sort());
  assert.equal(sets.length * 6, naive.length);
});

test('unlimited repeat draws and combo use exact independent best-rank sampling', async () => {
  const { engine } = app();
  const item = (id, source) => ({ dish: { id, name: id, price: 1 }, source });
  const pools = {
    single: [item('a', 'main'), item('b', 'main')],
    main: [item('a', 'main'), item('b', 'main')],
    snacks: [item('s1', 'snacks'), item('s2', 'snacks')],
    drinks: [item('d1', 'drinks'), item('d2', 'drinks')],
  };
  engine.drawHistory = { a: 4, b: 0, s1: 0, s2: 0, d1: 1, d2: 2 };
  const plan = {
    mode: 'main',
    unique: false,
    budget: null,
    pools,
    eligibleSingleCount: 2,
    signature: engine.signature('main', false, null),
  };
  engine.combinations = () => {
    throw new Error('Unbounded draws must not enumerate cartesian products');
  };
  for (const rng of [() => 0, () => 0.999999]) {
    engine.random = rng;
    const triple = await engine.drawDishes({ count: 3, unique: false, prepared: plan });
    assert.deepEqual(
      Array.from(triple, (x) => x.dish.id),
      ['b', 'b', 'b']
    );
    const combo = await engine.drawCombo({ prepared: plan });
    assert.equal(combo[0].dish.id, 'b');
    assert.equal(combo[2].dish.id, 'd1');
    assert.equal(combo[1].dish.id, rng() === 0 ? 's2' : 's1');
  }
});

test('candidate scoring reads recent preference once per dish and still rejects a changed plan', async () => {
  const { engine } = app();
  const pool = ['a', 'b', 'c'].map((id) => ({ dish: { id, name: id, price: 1 } }));
  let calls = 0;
  engine.preferences = {
    avoidRecent: true,
    recent() {
      calls++;
      return false;
    },
  };
  await engine.pickGenerated(engine.combinations([pool, pool, pool], 3, false, null));
  assert.equal(calls, 3);
  await assert.rejects(
    engine.pickIndependent([pool], () => false),
    /thay đổi/
  );
});
