import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

print(f"Total entries in sources.json: {len(sources)}")
drink_entries = {k: v for k, v in sources.items() if 'do_uong' in k}
print(f"Total drinks in sources.json: {len(drink_entries)}")

for path, info in list(drink_entries.items()):
    title = info.get('title', '')
    url = info.get('url', '')
    author = info.get('author', '')
    print(f"{os.path.basename(path)} -> title: {title[:50]} | author: {author[:30]}")
