import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'Buổi Sáng' in l or 'buổi sáng' in l or 'period' in l or 'meal' in l:
        if '<button' in l or '<div' in l or '<nav' in l or '<select' in l:
            print(f"Line {i+1}: {l.strip()}")
