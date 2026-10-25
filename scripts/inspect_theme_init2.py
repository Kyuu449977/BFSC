import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/theme-init.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
for i, l in enumerate(lines[50:]):
    print(f"{i+51}: {l}")
