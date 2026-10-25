import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find DISH_TRANSLATIONS
m = re.search(r'const DISH_TRANSLATIONS\s*=\s*\{([\s\S]*?)\n\};', text)
if m:
    content = m.group(1)
    keys = re.findall(r'^\s*([a-zA-Z0-9_]+):\s*\{', content, re.MULTILINE)
    print(f'Total keys in DISH_TRANSLATIONS: {len(keys)}')
    print('Sample keys:', keys[:10])
    
    # Check parenthesized strings in en
    en_with_parens = re.findall(r'en:\s*\{[^}]*name:\s*["\']([^"\']+\([^)]+\))["\']', content)
    print(f'EN translations with parens: {len(en_with_parens)}')
    for p in en_with_parens[:5]:
        print(' ', p)
