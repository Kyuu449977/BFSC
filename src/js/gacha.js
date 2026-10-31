class GachaEngine {
  constructor(randomSource = Math.random) {
    if (typeof randomSource !== 'function') throw new TypeError('Nguồn ngẫu nhiên không hợp lệ.');
    this.random = randomSource;
    this.currentRegion = 'vi';
    this.currentMode = 'main';
    this.currentDish = null;
    this.preferences =
      typeof DishPreferences === 'function' ? new DishPreferences(this.getAllDishesList()) : null;
    this.committed = new WeakSet();
    this.pendingCommits = new WeakMap();
    this.commitStatus = new WeakMap();
    this.collection = {};
    this.drawHistory = {};
    this.lastDraw = new Set();
    const all = typeof Catalog !== 'undefined' ? Catalog.getAllDishes() : this.getAllDishesList(),
      ids = new Set(all.map((d) => d.id));
    try {
      const saved = JSON.parse(sessionStorage.getItem('food_case_draw_history') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        for (const [id, count] of Object.entries(saved.counts || {}))
          if (Number.isSafeInteger(count) && count > 0 && count <= 1000000)
            this.drawHistory[id] = count;
        if (Array.isArray(saved.last))
          this.lastDraw = new Set(saved.last.filter((id) => ids.has(id)).slice(0, 3));
      }
    } catch (_) {}
    try {
      const saved = JSON.parse(localStorage.getItem('food_case_collection') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved))
        for (const [id, count] of Object.entries(saved))
          if (Number.isSafeInteger(count) && count > 0) this.collection[id] = count;
    } catch (_) {}
    this.store =
      typeof CollectionStore === 'function'
        ? new CollectionStore(
            all.map((d) => d.id),
            this.collection,
            (counts) => {
              this.collection = counts;
              if (typeof document !== 'undefined')
                document.dispatchEvent(new Event('foodcollectionchange'));
            }
          )
        : null;
    this.ready = this.store ? this.store.ready : Promise.resolve();
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
  setRegion(region) {
    if (!region || this.currentRegion === region) return;
    this.currentRegion = region;
    const known = typeof Catalog !== 'undefined' ? Catalog.getAllDishes() : this.getAllDishesList();
    if (this.preferences?.syncAllDishes) this.preferences.syncAllDishes(known);
    this.store?.registerIds(known.map((d) => d.id));
  }
  registerIds(ids) {
    if (typeof Catalog !== 'undefined') Catalog.registerIds(ids);
    this.preferences?.registerIds?.(ids);
    this.store?.registerIds(ids);
    return ids?.length || 0;
  }
  getActiveDatabase() {
    return (
      (typeof Catalog !== 'undefined' && Catalog.getRegion(this.currentRegion)) ||
      (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE : {})
    );
  }
  getActiveBannerKey(mode = this.currentMode) {
    return mode === 'main' ? getCurrentMealPeriod() : mode;
  }
  getCurrentBannerData() {
    const db = this.getActiveDatabase();
    return (
      (db[this.getActiveBannerKey()]?.dishes?.length ? db[this.getActiveBannerKey()] :
        (this.currentMode === 'main' ? db.morning : db[this.getActiveBannerKey()])) ||
      (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[this.getActiveBannerKey()] : null)
    );
  }
  getCurrency() {
    return (
      (typeof getCurrencyConfig === 'function'
        ? getCurrencyConfig(this.currentRegion)?.code
        : null) ||
      { vi: 'VND', ja: 'JPY', ko: 'KRW', zh: 'CNY', en: 'USD' }[this.currentRegion] ||
      'VND'
    );
  }
  prices(dish) {
    if (!dish) return null;
    let min = dish.priceMin,
      max = dish.priceMax;
    if (min === undefined && max === undefined) {
      if (Array.isArray(dish.priceRange) && dish.priceRange.length === 2)
        [min, max] = dish.priceRange;
      else if (typeof dish.price === 'number') min = max = dish.price;
    }
    if (
      typeof Money !== 'undefined' &&
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      min >= 0 &&
      max >= min
    ) {
      const minMinor = Money.fromMajor(min, this.getCurrency()),
        maxMinor = Money.fromMajor(max, this.getCurrency());
      if (minMinor !== null && maxMinor !== null)
        return {
          min: Money.toMajor(minMinor, this.getCurrency()),
          max: Money.toMajor(maxMinor, this.getCurrency()),
        };
    }
    if (typeof Money !== 'undefined' && typeof dish.price === 'string') {
      const nums = dish.price.match(/[\d][\d.,]*/g) || [];
      if (nums.length) {
        const vals = nums.map((v) => Money.parse(v, this.getCurrency()));
        if (vals.every((v) => v !== null))
          return {
            min: Money.toMajor(Math.min(...vals), this.getCurrency()),
            max: Money.toMajor(Math.max(...vals), this.getCurrency()),
          };
      }
    }
    return null;
  }
  minor(amount) {
    return typeof Money !== 'undefined' ? Money.fromMajor(amount, this.getCurrency()) : amount;
  }
  signature(mode, unique, budget, period = getCurrentMealPeriod()) {
    return JSON.stringify([
      this.currentRegion,
      period,
      mode,
      unique,
      budget,
      this.preferences?.revision || 0,
      typeof Catalog !== 'undefined' ? Catalog.getRevision() : 0,
    ]);
  }
  group(source, db = this.getActiveDatabase()) {
    const src =
      db[source] ||
      (typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE[source] : { dishes: [], name: '' });
    return (src.dishes || [])
      .filter((d) => !this.preferences || this.preferences.eligible(d, source))
      .map((d) => ({ dish: d, source, sourceName: src.name }));
  }
  prepareSelection({ mode = this.currentMode, unique = true, budget = null } = {}) {
    if (!['main', 'snacks', 'drinks'].includes(mode) || typeof unique !== 'boolean')
      throw new Error('Yêu cầu chọn món không hợp lệ.');
    if (budget !== null && (!Number.isFinite(budget) || budget < 0 || this.minor(budget) === null))
      throw new Error('Ngân sách phải là số tiền hợp lệ.');
    const period = getCurrentMealPeriod(),
      db = this.getActiveDatabase(),
      eligible = (s) => this.group(s, db);
    let single;
    if (mode === 'main') {
      const seen = new Set();
      single = ['morning', 'lunch', 'afternoon', 'dinner']
        .flatMap(eligible)
        .filter((x) => !seen.has(x.dish.id) && seen.add(x.dish.id));
    } else single = eligible(mode);
    const mainSeen = new Set(),
      main = ['morning', 'lunch', 'afternoon', 'dinner']
        .flatMap(eligible)
        .filter((x) => !mainSeen.has(x.dish.id) && mainSeen.add(x.dish.id));
    const snacks = eligible('snacks'),
      drinks = eligible('drinks'),
      budgetMinor = budget === null ? null : this.minor(budget);
    const affordable = (items) =>
      items.filter((item) => {
        const p = this.prices(item.dish);
        return budgetMinor === null || (!!p && this.minor(p.min) <= budgetMinor);
      });
    const pools = {
      single: affordable(single),
      main: affordable(main),
      snacks: affordable(snacks),
      drinks: affordable(drinks),
    };
    const mins = (items) => {
      const values = items
        .map((x) => this.prices(x.dish))
        .filter(Boolean)
        .map((p) => this.minor(p.min));
      return values.length ? Math.min(...values) : null;
    };
    const minSingle = mins(single),
      singleItems = affordable(single);
    const minByIdentity = new Map();
    for (const item of single) {
      const price = this.prices(item.dish);
      if (!price) continue;
      const identity = unique
        ? (item.dish.name || item.dish.id).trim().toLocaleLowerCase()
        : String(minByIdentity.size);
      const value = this.minor(price.min);
      if (!minByIdentity.has(identity) || value < minByIdentity.get(identity))
        minByIdentity.set(identity, value);
    }
    const sorted = [...minByIdentity.values()].sort((a, b) => a - b);
    const triple = unique
      ? sorted.length >= 3
        ? sorted.slice(0, 3).reduce((a, b) => a + b, 0)
        : null
      : sorted.length
        ? sorted[0] * 3
        : null;
    const comboParts = [mins(main), mins(snacks), mins(drinks)],
      combo = comboParts.every((x) => x !== null) ? comboParts.reduce((a, b) => a + b, 0) : null;
    const minMajor = (n) =>
      n === null ? null : typeof Money !== 'undefined' ? Money.toMajor(n, this.getCurrency()) : n;
    const avail = (kind) => {
      const size = kind === 'single' ? 1 : 3;
      const poolsFor = kind === 'combo' ? [pools.main, pools.snacks, pools.drinks] : [singleItems];
      if (kind === 'triple' && unique && eligibleSingleCount < 3) return false;
      return (
        poolsFor.every((a) => a.length) &&
        (kind === 'single' ||
          budgetMinor === null ||
          ((kind === 'combo' ? combo : triple) !== null &&
            (kind === 'combo' ? combo : triple) <= budgetMinor))
      );
    };
    const eligibleSingleCount = unique
      ? new Set(pools.single.map((x) => (x.dish.name || x.dish.id).trim().toLocaleLowerCase())).size
      : pools.single.length;
    return {
      signature: this.signature(mode, unique, budget, period),
      mode,
      unique,
      budget,
      period,
      key: mode,
      pools,
      eligibleSingleCount,
      availability: { single: avail('single'), triple: avail('triple'), combo: avail('combo') },
      minimumsMinor: { single: minSingle, triple: triple, combo },
      minimums: { single: minMajor(minSingle), triple: minMajor(triple), combo: minMajor(combo) },
    };
  }
  assertPlan(plan, mode, unique, budget) {
    if (plan.signature !== this.signature(mode, unique, budget))
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
  }
  async pickGenerated(generator, stillCurrent = () => true) {
    if (!stillCurrent())
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
    const ranks = new Map();
    const rank = (item) => {
      let score = ranks.get(item.dish.id);
      if (!score) {
        score = [
          this.preferences?.avoidRecent ? Number(this.preferences.recent(item.dish)) : 0,
          Number(this.lastDraw.has(item.dish.id)),
          this.drawHistory[item.dish.id] || 0,
        ];
        ranks.set(item.dish.id, score);
      }
      return score;
    };
    let best = null,
      ties = 0,
      seen = 0,
      lastYield = Date.now();
    for (const choice of generator) {
      let recent = 0,
        overlap = 0,
        exposure = 0;
      for (const item of choice) {
        const score = rank(item);
        recent += score[0];
        overlap += score[1];
        exposure += score[2];
      }
      const score = [recent, overlap, exposure];
      const comparison = !best
        ? -1
        : recent - best.score[0] || overlap - best.score[1] || exposure - best.score[2];
      if (comparison < 0) {
        best = { score, choice };
        ties = 1;
      } else if (comparison === 0 && this.random() < 1 / ++ties) best = { score, choice };
      if (++seen % 4096 === 0 || Date.now() - lastYield >= 8) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        lastYield = Date.now();
        if (!stillCurrent())
          throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
      }
    }
    if (!stillCurrent())
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
    if (!best)
      throw new Error(
        'Không có lựa chọn phù hợp với ngân sách hoặc sở thích. Hãy bỏ bớt bộ lọc hoặc khôi phục món đã ẩn.'
      );
    return best.choice.map((x) => ({ ...x }));
  }
  *combinations(pools, count, unique, budgetMinor) {
    const chosen = [],
      costs = new Map(),
      identities = new Map();
    for (const pool of pools)
      for (const item of pool) {
        if (!costs.has(item.dish)) {
          const price = this.prices(item.dish);
          costs.set(item.dish, price ? this.minor(price.min) : null);
        }
        if (!identities.has(item.dish)) {
          identities.set(item.dish, {
            id: item.dish.id,
            name: item.dish.name?.trim().toLocaleLowerCase() || '',
          });
        }
      }
    // Each valid distinct set has exactly count! permutations with the same
    // price/rank. Visit it once, then shuffle the selected set uniformly.
    const unordered = unique && pools.every((pool) => pool === pools[0]);
    const indexes = [];
    const walk = function* (depth, sum) {
      if (depth === count) {
        yield [...chosen];
        return;
      }
      for (
        let index = unordered && depth ? indexes[depth - 1] + 1 : 0;
        index < pools[depth].length;
        index++
      ) {
        const item = pools[depth][index];
        const cost = costs.get(item.dish);
        if (cost === null && budgetMinor !== null) continue;
        const minor = cost ?? 0;
        if (budgetMinor !== null && sum + minor > budgetMinor) continue;
        const current = identities.get(item.dish);
        if (
          unique &&
          chosen.some((x) => {
            const previous = identities.get(x.dish);
            return previous.id === current.id || (current.name && previous.name === current.name);
          })
        )
          continue;
        chosen.push(item);
        indexes[depth] = index;
        yield* walk.call(this, depth + 1, sum + minor);
        chosen.pop();
      }
    };
    yield* walk.call(this, 0, 0);
  }
  async pickIndependent(pools, stillCurrent) {
    const results = [];
    for (const pool of pools) {
      function* singles() {
        for (const item of pool) yield [item];
      }
      results.push(...(await this.pickGenerated(singles(), stillCurrent)));
    }
    if (!stillCurrent())
      throw new Error('Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.');
    return results;
  }
  async drawDishes({
    mode = this.currentMode,
    count = 1,
    unique = true,
    budget = null,
    prepared = null,
  } = {}) {
    if (!Number.isInteger(count) || count < 1 || count > 3)
      throw new Error('Yêu cầu chọn món không hợp lệ.');
    const plan = prepared || this.prepareSelection({ mode, unique, budget });
    this.assertPlan(plan, mode, unique, budget);
    if (unique && plan.eligibleSingleCount > 0 && plan.eligibleSingleCount < count)
      throw new Error('Không đủ món khác nhau. Hãy chọn ít món hơn hoặc tắt tùy chọn không trùng.');
    const budgetMinor = budget === null ? null : this.minor(budget);
    if (budget === null && !unique)
      return this.pickIndependent(
        Array(count).fill(plan.pools.single),
        () => plan.signature === this.signature(mode, unique, budget)
      );
    const results = await this.pickGenerated(
      this.combinations(Array(count).fill(plan.pools.single), count, unique, budgetMinor),
      () => plan.signature === this.signature(mode, unique, budget)
    );
    this.assertPlan(plan, mode, unique, budget);
    if (unique)
      for (let index = results.length - 1; index > 0; index--) {
        const swap = Math.floor(this.random() * (index + 1));
        [results[index], results[swap]] = [results[swap], results[index]];
      }
    return results;
  }
  async drawCombo({ budget = null, prepared = null } = {}) {
    const plan = prepared || this.prepareSelection({ budget });
    this.assertPlan(plan, plan.mode, plan.unique, budget);
    if (budget === null)
      return this.pickIndependent(
        [plan.pools.main, plan.pools.snacks, plan.pools.drinks],
        () => plan.signature === this.signature(plan.mode, plan.unique, budget)
      );
    return this.pickGenerated(
      this.combinations(
        [plan.pools.main, plan.pools.snacks, plan.pools.drinks],
        3,
        false,
        budget === null ? null : this.minor(budget)
      ),
      () => plan.signature === this.signature(plan.mode, plan.unique, budget)
    );
  }
  rememberResults(results) {
    this.lastDraw = new Set(results.map((x) => x.dish.id));
    for (const x of results)
      this.drawHistory[x.dish.id] = Math.min(1000000, (this.drawHistory[x.dish.id] || 0) + 1);
    try {
      sessionStorage.setItem(
        'food_case_draw_history',
        JSON.stringify({ counts: this.drawHistory, last: [...this.lastDraw] })
      );
    } catch (_) {}
  }
  totalPrice(results) {
    const ps = results.map((x) => this.prices(x.dish));
    if (!ps.every(Boolean)) return null;
    const min = ps.reduce((n, p) => n + this.minor(p.min), 0),
      max = ps.reduce((n, p) => n + this.minor(p.max), 0);
    return { min: this.fromMinor(min), max: this.fromMinor(max) };
  }
  fromMinor(value) {
    return typeof Money !== 'undefined' ? Money.toMajor(value, this.getCurrency()) : value;
  }
  async commitResults(results) {
    if (this.committed.has(results))
      return { saved: this.commitStatus.get(results)?.saved ?? true, changed: false };
    if (this.pendingCommits.has(results)) return this.pendingCommits.get(results);
    if (this.store) {
      const pending = this.store
        .increment(results.map((x) => x.dish.id))
        .then((state) => {
          if (!state) return this.commitMemory(results, false);
          results.forEach((x, i) => Object.assign(x, state.outcomes[i]));
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
    results.forEach((x) => {
      const id = x.dish.id;
      x.isNew = !this.collection[id];
      this.collection[id] = Math.min(Number.MAX_SAFE_INTEGER, (this.collection[id] || 0) + 1);
      x.count = this.collection[id];
    });
    this.rememberResults(results);
    this.committed.add(results);
    this.currentDish = results[0]?.dish || null;
    const saved = persist ? this.saveCollection() : false;
    this.commitStatus.set(results, { saved });
    return { saved, changed: true };
  }
  getAllDishesList() {
    return this.getDishesFrom(this.getActiveDatabase());
  }
  getDishesFrom(db) {
    const seen = new Set(),
      list = [];
    for (const [id, g] of Object.entries(db || {}))
      for (const d of g?.dishes || [])
        if (d?.id && !seen.has(d.id)) {
          seen.add(d.id);
          list.push({ ...d, mealId: g.id || id, mealName: g.name });
        }
    return list;
  }
  getCollectionStats() {
    const all = this.getAllDishesList(),
      unlocked = all.filter((d) => this.collection[d.id] > 0).length;
    return {
      total: all.length,
      unlocked,
      percentage: all.length ? Math.round((unlocked / all.length) * 100) : 0,
    };
  }
}
const gachaEngine = new GachaEngine();
if (typeof window !== 'undefined') window.gachaEngine = gachaEngine;
