import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update candidates uniqueness
old_cand = "if (unique && selected.some((previous) => previous.dish.id === item.dish.id)) continue;"
new_cand = "if (unique && selected.some((previous) => previous.dish.id === item.dish.id || previous.dish.name === item.dish.name)) continue;"
assert old_cand in text, "old_cand not found"
text = text.replace(old_cand, new_cand, 1)

# 2. Update drawDishes to use getActiveDatabase instead of hardcoded FOOD_DATABASE
old_draw = """    const key = this.getActiveBannerKey(mode);
    if (unique && FOOD_DATABASE[key].dishes.length < count)
      throw new Error('Không đủ món khác nhau. Hãy chọn ít món hơn hoặc tắt tùy chọn không trùng.');
    if (count === 1) return this.pick(plan.singles);
    if (count === 3) return this.pick(plan.triples);
    const pool = FOOD_DATABASE[key].dishes
      .filter((dish) => !this.preferences || this.preferences.eligible(dish, key))
      .map((dish) => ({
        dish,
        source: key,
        sourceName: FOOD_DATABASE[key].name,
      }));"""

new_draw = """    const key = this.getActiveBannerKey(mode);
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
      }));"""

assert old_draw in text, "old_draw not found"
text = text.replace(old_draw, new_draw, 1)

with open('src/js/gacha.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/js/gacha.js updated successfully!")
