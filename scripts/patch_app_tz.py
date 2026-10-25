with open('src/js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update valid('timezone')
target_valid = """          : key === 'timezone'
            ? [
                'auto',
                'Asia/Ho_Chi_Minh',
                'Asia/Tokyo',
                'Asia/Bangkok',"""

replacement_valid = """          : key === 'timezone'
            ? [
                'auto',
                'Asia/Ho_Chi_Minh',
                'Asia/Tokyo',
                'Asia/Seoul',
                'Asia/Shanghai',
                'Asia/Bangkok',"""

assert target_valid in code, "target_valid not found"
code = code.replace(target_valid, replacement_valid, 1)

# 2. Add region helpers and update money()
target_money = """  const roulette = new FoodRoulette($('reelTrack'), $('reelViewport'));
  let allDishes = engine.getAllDishesList();
  let lastFeaturedDishId = null;
  let lastFeaturedLang = null;
  let lastMenuSignature = '';
  let activeBudget = settings.budget,
    prepared = null,
    budgetPending = true,
    budgetTimer,
    budgetGeneration = 0,
    budgetInvalid = false,
    collectionReady = false,
    settingsSyncPending = false;
  const money = (amount) => {
    const lang = (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
    if (typeof formatRegionalMoney === 'function') {
      return formatRegionalMoney(amount, lang);
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };"""

replacement_money = """  const roulette = new FoodRoulette($('reelTrack'), $('reelViewport'));

  function getRegionFromTimezone(tz) {
    let targetTz = tz;
    if (!targetTz || targetTz === 'auto') {
      try {
        targetTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh';
      } catch (_) {
        targetTz = 'Asia/Ho_Chi_Minh';
      }
    }
    const TIMEZONE_TO_REGION = {
      'Asia/Ho_Chi_Minh': 'vi',
      'Asia/Bangkok': 'vi',
      'Asia/Tokyo': 'ja',
      'Asia/Seoul': 'ko',
      'Asia/Shanghai': 'zh',
      'Asia/Beijing': 'zh',
      'Asia/Chongqing': 'zh',
      'Asia/Hong_Kong': 'zh',
      'Asia/Taipei': 'zh',
      'Europe/London': 'en',
      'Europe/Paris': 'en',
      'America/New_York': 'en',
      'America/Los_Angeles': 'en',
      'Australia/Sydney': 'en',
      'Asia/Singapore': 'en',
    };
    if (TIMEZONE_TO_REGION[targetTz]) return TIMEZONE_TO_REGION[targetTz];
    if (targetTz.startsWith('Asia/Tokyo')) return 'ja';
    if (targetTz.startsWith('Asia/Seoul')) return 'ko';
    if (targetTz.startsWith('Asia/Shanghai') || targetTz.startsWith('Asia/Hong_Kong') || targetTz.startsWith('Asia/Taipei')) return 'zh';
    if (targetTz.startsWith('America/') || targetTz.startsWith('Europe/') || targetTz.startsWith('Australia/')) return 'en';
    return 'vi';
  }

  function getCurrentRegion() {
    return getRegionFromTimezone(settings ? settings.timezone : 'auto');
  }

  if (typeof engine.setRegion === 'function') {
    engine.setRegion(getCurrentRegion());
  }
  let allDishes = engine.getAllDishesList();
  let lastFeaturedDishId = null;
  let lastFeaturedLang = null;
  let lastMenuSignature = '';
  let activeBudget = settings.budget,
    prepared = null,
    budgetPending = true,
    budgetTimer,
    budgetGeneration = 0,
    budgetInvalid = false,
    collectionReady = false,
    settingsSyncPending = false;

  const money = (amount, explicitRegion) => {
    const region = explicitRegion || (typeof getCurrentRegion === 'function' ? getCurrentRegion() : 'vi');
    if (typeof formatRegionalMoney === 'function') {
      return formatRegionalMoney(amount, region);
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  function applyTimezoneRegion(tz) {
    const region = getRegionFromTimezone(tz || (settings ? settings.timezone : 'auto'));
    if (typeof engine.setRegion === 'function') {
      engine.setRegion(region);
      allDishes = engine.getAllDishesList();
    }
    const currencyCfg = (typeof getCurrencyConfig === 'function' ? getCurrencyConfig(region) : null) || { presets: [30000, 50000, 100000, 200000], placeholder: '100000', symbol: 'đ' };
    document.querySelectorAll('[data-budget]').forEach((btn, idx) => {
      if (currencyCfg.presets && currencyCfg.presets[idx] !== undefined) {
        const val = currencyCfg.presets[idx];
        btn.dataset.budget = String(val);
        btn.textContent = (typeof formatRegionalMoney === 'function') ? formatRegionalMoney(val, region) : money(val, region);
      }
    });
    if ($('budgetInput')) $('budgetInput').placeholder = currencyCfg.placeholder || '100000';
    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) {
      const lang = (settings && settings.language) || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const baseLabel = (tDict.budget_label || '').replace(/\\s*\\([^)]*\\)$/, '');
      budgetInputLabel.textContent = `${baseLabel} (${currencyCfg.symbol})`;
    }
  }"""

assert target_money in code, "target_money not found"
code = code.replace(target_money, replacement_money, 1)

# 3. Update updateTimezoneUI tzList and tzShort
target_tzui = """    const tzList = [
      'auto',
      'Asia/Ho_Chi_Minh',
      'Asia/Tokyo',
      'Asia/Bangkok',
      'Asia/Singapore',
      'Europe/London',
      'Europe/Paris',
      'America/New_York',
      'America/Los_Angeles',
      'Australia/Sydney',
    ];"""

replacement_tzui = """    const tzList = [
      'auto',
      'Asia/Ho_Chi_Minh',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Shanghai',
      'Asia/Bangkok',
      'Asia/Singapore',
      'Europe/London',
      'Europe/Paris',
      'America/New_York',
      'America/Los_Angeles',
      'Australia/Sydney',
    ];"""

assert target_tzui in code, "target_tzui not found"
code = code.replace(target_tzui, replacement_tzui, 1)

target_tzshort = """      const tzShort = {
        auto: 'AUTO',
        'Asia/Ho_Chi_Minh': 'VN',
        'Asia/Tokyo': 'JP/KR',
        'Asia/Bangkok': 'TH',"""

replacement_tzshort = """      const tzShort = {
        auto: 'AUTO',
        'Asia/Ho_Chi_Minh': 'VN',
        'Asia/Tokyo': 'JP',
        'Asia/Seoul': 'KR',
        'Asia/Shanghai': 'CN',
        'Asia/Bangkok': 'TH',"""

assert target_tzshort in code, "target_tzshort not found"
code = code.replace(target_tzshort, replacement_tzshort, 1)

# 4. Remove setRegion and budget presets from applyLanguage
target_apply_lang_budget = """    // Budget & Preferences
    // Switch regional database and sync all dishes
    if (typeof engine.setRegion === 'function') {
      engine.setRegion(lang);
      allDishes = engine.getAllDishesList();
    }
    const currencyCfg = (typeof getCurrencyConfig === 'function' ? getCurrencyConfig(lang) : null) || { presets: [30000, 50000, 100000, 200000], placeholder: '100000' };
    document.querySelectorAll('[data-budget]').forEach((btn, idx) => {
      if (currencyCfg.presets && currencyCfg.presets[idx] !== undefined) {
        const val = currencyCfg.presets[idx];
        btn.dataset.budget = String(val);
        btn.textContent = money(val);
      }
    });

    const budgetSummary = document.querySelector('#budgetPanel summary > span');
    if (budgetSummary) budgetSummary.textContent = tDict.budget_panel_title;
    const budgetLabel = $('budgetLabel');
    if (budgetLabel && activeBudget === null) budgetLabel.textContent = tDict.budget_unlimited;
    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) budgetInputLabel.textContent = tDict.budget_label;
    if ($('budgetInput')) $('budgetInput').placeholder = currencyCfg.placeholder || tDict.budget_placeholder;
    const clearBudgetBtn = $('clearBudgetBtn');"""

replacement_apply_lang_budget = """    // Budget & Preferences text
    const budgetSummary = document.querySelector('#budgetPanel summary > span');
    if (budgetSummary) budgetSummary.textContent = tDict.budget_panel_title;
    const budgetLabel = $('budgetLabel');
    if (budgetLabel && activeBudget === null) budgetLabel.textContent = tDict.budget_unlimited;
    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) {
      const currencyCfg = (typeof getCurrencyConfig === 'function' ? getCurrencyConfig(getCurrentRegion()) : null) || { symbol: 'đ' };
      const baseLabel = (tDict.budget_label || '').replace(/\\s*\\([^)]*\\)$/, '');
      budgetInputLabel.textContent = `${baseLabel} (${currencyCfg.symbol})`;
    }
    const clearBudgetBtn = $('clearBudgetBtn');"""

assert target_apply_lang_budget in code, "target_apply_lang_budget not found"
code = code.replace(target_apply_lang_budget, replacement_apply_lang_budget, 1)

# 5. Update timezone choice click handlers to call applyTimezoneRegion and reset budget
target_tz_click = """  document.querySelectorAll('[data-timezone-choice]').forEach((btn) => {
    btn.onclick = () => {
      const tz = btn.dataset.timezoneChoice;
      settings.timezone = tz;
      AppearancePreferences.apply(settings);
      saveSettings({ timezone: tz });
      updateTimezoneUI();
      banner();
      menu();
      const lang = settings.language || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const name = btn.querySelector('.tz-city')?.textContent || tz;
      toast(`${tDict.timezone_heading}: ${name}`);
    };
  });"""

replacement_tz_click = """  document.querySelectorAll('[data-timezone-choice]').forEach((btn) => {
    btn.onclick = () => {
      const tz = btn.dataset.timezoneChoice;
      settings.timezone = tz;
      AppearancePreferences.apply(settings);
      saveSettings({ timezone: tz });
      updateTimezoneUI();
      applyTimezoneRegion(tz);
      activeBudget = null;
      settings.budget = null;
      if ($('budgetInput')) $('budgetInput').value = '';
      saveSettings({ budget: null });
      scheduleBudget(0, false);
      banner();
      menu();
      const lang = settings.language || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const name = btn.querySelector('.tz-city')?.textContent || tz;
      toast(`${tDict.timezone_heading}: ${name}`);
    };
  });"""

assert target_tz_click in code, "target_tz_click not found"
code = code.replace(target_tz_click, replacement_tz_click, 1)

# 6. Update DOMContentLoaded initialization
target_init = """  updateSound();
  updateTheme();
  applyLanguage(settings.language || 'vi');
  setInterval(updateTimezoneUI, 10000);"""

replacement_init = """  updateSound();
  updateTheme();
  applyTimezoneRegion(settings.timezone || 'auto');
  applyLanguage(settings.language || 'vi');
  setInterval(updateTimezoneUI, 10000);"""

assert target_init in code, "target_init not found"
code = code.replace(target_init, replacement_init, 1)

# 7. Update exports
target_exports = """  window.applyLanguage = applyLanguage;
  window.engine = engine;"""

replacement_exports = """  window.applyLanguage = applyLanguage;
  window.applyTimezoneRegion = applyTimezoneRegion;
  window.getRegionFromTimezone = getRegionFromTimezone;
  window.getCurrentRegion = getCurrentRegion;
  window.engine = engine;"""

assert target_exports in code, "target_exports not found"
code = code.replace(target_exports, replacement_exports, 1)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully patched src/js/app.js for timezone decoupling!")
