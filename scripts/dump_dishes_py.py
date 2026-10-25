import sys, json, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

def extract_dishes_from_block(block_text, region_code):
    dishes = []
    pattern = re.compile(r'\{[^{}]*?(?:id|["\']id["\'])\s*:\s*["\']([^"\']+)["\'][^{}]*?\}', re.DOTALL)
    for m in pattern.finditer(block_text):
        obj_text = m.group(0)
        id_m = re.search(r'(?:id|["\']id["\'])\s*:\s*["\']([^"\']+)["\']', obj_text)
        name_m = re.search(r'(?:name|["\']name["\'])\s*:\s*["\']([^"\']+)["\']', obj_text)
        img_m = re.search(r'(?:image|["\']image["\'])\s*:\s*["\']([^"\']+)["\']', obj_text)
        desc_m = re.search(r'(?:desc|["\']desc["\'])\s*:\s*["\']([^"\']*)["\']', obj_text)
        
        if id_m and name_m and img_m:
            dish_id = id_m.group(1)
            if dish_id in ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks']:
                continue
            dishes.append({
                'region': region_code,
                'id': dish_id,
                'name': name_m.group(1),
                'image': img_m.group(1),
                'desc': desc_m.group(1) if desc_m else ''
            })
    return dishes

report = {}

vi_idx = text.find('const FOOD_DATABASE = {')
reg_idx = text.find('const REGIONAL_DATABASES = {')

report['vi'] = extract_dishes_from_block(text[vi_idx:reg_idx], 'vi')

ja_idx = text.find('  ja: {', reg_idx)
ko_idx = text.find('  ko: {', reg_idx)
zh_idx = text.find('  zh: {', reg_idx)
en_idx = text.find('  en: {', reg_idx)

report['ja'] = extract_dishes_from_block(text[ja_idx:ko_idx], 'ja')
report['ko'] = extract_dishes_from_block(text[ko_idx:zh_idx], 'ko')
report['zh'] = extract_dishes_from_block(text[zh_idx:en_idx], 'zh')
report['en'] = extract_dishes_from_block(text[en_idx:], 'en')

for k, v in report.items():
    print(f'{k}: {len(v)} dishes')

with open('scripts/all_dishes_dump.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print('Saved scripts/all_dishes_dump.json successfully!')
