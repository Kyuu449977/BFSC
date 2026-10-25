import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

with open('src/sw.js', 'r', encoding='utf-8') as f:
    sw = f.read()

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_chunk = text[fd_start:fd_end]

dish_images = set(re.findall(r"image:\s*'([^']+)'", fd_chunk))
missing_in_sw = []
for img in dish_images:
    sw_target = f"'./{img}'"
    if sw_target not in sw:
        missing_in_sw.append(img)

print(f"Total distinct images in FOOD_DATABASE: {len(dish_images)}")
print(f"Missing in sw.js: {len(missing_in_sw)}")
for m in missing_in_sw:
    print(" ", m)

if missing_in_sw:
    # Insert missing images into OPTIONAL array in sw.js
    insert_str = "".join(f"  './{m}',\n" for m in missing_in_sw)
    idx = sw.find("  './images/regional/nem_nuong.webp',\n];")
    if idx != -1:
        insert_idx = idx + len("  './images/regional/nem_nuong.webp',\n")
        sw = sw[:insert_idx] + insert_str + sw[insert_idx:]
        with open('src/sw.js', 'w', encoding='utf-8') as f:
            f.write(sw)
        print("Updated src/sw.js with missing images!")
    else:
        print("Could not find insert point in src/sw.js")
