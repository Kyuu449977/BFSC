import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('existing_names.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'bánh canh' in l.lower():
        print(f"{i+1}: {l.strip()}")
