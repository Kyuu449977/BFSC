import urllib.request
import json
import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

targets = {
    'nuoc_ep_oi': {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Agua_de_guayaba.jpg',
        'title': 'File:Agua de guayaba.jpg',
        'artist': 'AlejandroLinaresGarcia',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'name': 'Nước Ép Ổi Hạt Lựu'
    },
    'nuoc_tra_oi_hong_hat_chia': {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Fresh_Gvava_Juice.JPG',
        'title': 'File:Fresh Gvava Juice.JPG',
        'artist': 'MGA73bot2',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'name': 'Trà Ổi Hồng Hạt Chia'
    },
    'nuoc_sinh_to_xoai': {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Costco_treats_-_Lassi.jpg',
        'title': 'File:Costco treats - Lassi.jpg',
        'artist': 'Infrogmation of New Orleans',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'name': 'Sinh Tố Xoài Cát Hòa Lộc'
    },
    'nuoc_tra_vai_lai': {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Lychee_Tea.jpg',
        'title': 'File:Lychee Tea.jpg',
        'artist': 'Jane023',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'name': 'Trà Vải Hoa Lài'
    },
    'nuoc_revive': {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Gatorade_Thirst_Quencher.jpg',
        'title': 'File:Gatorade Thirst Quencher.jpg',
        'artist': 'Clean Sports Isotonic Drink',
        'license': 'CC BY-SA 4.0',
        'licenseUrl': 'https://creativecommons.org/licenses/by-sa/4.0',
        'name': 'Nước bù khoáng Revive'
    }
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

os.makedirs('tmp_downloads', exist_ok=True)

for key, info in targets.items():
    raw_path = f"tmp_downloads/{key}_raw.jpg"
    print(f"Downloading {key} from {info['url']}...")
    req = urllib.request.Request(info['url'], headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        with open(raw_path, 'wb') as f:
            f.write(resp.read())
    
    with Image.open(raw_path) as im:
        im = im.convert('RGB')
        w, h = im.size
        print(f"  Downloaded: {w}x{h}")
        
        # Center-crop to 4:3
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
        out_path = f"src/images/do_uong/{key}.webp"
        im.save(out_path, 'WEBP', quality=85)
        print(f"  Saved 640x480 WebP to {out_path} ({os.path.getsize(out_path)} bytes)")

print("\nAll 5 images successfully processed and converted!")
