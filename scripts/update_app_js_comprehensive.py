import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update TRANSLATIONS to include cat_main and price_disclaimer
translations_patch = {
    'cat_all: \'Tất cả\',': '''cat_all: 'Tất cả',
      cat_main: 'Món Chính',
      price_disclaimer: '* Giá tham khảo và có thể chênh lệch với thực tế', ''',
    'cat_all: \'All\',': '''cat_all: 'All',
      cat_main: 'Main Dishes',
      price_disclaimer: '* Reference price, may vary in reality', ''',
    'cat_all: \'すべて\',': '''cat_all: 'すべて',
      cat_main: 'メイン料理',
      price_disclaimer: '* 参考価格であり、実際と異なる場合があります', ''',
    'cat_all: \'전체\',': '''cat_all: '전체',
      cat_main: '메인 요리',
      price_disclaimer: '* 참고 가격이며 실제와 다를 수 있습니다', ''',
    'cat_all: \'全部\',': '''cat_all: '全部',
      cat_main: '主菜',
      price_disclaimer: '* 参考价格，实际可能有所差异', '''
}

for old_str, new_str in translations_patch.items():
    if old_str in content and new_str not in content:
        content = content.replace(old_str, new_str, 1)

# 2. Update buildFilters
old_build_filters = '''  function buildFilters(currentLang = settings.language || 'vi') {
    const tDict = TRANSLATIONS[currentLang] || TRANSLATIONS.vi;
    const filterMap = {
      all: tDict.cat_all || 'Tất cả',
      morning: tDict.cat_morning || 'Buổi sáng',
      lunch: tDict.cat_lunch || 'Buổi trưa',
      afternoon: tDict.cat_afternoon || 'Buổi chiều',
      dinner: tDict.cat_dinner || 'Buổi tối',
      snacks: tDict.cat_snacks || 'Món ăn vặt',
      drinks: tDict.cat_drinks || 'Đồ uống & Nước ngọt',
    };
    const filterIds = ['all', 'morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks'];'''

new_build_filters = '''  function buildFilters(currentLang = settings.language || 'vi') {
    const tDict = TRANSLATIONS[currentLang] || TRANSLATIONS.vi;
    const filterMap = {
      all: tDict.cat_all || 'Tất cả',
      main: tDict.cat_main || 'Món Chính',
      snacks: tDict.cat_snacks || 'Món Ăn Vặt',
      drinks: tDict.cat_drinks || 'Đồ Uống & Nước Ngọt',
    };
    const filterIds = ['all', 'main', 'snacks', 'drinks'];'''

assert old_build_filters in content, 'old_build_filters not found'
content = content.replace(old_build_filters, new_build_filters)

# 3. Update menu() filter logic
old_filter_condition = "(filter === 'all' || dish.mealId === filter) &&"
new_filter_condition = "(filter === 'all' || (filter === 'main' ? ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId) : dish.mealId === filter)) &&"
assert old_filter_condition in content, 'old_filter_condition not found'
content = content.replace(old_filter_condition, new_filter_condition, 1)

# 4. Update catMap in menu()
old_cat_map_menu = '''        const catMap = {
          morning: tDict.cat_morning,
          lunch: tDict.cat_lunch,
          afternoon: tDict.cat_afternoon,
          dinner: tDict.cat_dinner,
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };'''

new_cat_map_menu = '''        const catMap = {
          main: tDict.cat_main || 'Món Chính',
          morning: tDict.cat_main || 'Món Chính',
          lunch: tDict.cat_main || 'Món Chính',
          afternoon: tDict.cat_main || 'Món Chính',
          dinner: tDict.cat_main || 'Món Chính',
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };'''

assert old_cat_map_menu in content, 'old_cat_map_menu not found'
content = content.replace(old_cat_map_menu, new_cat_map_menu)

# 5. Update showResults for catMap and price disclaimer
old_show_results_price = '''        body.append(
          text('span', sourceName, 'dish-source'),
          text('h3', typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name),
          text('strong', `${tDict.hero_price_note || 'Giá tham khảo'}: ${money(dish.price)}`, 'price'),
          text(
            'span',
            `${result.isNew ? '✨ ' + tDict.is_new + ' · ' : ''}${tDict.discovered}: x${engine.collection[dish.id] || 0}`,
            'collected'
          )
        );'''

new_show_results_price = '''        const priceElem = text('strong', `${tDict.hero_price_note || 'Giá tham khảo'}: ${money(dish.price)}`, 'price');
        const priceNote = document.createElement('em');
        priceNote.className = 'price-disclaimer';
        priceNote.textContent = tDict.price_disclaimer || '* Giá tham khảo và có thể chênh lệch với thực tế';

        body.append(
          text('span', sourceName, 'dish-source'),
          text('h3', typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name),
          priceElem,
          priceNote,
          text(
            'span',
            `${result.isNew ? '✨ ' + tDict.is_new + ' · ' : ''}${tDict.discovered}: x${engine.collection[dish.id] || 0}`,
            'collected'
          )
        );'''

assert old_show_results_price in content, 'old_show_results_price not found'
content = content.replace(old_show_results_price, new_show_results_price)

# 6. Replace custom wheel section with enhanced Universe picker and alert
old_custom_wheel_sec = '''  // Vòng quay tự chọn (Custom Wheel)
  if ($('customWheelBtn')) {
    $('customWheelBtn').onclick = () => {
      open($('customWheelDialog'));
      updateCustomWheelCount();
    };
  }

  function updateCustomWheelCount() {
    if (!$('customWheelInput') || !$('customWheelCount')) return;
    const lines = $('customWheelInput').value.split('\\n').map(s => s.trim()).filter(Boolean);
    $('customWheelCount').textContent = `${lines.length} món trong danh sách`;
  }

  if ($('customWheelInput')) {
    $('customWheelInput').oninput = updateCustomWheelCount;
  }

  if ($('customWheelClearBtn')) {
    $('customWheelClearBtn').onclick = () => {
      if ($('customWheelInput')) {
        $('customWheelInput').value = '';
        updateCustomWheelCount();
      }
    };
  }

  if ($('customWheelAddRandomBtn')) {
    $('customWheelAddRandomBtn').onclick = () => {
      const sample = [];
      const currentList = allDishes || [];
      if (currentList.length) {
        for (let i = 0; i < 3; i++) {
          const rand = currentList[Math.floor(Math.random() * currentList.length)];
          if (rand && !sample.includes(rand.name)) sample.push(rand.name);
        }
      }
      const cur = $('customWheelInput').value.trim();
      $('customWheelInput').value = (cur ? cur + '\\n' : '') + sample.join('\\n');
      updateCustomWheelCount();
    };
  }

  if ($('customWheelSpinActionBtn')) {
    $('customWheelSpinActionBtn').onclick = () => {
      const lines = $('customWheelInput').value.split('\\n').map(s => s.trim()).filter(Boolean);
      if (lines.length < 2) {
        toast('Vui lòng nhập ít nhất 2 món vào danh sách để quay nhé!');
        return;
      }
      close($('customWheelDialog'));

      // Pick winner
      const winnerName = lines[Math.floor(Math.random() * lines.length)];
      const matched = (allDishes || []).find(d => normalize(d.name) === normalize(winnerName));

      const winnerDish = matched || {
        id: 'custom_wheel_' + Date.now(),
        name: winnerName,
        rarity: 4,
        mealId: activeMeal,
        type: 'Món tự chọn của bạn',
        image: 'images/brand.svg',
        price: 0,
        desc: 'Món ăn do bạn tự nhập vào vòng quay tùy chọn hôm nay. Chúc bạn có một bữa ăn ngon miệng!',
        quote: 'Vũ trụ đã lựa chọn món này cho bạn!',
        calories: 350,
      };

      // Construct reel candidates
      const reelPool = [];
      for (let i = 0; i < 20; i++) {
        const itemN = lines[i % lines.length];
        const m = (allDishes || []).find(d => normalize(d.name) === normalize(itemN));
        reelPool.push(m || { id: 'reel_' + i, name: itemN, rarity: 3, image: 'images/brand.svg' });
      }

      open($('spinDialog'), true);
      roulette.start(winnerDish, reelPool, () => {
        if ($('spinDialog').open) close($('spinDialog'), false);
        showResults([{ dish: winnerDish, isNew: false }], false);
        audioSystem.playWin(4);
      });
    };
  }'''

new_custom_wheel_sec = '''  // Vòng quay tự chọn (Custom Wheel) & Kho tàng Món từ Vũ Trụ
  function hideCustomWheelAlert() {
    const alertBox = $('customWheelAlert');
    if (alertBox) alertBox.hidden = true;
  }

  function showCustomWheelAlert(msg) {
    const alertBox = $('customWheelAlert');
    const alertText = $('customWheelAlertText');
    if (alertBox && alertText) {
      alertText.textContent = msg;
      alertBox.hidden = false;
      alertBox.style.animation = 'none';
      alertBox.offsetHeight;
      alertBox.style.animation = 'wheelAlertShake 0.4s ease-in-out';
    }
  }

  function updateCustomWheelCount() {
    if (!$('customWheelInput') || !$('customWheelCount')) return;
    const lines = $('customWheelInput').value.split('\\n').map(s => s.trim()).filter(Boolean);
    $('customWheelCount').textContent = `${lines.length} món trong danh sách`;
    if (lines.length >= 2) hideCustomWheelAlert();
  }

  if ($('customWheelBtn')) {
    $('customWheelBtn').onclick = () => {
      open($('customWheelDialog'));
      updateCustomWheelCount();
      hideCustomWheelAlert();
    };
  }

  if ($('customWheelInput')) {
    $('customWheelInput').oninput = () => {
      updateCustomWheelCount();
      hideCustomWheelAlert();
    };
  }

  if ($('customWheelClearBtn')) {
    $('customWheelClearBtn').onclick = () => {
      if ($('customWheelInput')) {
        $('customWheelInput').value = '';
        updateCustomWheelCount();
        hideCustomWheelAlert();
      }
    };
  }

  // Món từ Vũ Trụ (Universe Dish Picker)
  const universeSelected = new Set();
  let universeActiveCategory = 'all';
  let universeSearchTerm = '';

  function renderUniverseDishList() {
    const listEl = $('universeDishList');
    if (!listEl) return;
    const currentList = allDishes || [];
    const query = normalize(universeSearchTerm);

    const filtered = currentList.filter(dish => {
      const isMain = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId);
      const isSnack = dish.mealId === 'snacks';
      const isDrink = dish.mealId === 'drinks';

      if (universeActiveCategory === 'main' && !isMain) return false;
      if (universeActiveCategory === 'snacks' && !isSnack) return false;
      if (universeActiveCategory === 'drinks' && !isDrink) return false;

      if (query) {
        const dishName = normalize(dish.name);
        const dishType = normalize(dish.type || '');
        if (!dishName.includes(query) && !dishType.includes(query)) return false;
      }
      return true;
    });

    if ($('universeCountAll')) $('universeCountAll').textContent = currentList.length;
    if ($('universeSelectedBadge')) $('universeSelectedBadge').textContent = `Đã chọn: ${universeSelected.size} món`;
    if ($('universeConfirmCount')) $('universeConfirmCount').textContent = universeSelected.size;

    listEl.replaceChildren(...filtered.map(dish => {
      const item = document.createElement('label');
      item.className = 'universe-dish-item' + (universeSelected.has(dish.name) ? ' selected' : '');

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = universeSelected.has(dish.name);

      const thumb = document.createElement('img');
      thumb.src = dish.image;
      thumb.alt = dish.name;
      thumb.loading = 'lazy';
      UI.imageFallback(thumb);

      const info = document.createElement('div');
      info.className = 'universe-dish-info';

      const name = document.createElement('span');
      name.className = 'universe-dish-name';
      name.textContent = dish.name;

      const meta = document.createElement('span');
      meta.className = 'universe-dish-meta';
      const catLabel = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId) ? 'Món Chính' : (dish.mealId === 'snacks' ? 'Ăn Vặt' : 'Đồ Uống');
      meta.textContent = `${catLabel} · ${money(dish.price)}`;

      info.append(name, meta);
      item.append(cb, thumb, info);

      item.onclick = (e) => {
        if (e.target !== cb) cb.checked = !cb.checked;
        if (cb.checked) {
          universeSelected.add(dish.name);
          item.classList.add('selected');
        } else {
          universeSelected.delete(dish.name);
          item.classList.remove('selected');
        }
        if ($('universeSelectedBadge')) $('universeSelectedBadge').textContent = `Đã chọn: ${universeSelected.size} món`;
        if ($('universeConfirmCount')) $('universeConfirmCount').textContent = universeSelected.size;
      };

      return item;
    }));
  }

  if ($('customWheelUniverseBtn')) {
    $('customWheelUniverseBtn').onclick = () => {
      universeSelected.clear();
      const currentLines = ($('customWheelInput')?.value || '').split('\\n').map(s => s.trim()).filter(Boolean);
      for (const line of currentLines) universeSelected.add(line);

      open($('universeDishDialog'));
      renderUniverseDishList();
    };
  }

  document.querySelectorAll('.universe-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.universe-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      universeActiveCategory = tab.dataset.category || 'all';
      renderUniverseDishList();
    };
  });

  if ($('universeDishSearch')) {
    $('universeDishSearch').oninput = (e) => {
      universeSearchTerm = e.target.value.trim();
      renderUniverseDishList();
    };
  }

  if ($('universeSelectAllBtn')) {
    $('universeSelectAllBtn').onclick = () => {
      const currentList = allDishes || [];
      const query = normalize(universeSearchTerm);
      currentList.forEach(dish => {
        const isMain = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId);
        const isSnack = dish.mealId === 'snacks';
        const isDrink = dish.mealId === 'drinks';
        if (universeActiveCategory === 'main' && !isMain) return;
        if (universeActiveCategory === 'snacks' && !isSnack) return;
        if (universeActiveCategory === 'drinks' && !isDrink) return;
        if (query) {
          const dishName = normalize(dish.name);
          const dishType = normalize(dish.type || '');
          if (!dishName.includes(query) && !dishType.includes(query)) return;
        }
        universeSelected.add(dish.name);
      });
      renderUniverseDishList();
    };
  }

  if ($('universeDeselectAllBtn')) {
    $('universeDeselectAllBtn').onclick = () => {
      universeSelected.clear();
      renderUniverseDishList();
    };
  }

  if ($('universeConfirmBtn')) {
    $('universeConfirmBtn').onclick = () => {
      if (universeSelected.size === 0) {
        toast('Bạn chưa chọn món nào từ Vũ Trụ.');
        return;
      }
      if ($('customWheelInput')) {
        $('customWheelInput').value = Array.from(universeSelected).join('\\n');
        updateCustomWheelCount();
        hideCustomWheelAlert();
      }
      close($('universeDishDialog'));
      toast(`✨ Đã nạp ${universeSelected.size} món từ Vũ Trụ vào vòng quay!`);
    };
  }

  if ($('customWheelSpinActionBtn')) {
    $('customWheelSpinActionBtn').onclick = () => {
      const lines = ($('customWheelInput')?.value || '').split('\\n').map(s => s.trim()).filter(Boolean);
      if (lines.length === 0) {
        showCustomWheelAlert('⚠️ Bạn chưa nhập món nào! Hãy điền danh sách hoặc bấm "+ Món từ Vũ Trụ".');
        return;
      }
      if (lines.length < 2) {
        showCustomWheelAlert('⚠️ Cần ít nhất 2 món trong danh sách để vòng quay có thể chọn ngẫu nhiên nhé!');
        return;
      }
      hideCustomWheelAlert();
      close($('customWheelDialog'));

      // Pick winner
      const winnerName = lines[Math.floor(Math.random() * lines.length)];
      const matched = (allDishes || []).find(d => normalize(d.name) === normalize(winnerName));

      const winnerDish = matched || {
        id: 'custom_wheel_' + Date.now(),
        name: winnerName,
        rarity: 4,
        mealId: 'main',
        type: 'Món tự chọn của bạn',
        image: 'images/brand.svg',
        price: 0,
        desc: 'Món ăn do bạn tự nhập vào vòng quay tùy chọn hôm nay. Chúc bạn có một bữa ăn ngon miệng!',
        quote: 'Vũ trụ đã lựa chọn món này cho bạn!',
        calories: 350,
      };

      // Construct reel candidates
      const reelPool = [];
      for (let i = 0; i < 20; i++) {
        const itemN = lines[i % lines.length];
        const m = (allDishes || []).find(d => normalize(d.name) === normalize(itemN));
        reelPool.push(m || { id: 'reel_' + i, name: itemN, rarity: 3, image: 'images/brand.svg' });
      }

      open($('spinDialog'), true);
      roulette.start(winnerDish, reelPool, () => {
        if ($('spinDialog').open) close($('spinDialog'), false);
        showResults([{ dish: winnerDish, isNew: false }], false);
        audioSystem.playWin(4);
      });
    };
  }'''

c_norm = content.replace('\r\n', '\n')
t_norm = old_custom_wheel_sec.replace('\r\n', '\n')
assert t_norm in c_norm, 'old_custom_wheel_sec not found in app.js'
content = c_norm.replace(t_norm, new_custom_wheel_sec)

with open(r'src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Successfully updated src/js/app.js with Main Dishes, Universe Picker, and Alert fixes!')
