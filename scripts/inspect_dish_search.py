import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('backend/data/dish-search.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"dish-search.json keys: {len(data)}")
for k in list(data.keys())[:15]:
    print(k)
