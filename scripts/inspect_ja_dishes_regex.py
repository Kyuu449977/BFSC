import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search all objects that have id starting with ja_
matches = re.finditer(r"id:\s*['\"](ja_[^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?image:\s*['\"]([^'\"]+)['\"]", text, re.DOTALL)
for m in matches:
    print(f"{m.group(1)} | {m.group(2)} | {m.group(3)}")
