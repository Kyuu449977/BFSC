/* Load synchronously before CSS to restore appearance before the first paint. */
const AppearancePreferences = (() => {
  const defaults = { theme: 'orange', appearance: 'light' };
  const allowed = {
    theme: ['orange', 'green', 'blue', 'rose'],
    appearance: ['light', 'dark', 'system'],
  };
  function read() {
    const result = { ...defaults };
    let legacy = {};
    try {
      legacy = JSON.parse(localStorage.getItem('food_case_settings') || '{}') || {};
    } catch (_) {}
    for (const key of Object.keys(defaults)) {
      if (allowed[key].includes(legacy[key])) result[key] = legacy[key];
      try {
        const saved = JSON.parse(localStorage.getItem('food_case_setting_' + key));
        if (allowed[key].includes(saved)) result[key] = saved;
      } catch (_) {}
    }
    return result;
  }
  function apply(preferences) {
    const theme = allowed.theme.includes(preferences.theme) ? preferences.theme : defaults.theme;
    const appearance = allowed.appearance.includes(preferences.appearance)
      ? preferences.appearance
      : defaults.appearance;
    const dark =
      appearance === 'dark' ||
      (appearance === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.appearance = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta)
      meta.content = dark
        ? '#181c21'
        : { orange: '#fcf9f5', green: '#f5faf6', blue: '#f5f9fc', rose: '#fcf6f8' }[theme];
  }
  apply(read());
  return { read, apply };
})();
