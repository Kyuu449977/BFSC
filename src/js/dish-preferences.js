/* Device-local taste profile, independent from the discovery collection. */
class DishPreferences {
  constructor(dishes) {
    this.prefix = 'food_case_personal_';
    this.byId = new Map();
    this.names = new Map();
    this.states = new Map();
    this.revision = 0;
    for (const dish of dishes) {
      if (!this.names.has(dish.name)) this.names.set(dish.name, dish.id);
      this.byId.set(dish.id, this.names.get(dish.name));
    }
    this.craving = 'all';
    this.avoidRecent = false;
    this.reload();
  }
  read(key, fallback, valid) {
    try {
      const value = JSON.parse(localStorage.getItem(this.prefix + key));
      return valid(value) ? value : fallback;
    } catch (_) {
      return fallback;
    }
  }
  reload() {
    for (const id of this.names.values())
      this.states.set(id, {
        favorite: this.read(id + '_favorite', false, (v) => typeof v === 'boolean'),
        hidden: this.read(id + '_hidden', false, (v) => typeof v === 'boolean'),
        eaten: this.read(
          id + '_eaten',
          0,
          (v) => Number.isSafeInteger(v) && v >= 0 && v <= Date.now() + 300000
        ),
      });
    this.craving = this.read('craving', 'all', (v) =>
      ['all', 'rice', 'soup', 'light', 'spicy', 'mild'].includes(v)
    );
    this.avoidRecent = this.read('avoidRecent', false, (v) => typeof v === 'boolean');
    this.revision++;
  }
  state(dish) {
    return this.states.get(this.byId.get(dish.id)) || { favorite: false, hidden: false, eaten: 0 };
  }
  recent(dish, now = Date.now()) {
    const timestamp = this.state(dish).eaten;
    return timestamp > 0 && now - timestamp < 3 * 86400000;
  }
  eligible(dish, source) {
    return (
      !this.state(dish).hidden &&
      (source === 'snacks' ||
        source === 'drinks' ||
        this.craving === 'all' ||
        dish.tags?.includes(this.craving))
    );
  }
  write(key, value) {
    this.revision++;
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }
  set(dish, field, value) {
    const id = this.byId.get(dish.id);
    if (!id || !['favorite', 'hidden', 'eaten'].includes(field))
      throw new Error('Tùy chọn món không hợp lệ.');
    if (
      field === 'eaten'
        ? !Number.isSafeInteger(value) || value < 0 || value > Date.now() + 300000
        : typeof value !== 'boolean'
    )
      throw new Error('Giá trị không hợp lệ.');
    this.states.get(id)[field] = value;
    return this.write(id + '_' + field, value);
  }
  configure(key, value) {
    if (
      !(
        (key === 'craving' && ['all', 'rice', 'soup', 'light', 'spicy', 'mild'].includes(value)) ||
        (key === 'avoidRecent' && typeof value === 'boolean')
      )
    )
      throw new Error('Sở thích không hợp lệ.');
    this[key] = value;
    return this.write(key, value);
  }
}
