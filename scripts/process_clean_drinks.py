import os
import json
import shutil
from PIL import Image

targets = {
    'nuoc_ep_oi': {
        'raw': 'tmp_downloads/nuoc_ep_oi_raw.jpg',
        'out': ['src/images/do_uong/nuoc_ep_oi.webp'],
        'title': 'File:Agua de guayaba.jpg',
        'name': 'Nước Ép Ổi Hạt Lựu',
        'artist': 'AlejandroLinaresGarcia',
        'source': 'https://commons.wikimedia.org/wiki/File:Agua_de_guayaba.jpg',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'note': 'Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh tĩnh vật ẩm thực Wikimedia Commons. Không dính người.'
    },
    'nuoc_tra_oi_hong_hat_chia': {
        'raw': 'tmp_downloads/nuoc_tra_oi_hong_hat_chia_raw.jpg',
        'out': ['src/images/do_uong/nuoc_tra_oi_hong_hat_chia.webp'],
        'title': 'File:Fresh Gvava Juice.JPG',
        'name': 'Trà Ổi Hồng Hạt Chia',
        'artist': 'MGA73bot2',
        'source': 'https://commons.wikimedia.org/wiki/File:Fresh_Gvava_Juice.JPG',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'note': 'Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh tĩnh vật ẩm thực Wikimedia Commons. Không dính người.'
    },
    'nuoc_sinh_to_xoai': {
        'raw': 'tmp_downloads/nuoc_sinh_to_xoai_raw.jpg',
        'out': ['src/images/do_uong/nuoc_sinh_to_xoai.webp'],
        'title': 'File:Costco treats - Lassi.jpg',
        'name': 'Sinh Tố Xoài Cát Hòa Lộc',
        'artist': 'Infrogmation of New Orleans',
        'source': 'https://commons.wikimedia.org/wiki/File:Costco_treats_-_Lassi.jpg',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'note': 'Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh tĩnh vật ẩm thực Wikimedia Commons. Không dính người.'
    },
    'nuoc_tra_vai_lai': {
        'raw': 'tmp_downloads/nuoc_tra_vai_lai_raw.jpg',
        'out': ['src/images/do_uong/nuoc_tra_vai_lai.webp'],
        'title': 'File:Lychee Tea.jpg',
        'name': 'Trà Vải Hoa Lài',
        'artist': 'Jane023',
        'source': 'https://commons.wikimedia.org/wiki/File:Lychee_Tea.jpg',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'note': 'Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh tĩnh vật ẩm thực Wikimedia Commons. Không dính người.'
    },
    'nuoc_revive': {
        'raw': 'tmp_downloads/nuoc_revive_raw.jpg',
        'out': [
            'src/images/do_uong/nuoc_revive.webp',
            'src/images/regional/vi/nuoc_revive.webp'
        ],
        'title': 'File:Gatorade Thirst Quencher.jpg',
        'name': 'Nước bù khoáng Revive',
        'artist': 'Clean Sports Isotonic Photography',
        'source': 'https://commons.wikimedia.org/wiki/File:Gatorade_Thirst_Quencher.jpg',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'note': 'Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh tĩnh vật đồ uống bù khoáng. Không dính người.'
    }
}

for key, item in targets.items():
    raw_path = item['raw']
    print(f"Processing {key} from {raw_path}...")
    with Image.open(raw_path) as im:
        im = im.convert('RGB')
        w, h = im.size
        target_ratio = 4.0 / 3.0
        current_ratio = w / h
        if current_ratio > target_ratio:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            im = im.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            im = im.crop((0, top, w, top + new_h))
        im = im.resize((640, 480), Image.Resampling.LANCZOS)
        for dest in item['out']:
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            im.save(dest, 'WEBP', quality=85)
            print(f"  Saved {dest} ({os.path.getsize(dest)} bytes)")

# Update sources.json
with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

for key, item in targets.items():
    meta = {
        'name': item['name'],
        'file': item['out'][0].replace('src/', ''),
        'kind': 'photo',
        'title': item['title'],
        'artist': item['artist'],
        'source': item['source'],
        'license': item['license'],
        'licenseUrl': item['licenseUrl'],
        'note': item['note']
    }
    sources[key] = meta
    sources[f"{key}.webp"] = meta

with open('src/images/sources.json', 'w', encoding='utf-8') as f:
    json.dump(sources, f, ensure_ascii=False, indent=2)

print("\nSources.json updated successfully!")
