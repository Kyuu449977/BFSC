import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_download_specs.json', 'r', encoding='utf-8') as f:
    specs = json.load(f)

for reg in ['ko', 'zh', 'en', 'vi']:
    reg_specs = [s for s in specs if s['region'] == reg]
    print(f"\n=== Region {reg} ({len(reg_specs)}) ===")
    for s in reg_specs[:5]:
        print(s['id'], s['name'], s['queries'])
