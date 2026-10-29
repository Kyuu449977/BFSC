import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/js/gacha.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''    const key = this.getActiveBannerKey(mode);
    const activeDb = this.getActiveDatabase();
    const activeGroup = activeDb[key] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[key] : { dishes: [], name: '' });
    if (unique && activeGroup.dishes.length < count)
      throw new Error('Không đủ món khác nhau. Hãy chọn ít món hơn hoặc tắt tùy chọn không trùng.');
    if (count === 1) return this.pick(plan.singles);
    if (count === 3) return this.pick(plan.triples);
    const pool = activeGroup.dishes
      .filter((dish) => !this.preferences || this.preferences.eligible(dish, key))
      .map((dish) => ({
        dish,
        source: key,
        sourceName: activeGroup.name,
      }));'''

replacement = '''    const activeDb = this.getActiveDatabase();
    const group = (source) => {
      const srcGroup = activeDb[source] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[source] : { dishes: [], name: '' });
      return (srcGroup.dishes || [])
        .filter((dish) => !this.preferences || this.preferences.eligible(dish, source))
        .map((dish) => ({
          dish,
          source,
          sourceName: srcGroup.name,
        }));
    };

    let pool;
    if (mode === 'main') {
      const allMainItems = ['morning', 'lunch', 'afternoon', 'dinner'].flatMap((p) => group(p));
      const seen = new Set();
      pool = allMainItems.filter((item) => {
        if (seen.has(item.dish.id)) return false;
        seen.add(item.dish.id);
        return true;
      });
    } else {
      pool = group(mode);
    }

    if (unique && pool.length < count)
      throw new Error('Không đủ món khác nhau. Hãy chọn ít món hơn hoặc tắt tùy chọn không trùng.');
    if (count === 1) return this.pick(plan.singles);
    if (count === 3) return this.pick(plan.triples);'''

c_norm = content.replace('\r\n', '\n')
t_norm = target.replace('\r\n', '\n')
assert t_norm in c_norm, 'Target not found in gacha.js drawDishes'
new_c = c_norm.replace(t_norm, replacement)
if '\r\n' in content:
    new_c = new_c.replace('\n', '\r\n')

with open(r'src/js/gacha.js', 'w', encoding='utf-8') as f:
    f.write(new_c)
print('Successfully updated drawDishes in src/js/gacha.js!')
