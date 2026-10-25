import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'Bánh lọt' in l or 'Chè bưởi' in l:
        print(f"{i+1}: {l.strip()}")
