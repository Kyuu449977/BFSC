# Python script to update gacha.js with currentRegion, setRegion, getActiveDatabase, and deduplication

with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. In constructor, add this.currentRegion = 'vi';
old_ctor = """    this.preferences =
      typeof DishPreferences === 'function' ? new DishPreferences(this.getAllDishesList()) : null;"""

new_ctor = """    this.currentRegion = 'vi';
    this.preferences =
      typeof DishPreferences === 'function' ? new DishPreferences(this.getAllDishesList()) : null;"""

text = text.replace(old_ctor, new_ctor)

# 2. Add getActiveDatabase and setRegion methods
methods = """  setRegion(region) {
    if (!region || this.currentRegion === region) return;
    this.currentRegion = region;
    if (this.preferences && typeof this.preferences.syncAllDishes === 'function') {
      this.preferences.syncAllDishes(this.getAllDishesList());
    }
  }

  getActiveDatabase() {
    return (
      (typeof REGIONAL_DATABASES !== 'undefined' && REGIONAL_DATABASES[this.currentRegion]) ||
      (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE : {})
    );
  }

  getActiveBannerKey(mode = this.currentMode) {"""

text = text.replace("  getActiveBannerKey(mode = this.currentMode) {", methods)

# 3. In getCurrentBannerData:
text = text.replace(
    "  getCurrentBannerData() {\n    return FOOD_DATABASE[this.getActiveBannerKey()];\n  }",
    "  getCurrentBannerData() {\n    const db = this.getActiveDatabase();\n    return db[this.getActiveBannerKey()] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[this.getActiveBannerKey()] : null);\n  }"
)

# 4. In signature:
text = text.replace(
    "signature(mode, unique, budget, period = getCurrentMealPeriod()) {\n    return JSON.stringify([period, mode, unique, budget, this.preferences?.revision || 0]);\n  }",
    "signature(mode, unique, budget, period = getCurrentMealPeriod()) {\n    return JSON.stringify([this.currentRegion, period, mode, unique, budget, this.preferences?.revision || 0]);\n  }"
)

# 5. In prepareSelection:
old_prep = """    const period = getCurrentMealPeriod();
    const key = mode === 'main' ? period : mode;
    const group = (source) =>
      FOOD_DATABASE[source].dishes
        .filter((dish) => !this.preferences || this.preferences.eligible(dish, source))
        .map((dish) => ({
          dish,
          source,
          sourceName: FOOD_DATABASE[source].name,
        }));"""

new_prep = """    const period = getCurrentMealPeriod();
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
    };"""

text = text.replace(old_prep, new_prep)

# 6. In draw(count, { mode, unique, budget }):
old_draw = """    const key = this.getActiveBannerKey(mode);
    if (unique && FOOD_DATABASE[key].dishes.length < count)
      throw new Error(`Không đủ món ăn để chọn ${count} món.`);
    const plan = this.prepareSelection({ mode, unique, budget });
    if (count === 3 && plan.triples.length) return this.pick(plan.triples);
    const pool = FOOD_DATABASE[key].dishes
      .filter((dish) => !this.preferences || this.preferences.eligible(dish, key))
      .map((dish) => ({
        dish,
        source: key,
        sourceName: FOOD_DATABASE[key].name,
      }));"""

new_draw = """    const key = this.getActiveBannerKey(mode);
    const db = this.getActiveDatabase();
    const activeGroup = db[key] || (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[key] : { dishes: [], name: '' });
    if (unique && activeGroup.dishes.length < count)
      throw new Error(`Không đủ món ăn để chọn ${count} món.`);
    const plan = this.prepareSelection({ mode, unique, budget });
    if (count === 3 && plan.triples.length) return this.pick(plan.triples);
    const pool = activeGroup.dishes
      .filter((dish) => !this.preferences || this.preferences.eligible(dish, key))
      .map((dish) => ({
        dish,
        source: key,
        sourceName: activeGroup.name,
      }));"""

text = text.replace(old_draw, new_draw)

# 7. In getAllDishesList:
old_all = """  getAllDishesList() {
    return Object.values(FOOD_DATABASE).flatMap((group) =>
      group.dishes.map((dish) => ({ ...dish, mealId: group.id, mealName: group.name }))
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

text = text.replace(old_all, new_all)

with open('src/js/gacha.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated gacha.js with multi-regional support and deduplication!')
