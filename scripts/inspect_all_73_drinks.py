import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_drinks = text.find('drinks: {')
end_drinks = text.find('// 05.', start_drinks)
chunk = text[start_drinks:end_drinks]

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

# Find all dish objects in drinks
items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",.*?"image":\s*"([^"]+)"', chunk, re.DOTALL)
print(f"Total drinks found: {len(items)}")

for did, dname, dimg in items:
    src_info = sources.get(did, {})
    title = src_info.get('title', '')
    url = src_info.get('url', '')
    author = src_info.get('author', '')
    print(f"[{did}] {dname}")
    print(f"   Image: {dimg}")
    print(f"   Source title: {title}")
