import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'showResults(' in l or 'function showResults' in l or 'function dishCard(' in l or 'renderCard(' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
