with open('src/js/app.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'function buildFilters' in l:
        print(f"buildFilters at line {i+1}")
        for j in range(i, min(len(lines), i+35)):
            print(f"  {lines[j]}", end='')
        break
