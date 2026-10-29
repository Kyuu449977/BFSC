import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')
with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

for k, v in sources.items():
    if k.startswith('ja_') or k.startswith('ko_') or k.startswith('zh_') or k.startswith('en_'):
        title = v.get('title', '')
        url = v.get('url', '')
        # Check if title or url indicates people, building, or drawing
        print(f"{k}: title='{title[:60]}' | author='{v.get('author','')}'")
