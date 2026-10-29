import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'viewing:' in l or 'menuFilter' in l or 'filter-pill' in l or 'filter-tab' in l:
        print(f"Line {i+1}: {l.strip()}")
        for j in range(max(0, i-5), min(len(lines), i+25)):
            print(f"  {j+1}: {lines[j]}", end='')
        print("\n" + "="*50)
        break
