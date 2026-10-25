import re

# 1. Update gacha.js
with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    gacha_text = f.read()

# Update prices method
old_prices = """  prices(dish) {
    const min = dish.priceMin,
      max = dish.priceMax;
    return Number.isSafeInteger(min) && Number.isSafeInteger(max) && min >= 0 && max >= min
      ? { min, max }
      : null;
  }"""

new_prices = """  prices(dish) {
    if (!dish) return null;
    let min = dish.priceMin;
    let max = dish.priceMax;
    if (min === undefined && max === undefined) {
      if (Array.isArray(dish.priceRange) && dish.priceRange.length === 2) {
        min = dish.priceRange[0];
        max = dish.priceRange[1];
      } else if (typeof dish.price === 'number') {
        min = dish.price;
        max = dish.price;
      }
    }
    return Number.isSafeInteger(min) && Number.isSafeInteger(max) && min >= 0 && max >= min
      ? { min, max }
      : null;
  }"""

if old_prices in gacha_text:
    gacha_text = gacha_text.replace(old_prices, new_prices)

# Update getAllDishesList method
old_all = """  getAllDishesList() {
    return Object.values(FOOD_DATABASE).flatMap((group) =>
      group.dishes.map((d) => ({ ...d, mealId: group.id, mealName: group.name }))
    );
  }"""

new_all = """  getAllDishesList() {
    const db = this.getActiveDatabase();
    const seenIds = new Set();
    const seenNames = new Set();
    const list = [];
    for (const [mealId, group] of Object.entries(db)) {
      if (!group || !Array.isArray(group.dishes)) continue;
      for (const dish of group.dishes) {
        if (!dish || !dish.id) continue;
        const normName = (dish.name || '').trim().toLowerCase();
        if (seenIds.has(dish.id) || (normName && seenNames.has(normName))) continue;
        seenIds.add(dish.id);
        if (normName) seenNames.add(normName);
        list.push({ ...dish, mealId: group.id || mealId, mealName: group.name });
      }
    }
    return list;
  }"""

if old_all in gacha_text:
    gacha_text = gacha_text.replace(old_all, new_all)
    print('Replaced getAllDishesList in gacha.js')
else:
    print('WARNING: old_all not found in gacha.js')

with open('src/js/gacha.js', 'w', encoding='utf-8') as f:
    f.write(gacha_text)

# 2. Update app.js to expose applyLanguage and engine on window
with open('src/js/app.js', 'r', encoding='utf-8') as f:
    app_text = f.read()

expose_code = """  window.applyLanguage = applyLanguage;
  window.engine = engine;
});"""

if "window.applyLanguage = applyLanguage;" not in app_text:
    idx = app_text.rfind('});')
    if idx != -1:
        app_text = app_text[:idx] + expose_code
        with open('src/js/app.js', 'w', encoding='utf-8') as f:
            f.write(app_text)
        print('Exposed window.applyLanguage and window.engine in app.js')

# 3. In data.js, ensure the 17 new dishes also have explicit priceMin and priceMax
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_text = f.read()

# Replace priceRange: [min, max] with priceRange: [min, max], priceMin: min, priceMax: max where priceMin is missing
def add_price_min_max(m):
    block = m.group(0)
    if 'priceMin' in block:
        return block
    range_match = re.search(r'priceRange:\s*\[(\d+),\s*(\d+)\]', block)
    if range_match:
        pmin, pmax = range_match.group(1), range_match.group(2)
        insertion = f'priceRange: [{pmin}, {pmax}],\n        priceMin: {pmin},\n        priceMax: {pmax}'
        block = block.replace(range_match.group(0), insertion)
    return block

data_text = re.sub(r'\{\s*id:\s*[\'\"]\w+[\'\"].*?\}', add_price_min_max, data_text, flags=re.DOTALL)

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_text)

print('Updated priceMin and priceMax across data.js')
