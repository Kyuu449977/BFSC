import re

path = 'src/js/app.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update TRANSLATIONS entries
lang_additions = {
    'vi': """      collection_note_tpl: 'Đã khám phá {percent}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.',
      collection_toggle_title: 'Chỉ xem món đã thu thập',
      cat_all: 'Tất cả',
      cat_morning: 'Buổi Sáng',
      cat_lunch: 'Buổi Trưa',
      cat_afternoon: 'Buổi Chiều',
      cat_dinner: 'Buổi Tối',
      cat_snacks: 'Món Ăn Vặt',
      cat_drinks: 'Đồ Uống & Nước Ngọt',""",
    'en': """      collection_note_tpl: 'Discovered {percent}% of menu · These are suggested dishes, not eaten dishes. Saved in this browser.',
      collection_toggle_title: 'View collected dishes only',
      cat_all: 'All',
      cat_morning: 'Breakfast',
      cat_lunch: 'Lunch',
      cat_afternoon: 'Afternoon',
      cat_dinner: 'Dinner',
      cat_snacks: 'Snacks',
      cat_drinks: 'Drinks & Beverages',""",
    'ja': """      collection_note_tpl: 'メニューの{percent}%を発見済み · 提案された料理であり、食べた料理ではありません。このブラウザに保存されます。',
      collection_toggle_title: '収集した料理のみ表示',
      cat_all: 'すべて',
      cat_morning: '朝食',
      cat_lunch: '昼食',
      cat_afternoon: '軽食・おやつ',
      cat_dinner: '夕食',
      cat_snacks: 'スナック・甘味',
      cat_drinks: 'ドリンク・飲料',""",
    'ko': """      collection_note_tpl: '메뉴의 {percent}% 발견 완료 · 추천된 메뉴이며 실제 식사 기록이 아닙니다. 이 브라우저에 저장됩니다.',
      collection_toggle_title: '수집한 메뉴만 보기',
      cat_all: '전체',
      cat_morning: '아침',
      cat_lunch: '점심',
      cat_afternoon: '오후',
      cat_dinner: '저녁',
      cat_snacks: '간식·디저트',
      cat_drinks: '음료·소프트드링크',""",
    'zh': """      collection_note_tpl: '已探索 {percent}% 菜单 · 此为系统推荐菜品，非已吃记录。数据保存在此浏览器中。',
      collection_toggle_title: '仅查看已收集菜品',
      cat_all: '全部',
      cat_morning: '早餐',
      cat_lunch: '午餐',
      cat_afternoon: '下午茶',
      cat_dinner: '晚餐',
      cat_snacks: '小吃点心',
      cat_drinks: '饮品饮料',"""
}

# Replace old cat_ entries in each language
for lang, block in lang_additions.items():
    # Find cat_all to cat_drinks in that language section
    pattern = rf"(\n\s*{lang}:\s*\{{[\s\S]*?)(\s+cat_all:\s*'[^\']+',[\s\S]*?cat_drinks:\s*'[^\']+',)"
    m = re.search(pattern, content)
    if m:
        content = content[:m.start(2)] + "\n" + block + content[m.end(2):]
    else:
        print(f"Warning: pattern for {lang} not found")

# 2. Update stats()
old_stats = """  function stats() {
    const s = engine.getCollectionStats();
    $('collectionCount').textContent = `${s.unlocked} / ${s.total} món`;
    $('collectionProgress').setAttribute('aria-valuemax', String(s.total));
    $('progressFill').style.width = `${s.percentage}%`;
    $('collectionProgress').setAttribute('aria-valuenow', String(s.unlocked));
    $('collectionNote').textContent =
      `Đã khám phá ${s.percentage}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.`;
  }"""

new_stats = """  function stats() {
    const s = engine.getCollectionStats();
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    $('collectionCount').textContent = `${s.unlocked} / ${s.total} ${tDict.dishes_unit || 'món'}`;
    $('collectionProgress').setAttribute('aria-valuemax', String(s.total));
    $('progressFill').style.width = `${s.percentage}%`;
    $('collectionProgress').setAttribute('aria-valuenow', String(s.unlocked));
    const tpl = tDict.collection_note_tpl || 'Đã khám phá {percent}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.';
    $('collectionNote').textContent = tpl.replace('{percent}', s.percentage);
  }"""

assert old_stats in content, "old_stats not found"
content = content.replace(old_stats, new_stats, 1)

# 3. Update sourceName in showResults
old_show_source = """        const pKey = 'period_' + dish.mealId;
        const sourceName = tDict[pKey] ? tDict[pKey].split('·')[0].trim() : result.sourceName;"""

new_show_source = """        const catMap = {
          morning: tDict.cat_morning,
          lunch: tDict.cat_lunch,
          afternoon: tDict.cat_afternoon,
          dinner: tDict.cat_dinner,
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };
        const pKey = 'period_' + dish.mealId;
        const sourceName = catMap[dish.mealId] || (tDict[pKey] ? tDict[pKey].split('·')[0].trim() : result.sourceName);"""

assert old_show_source in content, "old_show_source not found"
content = content.replace(old_show_source, new_show_source, 1)

# 4. Update sourceName in menu()
old_menu_source = """        const pKey = 'period_' + dish.mealId;
        const sourceName = tDict[pKey] ? tDict[pKey].split('·')[0].trim() : dish.mealName;
        const source = text('span', sourceName, 'dish-source');"""

new_menu_source = """        const catMap = {
          morning: tDict.cat_morning,
          lunch: tDict.cat_lunch,
          afternoon: tDict.cat_afternoon,
          dinner: tDict.cat_dinner,
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };
        const pKey = 'period_' + dish.mealId;
        const sourceName = catMap[dish.mealId] || (tDict[pKey] ? tDict[pKey].split('·')[0].trim() : dish.mealName);
        const source = text('span', sourceName, 'dish-source');"""

assert old_menu_source in content, "old_menu_source not found"
content = content.replace(old_menu_source, new_menu_source, 1)

# 5. Replace filters creation block with buildFilters()
old_filters_block = """  [['all', 'Tất cả'], ...Object.values(FOOD_DATABASE).map((g) => [g.id, g.name])].forEach(
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
  );"""

new_filters_block = """  function buildFilters(currentLang = settings.language || 'vi') {
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
    const filterIds = ['all', 'morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks'];
    const existing = $('filters').querySelectorAll('button');
    if (!existing.length) {
      filterIds.forEach((id) => {
        const button = text('button', filterMap[id] || id);
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
      });
    } else {
      existing.forEach((b) => {
        const fid = b.dataset.filter;
        if (filterMap[fid]) b.textContent = filterMap[fid];
        b.setAttribute('aria-pressed', String(fid === filter));
      });
    }
  }
  buildFilters(settings.language || 'vi');"""

assert old_filters_block in content, "old_filters_block not found"
content = content.replace(old_filters_block, new_filters_block, 1)

# 6. Call buildFilters in applyLanguage
old_apply_filters = """    // Filter Buttons in #filters
    const filterMap = {
      all: tDict.cat_all,
      morning: tDict.cat_morning,
      lunch: tDict.cat_lunch,
      afternoon: tDict.cat_afternoon,
      dinner: tDict.cat_dinner,
      snacks: tDict.cat_snacks,
      drinks: tDict.cat_drinks,
    };
    document.querySelectorAll('#filters button').forEach((btn) => {
      const fid = btn.dataset.filter;
      if (filterMap[fid]) btn.textContent = filterMap[fid];
    });"""

new_apply_filters = """    // Filter Buttons in #filters
    if (typeof buildFilters === 'function') {
      buildFilters(lang);
    }
    if ($('collectionToggle')) $('collectionToggle').title = tDict.collection_toggle_title || 'Chỉ xem món đã thu thập';
    if ($('collectionProgress')) $('collectionProgress').setAttribute('aria-label', tDict.collection_progress_aria || 'Tiến độ bộ sưu tập');"""

assert old_apply_filters in content, "old_apply_filters not found"
content = content.replace(old_apply_filters, new_apply_filters, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched menu filters and collection note i18n in src/js/app.js")
