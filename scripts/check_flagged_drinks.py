import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_drinks = text.find('drinks: {')
end_drinks = text.find('// 05. Regional databases', start_drinks)
chunk = text[start_drinks:end_drinks]

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"rarity":\s*\d+,\s*"type":\s*"([^"]+)",\s*"image":\s*"([^"]+)"', chunk)

print(f"Total pure drinks in FOOD_DATABASE.drinks: {len(items)}")

flagged = []
for did, dname, dtype, dimg in items:
    src_info = sources.get(did, {})
    title = src_info.get('title', '')
    url = src_info.get('url', '')
    # Check suspicious keywords in title
    suspicious = any(w in title.lower() for w in ['cheesecake', 'sorbet', 'waffle', 'macaroni', 'person', 'people', 'terrace', 'square', 'glass of pepsi-cola at a terrace'])
    print(f"[{did}] {dname} | img={dimg} | title={title[:70]}")
    if suspicious:
        flagged.append((did, dname, title))

print(f"\nFlagged suspicious drinks: {len(flagged)}")
for f in flagged:
    print(f, end='\n')
