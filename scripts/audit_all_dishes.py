import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Parse FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

fd_dishes = []
# Find all dishes in FOOD_DATABASE
dish_blocks = re.findall(r"\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?desc:\s*'([^']+)'", fd_str)
print(f"=== VIETNAM (FOOD_DATABASE): {len(dish_blocks)} dishes ===")

# Check for non-vietnamese dishes in Vietnam
thai_dishes = [d for d in dish_blocks if 'thái' in d[1].lower() or 'thái' in d[2].lower()]
print("\nThai dishes found in Vietnam database:")
for d in thai_dishes:
    print(f"  [{d[0]}] {d[1]}")

# Check for foreign drinks or generic sodas in Vietnam drinks
soft_drinks = [d for d in dish_blocks if any(b in d[1].lower() for b in ['coca', 'pepsi', '7up', 'sprite', 'sting', 'red bull', 'bò húc', 'mirinda', 'revive'])]
print("\nCommercial canned sodas in Vietnam database:")
for d in soft_drinks:
    print(f"  [{d[0]}] {d[1]}")

# 2. Check regional databases
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
    print(f"\n=== REGION: {region.upper()} ===")
    all_r_dishes = []
    for p_id, p_obj in r_data.items():
        for d in p_obj.get('dishes', []):
            all_r_dishes.append((p_id, d))
    print(f"Total: {len(all_r_dishes)} dishes")
    
    # Check for duplicate names within region
    names = [d['name'] for p, d in all_r_dishes]
    seen = set()
    for n in names:
        if n in seen:
            print(f"  DUPLICATE IN {region}: {n}")
        seen.add(n)
        
    # Check for cross-region contamination:
    # For Japan: any Korean (hangul) or Chinese (pinyin) or Western dishes?
    # For Korea: any Japanese (kana) or Chinese?
    # For China: any Korean or Japanese?
    # For Western: any Asian dishes?
