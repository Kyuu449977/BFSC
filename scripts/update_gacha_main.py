import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/js/gacha.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''    const period = getCurrentMealPeriod();
    const key = mode === 'main' ? period : mode;
    const db = this.getActiveDatabase();
    const group = (source) => {
      const srcGroup = db[source] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[source] : { dishes: [], name: '' });
      return srcGroup.dishes
        .filter((dish) => !this.preferences || this.preferences.eligible(dish, source))
        .map((dish) => ({
          dish,
          source,
          sourceName: srcGroup.name,
        }));
    };
    const pool = group(key);
    const main = group(period),
      snacks = group('snacks'),
      drinks = group('drinks');'''

replacement = '''    const period = getCurrentMealPeriod();
    const db = this.getActiveDatabase();
    const group = (source) => {
      const srcGroup = db[source] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[source] : { dishes: [], name: '' });
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

    const allMain = ['morning', 'lunch', 'afternoon', 'dinner'].flatMap((p) => group(p));
    const seenM = new Set();
    const main = allMain.filter((item) => {
      if (seenM.has(item.dish.id)) return false;
      seenM.add(item.dish.id);
      return true;
    });
    const snacks = group('snacks'),
      drinks = group('drinks');'''

c_norm = content.replace('\r\n', '\n')
t_norm = target.replace('\r\n', '\n')
assert t_norm in c_norm, 'Target not found in gacha.js'
new_c = c_norm.replace(t_norm, replacement)
if '\r\n' in content:
    new_c = new_c.replace('\n', '\r\n')

with open(r'src/js/gacha.js', 'w', encoding='utf-8') as f:
    f.write(new_c)
print('Successfully updated prepareSelection in src/js/gacha.js!')
