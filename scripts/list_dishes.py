import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    content = f.read()

# Parse categories and their dishes
# Match: groupKey: { id: '...', name: '...', dishes: [ ... ] }
groups = re.findall(r'(\w+):\s*\{\s*id:\s*\'(\w+)\',\s*name:\s*\'([^\']+)\',[\s\S]*?dishes:\s*\[([\s\S]*?)\n\s*\]\s*,?\s*\}', content)

print(f"Total groups: {len(groups)}")
all_dishes = []
for gkey, gid, gname, gdishes in groups:
    items = re.findall(r'\{\s*id:\s*\'([^\']+)\',\s*name:\s*\'([^\']+)\'[\s\S]*?desc:\s*\'([^\']+)\'[\s\S]*?\}', gdishes)
    print(f"Group {gkey} ({gname}): {len(items)} dishes")
    for did, dname, ddesc in items:
        all_dishes.append({
            'group': gkey,
            'id': did,
            'name': dname,
            'desc': ddesc
        })

print(f"Total parsed dishes: {len(all_dishes)}")
with open('outputs/dishes_catalog.json', 'w', encoding='utf-8') as f:
    json.dump(all_dishes, f, ensure_ascii=False, indent=2)
print("Saved to outputs/dishes_catalog.json")
