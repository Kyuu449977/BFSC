import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_text = f.read()

# Find all drink dishes
start = data_text.find('drinks: {')
end = data_text.find('// 05.', start)
drinks_chunk = data_text[start:end]

drink_items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",.*?"image":\s*"([^"]+)"', drinks_chunk, re.DOTALL)

print(f"Total drinks: {len(drink_items)}")

for did, name, img in drink_items:
    src_info = sources.get(did, {})
    title = src_info.get('title', '')
    url = src_info.get('url', '')
    # Check if title suggests a person, seller, selfie, portrait
    suspect = any(w in title.lower() for w in ['person', 'people', 'man', 'men', 'woman', 'women', 'boy', 'girl', 'seller', 'vendor', 'portrait', 'selfie', 'face', 'drinker', 'drinking'])
    if suspect:
        print(f"SUSPECT [ID: {did}] {name} -> {title}")
