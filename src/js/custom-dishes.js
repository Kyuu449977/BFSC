/* Shared custom-dish transport; 4xx validation must not become silent local success. */
const CustomDishes = {
  message(key) {
    return typeof UICopy !== 'undefined' ? UICopy.text(key) : key;
  },
  uuid() {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;
    const hex = [...bytes].map((v) => v.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  },
  async load() {
    const dishes = new Map();
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/custom-dishes', { signal: controller.signal });
      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows))
          for (const dish of rows)
            if (dish && typeof dish.id === 'string') dishes.set(dish.id, dish);
      }
    } catch (_) {
    } finally {
      clearTimeout(timeout);
    }
    try {
      const local = JSON.parse(localStorage.getItem('food_custom_dishes') || '[]');
      if (Array.isArray(local))
        for (const dish of local)
          if (dish && typeof dish.id === 'string' && !dishes.has(dish.id))
            dishes.set(dish.id, dish);
    } catch (_) {}
    return [...dishes.values()];
  },
  async save(payload) {
    const requestId = payload.id ?? this.uuid();
    if (
      typeof requestId !== 'string' ||
      !/^(?:custom_)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)
    )
      throw new Error(this.message('invalid'));
    payload = { ...payload, id: 'custom_' + requestId.toLowerCase().replace(/^custom_/, '') };
    if (
      !['vi', 'ja', 'ko', 'zh', 'en'].includes(payload.region) ||
      !['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks'].includes(payload.mealId)
    )
      throw new Error(this.message('invalid'));
    for (const [key, max] of [
      ['name', 120],
      ['type', 80],
      ['desc', 2000],
      ['quote', 300],
    ]) {
      if (
        payload[key] !== undefined &&
        (typeof payload[key] !== 'string' || payload[key].trim().length > max)
      )
        throw new Error(this.message('invalid'));
    }
    if ((payload.name || '').trim().length < 2) throw new Error(this.message('invalid'));
    if (
      ![3, 4, 5].includes(payload.rarity ?? 4) ||
      !Number.isFinite(payload.calories ?? 350) ||
      (payload.calories ?? 350) < 0 ||
      (payload.calories ?? 350) > 10000
    )
      throw new Error(this.message('invalid'));
    if (
      payload.image &&
      !/^data:image\/webp;base64,[A-Za-z0-9+/]+={0,2}$/.test(payload.image) &&
      !['assets/brand.svg', 'assets/image-unavailable.svg'].includes(payload.image)
    )
      throw new Error(this.message('invalid'));
    const amount = Money.toMinor(payload.price, payload.region);
    if (amount === null || Math.abs(Money.toMajor(amount, payload.region) - payload.price) > 1e-8)
      throw new Error(this.message('invalid'));
    if (new TextEncoder().encode(JSON.stringify(payload)).length > 2 * 1024 * 1024)
      throw new Error(this.message('tooLarge'));
    let response;
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 15000);
    try {
      response = await fetch('/api/custom-dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (_) {
    } finally {
      clearTimeout(timeout);
    }
    if (response?.ok) {
      const result = await response.json();
      if (!result.dish || result.dish.id !== payload.id) throw new Error(this.message('response'));
      return { dish: result.dish, local: false };
    }
    if (
      response &&
      response.status >= 400 &&
      response.status < 500 &&
      ![404, 405].includes(response.status)
    )
      throw new Error(this.message('invalid'));
    const list = JSON.parse(localStorage.getItem('food_custom_dishes') || '[]');
    const dish = { ...payload, isUserCustom: true };
    localStorage.setItem(
      'food_custom_dishes',
      JSON.stringify([...list.filter((d) => d.id !== dish.id), dish])
    );
    return { dish, local: true };
  },
};
