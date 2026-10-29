import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in themes.css: {len(lines)}")
for i in range(min(60, len(lines))):
    print(lines[i].rstrip())
