import sys
import os
import json
import urllib.parse
import urllib.request
import subprocess
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Ensure directories exist
os.makedirs('src/images/do_an_vat', exist_ok=True)
os.makedirs('src/images/do_uong', exist_ok=True)
os.makedirs('src/images/regional/ja', exist_ok=True)

# Helper to crop & convert to WebP
def process_to_webp(src_path, dest_path, target_size=(640, 480)):
    try:
        with Image.open(src_path) as im:
            if im.mode in ('RGBA', 'LA', 'P'):
                im = im.convert('RGB')
            w, h = im.size
            scale = max(target_size[0] / w, target_size[1] / h)
            nw = int(w * scale)
            nh = int(h * scale)
            im_resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
            left = (nw - target_size[0]) // 2
            top = (nh - target_size[1]) // 2
            cropped = im_resized.crop((left, top, left + target_size[0], top + target_size[1]))
            cropped.save(dest_path, 'WEBP', quality=85)
            return True
    except Exception as e:
        print(f"Error processing {src_path} -> {dest_path}: {e}")
        return False

# Load existing sources
with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

# Load resolved snacks
with open('scripts/resolved_snacks.json', 'r', encoding='utf-8') as f:
    resolved_snacks = json.load(f)

# Manual overrides for highest quality food photography
CURATED_FILES = {
    # Snacks
    "banh_trang_tron": "File:Banh trang tron (mua tai truong thpt giadinh).jpg",
    "banh_trang_nuong": "File:Bánh tráng nướng TP. Hồ Chí Minh - street food in Ho Chi Minh City, Vietnam.jpg",
    "banh_trang_cuon_bo": "File:Bánh tráng cuốn 2013.jpg",
    "banh_trang_cham_me": "File:Bánh Tráng Cù Lao Mây.JPG",
    "banh_trang_kep": "File:Pizzabanhtrangnuong2.jpg",
    "ca_vien_chien_mam": "File:Fish balls and Chinese fried fish sausages with sauce.jpg",
    "nem_chua_ran": "File:Nem chua.jpg",
    "chan_ga_sa_tac": "File:Chicken feet. Hong Kong. (16841735339).jpg",
    "banh_mi_muoi_ot": "File:Bánh mì nướng muối ớt.jpg",
    "khoai_lang_lac": "File:020240623 123653 Sweet Potato Fries.jpg",
    "khoai_tay_lac": "File:Cajun fries from Popeyes Louisiana Kitchen, Stratford, Ontario, 2025-08-04.jpg",
    "xoai_lac": "File:Green mangoes with vinegar, chili, salt, and soy sauce (Philippines) 01.jpg",
    "coc_lac": "File:Green Mango Chutney of Bengal.jpg",
    "bap_xao_bo": "File:Mmm... buttered sweet corn and a BLT for lunch (7670120520).jpg",
    "pho_mai_que": "File:Mozzarella Sticks at Mobtown Ballroom.jpg",
    "trung_cut_lon_me": "File:Boiled quail eggs.jpg",
    "hot_vit_lon_me": "File:EGG BALUT.jpg",
    "bo_bia_man": "File:LunBhia.jpg",
    "ga_lac_pho_mai": "File:KFC Popcorn Chicken (12956064765).jpg",
    "da_heo_chay_toi": "File:ChicharronMixto.JPG",
    "banh_ga_pho_mai": "File:A bowl of chicken nuggets.jpg",
    "xien_que_nuong": "File:Köfte kebabs.jpg",
    "tau_hu_tran_chau": "File:Douhua in Tainan.jpg",
    "banh_trang_lui": "File:Pizzabanhtrangnuong3.JPG",
    "tokbokki_pho_mai": "File:Tteokbokki.jpg",
    "muc_rim_me": "File:Dried squid in street food stall.jpg",
    "goi_cuon_tom_thit": "File:Gỏi cuốn.jpg",
    "banh_crepe_sau_rieng": "File:Mille crêpe.jpg",
    "trung_long_dao": "File:Boiled Egg - Crossection.jpg",
    "doi_sun_nuong": "File:Grilled Sausages and Corn Sausages.jpg",
    "nem_lui_nuong": "File:Nhà mình Lễ 30th4n2023 (chạo nem lụi) (1).jpg",
    "banh_bao_chien": "File:Shengjian Mantou on a Pan.jpg",
    "banh_bot_loc_chien": "File:Bánh bèo, bột lọc, nem chua.jpg",
    "kho_ga_la_chanh": "File:Fragrance Pork Floss.jpg",
    "kho_bo_den": "File:BiltongUKDried.jpg",
    "ha_cao_chien": "File:Jiaozi-close-look.jpg",
    "banh_flan": "File:Flan-04926.jpg",

    # Clean drinks replacements
    "nuoc_cam_vat": "File:Orange juice 1 edit1.jpg",
    "nuoc_ep_oi": "File:Guava Juice 2018.png",
    "nuoc_tra_sua_kem_trung_chay": "File:Brown sugar boba tea at Boba Heaven, downtown Evanston, IL.jpg",
    "nuoc_pepsi_original": "File:Pepsi lime 330ml can-front PNr°0852.jpg",

    # Clean Japanese food replacements (fixing Image 1)
    "ja_m_4": "File:Egg Sandwich.jpg",
    "ja_m_7": "File:Natto on rice.jpg",
    "ja_m_9": "File:Japanese rice balls (onigiri).jpg",
    "ja_l_1": "File:Kaisen-don 001.jpg"
}

def get_commons_file_info(file_title):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(file_title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if pid == "-1" and 'imageinfo' not in p: return None, None, None, None
                t = p.get('title', file_title)
                ii = p.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl') or ii.get('url')
                meta = ii.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons')
                lic = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                return t, thumb, artist, lic
    except Exception as e:
        print(f"Error fetching info for {file_title}: {e}")
    return None, None, None, None

tmp_dir = 'tmp_download'
os.makedirs(tmp_dir, exist_ok=True)

success_count = 0

for key, file_title in CURATED_FILES.items():
    print(f"Fetching {key} -> {file_title}...")
    t, thumb, artist, lic = get_commons_file_info(file_title)
    if not thumb:
        # Try fallback from resolved_snacks
        if key in resolved_snacks:
            _, thumb, artist, lic = resolved_snacks[key]
    
    if not thumb:
        print(f"  FAILED to find thumbnail for {key}")
        continue
    
    # Destination path
    if key.startswith('nuoc_'):
        dest_rel = f"images/do_uong/{key}.webp"
        dest_full = os.path.join('src', 'images', 'do_uong', f"{key}.webp")
    elif key.startswith('ja_'):
        dest_rel = f"images/regional/ja/{key}.webp"
        dest_full = os.path.join('src', 'images', 'regional', 'ja', f"{key}.webp")
    else:
        dest_rel = f"images/do_an_vat/{key}.webp"
        dest_full = os.path.join('src', 'images', 'do_an_vat', f"{key}.webp")
    
    tmp_path = os.path.join(tmp_dir, f"tmp_{key}.img")
    cmd = ['curl.exe', '-s', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '-o', tmp_path, thumb]
    subprocess.run(cmd, check=False)

    if os.path.exists(tmp_path) and os.path.getsize(tmp_path) > 1000:
        if process_to_webp(tmp_path, dest_full):
            sources[key] = {
                "title": t or file_title,
                "url": thumb,
                "author": artist or "Wikimedia Commons",
                "license": lic or "CC BY-SA"
            }
            success_count += 1
            print(f"  OK: {dest_rel} ({os.path.getsize(dest_full)} bytes)")
        try: os.remove(tmp_path)
        except: pass
    else:
        print(f"  Curl download failed for {thumb}")

# Save updated sources.json
with open('src/images/sources.json', 'w', encoding='utf-8') as f:
    json.dump(sources, f, ensure_ascii=False, indent=2)

print(f"\nCompleted! Successfully downloaded and processed {success_count}/{len(CURATED_FILES)} food images!")
