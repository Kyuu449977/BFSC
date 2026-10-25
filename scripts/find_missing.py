import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_download_specs.json', 'r', encoding='utf-8') as f:
    specs = json.load(f)

missing = []
for s in specs:
    path = f"src/images/regional/{s['region']}/{s['id']}.webp"
    if not os.path.exists(path):
        missing.append(s)

print(f"Total missing: {len(missing)}")
for m in missing:
    print(f"{m['region']} {m['id']}: {m['name']}")
