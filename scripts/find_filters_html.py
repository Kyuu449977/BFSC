with open('src/index.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'id="filters"' in l or "id='filters'" in l:
        print(f"Line {i+1}: {l.strip()}")
        for j in range(max(0, i-2), min(len(lines), i+15)):
            print(f"  {j+1}: {lines[j]}", end='')
        break
