import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    text = f.read()

m = re.findall(r'(\w+):\s*\{\s*id:\s*[\'"](\w+)[\'"]', text)
print('Categories in FOOD_DATABASE:', m)

with open('src/index.html', encoding='utf-8') as f:
    html = f.read()

modes = re.findall(r'<div[^>]*class=["\']modes["\'][^>]*>[\s\S]*?</div>', html)
print('\nModes in index.html:')
for md in modes:
    print(md)

with open('src/styles/themes.css', encoding='utf-8') as f:
    themes_css = f.read()

theme_rules = re.findall(r'(\[data-theme=[^\]]+\]|\.theme-[a-zA-Z0-9_-]+|--hero-bg[a-zA-Z0-9_-]*)', themes_css)
print('\nTheme selectors sample:', set(theme_rules[:20]))
