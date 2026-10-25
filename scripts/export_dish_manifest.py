import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Food database
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_text = text[fd_start:fd_end]

# Extract dishes in FOOD_DATABASE
# Group by category
categories = ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks']
vn_dishes = []
for cat in categories:
    c_start = fd_text.find(f"{cat}: {{")
    next_cat_idx = len(fd_text)
    for next_c in categories:
        pos = fd_text.find(f"{next_c}: {{", c_start + 10)
        if pos != -1 and pos < next_cat_idx:
            next_cat_idx = pos
    cat_snippet = fd_text[c_start:next_cat_idx]
    
    # find dish blocks
    dish_matches = re.finditer(r"id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?image:\s*'([^']+)'", cat_snippet)
    for m in dish_matches:
        vn_dishes.append({
            'cat': cat,
            'id': m.group(1),
            'name': m.group(2),
            'image': m.group(3)
        })

print(f"Total Vietnam dishes: {len(vn_dishes)}")

# 2. Regional databases
reg_idx = text.find('const REGIONAL_DATABASES = {')
regional_dishes = {}
for region in ['ja', 'ko', 'zh', 'en']:
    r_start = text.find(f'{region}:', reg_idx)
    b_start = text.find('{', r_start)
    count = 0
    b_end = b_start
    for i in range(b_start, len(text)):
        if text[i] == '{':
            count += 1
        elif text[i] == '}':
            count -= 1
            if count == 0:
                b_end = i + 1
                break
    r_data = json.loads(text[b_start:b_end])
    regional_dishes[region] = []
    for cat_k, cat_val in r_data.items():
        for d in cat_val['dishes']:
            regional_dishes[region].append({
                'cat': cat_k,
                'id': d['id'],
                'name': d['name'],
                'image': d.get('image')
            })
    print(f"Total {region} dishes: {len(regional_dishes[region])}")
