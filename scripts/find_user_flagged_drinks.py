import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

names = [
    "Nước Ép Ổi Hạt Lựu",
    "Sinh Tố Xoài Cát Hòa Lộc",
    "Trà Ổi Hồng Hạt Chia",
    "Trà Vải Hoa Lài",
    "Nước bù khoáng Revive"
]

for name in names:
    pos = text.find(name)
    if pos != -1:
        p1 = text.rfind('{', 0, pos)
        p2 = text.find('}', pos)
        chunk = text[p1:p2+1]
        id_m = re.search(r"['\"]?id['\"]?:\s*['\"]([^'\"]+)['\"]", chunk)
        img_m = re.search(r"['\"]?image['\"]?:\s*['\"]([^'\"]+)['\"]", chunk)
        print(f"[{name}] -> id={id_m.group(1) if id_m else '?'}, image={img_m.group(1) if img_m else '?'}")
    else:
        print(f"[{name}] -> NOT FOUND")
