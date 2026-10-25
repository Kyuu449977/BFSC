import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('outputs/dishes_catalog.json', encoding='utf-8'))
for group in ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks']:
    dishes = [d for d in data if d['group'] == group]
    print(f"=== {group.upper()} ({len(dishes)}) ===")
    for d in dishes:
        print(f"  {d['id']}: {d['name']}")
