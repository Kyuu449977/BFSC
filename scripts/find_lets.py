with open('src/js/app.js', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(800, min(1400, len(lines))):
    if lines[i].strip().startswith('let '):
        print(f"Line {i+1}: {lines[i].strip()}")
