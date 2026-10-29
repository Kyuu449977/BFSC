import json

with open('scripts/master_downloaded_meta.json', 'r', encoding='utf-8') as f:
    meta = json.load(f)

for k, v in meta.items():
    if k.startswith('ja_'):
        print(f"{k}: {v.get('file_title')} | {v.get('url')}")
