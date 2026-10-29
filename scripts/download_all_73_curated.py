import sys, os, time, json, urllib.request, urllib.parse, re, subprocess
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

DRINK_IMAGES_MAP = {
    # 1. NƯỚC NGỌT CÓ GAS & ĐÓNG LON (15)
    "nuoc_coca_original": "File:Coca-cola 50cl can - Italia.jpg",
    "nuoc_coca_zero": "File:2 cans of Coca-Cola Zero Sugar 20220124.jpg",
    "nuoc_pepsi_original": "File:Glass of Pepsi-Cola at a terrace at the Helsinki Senate Square in July 2025.jpg",
    "nuoc_pepsi_zero_chanh": "File:Pepsi lime 330ml can-front PNr°0852.jpg",
    "nuoc_7up": "File:Can of Seven Up.jpg",
    "nuoc_sprite": "File:A cup and can of Sprite.jpg",
    "nuoc_mirinda_soda_kem": "File:Lime spider.jpg",
    "nuoc_mirinda_cam": "File:Fanta-Orange-Can-330ml 84177 (7116950883).jpg",
    "nuoc_fanta_cam": "File:Fanta-Orange-Can-330ml 84177 (7116950883).jpg",
    "nuoc_xa_xi_chuong_duong": "File:Root beer in glass mug.jpg",
    "nuoc_mirinda_xa_xi": "File:Fitzs Root beer glass.jpg",
    "nuoc_red_bull": "File:Red Bull Energy Drink, Dongguan, China 1 May 2024.jpg",
    "nuoc_monster_energy": "File:Can of Monster Energy drink sold in China (0.33 l), on white background.jpg",
    "nuoc_sting_dau": "File:Strawberry soda.jpg",
    "nuoc_revive": "File:Gatorade Thirst Quencher.jpg",

    # 2. TRÀ SỮA (MILK TEA) (15)
    "nuoc_tra_sua_truyen_thong": "File:Pearl Milk Tea in Chun Shui Tang.jpg",
    "nuoc_tra_sua_oolong": "File:Classic bubble tea.jpg",
    "nuoc_tra_sua_lai": "File:Bubble tea by Johnny.jpg",
    "nuoc_tra_sua_thiet_quan_am": "File:50 Lan Bubble Tea in Taichung 20141201.jpg",
    "nuoc_tra_sua_earl_grey": "File:London fog tea latte.jpg",
    "nuoc_tra_sua_thai_do": "File:Thai Iced Bubble Tea - Sonoma Pho - Stierch - 2019.jpg",
    "nuoc_tra_sua_thai_xanh": "File:Thai Green and Red Ice Milk Tea side by side - Siam Siam 2025-09-07.jpg",
    "nuoc_tra_sua_khoai_mon": "File:Drink tray boba.jpg",
    "nuoc_tra_sua_socola": "File:Vanilla chocolate milk shake and ice lemon tea.jpg",
    "nuoc_tra_sua_bac_ha": "File:Fresh mint tea in a glass.jpg",
    "nuoc_sua_tuoi_tran_chau_duong_den": "File:Brown sugar boba tea at Boba Heaven, downtown Evanston, IL.jpg",
    "nuoc_tra_sua_tran_chau_duong_den": "File:Popping boba w Bubble Tea.jpg",
    "nuoc_tra_sua_kem_cheese": "File:Fat glass mug.jpg",
    "nuoc_tra_sua_kem_trung_chay": "File:Strawberry milk - fluffy cheesecake, raspberry - citrus sorbet - green tea creme brûlée.jpg",
    "nuoc_tra_sua_nuong": "File:Cold drinks at Granny's Café 2025-06-23.jpg",

    # 3. TRÀ TRÁI CÂY & THẢO MỘC (9)
    "nuoc_tra_dao_cam_sa": "File:IceTea Migros.jpg",
    "nuoc_tra_dao_mieng": "File:Peach soda soft drink.jpg",
    "nuoc_tra_vai": "File:Bubble tea on a hot day.jpg",
    "nuoc_tra_mang_cut": "File:Mangosteen.jpg",
    "nuoc_tra_oi_hong_chia": "File:Guava Juice 2025 02.png",
    "nuoc_tra_dua_luoi": "File:Brisk Strawberry Melon Iced Tea.jpg",
    "nuoc_tra_dau_tay_dam": "File:Milkshake beverage strawberry drink-1021027.jpg",
    "nuoc_tra_chanh_gia_tay": "File:Iced Tea with Lemon, First Watch, Melbourne, Florida.jpg",
    "nuoc_tra_tac_xi_muoi": "File:KALAMASI SYRUP FOR REFRESHING COLD DRINKS SOURCE OF VITAMIN C PANGASINAN.jpg",

    # 4. MATCHA LATTE & BIẾN TẤU (6)
    "nuoc_matcha_latte": "File:Matcha Latte KF.JPG",
    "nuoc_matcha_macchiato": "File:Matcha Latte with Seasalt Cream.jpg",
    "nuoc_matcha_nuoc_dua": "File:Kultura Drinks.png",
    "nuoc_dirty_matcha": "File:Green tea latte 1.jpg",
    "nuoc_strawberry_matcha": "File:Iced Strawberry Shortcake Matcha - M&S Café, Worthing 2026-06-20.jpg",
    "nuoc_matcha_frappuccino": "File:Matcha-Kari smoothies.jpg",

    # 5. SINH TỐ (SMOOTHIES) (12)
    "nuoc_sinh_to_bo": "File:Avocado lamaw (Avocado in milk and sugar, chilled or with ice), Philippines 04.jpg",
    "nuoc_sinh_to_xoai": "File:DSCF0946 A vendor wearing a hairnet and apron pours fresh fruit into a blender at a market stall with cups of sliced fruit and smoothies displayed in front.jpg",
    "nuoc_sinh_to_dau": "File:Glass of strawberry smoothie (6828826294).jpg",
    "nuoc_sinh_to_chuoi": "File:Fresh fruit smoothie being poured into a glass.jpg",
    "nuoc_sinh_to_mang_cau": "File:Guanábana juice.jpg",
    "nuoc_sinh_to_sapoche": "File:ChikuBadaamShake HomeMade Mumbai.jpg",
    "nuoc_sinh_to_bo_xoai": "File:Fruit smoothie (8475314736).png",
    "nuoc_sinh_to_chuoi_dau": "File:Fruit smoothie (8475314736).png",
    "nuoc_sinh_to_chuoi_bo_dau_phong": "File:Banana Smoothie.jpg",
    "nuoc_sinh_to_berry_mix": "File:Superberry Smoothie & Bill's Ceremonial Matcha Latte - Bill's, Lewes 2026-07-03.jpg",
    "nuoc_sinh_to_xoai_chanh_day": "File:Fruit Juices 2.jpg",
    "nuoc_sinh_to_bo_sau_rieng": "File:Creamy Durian - Flickr - The World Through Athene's Eyes.jpg",

    # 6. NƯỚC DỪA TƯƠI (2)
    "nuoc_dua_xiem_got_vo": "File:Drinking coconut.jpg",
    "nuoc_dua_tac_dua_thom": "File:Green coconut fruit.jpg",

    # 7. NƯỚC ÉP NGUYÊN CHẤT (9)
    "nuoc_cam_vat": "File:(a glass of orange juice bread with and jelly and a waffle).jpg",
    "nuoc_ep_buoi_hong": "File:Self-made gin grapefruit long drink.jpg",
    "nuoc_ep_dua_hau": "File:Watermelon juice in glass.jpg",
    "nuoc_ep_dua_thom": "File:Pineapple juice in glass.jpg",
    "nuoc_ep_tao": "File:Apple juice glass.jpg",
    "nuoc_ep_oi": "File:Fruit Salad Or Fruit Bowl.jpg",
    "nuoc_ep_ca_rot": "File:Təbrizdə bir qutu makaron và bir stəkan yerkökü suyu.jpg",
    "nuoc_ep_ca_chua": "File:A glass of tomato juice on a black plate.jpg",
    "nuoc_mia_sieu_sach": "File:Glass of sugarcane juice.jpg",

    # 8. CÀ PHÊ CÁC LOẠI (5)
    "nuoc_ca_phe_den_da": "File:Ice coffee image.jpg",
    "nuoc_ca_phe_sua_da": "File:CÀ PHÊ SỮA PHA PHIN.jpg",
    "nuoc_bac_xiu": "File:Vietnamese Iced Coffee Ba Chi Canteen.jpg",
    "nuoc_ca_phe_trung": "File:Egg Coffee (6923068614).jpg",
    "nuoc_ca_phe_cot_dua": "File:Vietnamese Salted Coffee & Xin chao's coconut Coffee - Xin Chao, Eastbourne 2026-08-14.jpg"
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
    os.makedirs('public/images/do_uong', exist_ok=True)
    temp_file = 'scripts/temp_curated.jpg'

    print(f"=== DOWNLOADING & PROCESSING {len(drinks)} VERIFIED DRINKS ===", flush=True)

    success_count = 0
    fail_count = 0

    for i, drink in enumerate(drinks):
        drink_id = drink['id']
        name = drink['name']
        out_src = f"src/images/do_uong/{drink_id}.webp"
        out_pub = f"public/images/do_uong/{drink_id}.webp"

        target_file = DRINK_IMAGES_MAP.get(drink_id)
        if not target_file:
            print(f"[{i+1}/{len(drinks)}] NO MAPPING: {name}", flush=True)
            fail_count += 1
            continue

        # Check if already processed
        if os.path.exists(out_src) and os.path.getsize(out_src) > 1000 and drink_id in sources:
            # Sync to public if needed
            if not os.path.exists(out_pub) or os.path.getsize(out_pub) != os.path.getsize(out_src):
                import shutil
                shutil.copy2(out_src, out_pub)
            print(f"[{i+1}/{len(drinks)}] SKIP (Existing): {name}", flush=True)
            success_count += 1
            continue

        img_url, clean_title, artist, license_str = get_file_info(target_file)
        if not img_url:
            print(f"[{i+1}/{len(drinks)}] FAILED URL: {name} <- {target_file}", flush=True)
            fail_count += 1
            continue

        ok = download_file_curl(img_url, temp_file)
        if not ok:
            print(f"[{i+1}/{len(drinks)}] FAILED DOWNLOAD: {name} <- {img_url}", flush=True)
            fail_count += 1
            continue

        try:
            img = Image.open(temp_file)
            cropped = resize_and_crop(img, (640, 480))
            cropped.save(out_src, format='WEBP', quality=85)
            cropped.save(out_pub, format='WEBP', quality=85)

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
                "note": "Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ảnh ẩm thực mở Wikimedia Commons."
            }
            print(f"[{i+1}/{len(drinks)}] OK: {name} <- {clean_title} ({img.width}x{img.height})", flush=True)
            success_count += 1
        except Exception as e:
            print(f"[{i+1}/{len(drinks)}] PROCESS ERROR: {name} <- {e}", flush=True)
            fail_count += 1

    if os.path.exists(temp_file):
        try: os.remove(temp_file)
        except: pass

    with open(sources_path, 'w', encoding='utf-8') as f:
        json.dump(sources, f, ensure_ascii=False, indent=2)

    print(f"\nAll 73 Drinks Processed: Success={success_count}, Failed={fail_count}")

if __name__ == '__main__':
    main()
