import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for d in data['ja']:
    print(f"{d['id']} | {d['name']} | {d['desc']}")
