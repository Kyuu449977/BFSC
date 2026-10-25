import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/master_downloaded_meta.json', 'r', encoding='utf-8') as f:
    meta = json.load(f)

print(f"Total downloaded entries: {len(meta)}")
for k, v in meta.items():
    print(f"{k} -> {v['file_title']}")
