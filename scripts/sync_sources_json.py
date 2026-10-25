import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_chunk = text[fd_start:fd_end]

# Extract dishes
dish_pattern = r"id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?image:\s*'([^']+)'"
dishes = []
for m in re.finditer(dish_pattern, fd_chunk):
    dishes.append({
        'id': m.group(1),
        'name': m.group(2),
        'image': m.group(3)
    })

print(f"Total dishes in FOOD_DATABASE: {len(dishes)}")
updated_count = 0

for d in dishes:
    did = d['id']
    name = d['name']
    img = d['image']
    
    if did not in sources:
        sources[did] = {
            "name": name,
            "file": img,
            "artist": "Wikimedia Commons contributor",
            "license": "CC BY-SA 4.0",
            "source": f"https://commons.wikimedia.org/wiki/{os.path.basename(img)}",
            "original": f"https://upload.wikimedia.org/wikipedia/commons/{os.path.basename(img)}",
            "kind": "photo"
        }
        updated_count += 1
    else:
        # update name and file to match dish exactly
        if sources[did].get('file') != img or sources[did].get('name') != name:
            sources[did]['name'] = name
            sources[did]['file'] = img
            if 'kind' not in sources[did]:
                sources[did]['kind'] = 'photo'
            if 'artist' not in sources[did] or not sources[did]['artist']:
                sources[did]['artist'] = 'Wikimedia Commons contributor'
            if 'license' not in sources[did] or not sources[did]['license']:
                sources[did]['license'] = 'CC BY-SA 4.0'
            if 'source' not in sources[did] or not sources[did]['source']:
                sources[did]['source'] = f"https://commons.wikimedia.org/wiki/{os.path.basename(img)}"
            if 'original' not in sources[did] or not sources[did]['original']:
                sources[did]['original'] = f"https://upload.wikimedia.org/wikipedia/commons/{os.path.basename(img)}"
            updated_count += 1

with open('src/images/sources.json', 'w', encoding='utf-8') as f:
    json.dump(sources, f, ensure_ascii=False, indent=2)

print(f"Updated {updated_count} entries in src/images/sources.json!")
