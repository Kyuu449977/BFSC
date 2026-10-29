import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_text = f.read()

start = data_text.find('drinks: {')
end = data_text.find('// 05.', start)
drinks_chunk = data_text[start:end]

drink_items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",.*?"image":\s*"([^"]+)"', drinks_chunk, re.DOTALL)

for did, name, img in drink_items:
    src_info = sources.get(did, {})
    title = src_info.get('title', '')
    url = src_info.get('url', '')
    print(f"[{did}] {name} => title: {title}")
