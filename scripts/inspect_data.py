import re

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

dishes = []
cur_dish = {}
for i, line in enumerate(lines):
    line_s = line.strip()
    if line_s.startswith("id:"):
        cur_dish['id'] = line_s.split(":")[1].strip().strip("',\"")
    elif line_s.startswith("name:"):
        cur_dish['name'] = line_s.split(":", 1)[1].strip().strip("',\"")
    elif line_s.startswith("image:"):
        cur_dish['image'] = line_s.split(":", 1)[1].strip().strip("',\"")
        if 'id' in cur_dish and 'name' in cur_dish:
            dishes.append(dict(cur_dish))
            cur_dish = {}

print(f"Total dishes: {len(dishes)}")
# Find dishes from Japan or regional
ja_dishes = [d for d in dishes if 'ja_' in d.get('image', '') or 'ja' in d.get('id', '')]
print(f"Total Japanese dishes: {len(ja_dishes)}")
for d in ja_dishes[:20]:
    print(d)
