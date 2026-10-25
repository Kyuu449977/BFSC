import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for reg in ['ko', 'zh', 'en']:
    print(f"\n==================== REGION: {reg} ====================")
    for d in data[reg]:
        print(f"{d['id']} | {d['name']} | {d['desc']}")
