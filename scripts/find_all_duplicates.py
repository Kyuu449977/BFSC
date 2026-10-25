import re
import sys
import json
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

# Extract all dishes: id, name, meal
dishes_vn = []
# Match dish objects in FOOD_DATABASE
matches = re.finditer(r"id:\s*'([^']+)',\s*name:\s*'([^']+)'", fd_str)
for m in matches:
    dishes_vn.append({'id': m.group(1), 'name': m.group(2)})

print(f"Total Vietnamese dishes parsed: {len(dishes_vn)}")
name_counts = Counter(d['name'] for d in dishes_vn)
dupes = {name: count for name, count in name_counts.items() if count > 1}
if dupes:
    print(f"DUPLICATES IN FOOD_DATABASE: {dupes}")
else:
    print("No duplicates in FOOD_DATABASE by exact name.")

# Check regional databases
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
    r_list = []
    for p_id, p_obj in r_data.items():
        for d in p_obj.get('dishes', []):
            r_list.append((p_id, d))
    regional_dishes[region] = r_list

# Check duplicates within each region
for region, d_list in regional_dishes.items():
    counts = Counter(d['name'] for p, d in d_list)
    r_dupes = {name: c for name, c in counts.items() if c > 1}
    if r_dupes:
        print(f"DUPLICATES in {region}: {r_dupes}")
    else:
        print(f"No duplicates in {region}.")

# Now check translations across regions:
# Do any dishes in regional databases have identical Vietnamese translated names?
# Or do any Vietnamese dishes have the same name as regional dishes?
with open(r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md', 'r', encoding='utf-8') as f:
    plan_text = f.read()

dish_pattern = r'^\s*\d+\.\s+\*\*([^*]+)\*\*\s+\|\s+\*([^*]+)\*\s+\|\s+([^|]+)\|\s*(.+)$'
plan_dishes = []
for line in plan_text.splitlines():
    m = re.match(dish_pattern, line.strip())
    if m:
        plan_dishes.append({
            'native': m.group(1).strip(),
            'vi': m.group(2).strip(),
            'desc': m.group(4).strip()
        })

vi_counts = Counter(d['vi'] for d in plan_dishes)
vi_dupes = {name: c for name, c in vi_counts.items() if c > 1}
if vi_dupes:
    print(f"DUPLICATES in plan vi names: {vi_dupes}")
