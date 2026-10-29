import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/styles/themes.css', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'(\[data-theme=[^\]]+\][\s\S]*?\{[\s\S]*?\})', text)
print(f"Themes found: {len(matches)}")
for m in matches[:10]:
    print(m[:150])
    print('---')
