import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update TRANSLATIONS in app.js
translations = {
    'vi': ("color_orange: 'Cam đất',", "color_system: 'Màu hệ thống',\n      color_orange: 'Cam đất',"),
    'en': ("color_orange: 'Terracotta',", "color_system: 'System Theme',\n      color_orange: 'Terracotta',"),
    'ja': ("color_orange: 'オレンジ',", "color_system: 'システム規定',\n      color_orange: 'オレンジ',"),
    'ko': ("color_orange: '오렌지',", "color_system: '시스템 기본',\n      color_orange: '오렌지',"),
    'zh': ("color_orange: '橙色',", "color_system: '系统默认',\n      color_orange: '橙色',"),
}

for lang, (old_t, new_t) in translations.items():
    if old_t in text:
        text = text.replace(old_t, new_t, 1)

# 2. Update themeChoices in applyLanguage
text = text.replace(
    "const themeChoices = { orange: tDict.color_orange, green: tDict.color_green, blue: tDict.color_blue, rose: tDict.color_rose };",
    "const themeChoices = { system: tDict.color_system, orange: tDict.color_orange, green: tDict.color_green, blue: tDict.color_blue, rose: tDict.color_rose };"
)

# 3. Update settings defaults and valid check
text = text.replace("theme: 'orange',", "theme: 'system',", 1)
text = text.replace(
    "['orange', 'green', 'blue', 'rose', 'custom'].includes(item)",
    "['system', 'orange', 'green', 'blue', 'rose', 'custom'].includes(item)"
)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/js/app.js updated successfully for system theme!")
