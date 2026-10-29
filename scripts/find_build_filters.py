import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'function buildFilters' in l or 'const buildFilters' in l:
        print(f"Line {i+1}: {l.strip()}")
        for j in range(max(0, i-2), min(len(lines), i+40)):
            print(f"  {j+1}: {lines[j]}", end='')
        break
