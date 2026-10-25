import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/theme-init.js', 'r', encoding='utf-8') as f:
    text = f.read()

print(text[:1200])
