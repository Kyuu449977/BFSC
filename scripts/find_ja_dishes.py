import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

# Find Japanese dishes
target_names = [
    'Tamago Sando',
    'Natto',
    'Tai-chazuke',
    'Ogura Toast',
    'Umeboshi',
    'Miso',
    'TKG'
]

for name in target_names:
    pos = text.find(name)
    if pos != -1:
        # find enclosing dish object
        start_obj = text.rfind('{', 0, pos)
        end_obj = text.find('}', pos)
        dish_chunk = text[start_obj:end_obj+1]
        id_m = re.search(r"id:\s*'([^']+)'", dish_chunk)
        img_m = re.search(r"image:\s*'([^']+)'", dish_chunk)
        dish_id = id_m.group(1) if id_m else 'unknown'
        dish_img = img_m.group(1) if img_m else 'unknown'
        src_info = sources.get(dish_id, {})
        print(f"Name match '{name}': ID={dish_id}, IMG={dish_img}")
        print(f"   Source Title: {src_info.get('title')}, URL: {src_info.get('url')}")
