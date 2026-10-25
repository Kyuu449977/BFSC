import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Inspect all dishes in FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

# Match meal periods and dishes
periods = re.findall(r"([a-z_]+):\s*\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'", fd_str)
print("=== FOOD_DATABASE (VIETNAM) MEAL PERIODS ===")
for p in periods:
    print(p)

# Let's extract all dishes with their meal period
vn_dishes_by_period = {}
period_blocks = re.split(r"\n\s*([a-z_]+):\s*\{\s*id:\s*'([a-z_]+)'", fd_str)
# Each block has dish items
for p_id in ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks', 'sinh_vien', 'binh_dan']:
    idx = fd_str.find(f"id: '{p_id}'")
    if idx != -1:
        # find end of dishes array
        d_idx = fd_str.find('dishes: [', idx)
        d_end = fd_str.find(']\n', d_idx)
        if d_end == -1:
            d_end = fd_str.find('],', d_idx)
        dish_block = fd_str[d_idx:d_end]
        names = re.findall(r"name:\s*'([^']+)'", dish_block)
        ids = re.findall(r"id:\s*'([^']+)'", dish_block)
        print(f"\n--- Period: {p_id} ({len(names)} dishes) ---")
        for i, n in enumerate(names):
            d_id = ids[i] if i < len(ids) else ''
            print(f"  [{d_id}] {n}")
