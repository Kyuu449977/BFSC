import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'ja_m_4' in l or 'ja_m_1' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
