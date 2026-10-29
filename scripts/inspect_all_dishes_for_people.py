import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

# Find all dish blocks in drinks
drinks_section = text.split("drinks: {")[1].split("moreDishes:")[0]
dish_blocks = re.findall(r'\{\s*"id":\s*"(nuoc_[^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"', drinks_section)

print(f"Total drinks dishes found: {len(dish_blocks)}")
for dish_id, name, img in dish_blocks:
    img_name = img.split('/')[-1]
    src_info = sources.get(img_name, {})
    title = src_info.get('title', '')
    print(f"{dish_id:30} | {name:32} | {img_name:32} | {title}")
