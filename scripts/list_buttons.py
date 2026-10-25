import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

buttons = re.findall(r'<button[^>]+>', html)
for b in buttons:
    print(b)
