import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for reg in ['ja', 'ko', 'zh', 'en', 'vi']:
    dishes = data[reg]
    print(f'=== Region: {reg} ({len(dishes)} dishes) ===')
    for d in dishes:
        print(f"  [{d['id']}] {d['name']} | {d['image']}")
