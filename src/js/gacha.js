class GachaEngine {
  constructor() {
    this.preferences =
      typeof DishPreferences === 'function' ? new DishPreferences(this.getAllDishesList()) : null;
    this.currentMode = 'main';
    this.currentDish = null;
    this.committed = new WeakSet();
    this.collection = {};
    this.drawHistory = {};
    this.lastDraw = new Set();
    try {
      const saved = JSON.parse(sessionStorage.getItem('food_case_draw_history') || '{}');
      const ids = new Set(this.getAllDishesList().map((d) => d.id));
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        for (const [id, count] of Object.entries(saved.counts || {})) {
          if (ids.has(id) && Number.isSafeInteger(count) && count > 0 && count <= 1000000)
            this.drawHistory[id] = count;
        }
        if (Array.isArray(saved.last))
          this.lastDraw = new Set(saved.last.filter((id) => ids.has(id)).slice(0, 3));
      }
    } catch (_) {}
    try {
      const saved = JSON.parse(localStorage.getItem('food_case_collection') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        for (const dish of this.getAllDishesList()) {
          if (Number.isSafeInteger(saved[dish.id]) && saved[dish.id] > 0)
            this.collection[dish.id] = saved[dish.id];
        }
      }
    } catch (_) {}
    this.pendingCommits = new WeakMap();
    this.commitStatus = new WeakMap();
    if (typeof CollectionStore === 'function') {
      this.store = new CollectionStore(
        this.getAllDishesList().map((d) => d.id),
        this.collection,
        (counts) => {
          this.collection = counts;
          document.dispatchEvent(new Event('foodcollectionchange'));
        }
      );
      this.ready = this.store.ready;
    } else this.ready = Promise.resolve();
  }

  saveCollection() {
    try {
      localStorage.setItem('food_case_collection', JSON.stringify(this.collection));
      return true;
    } catch (_) {
      return false;
    }
  }

  setMode(mode) {
    if (!['main', 'snacks', 'drinks'].includes(mode)) throw new Error('Danh mục không hợp lệ.');
    this.currentMode = mode;
  }

  getActiveBannerKey(mode = this.currentMode) {
    return mode === 'main' ? getCurrentMealPeriod() : mode;
  }
  getCurrentBannerData() {
    return FOOD_DATABASE[this.getActiveBannerKey()];
  }

  prices(dish) {
    const min = dish.priceMin,
      max = dish.priceMax;
    return Number.isSafeInteger(min) && Number.isSafeInteger(max) && min >= 0 && max >= min
      ? { min, max }
      : null;
  }

  signature(mode, unique, budget, period = getCurrentMealPeriod()) {
    return JSON.stringify([period, mode, unique, budget, this.preferences?.revision || 0]);
  }

  candidates(pools, budget, unique) {
    const choices = [];
    const visit = (index, selected, sum) => {
      if (index === pools.length) {
        choices.push([...selected]);
        return;
      }
      for (const item of pools[index]) {
        const price = this.prices(item.dish);
        if (budget !== null && (!price || sum + price.min > budget)) continue;
        if (unique && selected.some((previous) => previous.dish.id === item.dish.id)) continue;
        selected.push(item);
        visit(index + 1, selected, sum + (price?.min || 0));
        selected.pop();
      }
    };
    visit(0, [], 0);
    return choices;
  }

  prepareSelection({ mode = this.currentMode, unique = true, budget = null } = {}) {
    if (!['main', 'snacks', 'drinks'].includes(mode) || typeof unique !== 'boolean')
      throw new Error('Yêu cầu chọn món không hợp lệ.');
    if (budget !== null && (!Number.isSafeInteger(budget) || budget < 0))
      throw new Error('Ngân sách phải là số tiền hợp lệ.');
    const period = getCurrentMealPeriod();
    const key = mode === 'main' ? period : mode;
    const group = (source) =>
      FOOD_DATABASE[source].dishes
        .filter((dish) => !this.preferences || this.preferences.eligible(dish, source))
        .map((dish) => ({
          dish,
          source,
          sourceName: FOOD_DATABASE[source].name,
        }));
    const pool = group(key);
    const main = group(period),
      snacks = group('snacks'),
      drinks = group('drinks');
    const minCost = (items) => {
      const values = items
        .map((item) => this.prices(item.dish)?.min)
        .filter((value) => value != null);
      return values.length ? Math.min(...values) : null;
    };
    const priced = pool
      .map((item) => this.prices(item.dish)?.min)
      .filter((value) => value != null)
      .sort((a, b) => a - b);
    const tripleMin = unique
      ? priced.length >= 3
        ? priced.slice(0, 3).reduce((a, b) => a + b, 0)
        : null
      : priced.length
        ? priced[0] * 3
        : null;
    const comboCosts = [main, snacks, drinks].map(minCost);
    return {
      signature: this.signature(mode, unique, budget, period),
      mode,
      unique,
      budget,
      period,
      key,
      singles: this.candidates([pool], budget, false),
      triples: this.candidates([pool, pool, pool], budget, unique),
      combos: this.candidates([main, snacks, drinks], budget, false),
      minimums: {
        single: priced[0] ?? null,
        triple: tripleMin,
        combo: comboCosts.every((n) => n !== null) ? comboCosts.reduce((a, b) => a + b, 0) : null,
      },
    };
  }

  pick(choices) {
    if (!choices.length)
      throw new Error(
        'Không có lựa chọn phù hợp với ngân sách hoặc sở thích. Hãy bỏ bớt bộ lọc hoặc khôi phục món đã ẩn.'
      );
    // Rank only eligible choices: avoid the last reveal, then balance exposure.
    // Ties remain random, so the next result is never a fixed rotation.
    let bestRecent = Infinity,
      bestOverlap = Infinity,
      bestExposure = Infinity,
      finalists = [];
    for (const choice of choices) {
      const recent = this.preferences?.avoidRecent
        ? choice.reduce((sum, item) => sum + Number(this.preferences.recent(item.dish)), 0)
        : 0;
      const overlap = choice.reduce(
        (sum, item) => sum + Number(this.lastDraw.has(item.dish.id)),
        0
      );
      const exposure = choice.reduce((sum, item) => sum + (this.drawHistory[item.dish.id] || 0), 0);
      if (
        recent < bestRecent ||
        (recent === bestRecent &&
          (overlap < bestOverlap || (overlap === bestOverlap && exposure < bestExposure)))
      ) {
        bestRecent = recent;
        bestOverlap = overlap;
        bestExposure = exposure;
        finalists = [choice];
      } else if (recent === bestRecent && overlap === bestOverlap && exposure === bestExposure)
        finalists.push(choice);
    }
    return finalists[Math.floor(Math.random() * finalists.length)].map((item) => ({ ...item }));
  }

  drawDishes({
    mode = this.currentMode,
    count = 1,
    unique = true,
    budget = null,
    prepared = null,
  } = {}) {
    if (!Number.isInteger(count) || count < 1 || count > 3)
      throw new Error('Yêu cầu chọn món không hợp lệ.');
    const plan = prepared || this.prepareSelection({ mode, unique, budget });
    if (plan.signature !== this.signature(mode, unique, budget))
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
    const key = this.getActiveBannerKey(mode);
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
      }));
    return this.pick(this.candidates([pool, pool], budget, unique));
  }

  drawCombo({ budget = null, prepared = null } = {}) {
    const plan = prepared || this.prepareSelection({ budget });
    if (plan.signature !== this.signature(plan.mode, plan.unique, budget))
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
    return this.pick(plan.combos);
  }

  rememberResults(results) {
    this.lastDraw = new Set(results.map((item) => item.dish.id));
    for (const item of results)
      this.drawHistory[item.dish.id] = Math.min(1000000, (this.drawHistory[item.dish.id] || 0) + 1);
    try {
      sessionStorage.setItem(
        'food_case_draw_history',
        JSON.stringify({ counts: this.drawHistory, last: [...this.lastDraw] })
      );
    } catch (_) {}
  }

  totalPrice(results) {
    const prices = results.map((item) => this.prices(item.dish));
    return prices.every(Boolean)
      ? {
          min: prices.reduce((sum, price) => sum + price.min, 0),
          max: prices.reduce((sum, price) => sum + price.max, 0),
        }
      : null;
  }

  commitResults(results) {
    if (this.committed.has(results))
      return { saved: this.commitStatus.get(results)?.saved ?? true, changed: false };
    if (this.pendingCommits.has(results)) return this.pendingCommits.get(results);
    if (this.store) {
      const pending = this.store
        .increment(results.map((result) => result.dish.id))
        .then((state) => {
          if (!state) return this.commitMemory(results, false);
          results.forEach((result, index) => Object.assign(result, state.outcomes[index]));
          this.rememberResults(results);
          this.committed.add(results);
          this.currentDish = results[0]?.dish || null;
          this.commitStatus.set(results, { saved: true });
          return { saved: true, changed: true };
        })
        .catch(() => this.commitMemory(results, false));
      this.pendingCommits.set(results, pending);
      return pending;
    }
    return this.commitMemory(results, true);
  }

  commitMemory(results, persist) {
    results.forEach((result) => {
      const id = result.dish.id;
      result.isNew = !this.collection[id];
      this.collection[id] = Math.min(Number.MAX_SAFE_INTEGER, (this.collection[id] || 0) + 1);
      result.count = this.collection[id];
    });
    this.rememberResults(results);
    this.committed.add(results);
    this.currentDish = results[0]?.dish || null;
    const saved = persist ? this.saveCollection() : false;
    this.commitStatus.set(results, { saved });
    return { saved, changed: true };
  }

  getAllDishesList() {
    return Object.values(FOOD_DATABASE).flatMap((group) =>
      group.dishes.map((d) => ({ ...d, mealId: group.id, mealName: group.name }))
    );
  }

  getCollectionStats() {
    const all = this.getAllDishesList();
    const unlocked = all.filter((d) => this.collection[d.id] > 0).length;
    return { total: all.length, unlocked, percentage: Math.round((unlocked / all.length) * 100) };
  }
}
const gachaEngine = new GachaEngine();
