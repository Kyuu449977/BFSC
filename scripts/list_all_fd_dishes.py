import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

all_dishes = re.findall(r"id:\s*'([^']+)',\s*name:\s*'([^']+)'", fd_str)
print(f"Total dishes in FOOD_DATABASE: {len(all_dishes)}")
for d_id, name in all_dishes:
    print(f"{d_id}: {name}")
