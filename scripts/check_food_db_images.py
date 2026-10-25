import sys, os

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(0, 1750):
    l = lines[i]
    if 'image:' in l:
        # extract path
        import re
        m = re.search(r"image:\s*'([^']+)'", l)
        if m:
            path = m.group(1)
            full_path = os.path.join('src', path)
            if not os.path.exists(full_path):
                print(f'Line {i+1}: Missing image: {path}')
