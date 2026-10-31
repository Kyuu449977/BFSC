const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  fs = require('fs'),
  vm = require('vm');
const c = vm.createContext({ window: { addEventListener() {} } });
vm.runInContext(
  fs.readFileSync('src/js/animation.js', 'utf8') + ';this.reel=new FoodRoulette({},{});',
  c
);
test('reel never places identical dishes next to each other, including around winner', () => {
  for (let count = 2; count <= 18; count++)
    for (let run = 0; run < 100; run++) {
      const pool = Array.from({ length: count }, (_, id) => ({
          id: String(id),
          name: 'Dish ' + id,
        })),
        winner = pool[run % count];
      const sequence = c.reel.buildSequence(winner, [...pool, pool[0]]);
      assert.equal(sequence.items.length, 32);
      assert.equal(sequence.targetIndex, 26);
      assert.equal(sequence.items[26], winner);
      assert.ok(sequence.items.every((dish, i) => !i || dish.id !== sequence.items[i - 1].id));
      assert.ok(sequence.items.every((dish) => pool.includes(dish)));
    }
});
test('one eligible dish is rendered once; target remains correct without a long repeating strip', () => {
  const dish = { id: 'only' };
  const sequence = c.reel.buildSequence(dish, [dish, dish]);
  assert.equal(sequence.items.length, 1);
  assert.equal(sequence.items[0], dish);
  assert.equal(sequence.targetIndex, 0);
});

test('low-memory hardware keeps the winner and neighbor rules with a shorter strip', () => {
  const light = vm.createContext({ navigator: { deviceMemory: 4 }, window: { addEventListener() {} } });
  vm.runInContext(fs.readFileSync('src/js/animation.js', 'utf8') + ';this.reel=new FoodRoulette({},{});', light);
  const pool = Array.from({length: 10}, (_, id) => ({id:String(id)}));
  const sequence = light.reel.buildSequence(pool[3], pool);
  assert.equal(light.reel.light, true);
  assert.equal(sequence.items.length, 12);
  assert.equal(sequence.items[sequence.targetIndex], pool[3]);
  assert.ok(sequence.items.every((dish,i) => !i || dish.id !== sequence.items[i-1].id));
});
