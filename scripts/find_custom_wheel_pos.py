import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'customWheel', text)]
for idx in matches:
    print(text[max(0, idx-50):min(len(text), idx+200)])
    print('='*40)
