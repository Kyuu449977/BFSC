import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Check Thai dishes
thai_matches = re.findall(r"name:\s*['\"][^'\"]*Thái[^'\"]*['\"]", text)
print("Thai dishes found in data.js:", thai_matches)

# 2. Check commercial soda in FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_text = text[fd_start:fd_end]

soda_brands = ['Coca', 'Pepsi', '7Up', 'Sprite', 'Sting', 'Red Bull', 'Mirinda', 'Revive']
for b in soda_brands:
    m = re.findall(rf"name:\s*['\"][^'\"]*{b}[^'\"]*['\"]", fd_text, re.IGNORECASE)
    if m:
        print(f"Warning: Commercial brand found in FOOD_DATABASE: {m}")

# 3. Check Bánh lọt and Chè bưởi position in FOOD_DATABASE
print("\nChecking snacks category in FOOD_DATABASE:")
snacks_start = fd_text.find("snacks: {")
snacks_end = fd_text.find("drinks: {")
snacks_text = fd_text[snacks_start:snacks_end]

if "Bánh lọt" in snacks_text:
    print("✓ Bánh lọt is in snacks!")
else:
    print("✗ Bánh lọt is NOT in snacks!")

if "Chè bưởi" in snacks_text:
    print("✓ Chè bưởi is in snacks!")
else:
    print("✗ Chè bưởi is NOT in snacks!")

dinner_start = fd_text.find("dinner: {")
dinner_end = fd_text.find("snacks: {")
dinner_text = fd_text[dinner_start:dinner_end]

if "Bánh lọt" in dinner_text:
    print("✗ Bánh lọt is still in dinner!")
else:
    print("✓ Bánh lọt is NOT in dinner.")

if "Chè bưởi" in dinner_text:
    print("✗ Chè bưởi is still in dinner!")
else:
    print("✓ Chè bưởi is NOT in dinner.")

# 4. Check duplicates in each region of REGIONAL_DATABASES
print("\nChecking duplicates in REGIONAL_DATABASES:")
reg_idx = text.find('const REGIONAL_DATABASES = {')
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
    
    all_names = []
    all_ids = []
    for cat_key, cat in r_data.items():
        for d in cat['dishes']:
            all_names.append(d['name'])
            all_ids.append(d['id'])
    
    dup_names = [n for n in all_names if all_names.count(n) > 1]
    dup_ids = [i for i in all_ids if all_ids.count(i) > 1]
    
    if dup_names:
        print(f"✗ Duplicate names in {region}: {set(dup_names)}")
    else:
        print(f"✓ No duplicate names in {region} ({len(all_names)} dishes total)")
        
    if dup_ids:
        print(f"✗ Duplicate IDs in {region}: {set(dup_ids)}")
    else:
        print(f"✓ No duplicate IDs in {region}")

# 5. Check FOOD_DATABASE duplicates
fd_names = re.findall(r"name:\s*'([^']+)'", fd_text)
fd_ids = re.findall(r"id:\s*'([^']+)'", fd_text)
# Remove category names
cat_names = ['Buổi Sáng', 'Buổi Trưa', 'Buổi Chiều', 'Buổi Tối', 'Đêm Khuya', 'Món Bình Dân', 'Sinh Viên', 'Món Tiết Kiệm', 'Món Ăn Vặt', 'Đồ Uống']
dish_names = [n for n in fd_names if n not in cat_names and not n.startswith('Bữa ')]
dup_dish_names = [n for n in dish_names if dish_names.count(n) > 1]
if dup_dish_names:
    print(f"\n✗ Duplicate dishes in FOOD_DATABASE: {set(dup_dish_names)}")
else:
    print(f"\n✓ No duplicate dishes in FOOD_DATABASE ({len(dish_names)} dishes total)")
