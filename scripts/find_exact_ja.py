import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'Tamago Sando' in line or 'Natto' in line or 'TKG' in line or 'Ogura Toast' in line:
        print(f"Line {i+1}: {line.strip()}")
        for j in range(max(0, i-5), min(len(lines), i+15)):
            print(f"  {j+1}: {lines[j]}", end='')
        print("\n" + "="*50)
