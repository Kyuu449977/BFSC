const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');

function load(fetch, blocked = false) {
  const storage = {};
  const context = vm.createContext({
    fetch,
    TextEncoder,
    crypto: webcrypto,
    AbortController,
    setTimeout,
    clearTimeout,
    localStorage: {
      getItem: (key) => storage[key] || null,
      setItem(key, value) {
        if (blocked) throw new Error('Storage denied');
        storage[key] = value;
      },
    },
  });
  vm.runInContext(
    fs.readFileSync('src/js/money.js', 'utf8') +
      '\n' +
      fs.readFileSync('src/js/custom-dishes.js', 'utf8') +
      '\nglobalThis.transport=CustomDishes;',
    context
  );
  return { transport: context.transport, storage };
}
const payload = () => ({
  id: '82502b6d-642b-418e-8836-9e72b50e1621',
  region: 'en',
  mealId: 'snacks',
  name: 'Test dish',
  price: 12.5,
  image: 'assets/brand.svg',
});

test('retired server and browser duplicates stay archived while new custom dishes load', async () => {
  const retired = { id: 'custom_1793198706284', name: 'Archived' };
  const current = { id: 'custom_new', name: 'New contribution' };
  const a = load(async () => ({ok:true,json:async()=>[retired,current]}));
  a.storage.food_custom_dishes = JSON.stringify([retired]);
  const dishes = await a.transport.load();
  assert.deepEqual(Array.from(dishes, dish=>dish.id), [current.id]);
  assert.equal(JSON.parse(a.storage.food_custom_dishes).length, 1);
});

test('server validation failure never writes local fallback', async () => {
  const a = load(async () => ({ status: 409, ok: false }));
  await assert.rejects(a.transport.save(payload()));
  assert.equal(a.storage.food_custom_dishes, undefined);
});

test('static fallback uses stable region-aware IDs and storage denial is an error', async () => {
  const a = load(async () => ({ status: 404, ok: false }));
  const first = await a.transport.save(payload());
  const second = await a.transport.save(payload());
  assert.equal(first.local, true);
  assert.equal(first.dish.id, second.dish.id);
  assert.equal(first.dish.region, 'en');
  assert.equal(JSON.parse(a.storage.food_custom_dishes).length, 1);
  const blocked = load(async () => {
    throw new Error('Offline');
  }, true);
  await assert.rejects(blocked.transport.save(payload()), /Storage denied/);
});

test('server success requires matching ID and does not create a local copy', async () => {
  const a = load(async () => ({
    status: 201,
    ok: true,
    json: async () => ({ dish: { ...payload(), id: 'custom_' + payload().id } }),
  }));
  assert.equal((await a.transport.save(payload())).local, false);
  assert.equal(a.storage.food_custom_dishes, undefined);
  const invalid = load(async () => ({ status: 200, ok: true, json: async () => ({}) }));
  await assert.rejects(invalid.transport.save(payload()));
});

test('invalid custom payload is rejected before the network request', async () => {
  let calls = 0;
  const a = load(async () => {
    calls++;
    throw new Error('Network');
  });
  for (const invalid of [
    { region: 'xx' },
    { price: 1.234 },
    { name: 'x' },
    { desc: 'x'.repeat(2001) },
    { image: 'javascript:alert(1)' },
    { rarity: 10 },
  ]) {
    await assert.rejects(a.transport.save({ ...payload(), ...invalid }));
  }
  assert.equal(calls, 0);
});
