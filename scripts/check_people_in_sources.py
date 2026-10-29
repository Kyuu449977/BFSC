import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

people_keywords = ['man', 'woman', 'boy', 'girl', 'person', 'people', 'face', 'portrait', 'smiling', 'vendor', 'holding', 't-shirt', 'player', 'athlete', 'selfie', 'youtuber', 'guava juice']

found_suspects = []
for filename, meta in sources.items():
    title = meta.get('title', '').lower()
    desc = meta.get('desc', '').lower()
    author = meta.get('author', '').lower()
    source_url = meta.get('source', '').lower()
    
    text = f"{title} {desc} {author} {source_url}"
    matched = [kw for kw in people_keywords if kw in text]
    if matched:
        found_suspects.append((filename, matched, meta.get('title', '')))

print(f"Total suspects found in sources.json: {len(found_suspects)}")
for fn, kw, title in found_suspects:
    print(f"{fn:35} | {str(kw):25} | {title}")
