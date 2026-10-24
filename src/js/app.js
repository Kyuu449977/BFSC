document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const engine = gachaEngine;
  const nearby = new NearbyPlaces();
  const personal = engine.preferences;
  let personalView = 'all',
    personalSyncPending = false;
  let featuredDish = null;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // 01. Device preferences and validated storage
  function readSettings() {
    const value = {
      unique: true,
      muted: false,
      budget: null,
      theme: 'orange',
      appearance: 'light',
    };
    const valid = (key, item) =>
      key === 'appearance'
        ? ['light', 'dark', 'system'].includes(item)
        : key === 'theme'
          ? ['orange', 'green', 'blue', 'rose'].includes(item)
          : key === 'budget'
            ? item === null || (Number.isSafeInteger(item) && item >= 0)
            : typeof item === 'boolean';
    let old = {};
    try {
      old = JSON.parse(localStorage.getItem('food_case_settings') || '{}') || {};
    } catch (_) {}
    for (const key of Object.keys(value)) {
      if (valid(key, old[key])) value[key] = old[key];
      try {
        const saved = localStorage.getItem('food_case_setting_' + key);
        if (saved !== null) {
          const item = JSON.parse(saved);
          if (valid(key, item)) value[key] = item;
        }
      } catch (_) {}
    }
    return value;
  }
  let settings = readSettings();
  let searchTerm = '',
    collectionOnly = false,
    visibleCount = 12;
  let busy = false,
    filter = 'all',
    lastPeriod = '',
    lastAction = 'single',
    toastTimer,
    returnFocus;
  const roulette = new FoodRoulette($('reelTrack'), $('reelViewport'));
  const allDishes = engine.getAllDishesList();
  let activeBudget = settings.budget,
    prepared = null,
    budgetPending = true,
    budgetTimer,
    budgetGeneration = 0,
    budgetInvalid = false,
    collectionReady = false,
    settingsSyncPending = false;
  const money = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  $('budgetInput').value = activeBudget === null ? '' : String(activeBudget);
  function toast(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').classList.add('show');
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 4200);
  }
  function saveSettings(changes) {
    try {
      // Independent keys prevent unrelated settings from overwriting each other across tabs.
      for (const [key, value] of Object.entries(changes))
        localStorage.setItem('food_case_setting_' + key, JSON.stringify(value));
      localStorage.setItem('food_case_settings', JSON.stringify(readSettings()));
    } catch (_) {
      toast('Trình duyệt không cho lưu tùy chọn. Bạn vẫn có thể chọn món.');
    }
  }
  function syncSettings() {
    if (busy || budgetPending || document.activeElement === $('budgetInput')) {
      settingsSyncPending = true;
      return;
    }
    settingsSyncPending = false;
    settings = readSettings();
    $('uniqueInput').checked = settings.unique;
    updateSound();
    updateTheme();
    $('budgetInput').value = settings.budget === null ? '' : String(settings.budget);
    scheduleBudget(0, false);
  }
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('food_case_setting')) syncSettings();
  });
  $('budgetInput').addEventListener('blur', () => {
    if (settingsSyncPending && !budgetPending) syncSettings();
  });
  // 02. Appearance and sound controls
  function updateTheme() {
    AppearancePreferences.apply(settings);
    document
      .querySelectorAll('[data-appearance-choice]')
      .forEach((button) =>
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.appearanceChoice === settings.appearance)
        )
      );
    document
      .querySelectorAll('[data-theme-choice]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.themeChoice === settings.theme))
      );
  }
  document.querySelectorAll('[data-theme-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.theme = button.dataset.themeChoice;
        updateTheme();
        saveSettings({ theme: settings.theme });
      })
  );
  $('themeBtn').onclick = () => open($('themeDialog'));
  document.querySelectorAll('[data-appearance-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.appearance = button.dataset.appearanceChoice;
        updateTheme();
        saveSettings({ appearance: settings.appearance });
      })
  );
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (settings.appearance === 'system') updateTheme();
  });
  function updateSound() {
    audioSystem.isMuted = settings.muted;
    UI.button(
      $('soundBtn'),
      settings.muted ? 'volume-x' : 'volume-2',
      settings.muted ? 'Bật âm thanh' : 'Tắt âm thanh',
      true
    );
    $('soundBtn').setAttribute('aria-label', settings.muted ? 'Bật âm thanh' : 'Tắt âm thanh');
    $('soundBtn').setAttribute('aria-pressed', String(settings.muted));
  }
  $('uniqueInput').checked = settings.unique;
  updateSound();
  updateTheme();
  $('uniqueInput').onchange = (e) => {
    settings.unique = e.target.checked;
    saveSettings({ unique: settings.unique });
    scheduleBudget(0, false);
  };
  $('soundBtn').onclick = () => {
    settings.muted = !settings.muted;
    updateSound();
    saveSettings({ muted: settings.muted });
    if (!settings.muted) audioSystem.playClick();
    toast(settings.muted ? 'Đã tắt âm thanh' : 'Đã bật âm thanh');
  };
  // 03. Dialog lifecycle and keyboard focus
  function open(dialog, preserve = false) {
    CustomControls.closeAll();
    if (!preserve) returnFocus = document.activeElement;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
    Experience.dialog(dialog);
  }
  function close(dialog, restore = true) {
    dialog.close();
    if (!document.querySelector('dialog[open]'))
      document.documentElement.classList.remove('dialog-open');
    if (restore && returnFocus?.isConnected) returnFocus.focus();
  }
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog
      .querySelectorAll('[data-close]')
      .forEach((button) => (button.onclick = () => close(dialog)));
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      if (dialog === $('spinDialog')) roulette.skip();
      else close(dialog);
    });
  });
  // Personal taste controls and dish actions; collection counts are independent.
  function personalControls() {
    $('cravingInput').value = personal.craving;
    $('avoidRecentInput').checked = personal.avoidRecent;
    CustomControls.syncAll();
  }
  function personalChanged(saved = true) {
    personalControls();
    scheduleBudget(0, false);
    if (!saved) toast('Trình duyệt không cho lưu sở thích. Thay đổi chỉ dùng trong phiên này.');
  }
  personalControls();
  $('cravingInput').onchange = (e) =>
    personalChanged(personal.configure('craving', e.target.value));
  $('avoidRecentInput').onchange = (e) =>
    personalChanged(personal.configure('avoidRecent', e.target.checked));
  $('resetTasteBtn').onclick = () => personalChanged(personal.configure('craving', 'all'));
  window.addEventListener('storage', (event) => {
    if (event.key !== null && !event.key.startsWith(personal.prefix)) return;
    if (busy) {
      personalSyncPending = true;
      return;
    }
    personal.reload();
    personalChanged();
    refreshPersonalActions();
  });
  function refreshPersonalActions() {
    document.querySelectorAll('[data-personal-field]').forEach((button) => {
      const dish = allDishes.find((d) => d.id === button.dataset.dishId),
        state = personal.state(dish),
        field = button.dataset.personalField;
      const active = field === 'eaten' ? state.eaten > 0 : state[field];
      button.setAttribute('aria-pressed', String(active));
      button.textContent =
        field === 'favorite'
          ? active
            ? 'Đã yêu thích'
            : 'Yêu thích'
          : field === 'eaten'
            ? active
              ? 'Đã ăn · bỏ đánh dấu'
              : 'Đánh dấu đã ăn'
            : active
              ? 'Khôi phục món'
              : 'Không thích · Ẩn món';
    });
  }
  function personalActions(dish) {
    const actions = document.createElement('div');
    actions.className = 'dish-personal-actions';
    for (const field of ['favorite', 'eaten', 'hidden']) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.personalField = field;
      button.dataset.dishId = dish.id;
      button.onclick = () => {
        if (busy) return;
        const state = personal.state(dish);
        const saved = personal.set(
          dish,
          field,
          field === 'eaten' ? (state.eaten ? 0 : Date.now()) : !state[field]
        );
        refreshPersonalActions();
        personalChanged(saved);
        if (saved && field === 'hidden')
          toast(
            personal.state(dish).hidden
              ? 'Đã ẩn khỏi quay. Khôi phục trong Thực đơn → Món đã ẩn.'
              : 'Đã khôi phục món vào vòng quay.'
          );
      };
      actions.append(button);
    }
    return actions;
  }
  $('personalView').onchange = (e) => {
    personalView = e.target.value;
    collectionOnly = false;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    visibleCount = 12;
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    menu();
  };
  // 04. Featured dish and category navigation
  function feature(dish) {
    featuredDish = dish || null;
    document.querySelector('.photo-caption').textContent = !dish
      ? 'Thử bỏ bớt bộ lọc'
      : dish.imageCredit || 'Ảnh tham khảo món ăn';
    $('findFeaturedBtn').disabled = !dish;
    document.querySelector('.hero').dataset.empty = String(!dish);
    $('featuredName').textContent = dish ? dish.name : 'Chưa có món phù hợp';
    $('featuredDesc').textContent = dish
      ? dish.desc
      : 'Chưa có món khớp ngân sách và sở thích. Hãy bỏ lọc khẩu vị, tăng ngân sách hoặc khôi phục món đã ẩn.';
    $('featuredPrice').textContent = dish ? dish.price : 'Thử bỏ bớt bộ lọc';
    UI.imageFallback($('featuredImage'));
    $('featuredImage').src = dish ? dish.image : 'assets/brand.svg';
    Experience.feature(document.querySelector('.hero-copy'));
    Experience.feature($('featuredImage'));
    $('featuredImage').alt = dish ? dish.name + ' — ảnh tham khảo' : 'Chưa có món phù hợp bộ lọc';
  }
  function banner() {
    lastPeriod = getCurrentMealPeriod();
    $('period').textContent = `${FOOD_DATABASE[lastPeriod].name.toUpperCase()} · MÓN VIỆT MỖI NGÀY`;
    const group = engine.getCurrentBannerData();
    $('title').textContent = group.title;
    document.title = `${group.title} · Ăn gì đây?`;
    document
      .querySelectorAll('[data-mode]')
      .forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.mode === engine.currentMode))
      );
    feature(
      group.dishes.find(
        (d) => activeBudget === null || (engine.prices(d) && engine.prices(d).min <= activeBudget)
      )
    );
  }
  document.querySelectorAll('[data-mode]').forEach(
    (button) =>
      (button.onclick = () => {
        if (busy) return;
        engine.setMode(button.dataset.mode);
        banner();
        scheduleBudget(0, false);
      })
  );
  // 05. Collection progress and result cards
  function stats() {
    const s = engine.getCollectionStats();
    $('collectionCount').textContent = `${s.unlocked} / ${s.total} món`;
    $('collectionProgress').setAttribute('aria-valuemax', String(s.total));
    $('progressFill').style.width = `${s.percentage}%`;
    $('collectionProgress').setAttribute('aria-valuenow', String(s.unlocked));
    $('collectionNote').textContent =
      `Đã khám phá ${s.percentage}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.`;
  }
  function image(dish, lazy = true) {
    const img = new Image(400, 300);
    UI.imageFallback(img);
    img.src = dish.image;
    img.alt = dish.name + ' — ảnh tham khảo';
    img.loading = lazy ? 'lazy' : 'eager';
    img.decoding = 'async';
    return img;
  }
  function text(tag, content, className = '') {
    const el = document.createElement(tag);
    el.textContent = content;
    el.className = className;
    return el;
  }
  function showResults(results, detail = false, resultBudget = activeBudget, saved = true) {
    if (detail && busy) return;
    $('resultSaveNotice').hidden = detail || saved;
    $('resultSaveNotice').textContent = saved
      ? ''
      : 'Không lưu được bộ sưu tập. Kết quả vẫn dùng được trong phiên này.';
    $('resultTitle').textContent = detail
      ? 'Một món ngon để khám phá'
      : lastAction === 'combo'
        ? 'Combo dành cho bạn'
        : results.length > 1
          ? 'Ba gợi ý cho bữa ăn'
          : 'Món ngon dành cho bạn';
    $('resultGrid').classList.toggle('single', results.length === 1);
    $('resultGrid').replaceChildren(
      ...results.map((result) => {
        const dish = result.dish,
          card = document.createElement('article');
        card.className = 'result-card';
        const body = document.createElement('div');
        body.className = 'dish-body';
        body.append(
          text('span', result.sourceName, 'dish-source'),
          text('h3', dish.name),
          text('strong', `Giá tham khảo: ${dish.price}`, 'price'),
          text(
            'span',
            `${result.isNew ? '✨ Món mới · ' : ''}Đã khám phá: x${engine.collection[dish.id] || 0}`,
            'collected'
          )
        );
        if (dish.imageCredit) body.append(text('span', dish.imageCredit, 'image-note'));
        const more = document.createElement('details');
        more.className = 'dish-more';
        more.open = results.length === 1;
        const summary = text('summary', 'Mô tả & nguồn ảnh');
        const credit = text('a', 'Nguồn ảnh và giấy phép', 'image-note');
        credit.href = 'credits.html#food-images';
        credit.target = '_blank';
        credit.rel = 'noopener';
        more.append(summary, text('p', dish.desc), text('blockquote', dish.quote), credit);
        const actions = personalActions(dish);
        if (results.length === 1) body.append(actions);
        else {
          const personalMore = document.createElement('details');
          personalMore.className = 'personal-more';
          personalMore.append(text('summary', 'Yêu thích, đã ăn & ẩn món'), actions);
          body.append(personalMore);
        }
        body.append(more);
        card.append(image(dish, false), body);
        return card;
      })
    );
    CustomControls.refresh();
    refreshPersonalActions();
    $('rerollBtn').hidden = detail;
    open($('resultDialog'), !detail);
    $('resultScroll').scrollTop = 0;
    nearby.setDishes(results);
    const total = engine.totalPrice(results);
    $('resultCost').hidden = detail || !total;
    if (total && !detail) {
      const label = text('strong', 'Tổng giá từ: ' + money(total.min) + ' · ước tính tối thiểu');
      const note = text(
        'p',
        resultBudget === null
          ? 'Tổng theo giá thấp nhất của các món. Giá thực tế có thể cao hơn.'
          : 'Ngân sách cả lượt: ' +
              money(resultBudget) +
              ' · Còn theo giá từ: ' +
              money(Math.max(0, resultBudget - total.min)) +
              '. Giá thực tế có thể cao hơn.',
        'note'
      );
      $('resultCost').replaceChildren(label, note);
    }
    Experience.reveal($('resultGrid').children);
    updateControls();
  }
  // 06. Menu search, filters and pagination
  function normalize(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .trim();
  }
  function menu() {
    CustomControls.syncAll();
    stats();
    const query = normalize(searchTerm);
    const base = allDishes.filter(
      (dish) =>
        (personalView === 'hidden' ? personal.state(dish).hidden : !personal.state(dish).hidden) &&
        (personalView !== 'favorite' || personal.state(dish).favorite) &&
        (personalView !== 'eaten' || personal.state(dish).eaten > 0) &&
        (filter === 'all' || dish.mealId === filter) &&
        (!collectionOnly || engine.collection[dish.id] > 0) &&
        (!query || normalize(dish.name + ' ' + dish.type).includes(query))
    );
    const filtered = base.filter(
      (dish) =>
        personalView === 'hidden' ||
        activeBudget === null ||
        (engine.prices(dish) && engine.prices(dish).min <= activeBudget)
    );
    const shown = filtered.slice(0, visibleCount);
    $('menuTitle').textContent = collectionOnly ? 'Bộ sưu tập của bạn' : 'Khám phá thực đơn';
    $('collectionToggle').setAttribute('aria-pressed', String(collectionOnly));
    $('clearSearch').hidden = !searchTerm;
    const noCollection =
      collectionOnly && !allDishes.some((dish) => engine.collection[dish.id] > 0);
    const reason =
      personalView !== 'all'
        ? 'Chưa có món trong danh sách này hoặc các bộ lọc hiện tại. Đổi danh sách hoặc bỏ giới hạn ngân sách.'
        : noCollection
          ? 'Bạn chưa khám phá món nào. Chọn một món để bắt đầu bộ sưu tập.'
          : base.length && activeBudget !== null
            ? 'Chưa có món phù hợp ngân sách ' +
              money(activeBudget) +
              '. Hãy tăng số tiền hoặc bỏ giới hạn.'
            : 'Chưa tìm thấy món khớp từ khóa hoặc danh mục. Xóa tìm kiếm hoặc xem Tất cả món.';
    $('menuStatus').textContent =
      (budgetInvalid
        ? 'Số tiền chưa hợp lệ. Đang giữ bộ lọc trước: ' +
          (activeBudget === null ? 'không giới hạn' : money(activeBudget)) +
          '. '
        : '') +
      (filtered.length
        ? 'Đang xem ' +
          shown.length +
          ' / ' +
          filtered.length +
          ' món' +
          (collectionOnly ? ' đã khám phá' : '')
        : reason);
    $('menuEmpty').hidden = filtered.length > 0;
    $('menuEmptyMessage').textContent = reason;
    $('resetMenuBudget').hidden = activeBudget === null && !budgetInvalid;
    $('resetMenuBudget').disabled = busy;
    $('resetMenuFilters').textContent = noCollection ? 'Khám phá thực đơn' : 'Xem tất cả món';
    $('loadMoreBtn').hidden = shown.length >= filtered.length;
    $('menuGrid').replaceChildren(
      ...shown.map((dish) => {
        const card = document.createElement('button');
        card.className = 'dish-card';
        card.type = 'button';
        const thumb = document.createElement('span');
        thumb.className = 'dish-thumb';
        thumb.append(image(dish));
        const source = text('span', dish.mealName, 'dish-source');
        thumb.append(source);
        if (dish.imageCredit) thumb.append(text('span', dish.imageCredit, 'illustration-tag'));
        const body = document.createElement('span');
        body.className = 'dish-body';
        const count = engine.collection[dish.id] || 0;
        body.append(text('span', dish.name, 'dish-name'), text('span', dish.price, 'price'));
        const status = text(
          'span',
          count ? 'Đã thu thập · x' + count : 'Chưa thu thập · x0',
          count ? 'collected' : 'uncollected'
        );
        if (count) status.prepend(UI.icon('check'));
        body.append(status);
        const personalState = personal.state(dish);
        if (personalState.favorite || personalState.eaten || personalState.hidden)
          body.append(
            text(
              'span',
              [
                personalState.favorite ? '♥ Yêu thích' : '',
                personalState.eaten ? 'Đã ăn' : '',
                personalState.hidden ? 'Đang ẩn' : '',
              ]
                .filter(Boolean)
                .join(' · '),
              'personal-badges'
            )
          );
        card.append(thumb, body);
        card.onclick = () => showResults([{ dish, sourceName: dish.mealName }], true);
        return card;
      })
    );
    Experience.reveal($('menuGrid').children);
  }
  [['all', 'Tất cả'], ...Object.values(FOOD_DATABASE).map((g) => [g.id, g.name])].forEach(
    ([id, label]) => {
      const button = text('button', label);
      button.dataset.filter = id;
      button.setAttribute('aria-pressed', String(id === filter));
      button.onclick = () => {
        filter = id;
        visibleCount = 12;
        $('filters')
          .querySelectorAll('button')
          .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        menu();
      };
      $('filters').append(button);
    }
  );
  // 07. Selection availability and budget calculation
  function updateControls() {
    const ready =
      collectionReady &&
      !busy &&
      !budgetPending &&
      prepared &&
      prepared.signature === engine.signature(engine.currentMode, settings.unique, activeBudget);
    $('singleBtn').disabled = !ready || !prepared.singles.length;
    $('tripleBtn').disabled = !ready || !prepared.triples.length;
    $('comboBtn').disabled = !ready || !prepared.combos.length;
    $('rerollBtn').disabled =
      !ready ||
      !(lastAction === 'combo'
        ? prepared.combos.length
        : lastAction === 'triple'
          ? prepared.triples.length
          : prepared.singles.length);
    document
      .querySelectorAll(
        '[data-mode],#uniqueInput,#budgetInput,#clearBudgetBtn,[data-budget],#cravingInput,#avoidRecentInput,#resetTasteBtn,[data-personal-field]'
      )
      .forEach((el) => (el.disabled = busy));
    $('budgetStatus').setAttribute('aria-busy', String(budgetPending));
    $('findFeaturedBtn').disabled = busy || !featuredDish;
    CustomControls.syncAll();
  }
  function lock(value) {
    busy = value;
    if (!value && personalSyncPending) {
      personalSyncPending = false;
      personal.reload();
      personalChanged();
      refreshPersonalActions();
    }
    updateControls();
  }
  function parseBudget(value) {
    const raw = value.trim();
    if (!raw) return null;
    if (!/^\d+$/.test(raw) && !/^\d{1,3}([., ])\d{3}(?:\1\d{3})*$/.test(raw))
      throw new Error('Nhập số tiền nguyên, ví dụ 50000 hoặc 50.000. Để trống nếu không giới hạn.');
    const amount = Number(raw.replace(/[., ]/g, ''));
    if (!Number.isSafeInteger(amount) || amount < 0)
      throw new Error('Số tiền chưa hợp lệ. Hãy nhập lại.');
    return amount;
  }
  function scheduleBudget(delay = 350, persist = true) {
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
    updateControls();
    budgetTimer = setTimeout(() => {
      try {
        const amount = parseBudget($('budgetInput').value);
        const plan = engine.prepareSelection({
          mode: engine.currentMode,
          unique: settings.unique,
          budget: amount,
        });
        if (generation !== budgetGeneration) return;
        activeBudget = amount;
        prepared = plan;
        settings.budget = amount;
        budgetInvalid = false;
        $('budgetPreviewNote').hidden = true;
        $('budgetInput').setAttribute('aria-invalid', 'false');
        document
          .querySelectorAll('[data-budget]')
          .forEach((button) =>
            button.setAttribute('aria-pressed', String(Number(button.dataset.budget) === amount))
          );
        $('budgetLabel').textContent =
          amount === null ? 'Không giới hạn' : money(amount) + ' / lượt';
        const info = (choices, minimum) =>
          choices.length
            ? 'Có thể chọn · từ ' + money(minimum)
            : minimum === null
              ? 'Chưa đủ món'
              : 'Cần ít nhất ' + money(minimum);
        $('singleBudgetInfo').textContent = '1 món: ' + info(plan.singles, plan.minimums.single);
        $('tripleBudgetInfo').textContent = '3 món: ' + info(plan.triples, plan.minimums.triple);
        $('comboBudgetInfo').textContent = 'Combo: ' + info(plan.combos, plan.minimums.combo);
        $('budgetStatus').textContent =
          amount === null
            ? 'Không giới hạn ngân sách.'
            : 'Ngân sách ' +
              money(amount) +
              ' / lượt · ' +
              plan.singles.length +
              ' món trong danh mục phù hợp · 3 món: ' +
              (plan.triples.length ? 'có lựa chọn' : 'chưa đủ tiền hoặc số món') +
              ' · Combo: ' +
              (plan.combos.length ? 'có lựa chọn' : 'chưa đủ tiền') +
              '.';
        const tasteLabel = $('cravingInput').selectedOptions[0].textContent;
        if (personal.craving !== 'all')
          $('budgetStatus').textContent += ' · Món chính: ' + tasteLabel;
        if (!plan.singles.length)
          $('budgetStatus').textContent +=
            ' Không còn món phù hợp; bỏ lọc khẩu vị hoặc khôi phục món đã ẩn.';
        const eligible = plan.singles.map((choice) => choice[0].dish);
        if (!featuredDish || !eligible.some((d) => d.id === featuredDish.id)) feature(eligible[0]);
        menu();
        if (persist) saveSettings({ budget: amount });
      } catch (error) {
        budgetInvalid = true;
        $('budgetPreviewNote').hidden = false;
        $('budgetPreviewNote').textContent =
          'Số tiền chưa hợp lệ. Nội dung bên dưới vẫn theo ngân sách trước: ' +
          (activeBudget === null ? 'không giới hạn.' : money(activeBudget) + '.') +
          ' Hãy sửa số tiền hoặc bấm Bỏ giới hạn.';
        $('budgetInput').setAttribute('aria-invalid', 'true');
        $('budgetStatus').textContent = error.message;
        $('budgetLabel').textContent = 'Kiểm tra số tiền';
        ['singleBudgetInfo', 'tripleBudgetInfo', 'comboBudgetInfo'].forEach(
          (id) => ($(id).textContent = '')
        );
        menu();
      } finally {
        if (generation === budgetGeneration) {
          budgetPending = false;
          updateControls();
          if (settingsSyncPending && !busy && document.activeElement !== $('budgetInput'))
            queueMicrotask(syncSettings);
        }
      }
    }, delay);
  }
  // 08. Draw, animate and publish results once
  function choose(action) {
    if (busy || budgetPending || !prepared) return;
    let results;
    try {
      results =
        action === 'combo'
          ? engine.drawCombo({ budget: activeBudget, prepared })
          : engine.drawDishes({
              count: action === 'triple' ? 3 : 1,
              unique: settings.unique,
              budget: activeBudget,
              prepared,
            });
    } catch (error) {
      toast(error.message);
      scheduleBudget(0, false);
      return;
    }
    const rollBudget = activeBudget;
    lastAction = action;
    if (!$('resultDialog').open) returnFocus = document.activeElement;
    else close($('resultDialog'), false);
    lock(true);
    audioSystem.playClick();
    const reveal = async () => {
      const outcome = await engine.commitResults(results);
      if ($('spinDialog').open) close($('spinDialog'), false);
      lock(false);
      feature(results[0].dish);
      menu();
      showResults(results, false, rollBudget, outcome.saved);
      if (settingsSyncPending) syncSettings();
      audioSystem.playWin(4);
      if (!outcome.saved)
        toast('Không lưu được bộ sưu tập. Kết quả vẫn dùng được trong phiên này.');
    };
    if (motion.matches) reveal();
    else {
      open($('spinDialog'), true);
      const choices =
        action === 'combo'
          ? prepared.combos
          : action === 'triple'
            ? prepared.triples
            : prepared.singles;
      const pool = [
        ...new Map(
          choices
            .flat()
            .filter((item) => item.source === results[0].source)
            .map((item) => [item.dish.id, item.dish])
        ).values(),
      ];
      roulette.start(results[0].dish, pool, reveal);
    }
  }
  $('singleBtn').onclick = () => choose('single');
  $('tripleBtn').onclick = () => choose('triple');
  $('comboBtn').onclick = () => choose('combo');
  $('rerollBtn').onclick = () => choose(lastAction);
  $('skipBtn').onclick = () => roulette.skip();
  motion.addEventListener('change', () => {
    if (motion.matches) roulette.skip();
  });
  setInterval(() => {
    if (!busy && !document.hidden && lastPeriod !== getCurrentMealPeriod()) {
      banner();
      scheduleBudget(0, false);
    }
  }, 1000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) roulette.skip();
    else if (!busy && lastPeriod !== getCurrentMealPeriod()) {
      banner();
      scheduleBudget(0, false);
    }
  });
  $('findFeaturedBtn').onclick = () => {
    if (featuredDish)
      showResults(
        [
          {
            dish: featuredDish,
            sourceName:
              allDishes.find((d) => d.id === featuredDish.id)?.mealName ||
              engine.getCurrentBannerData().name,
          },
        ],
        true
      );
  };
  $('dishSearch').addEventListener('input', (event) => {
    searchTerm = event.target.value;
    visibleCount = 12;
    menu();
  });
  $('clearSearch').onclick = () => {
    $('dishSearch').value = '';
    searchTerm = '';
    visibleCount = 12;
    menu();
    $('dishSearch').focus();
  };
  $('loadMoreBtn').onclick = () => {
    visibleCount += 12;
    menu();
  };
  // 09. Navigation and collection views
  function setView(view) {
    ['homeNav', 'menuNav', 'collectionNav'].forEach((id) => $(id).removeAttribute('aria-current'));
    $(
      view === 'home' ? 'homeNav' : view === 'collection' ? 'collectionNav' : 'menuNav'
    ).setAttribute('aria-current', 'page');
  }
  $('homeNav').onclick = () => {
    collectionOnly = false;
    personalView = 'all';
    $('personalView').value = 'all';
    menu();
    setView('home');
  };
  $('menuNav').onclick = () => {
    collectionOnly = false;
    visibleCount = 12;
    menu();
    setView('menu');
  };
  $('collectionNav').onclick = () => {
    personalView = 'all';
    $('personalView').value = 'all';
    collectionOnly = true;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    visibleCount = 12;
    menu();
    setView('collection');
    $('menu').scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth' });
  };
  $('collectionToggle').onclick = () => {
    collectionOnly = !collectionOnly;
    visibleCount = 12;
    menu();
    setView(collectionOnly ? 'collection' : 'menu');
  };
  $('budgetInput').addEventListener('input', () => scheduleBudget());
  $('clearBudgetBtn').onclick = () => {
    $('budgetInput').value = '';
    scheduleBudget(0);
  };
  document.querySelectorAll('[data-budget]').forEach(
    (button) =>
      (button.onclick = () => {
        $('budgetInput').value = button.dataset.budget;
        scheduleBudget(0);
      })
  );
  $('resetMenuBudget').onclick = () => {
    if (!busy) {
      $('budgetInput').value = '';
      scheduleBudget(0);
    }
  };
  $('resetMenuFilters').onclick = () => {
    personalView = 'all';
    $('personalView').value = 'all';
    collectionOnly = false;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    visibleCount = 12;
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    menu();
    setView('menu');
  };
  document.addEventListener('foodcollectionchange', () => menu());
  engine.ready.then(() => {
    collectionReady = true;
    menu();
    updateControls();
  });
  // 10. Sharing, installation and offline readiness
  new BrowserActions(open, toast);
  banner();
  menu();
  scheduleBudget(0, false);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'OFFLINE_STATUS')
        $('offlineReadiness').textContent = event.data.ready
          ? event.data.missing
            ? 'Chọn món offline sẵn sàng · một số ảnh/font chưa lưu.'
            : 'Đã sẵn sàng offline'
          : 'Chưa sẵn sàng offline. Hãy tải lại khi có mạng.';
    });
    const checkOffline = () =>
      navigator.serviceWorker.controller?.postMessage({ type: 'OFFLINE_STATUS' });
    navigator.serviceWorker.addEventListener('controllerchange', checkOffline);
    window.addEventListener('online', checkOffline);
    window.addEventListener('load', () =>
      navigator.serviceWorker
        .register('./sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const worker = registration.installing;
            worker?.addEventListener('statechange', () => {
              if (worker.state === 'redundant')
                $('offlineReadiness').textContent =
                  'Chưa lưu được offline. Hãy tải lại khi có mạng.';
            });
          });
          checkOffline();
          navigator.serviceWorker.ready.then(checkOffline);
        })
        .catch(() => {
          $('offlineReadiness').textContent = 'Offline chưa khả dụng trên trình duyệt này.';
        })
    );
  } else $('offlineReadiness').textContent = 'Trình duyệt này chưa hỗ trợ offline.';
});
