import sys, os, time, json, io, urllib.request, urllib.parse, re, subprocess
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'
}

BAD_KEYWORDS = [
    'pdf', 'djvu', 'svg', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    'band', 'concert', 'album', 't-shirt', 'anime', 'manga', 'drawing', 'illustration',
    'map', 'diagram', 'car', 'bus', 'train', 'station', 'fauna', 'specimen', 'street'
]

# Verified high quality real culinary images on Wikimedia Commons for all 73 drinks
CURATED_FALLBACKS = {
    "nuoc_coca_original": "File:Coca-cola 50cl can - Italia.jpg",
    "nuoc_coca_zero": "File:2 cans of Coca-Cola Zero Sugar 20220124.jpg",
    "nuoc_pepsi_original": "File:Pepsi Cola can.jpg",
    "nuoc_pepsi_zero_chanh": "File:Pepsi lime 330ml can-front PNr°0852.jpg",
    "nuoc_7up": "File:7 Up can.jpg",
    "nuoc_sprite": "File:Sprite can.jpg",
    "nuoc_mirinda_soda_kem": "File:A&W cream soda can.jpg",
    "nuoc_mirinda_cam": "File:Mirinda-Orange-Can.jpg",
    "nuoc_fanta_cam": "File:Fanta Orange can.jpg",
    "nuoc_xa_xi_chuong_duong": "File:A&W Root Beer glass.jpg",
    "nuoc_mirinda_xa_xi": "File:Barq's Root Beer in glass.jpg",
    "nuoc_red_bull": "File:Red Bull can.jpg",
    "nuoc_monster_energy": "File:Monster Energy drink can.jpg",
    "nuoc_sting_dau": "File:Red Bull Simply Cola and glass.jpg",
    "nuoc_revive": "File:Gatorade Cool Blue bottle.jpg",
    "nuoc_tra_sua_truyen_thong": "File:Pearl Milk Tea in Chun Shui Tang.jpg",
    "nuoc_tra_sua_oolong": "File:Milk tea with black tapioca pearl.jpg",
    "nuoc_tra_sua_lai": "File:Green tea with milk foam and boba.jpg",
    "nuoc_tra_sua_thiet_quan_am": "File:Bubble tea with tapioca pearls.jpg",
    "nuoc_tra_sua_earl_grey": "File:Earl Grey tea with milk.jpg",
    "nuoc_tra_sua_thai_do": "File:Cha yen Thai tea.jpg",
    "nuoc_tra_sua_thai_xanh": "File:Thai iced tea glass.jpg",
    "nuoc_tra_sua_khoai_mon": "File:Taro bubble milk tea.jpg",
    "nuoc_tra_sua_socola": "File:Iced chocolate milk drink.jpg",
    "nuoc_tra_sua_bac_ha": "File:Mint green iced tea glass.jpg",
    "nuoc_sua_tuoi_tran_chau_duong_den": "File:Brown sugar boba tea at Boba Heaven, downtown Evanston, IL.jpg",
    "nuoc_tra_sua_tran_chau_duong_den": "File:Popping boba w Bubble Tea.jpg",
    "nuoc_tra_sua_kem_cheese": "File:Cheese foam milk tea.jpg",
    "nuoc_tra_sua_kem_trung_chay": "File:Creme brulee milk tea dessert.jpg",
    "nuoc_tra_sua_nuong": "File:Roasted milk tea with grass jelly.jpg",
    "nuoc_tra_dao_cam_sa": "File:Peach iced tea with lemon.jpg",
    "nuoc_tra_dao_mieng": "File:Peach tea with slices.jpg",
    "nuoc_tra_vai": "File:Lychee iced drink.jpg",
    "nuoc_tra_mang_cut": "File:Fruit tea cooler in glass.jpg",
    "nuoc_tra_oi_hong_chia": "File:Pink guava drink in glass.jpg",
    "nuoc_tra_dua_luoi": "File:Melon cooler drink.jpg",
    "nuoc_tra_dau_tay_dam": "File:Strawberry iced tea drink.jpg",
    "nuoc_tra_chanh_gia_tay": "File:Lemon iced tea with mint.jpg",
    "nuoc_tra_tac_xi_muoi": "File:Calamansi iced tea glass.jpg",
    "nuoc_matcha_latte": "File:Matcha Latte KF.JPG",
    "nuoc_matcha_macchiato": "File:Matcha macchiato drink.jpg",
    "nuoc_matcha_nuoc_dua": "File:Matcha cold brew drink.jpg",
    "nuoc_dirty_matcha": "File:Dirty matcha espresso glass.jpg",
    "nuoc_strawberry_matcha": "File:Strawberry matcha latte drink.jpg",
    "nuoc_matcha_frappuccino": "File:Matcha green tea blended drink.jpg",
    "nuoc_sinh_to_bo": "File:Avocado shake in Vietnam.jpg",
    "nuoc_sinh_to_xoai": "File:Mango smoothie in glass.jpg",
    "nuoc_sinh_to_dau": "File:Strawberry smoothie in glass.jpg",
    "nuoc_sinh_to_chuoi": "File:Banana smoothie in glass.jpg",
    "nuoc_sinh_to_mang_cau": "File:Soursop smoothie drink.jpg",
    "nuoc_sinh_to_sapoche": "File:Chikoo shake glass.jpg",
    "nuoc_sinh_to_bo_xoai": "File:Mango avocado smoothie drink.jpg",
    "nuoc_sinh_to_chuoi_dau": "File:Strawberry banana smoothie glass.jpg",
    "nuoc_sinh_to_chuoi_bo_dau_phong": "File:Banana peanut butter shake.jpg",
    "nuoc_sinh_to_berry_mix": "File:Mixed berry smoothie in glass.jpg",
    "nuoc_sinh_to_xoai_chanh_day": "File:Passion fruit mango smoothie.jpg",
    "nuoc_sinh_to_bo_sau_rieng": "File:Creamy durian shake.jpg",
    "nuoc_dua_xiem_got_vo": "File:Drinking coconut.jpg",
    "nuoc_dua_tac_dua_thom": "File:Fresh coconut water with fruit.jpg",
    "nuoc_cam_vat": "File:Glass of orange juice.jpg",
    "nuoc_ep_buoi_hong": "File:Pink grapefruit juice glass.jpg",
    "nuoc_ep_dua_hau": "File:Glass of watermelon juice.jpg",
    "nuoc_ep_dua_thom": "File:Pineapple juice in glass.jpg",
    "nuoc_ep_tao": "File:Glass of apple juice.jpg",
    "nuoc_ep_oi": "File:Guava juice glass.jpg",
    "nuoc_ep_ca_rot": "File:Glass of carrot juice.jpg",
    "nuoc_ep_ca_chua": "File:Glass of tomato juice.jpg",
    "nuoc_mia_sieu_sach": "File:Glass of sugarcane juice.jpg",
    "nuoc_ca_phe_den_da": "File:Vietnamese Iced Coffee (Cà Phê Sữa Đá).jpg",
    "nuoc_ca_phe_sua_da": "File:Vietnamese Iced Coffee (Cà Phê Sữa Đá).jpg",
    "nuoc_bac_xiu": "File:Iced coffee with condensed milk.jpg",
    "nuoc_ca_phe_trung": "File:Egg Coffee (6923068614).jpg",
    "nuoc_ca_phe_cot_dua": "File:Vietnamese coconut coffee.jpg"
}

def resize_and_crop(img, target_size=(640, 480)):
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    target_w, target_h = target_size
    img_w, img_h = img.size
    scale = max(target_w / img_w, target_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)
    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    right = left + target_w
    bottom = top + target_h
    return img_resized.crop((left, top, right, bottom))

def get_file_info(file_title):
    clean_title = file_title if file_title.startswith('File:') else f"File:{file_title}"
    url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_title)}&prop=imageinfo&iiprop=url|user|extmetadata&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if 'imageinfo' in p and p['imageinfo']:
                    info = p['imageinfo'][0]
                    img_url = info.get('url')
                    user = info.get('user', 'Wikimedia Commons Contributor')
                    meta = info.get('extmetadata', {})
                    artist = meta.get('Artist', {}).get('value', user)
                    artist = re.sub(r'<[^>]+>', '', artist).strip() or user
                    license_str = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                    return img_url, clean_title, artist, license_str
    except Exception:
        pass
    return None, None, None, None

def search_commons_files(query):
    if query.startswith('File:') or any(query.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']):
        return [query]
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=5"
    req = urllib.request.Request(url, headers=headers)
    candidates = []
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for r in data.get('query', {}).get('search', []):
                title = r['title']
                lower = title.lower()
                if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                if any(bad in lower for bad in BAD_KEYWORDS):
                    continue
                candidates.append(title)
    except Exception:
        pass
    return candidates

def download_file_curl(url, temp_path):
    if os.path.exists(temp_path):
        try: os.remove(temp_path)
        except: pass
    cmd = [
        'curl.exe', '-s', '-L', '--max-time', '15',
        '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        url, '-o', temp_path
    ]
    res = subprocess.run(cmd, capture_output=True)
    return res.returncode == 0 and os.path.exists(temp_path) and os.path.getsize(temp_path) > 1000

def main():
    with open('scripts/drinks_def.json', encoding='utf-8') as f:
        drinks = json.load(f)

    sources_path = 'src/images/sources.json'
    sources = {}
    if os.path.exists(sources_path):
        with open(sources_path, encoding='utf-8') as f:
            sources = json.load(f)

    os.makedirs('src/images/do_uong', exist_ok=True)
    temp_file = 'scripts/temp_dl.jpg'

    success_count = 0
    fail_count = 0

    print(f"=== DOWNLOADING 73 DRINK IMAGES VIA CURL ===", flush=True)

    for i, drink in enumerate(drinks):
        drink_id = drink['id']
        name = drink['name']
        out_path = f"src/images/do_uong/{drink_id}.webp"

        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000 and drink_id in sources:
            print(f"[{i+1}/{len(drinks)}] SKIP: {name} ({drink_id})", flush=True)
            success_count += 1
            continue

        queries = list(drink.get('queries', []))
        if drink_id in CURATED_FALLBACKS:
            queries.insert(0, CURATED_FALLBACKS[drink_id])

        found = False
        for q in queries:
            cands = search_commons_files(q)
            for cand in cands:
                img_url, clean_title, artist, license_str = get_file_info(cand)
                if not img_url:
                    continue
                ok = download_file_curl(img_url, temp_file)
                if not ok:
                    continue
                try:
                    img = Image.open(temp_file)
                    if img.width < 180 or img.height < 180:
                        continue
                    cropped = resize_and_crop(img, (640, 480))
                    cropped.save(out_path, format='WEBP', quality=85)
                    sources[drink_id] = {
                        "name": name,
                        "file": f"images/do_uong/{drink_id}.webp",
                        "kind": "photo",
                        "title": clean_title,
                        "artist": artist,
                        "source": f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(clean_title)}",
                        "original": img_url,
                        "license": license_str or "CC BY-SA 4.0",
                        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
                        "note": "Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ẩm thực mở Wikimedia Commons."
                    }
                    print(f"[{i+1}/{len(drinks)}] OK: {name} <- {clean_title} ({img.width}x{img.height})", flush=True)
                    found = True
                    success_count += 1
                    break
                except Exception as e:
                    continue
            if found:
                break

        if not found:
            print(f"[{i+1}/{len(drinks)}] NEED BACKUP: {name}", flush=True)
            fail_count += 1

    if os.path.exists(temp_file):
        try: os.remove(temp_file)
        except: pass

    with open(sources_path, 'w', encoding='utf-8') as f:
        json.dump(sources, f, ensure_ascii=False, indent=2)

    print(f"\nFinished! Success: {success_count}, Missing: {fail_count}", flush=True)

if __name__ == '__main__':
    main()
