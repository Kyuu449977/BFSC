/* Independent persisted keys; storage subscribers never write back. */
const Settings = (() => {
  const listeners = new Set();
  const valid = (key, v) => {
    if (key === 'budget')
      return v === null || (typeof v === 'number' && Number.isFinite(v) && v >= 0);
    if (key === 'customColor') return typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v);
    if (key === 'language') return ['vi', 'en', 'ja', 'ko', 'zh'].includes(v);
    if (key === 'theme') return ['system', 'orange', 'green', 'blue', 'rose', 'custom'].includes(v);
    if (key === 'appearance') return ['light', 'dark', 'system', 'auto'].includes(v);
    if (key === 'timezone') {
      if (v === 'auto') return true;
      try {
        new Intl.DateTimeFormat('en', { timeZone: v });
        return typeof v === 'string';
      } catch (_) {
        return false;
      }
    }
    return ['unique', 'muted'].includes(key) && typeof v === 'boolean';
  };
  function read() {
    let result = {};
    try {
      result = JSON.parse(localStorage.getItem('food_case_settings') || '{}') || {};
    } catch (_) {}
    for (const key of [
      'unique',
      'muted',
      'budget',
      'theme',
      'customColor',
      'appearance',
      'timezone',
      'language',
    ]) {
      try {
        const raw = localStorage.getItem('food_case_setting_' + key);
        if (raw !== null) result[key] = JSON.parse(raw);
      } catch (_) {}
    }
    return Object.fromEntries(Object.entries(result).filter(([key, value]) => valid(key, value)));
  }
  function update(patch, { persist = true } = {}) {
    if (Object.entries(patch).some(([key, value]) => !valid(key, value)))
      throw new Error('Invalid settings');
    if (persist) {
      for (const [key, value] of Object.entries(patch))
        localStorage.setItem('food_case_setting_' + key, JSON.stringify(value));
      localStorage.setItem('food_case_settings', JSON.stringify(read()));
    }
    listeners.forEach((fn) => fn({ ...read(), ...patch }));
  }
  if (typeof window !== 'undefined')
    window.addEventListener('storage', (e) => {
      if (e.key === null || e.key.startsWith('food_case_setting'))
        listeners.forEach((fn) => fn(read()));
    });
  return {
    read,
    update,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
})();
