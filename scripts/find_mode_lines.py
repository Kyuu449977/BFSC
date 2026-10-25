import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'mode_light' in l:
        for k in range(i, i+5):
            print(f'{k+1}: {repr(lines[k])}')
