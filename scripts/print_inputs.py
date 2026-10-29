import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
for inp in re.findall(r'<input[^>]*>', text):
    print(inp)
