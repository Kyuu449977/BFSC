import json, re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Load DISH_TRANSLATIONS
trans_start = text.find('const DISH_TRANSLATIONS = {')
trans_end = text.find('};\n\nfunction getDishName')
trans_text = text[trans_start + len('const DISH_TRANSLATIONS = {'):trans_end]

# Clean up DISH_TRANSLATIONS text to parse or use regex
reg_idx = text.find('const REGIONAL_DATABASES = {')

dish_items = []

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
    
    for cat_k, cat in r_data.items():
        for d in cat['dishes']:
            did = d['id']
            name = d['name']
            
            # Clean name for search (remove parentheses, numbers)
            clean_q = re.sub(r'\(.*?\)|（.*?）', '', name).strip()
            clean_q = re.sub(r'^\d+円パン', '10円パン', clean_q)
            clean_q = re.sub(r'^\d+\s*本', '', clean_q)
            
            # Search English translation from text
            en_match = re.search(rf"{did}:\s*\{{[^}}]*?\"en\":\s*\{{[^}}]*?\"name\":\s*\"([^\"]+)\"", text)
            en_name = en_match.group(1) if en_match else ""
            
            vi_match = re.search(rf"{did}:\s*\{{[^}}]*?\"vi\":\s*\{{[^}}]*?\"name\":\s*\"([^\"]+)\"", text)
            vi_name = vi_match.group(1) if vi_match else ""
            
            dish_items.append({
                'region': region,
                'id': did,
                'name': name,
                'query': clean_q,
                'en_name': en_name,
                'vi_name': vi_name
            })

print(f"Prepared {len(dish_items)} regional dishes.")
print("Sample prepared queries:")
for d in dish_items[:8]:
    print(f"  [{d['region']}] {d['id']}: name='{d['name']}' -> query='{d['query']}', en='{d['en_name']}'")
