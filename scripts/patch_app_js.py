import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update TRANSLATIONS in app.js
if 'mode_auto' not in text:
    old_vi = "mode_light: 'Sáng',\n      mode_dark: 'Tối',\n      mode_system: 'Theo thiết bị',"
    new_vi = "mode_light: 'Sáng',\n      mode_dark: 'Tối',\n      mode_system: 'Theo thiết bị',\n      mode_auto: 'Tự động (Theo giờ)',\n      custom_color_text: 'Tự chọn màu',"
    assert old_vi in text, "old_vi not found"
    text = text.replace(old_vi, new_vi, 1)

    old_en = "mode_light: 'Light',\n      mode_dark: 'Dark',\n      mode_system: 'System',"
    new_en = "mode_light: 'Light',\n      mode_dark: 'Dark',\n      mode_system: 'System',\n      mode_auto: 'Auto (By Time)',\n      custom_color_text: 'Custom Color',"
    assert old_en in text, "old_en not found"
    text = text.replace(old_en, new_en, 1)

    old_ja = "mode_light: 'ライト',\n      mode_dark: 'ダーク',\n      mode_system: 'システム連動',"
    new_ja = "mode_light: 'ライト',\n      mode_dark: 'ダーク',\n      mode_system: 'システム連動',\n      mode_auto: '自動（時間帯）',\n      custom_color_text: 'カスタム色',"
    assert old_ja in text, "old_ja not found"
    text = text.replace(old_ja, new_ja, 1)

    old_ko = "mode_light: '라이트',\n      mode_dark: '다크',\n      mode_system: '기기 설정',"
    new_ko = "mode_light: '라이트',\n      mode_dark: '다크',\n      mode_system: '기기 설정',\n      mode_auto: '자동 (시간대별)',\n      custom_color_text: '사용자 지정 색상',"
    assert old_ko in text, "old_ko not found"
    text = text.replace(old_ko, new_ko, 1)

    old_zh = "mode_light: '明亮',\n      mode_dark: '深色',\n      mode_system: '跟随系统',"
    new_zh = "mode_light: '明亮',\n      mode_dark: '深色',\n      mode_system: '跟随系统',\n      mode_auto: '自动（按时段）',\n      custom_color_text: '自定义颜色',"
    assert old_zh in text, "old_zh not found"
    text = text.replace(old_zh, new_zh, 1)

# 2. Update settings defaults and validation
old_settings = """    const value = {
      unique: true,
      muted: false,
      budget: null,
      theme: 'orange',
      appearance: 'light',
      timezone: 'auto',
      language: 'vi',
    };
    const valid = (key, item) =>
      key === 'appearance'
        ? ['light', 'dark', 'system'].includes(item)
        : key === 'theme'
          ? ['orange', 'green', 'blue', 'rose'].includes(item)"""

new_settings = """    const value = {
      unique: true,
      muted: false,
      budget: null,
      theme: 'orange',
      customColor: '#ff5722',
      appearance: 'light',
      timezone: 'auto',
      language: 'vi',
    };
    const valid = (key, item) =>
      key === 'appearance'
        ? ['light', 'dark', 'system', 'auto'].includes(item)
        : key === 'theme'
          ? ['orange', 'green', 'blue', 'rose', 'custom'].includes(item)
          : key === 'customColor'
            ? typeof item === 'string' && /^#[0-9a-fA-F]{6}$/.test(item)"""

if old_settings in text:
    text = text.replace(old_settings, new_settings, 1)

# 3. Update applyLanguage for appChoices and customColorLabel
old_app_choices = "    const appChoices = { light: tDict.mode_light, dark: tDict.mode_dark, system: tDict.mode_system };"
new_app_choices = """    const appChoices = { light: tDict.mode_light, dark: tDict.mode_dark, system: tDict.mode_system, auto: tDict.mode_auto };
    if ($('customColorLabel')) $('customColorLabel').textContent = tDict.custom_color_text || 'Tự chọn màu';"""
if old_app_choices in text:
    text = text.replace(old_app_choices, new_app_choices, 1)

# 4. Update updateTheme() to sync customThemeColor and customColorPreview
old_update_theme = """    document
      .querySelectorAll('[data-lang-choice]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.langChoice === settings.language))
      );
    updateTimezoneUI();
  }"""

new_update_theme = """    document
      .querySelectorAll('[data-lang-choice]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.langChoice === settings.language))
      );
    if ($('customThemeColor') && settings.customColor) {
      $('customThemeColor').value = settings.customColor;
    }
    if ($('customColorPreview') && settings.customColor) {
      $('customColorPreview').style.backgroundColor = settings.customColor;
    }
    updateTimezoneUI();
  }"""

if old_update_theme in text:
    text = text.replace(old_update_theme, new_update_theme, 1)

# 5. Wire customThemeColor input and change
old_theme_wire = """  document.querySelectorAll('[data-theme-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.theme = button.dataset.themeChoice;
        updateTheme();
        saveSettings({ theme: settings.theme });
      })
  );"""

new_theme_wire = """  document.querySelectorAll('[data-theme-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.theme = button.dataset.themeChoice;
        updateTheme();
        saveSettings({ theme: settings.theme });
      })
  );

  const customColorEl = $('customThemeColor');
  if (customColorEl) {
    const onCustomColorChange = (e) => {
      const col = e.target.value;
      settings.theme = 'custom';
      settings.customColor = col;
      if ($('customColorPreview')) {
        $('customColorPreview').style.backgroundColor = col;
      }
      updateTheme();
      saveSettings({ theme: 'custom', customColor: col });
    };
    customColorEl.addEventListener('input', onCustomColorChange);
    customColorEl.addEventListener('change', onCustomColorChange);
  }"""

if old_theme_wire in text:
    text = text.replace(old_theme_wire, new_theme_wire, 1)

# 6. In updateTimezoneUI, if appearance is auto, re-apply appearance
old_tz_end = """    // 4. Update timezoneClock in themeDialog
    const clockEl = $('timezoneClock');
    if (clockEl) {
      clockEl.textContent = formatTzTime(currentTz);
    }
  }"""

new_tz_end = """    // 4. Update timezoneClock in themeDialog
    const clockEl = $('timezoneClock');
    if (clockEl) {
      clockEl.textContent = formatTzTime(currentTz);
    }
    if (settings.appearance === 'auto') {
      AppearancePreferences.apply(settings);
    }
  }"""

if old_tz_end in text:
    text = text.replace(old_tz_end, new_tz_end, 1)

# 7. Update results card strong price formatting to use money(dish.price)
old_res_price = "text('strong', `${tDict.hero_price_note || 'Giá tham khảo'}: ${dish.price}`, 'price'),"
new_res_price = "text('strong', `${tDict.hero_price_note || 'Giá tham khảo'}: ${money(dish.price)}`, 'price'),"
if old_res_price in text:
    text = text.replace(old_res_price, new_res_price, 1)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/js/app.js updated successfully!")
