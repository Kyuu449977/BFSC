import re
import sys
import json
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_text = text[fd_start:fd_end]

dishes = []
pattern = r"id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?image:\s*'([^']+)'"
for m in re.finditer(pattern, fd_text):
    dishes.append({
        'id': m.group(1),
        'name': m.group(2),
        'image': m.group(3)
    })

img_counts = Counter(d['image'] for d in dishes)

print("Dishes needing their own photo (because current image is reused or mismatched):")
for d in dishes:
    cnt = img_counts[d['image']]
    # If image used more than once or known generic
    if cnt > 1 or 'che_thai' in d['image'] or 'pho_bo' in d['image'] and 'phở bò' not in d['name'].lower() and 'phở tái' not in d['name'].lower():
        print(f"  {d['id']}: {d['name']} (currently: {d['image']})")
