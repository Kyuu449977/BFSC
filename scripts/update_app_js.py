with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update allDishes declaration from const to let
text = text.replace(
    "const allDishes = engine.getAllDishesList();",
    "let allDishes = engine.getAllDishesList();"
)

# 2. Update money() function to use formatRegionalMoney
old_money = "const money = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';"
new_money = """const money = (amount) => {
    const lang = (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
    if (typeof formatRegionalMoney === 'function') {
      return formatRegionalMoney(amount, lang);
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };"""
text = text.replace(old_money, new_money)

# 3. In feature(dish): format price with money(dish.price) and prevent duplicate feature animation
old_feature = """  function feature(dish) {
    featuredDish = dish || null;
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const captionEl = document.querySelector('.photo-caption');
    if (captionEl) {
      captionEl.textContent = !dish
        ? (tDict.try_remove_filters || 'Thử bỏ bớt bộ lọc')
        : dish.imageCredit || (tDict.ref_photo || 'Ảnh tham khảo món ăn');
    }
    $('findFeaturedBtn').disabled = !dish;
    document.querySelector('.hero').dataset.empty = String(!dish);
    const dName = dish ? (typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name) : (tDict.no_matching_dish || 'Chưa có món phù hợp');
    const dDesc = dish
      ? (typeof getDishDesc === 'function' ? getDishDesc(dish, lang) : dish.desc)
      : (tDict.no_dish_budget_pref || 'Chưa có món khớp ngân sách và sở thích. Hãy bỏ lọc khẩu vị, tăng ngân sách hoặc khôi phục món đã ẩn.');
    $('featuredName').textContent = dName;
    $('featuredDesc').textContent = dDesc;
    $('featuredPrice').textContent = dish ? dish.price : (tDict.try_remove_filters || 'Thử bỏ bớt bộ lọc');
    UI.imageFallback($('featuredImage'));
    $('featuredImage').src = dish ? dish.image : 'assets/brand.svg';
    Experience.feature(document.querySelector('.hero-copy'));
    Experience.feature($('featuredImage'));
    $('featuredImage').alt = dish
      ? dish.name + ' — ' + (tDict.ref_photo || 'ảnh tham khảo')
      : (tDict.no_matching_dish || 'Chưa có món phù hợp bộ lọc');
  }"""

new_feature = """  let lastFeaturedDishId = null;
  let lastFeaturedLang = null;
  function feature(dish) {
    featuredDish = dish || null;
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const isSame = (dish && dish.id === lastFeaturedDishId && lang === lastFeaturedLang);
    lastFeaturedDishId = dish ? dish.id : null;
    lastFeaturedLang = lang;
    const captionEl = document.querySelector('.photo-caption');
    if (captionEl) {
      captionEl.textContent = !dish
        ? (tDict.try_remove_filters || 'Thử bỏ bớt bộ lọc')
        : dish.imageCredit || (tDict.ref_photo || 'Ảnh tham khảo món ăn');
    }
    $('findFeaturedBtn').disabled = !dish;
    document.querySelector('.hero').dataset.empty = String(!dish);
    const dName = dish ? (typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name) : (tDict.no_matching_dish || 'Chưa có món phù hợp');
    const dDesc = dish
      ? (typeof getDishDesc === 'function' ? getDishDesc(dish, lang) : dish.desc)
      : (tDict.no_dish_budget_pref || 'Chưa có món khớp ngân sách và sở thích. Hãy bỏ lọc khẩu vị, tăng ngân sách hoặc khôi phục món đã ẩn.');
    $('featuredName').textContent = dName;
    $('featuredDesc').textContent = dDesc;
    $('featuredPrice').textContent = dish ? money(dish.price) : (tDict.try_remove_filters || 'Thử bỏ bớt bộ lọc');
    if (!isSame) {
      UI.imageFallback($('featuredImage'));
      $('featuredImage').src = dish ? dish.image : 'assets/brand.svg';
      Experience.feature(document.querySelector('.hero-copy'));
      Experience.feature($('featuredImage'));
    }
    $('featuredImage').alt = dish
      ? dish.name + ' — ' + (tDict.ref_photo || 'ảnh tham khảo')
      : (tDict.no_matching_dish || 'Chưa có món phù hợp bộ lọc');
  }"""

text = text.replace(old_feature, new_feature)

# 4. In menu(): format dish.price with money(dish.price) and add smart signature diff
old_menu_card_price = "body.append(text('span', dName, 'dish-name'), text('span', dish.price, 'price'));"
new_menu_card_price = "body.append(text('span', dName, 'dish-name'), text('span', money(dish.price), 'price'));"
text = text.replace(old_menu_card_price, new_menu_card_price)

# 5. In applyLanguage(lang): switch region, update preset buttons, update budget input placeholder
old_apply_budget = """    const budgetSummary = document.querySelector('#budgetPanel summary > span');
    if (budgetSummary) budgetSummary.textContent = tDict.budget_panel_title;
    const budgetLabel = $('budgetLabel');
    if (budgetLabel && activeBudget === null) budgetLabel.textContent = tDict.budget_unlimited;
    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) budgetInputLabel.textContent = tDict.budget_label;
    if ($('budgetInput')) $('budgetInput').placeholder = tDict.budget_placeholder;"""

new_apply_budget = """    // Switch regional database and sync all dishes
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
    if ($('budgetInput')) $('budgetInput').placeholder = currencyCfg.placeholder || tDict.budget_placeholder;"""

text = text.replace(old_apply_budget, new_apply_budget)

# 6. Anti-spam throttling in scheduleBudget and buttons
old_schedule = """  function scheduleBudget(delay = 350, persist = true) {
    clearTimeout(budgetTimer);
    const generation = ++budgetGeneration;
    budgetPending = true;
    prepared = null;
    budgetInvalid = false;
    document
      .querySelectorAll('[data-budget]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    $('budgetPreviewNote').hidden = false;
    $('budgetPreviewNote').textContent =
      'Đang kiểm tra số tiền. Nội dung bên dưới tạm giữ theo ngân sách trước: ' +
      (activeBudget === null ? 'không giới hạn.' : money(activeBudget) + '.');
    $('budgetStatus').textContent = 'Đang kiểm tra ngân sách cho 1 món, 3 món và combo…';
    updateControls();"""

new_schedule = """  function scheduleBudget(delay = 220, persist = true, isDirectTyping = false) {
    clearTimeout(budgetTimer);
    const generation = ++budgetGeneration;
    budgetPending = true;
    prepared = null;
    budgetInvalid = false;
    document
      .querySelectorAll('[data-budget]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    if (isDirectTyping && delay >= 300) {
      $('budgetPreviewNote').hidden = false;
      $('budgetPreviewNote').textContent =
        'Đang kiểm tra số tiền. Nội dung bên dưới tạm giữ theo ngân sách trước: ' +
        (activeBudget === null ? 'không giới hạn.' : money(activeBudget) + '.');
    } else {
      $('budgetPreviewNote').hidden = true;
    }
    $('budgetStatus').textContent = 'Đang kiểm tra ngân sách cho 1 món, 3 món và combo…';
    updateControls();"""

text = text.replace(old_schedule, new_schedule)

# Input event: set isDirectTyping = true
text = text.replace(
    "$('budgetInput').addEventListener('input', () => scheduleBudget());",
    "$('budgetInput').addEventListener('input', () => scheduleBudget(350, true, true));"
)

# Button click guards
old_clicks = """  $('clearBudgetBtn').onclick = () => {
    $('budgetInput').value = '';
    scheduleBudget(0);
  };
  document.querySelectorAll('[data-budget]').forEach(
    (button) =>
      (button.onclick = () => {
        $('budgetInput').value = button.dataset.budget;
        scheduleBudget(0);
      })
  );"""

new_clicks = """  $('clearBudgetBtn').onclick = () => {
    if (activeBudget === null && !budgetInvalid && $('budgetInput').value === '') {
      return;
    }
    $('budgetInput').value = '';
    scheduleBudget(180, true, false);
  };
  document.querySelectorAll('[data-budget]').forEach(
    (button) =>
      (button.onclick = () => {
        const targetAmount = Number(button.dataset.budget);
        if (activeBudget === targetAmount && !budgetInvalid && $('budgetInput').value === String(targetAmount)) {
          return;
        }
        $('budgetInput').value = button.dataset.budget;
        scheduleBudget(180, true, false);
      })
  );"""

text = text.replace(old_clicks, new_clicks)

# Taste options reset button guard
old_taste_reset = """  $('resetTasteBtn').onclick = () => {
    engine.preferences.craving = 'all';
    engine.preferences.avoidRecent = false;
    scheduleBudget(0, false);
  };"""

new_taste_reset = """  $('resetTasteBtn').onclick = () => {
    if (engine.preferences.craving === 'all' && !engine.preferences.avoidRecent) {
      return;
    }
    engine.preferences.craving = 'all';
    engine.preferences.avoidRecent = false;
    $('cravingInput').value = 'all';
    $('avoidRecentInput').checked = false;
    scheduleBudget(180, false, false);
  };"""

text = text.replace(old_taste_reset, new_taste_reset)

# Smart menu render to avoid destroying and recreating DOM on duplicate calls
old_menu_start = """  function menu() {
    CustomControls.syncAll();
    stats();
    if (typeof buildFilters === 'function') buildFilters(settings.language || 'vi');
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const query = normalize(searchTerm);
    const base = allDishes.filter("""

new_menu_start = """  let lastMenuSignature = '';
  function menu() {
    allDishes = engine.getAllDishesList();
    CustomControls.syncAll();
    stats();
    if (typeof buildFilters === 'function') buildFilters(settings.language || 'vi');
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const query = normalize(searchTerm);
    const base = allDishes.filter("""

text = text.replace(old_menu_start, new_menu_start)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated app.js with anti-spam, currency, and multi-region synchronization!')
