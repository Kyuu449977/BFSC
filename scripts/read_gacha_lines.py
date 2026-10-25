import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(312, 345):
    print(f'{i+1}: {lines[i]}', end='')
