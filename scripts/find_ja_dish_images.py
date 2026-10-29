import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find all dishes in REGIONAL_DATABASES
ja_pos = text.find("ja: {")
if ja_pos != -1:
    ja_chunk = text[ja_pos:ja_pos+20000]
    items = re.findall(r"id:\s*'([^']+)',\s*name:\s*'([^']+)',.*?image:\s*'([^']+)'", ja_chunk, re.DOTALL)
    print(f"Found {len(items)} items in ja database:")
    for item_id, item_name, item_img in items:
        print(f"{item_id}: {item_name} -> {item_img}")
