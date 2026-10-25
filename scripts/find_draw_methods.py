import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'draw' in l or 'spin' in l or 'roll' in l:
        print(f"{i+1}: {l.strip()[:80]}")
