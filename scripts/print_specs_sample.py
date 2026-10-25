import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_download_specs.json', 'r', encoding='utf-8') as f:
    specs = json.load(f)

print(f"Total specs: {len(specs)}")
for s in specs[:15]:
    print(s['id'], s['name'], s['queries'])
