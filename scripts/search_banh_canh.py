import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = [m.start() for m in re.finditer(r'bánh canh', text, re.IGNORECASE)]
print(f"Occurrences of 'bánh canh' in data.js: {len(matches)}")
for idx in matches:
    print(text[max(0, idx-80):min(len(text), idx+120)])
    print("-" * 50)
