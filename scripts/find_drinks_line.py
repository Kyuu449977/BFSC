import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'drinks:' in l or 'drinks :' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
