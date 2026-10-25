import sys, json, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scripts'))

from curated_queries_vi import VI_QUERIES

with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

vi_map = {d['id']: d['image'] for d in data['vi']}

for dish_id in VI_QUERIES:
    img_path = vi_map.get(dish_id)
    print(f"'{dish_id}': 'src/{img_path}',")
