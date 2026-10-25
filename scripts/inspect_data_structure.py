import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f'Total lines in data.js: {len(lines)}')
for i, l in enumerate(lines):
    if l.startswith('const ') or l.startswith('function '):
        print(f'{i+1}: {l.strip()[:60]}')
