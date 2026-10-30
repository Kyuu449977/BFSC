/* Stable all-region catalog plus runtime support for user supplied regions. */
const FoodCatalog = (() => {
  let revision = 1;
  const custom = new Map();
  const ids = new Set();
  function builtin(region) {
    return typeof REGIONAL_DATABASES !== 'undefined' && REGIONAL_DATABASES[region]
      ? REGIONAL_DATABASES[region]
      : typeof FOOD_DATABASE !== 'undefined'
        ? FOOD_DATABASE
        : {};
  }
  function getDatabase(region = 'vi') {
    const base = builtin(region),
      extra = custom.get(region);
    if (!extra) return base;
    const merged = { ...base };
    for (const [key, group] of Object.entries(extra)) {
      const original = base[key];
      if (!original) {
        merged[key] = group;
        continue;
      }
      const byId = new Map((original.dishes || []).map((d) => [d.id, d]));
      for (const dish of group.dishes || []) byId.set(dish.id, dish);
      merged[key] = { ...original, dishes: [...byId.values()] };
    }
    return merged;
  }
  function collect(database, seen = new Set()) {
    const result = [];
    for (const [mealId, group] of Object.entries(database || {})) {
      if (!Array.isArray(group?.dishes)) continue;
      for (const dish of group.dishes) {
        if (!dish?.id || seen.has(dish.id)) continue;
        seen.add(dish.id);
        result.push({ ...dish, mealId: group.id || mealId, mealName: group.name });
      }
    }
    return result;
  }
  function allDishes() {
    const result = [],
      seen = new Set();
    for (const region of Object.keys(
      typeof REGIONAL_DATABASES !== 'undefined' ? REGIONAL_DATABASES : { vi: 1 }
    ))
      result.push(...collect(builtin(region), seen));
    for (const database of custom.values()) result.push(...collect(database, seen));
    return result;
  }
  function registerRegion(region, database) {
    if (typeof region !== 'string' || !region.trim() || !database || typeof database !== 'object')
      throw new Error('Khu vực không hợp lệ.');
    custom.set(region, database);
    registerIds(collect(database).map((d) => d.id));
    revision++;
    return revision;
  }
  function upsertCustom(dish, region = dish?.region || 'vi', source) {
    if (!dish || typeof dish.id !== 'string' || !dish.id.trim())
      throw new Error('Món ăn không hợp lệ.');
    const db = custom.get(region) || Object.create(null);
    const groupKey = source || dish.mealId || 'morning';
    const group = db[groupKey] || (db[groupKey] = { id: groupKey, name: groupKey, dishes: [] });
    const index = group.dishes.findIndex((item) => item.id === dish.id);
    if (index < 0) group.dishes.push({ ...dish });
    else group.dishes[index] = { ...dish };
    custom.set(region, db);
    registerIds([dish.id]);
    revision++;
    return { ...dish };
  }
  function registerIds(values) {
    let changed = false;
    for (const id of values || [])
      if (typeof id === 'string' && id.trim() && !ids.has(id)) {
        ids.add(id);
        changed = true;
      }
    if (changed) revision++;
    return [...ids];
  }
  const api = {
    getDatabase,
    getRegion: getDatabase,
    allDishes,
    getAllDishes: allDishes,
    getDish(id) {
      return allDishes().find((dish) => dish.id === id) || null;
    },
    registerRegion,
    upsertCustom,
    registerIds,
    getRevision() {
      return revision;
    },
    get revision() {
      return revision;
    },
  };
  if (typeof window !== 'undefined') {
    window.FoodCatalog = api;
    window.Catalog = api;
  }
  return api;
})();
const Catalog = FoodCatalog;
