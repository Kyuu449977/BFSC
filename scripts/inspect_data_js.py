import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const FOOD_DATABASE = \{(.*?)\n\};', text, re.DOTALL)
if m:
    content = m.group(1)
    keys = re.findall(r'^\s*([a-zA-Z0-9_]+)\s*:\s*\{', content, re.MULTILINE)
    print('Categories in FOOD_DATABASE:', keys)
    for k in keys:
        sub = re.findall(rf'{k}\s*:\s*\{{.*?dishes\s*:\s*\[(.*?)\]', content, re.DOTALL)
        if sub:
            dish_ids = re.findall(r'id\s*:\s*[\'"]([^\'"]+)[\'"]', sub[0])
            print(f'  {k}: {len(dish_ids)} dishes, sample: {dish_ids[:3]}')
