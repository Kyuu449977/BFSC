import sys, os, time, json, io, urllib.request, urllib.parse, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC; food education open web project)'
}

BAD_KEYWORDS = [
    'pdf', 'djvu', 'svg', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    'band', 'concert', 'album', 't-shirt', 'anime', 'manga', 'drawing', 'illustration',
    'map', 'diagram', 'car', 'bus', 'train', 'station', 'fauna', 'specimen', 'street'
]

# Fallbacks for any drink that might be tricky on Wikimedia search
CURATED_FALLBACKS = {
    "nuoc_coca_original": "File:Coca Cola - Mexican death sentence.jpg",
    "nuoc_coca_zero": "File:Coca Cola Zero Sugar 2021 can.jpg",
    "nuoc_pepsi_original": "File:Pepsi Cola can.jpg",
    "nuoc_pepsi_zero_chanh": "File:Pepsi lime 330ml can-front PNr°0852.jpg",
    "nuoc_7up": "File:7 Up can.jpg",
    "nuoc_sprite": "File:Sprite can.jpg",
    "nuoc_mirinda_soda_kem": "File:A&W cream soda can.jpg",
    "nuoc_mirinda_cam": "File:Fanta Orange can.jpg",
    "nuoc_fanta_cam": "File:Fanta Orange can.jpg",
    "nuoc_xa_xi_chuong_duong": "File:A&W Root Beer glass.jpg",
    "nuoc_mirinda_xa_xi": "File:Barq's Root Beer in glass.jpg",
    "nuoc_red_bull": "File:Red Bull can.jpg",
    "nuoc_monster_energy": "File:Monster Energy drink can.jpg",
    "nuoc_sting_dau": "File:Red Bull Simply Cola and glass.jpg",
    "nuoc_revive": "File:Gatorade Cool Blue bottle.jpg",
    "nuoc_tra_sua_truyen_thong": "File:Pearl Milk Tea in Chun Shui Tang.jpg",
    "nuoc_tra_sua_oolong": "File:Oolong milk tea with grass jelly.jpg",
    "nuoc_tra_sua_lai": "File:Jasmine milk tea with bubbles.jpg",
    "nuoc_tra_sua_thiet_quan_am": "File:Tieguanyin milk tea.jpg",
    "nuoc_tra_sua_earl_grey": "File:Earl Grey milk tea with tapioca.jpg",
    "nuoc_tra_sua_thai_do": "File:Cha yen Thai tea.jpg",
    "nuoc_tra_sua_thai_xanh": "File:Green Thai milk tea.jpg",
    "nuoc_tra_sua_khoai_mon": "File:Taro bubble tea.jpg",
    "nuoc_tra_sua_socola": "File:Iced chocolate milk tea.jpg",
    "nuoc_tra_sua_bac_ha": "File:Mint chocolate chip milk tea.jpg",
    "nuoc_sua_tuoi_tran_chau_duong_den": "File:Brown sugar boba milk tea.jpg",
    "nuoc_tra_sua_tran_chau_duong_den": "File:Bubble tea with tapioca pearls.jpg",
    "nuoc_tra_sua_kem_cheese": "File:Cheese foam green tea.jpg",
    "nuoc_tra_sua_kem_trung_chay": "File:Creme brulee bubble tea.jpg",
    "nuoc_tra_sua_nuong": "File:Roasted milk tea with pudding.jpg",
    "nuoc_tra_dao_cam_sa": "File:Peach iced tea with lemon and mint.jpg",
    "nuoc_tra_dao_mieng": "File:Iced peach tea with slices.jpg",
    "nuoc_tra_vai": "File:Lychee iced tea glass.jpg",
    "nuoc_tra_mang_cut": "File:Mangosteen fruit tea cooler.jpg",
    "nuoc_tra_oi_hong_chia": "File:Pink guava iced tea with chia.jpg",
    "nuoc_tra_dua_luoi": "File:Melon iced tea cooler.jpg",
    "nuoc_tra_dau_tay_dam": "File:Strawberry iced tea with fresh berries.jpg",
    "nuoc_tra_chanh_gia_tay": "File:Hand smashed lemon tea glass.jpg",
    "nuoc_tra_tac_xi_muoi": "File:Kumquat iced tea with salted plum.jpg",
    "nuoc_matcha_latte": "File:Matcha Latte KF.JPG",
    "nuoc_matcha_macchiato": "File:Matcha macchiato glass.jpg",
    "nuoc_matcha_nuoc_dua": "File:Iced matcha coconut water.jpg",
    "nuoc_dirty_matcha": "File:Dirty matcha espresso drink.jpg",
    "nuoc_strawberry_matcha": "File:Strawberry matcha latte layered.jpg",
    "nuoc_matcha_frappuccino": "File:Matcha green tea blended beverage.jpg",
    "nuoc_sinh_to_bo": "File:Avocado shake in Vietnam.jpg",
    "nuoc_sinh_to_xoai": "File:Mango smoothie in glass.jpg",
    "nuoc_sinh_to_dau": "File:Strawberry smoothie in glass.jpg",
    "nuoc_sinh_to_chuoi": "File:Banana smoothie in glass.jpg",
    "nuoc_sinh_to_mang_cau": "File:Guanabana soursop smoothie.jpg",
    "nuoc_sinh_to_sapoche": "File:Sapodilla chiku shake.jpg",
    "nuoc_sinh_to_bo_xoai": "File:Layered mango and avocado smoothie.jpg",
    "nuoc_sinh_to_chuoi_dau": "File:Strawberry banana smoothie glass.jpg",
    "nuoc_sinh_to_chuoi_bo_dau_phong": "File:Peanut butter banana smoothie.jpg",
    "nuoc_sinh_to_berry_mix": "File:Mixed berry smoothie in glass.jpg",
    "nuoc_sinh_to_xoai_chanh_day": "File:Passion fruit and mango smoothie.jpg",
    "nuoc_sinh_to_bo_sau_rieng": "File:Durian avocado smoothie glass.jpg",
    "nuoc_dua_xiem_got_vo": "File:Fresh drinking coconut.jpg",
    "nuoc_dua_tac_dua_thom": "File:Fresh coconut water with pineapple.jpg",
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
    "nuoc_ca_phe_cot_dua": "File:Coconut iced coffee glass.jpg"
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
        with urllib.request.urlopen(req, timeout=12) as resp:
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
    except Exception as e:
        if '429' in str(e):
            time.sleep(3)
    return None, None, None, None

def search_commons_files(query):
    if query.startswith('File:'):
        return [query]
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=8"
    req = urllib.request.Request(url, headers=headers)
    candidates = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for r in data.get('query', {}).get('search', []):
                title = r['title']
                lower = title.lower()
                if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                if any(bad in lower for bad in BAD_KEYWORDS):
                    continue
                candidates.append(title)
    except Exception as e:
        if '429' in str(e):
            time.sleep(3)
    return candidates

def download_and_process(img_url, out_path):
    req = urllib.request.Request(img_url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read()
    img = Image.open(io.BytesIO(content))
    if img.width < 200 or img.height < 200:
        raise ValueError(f"Image too small: {img.width}x{img.height}")
    cropped = resize_and_crop(img, (640, 480))
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    cropped.save(out_path, format='WEBP', quality=85)
    return img.width, img.height

def main():
    with open('scripts/drinks_def.json', encoding='utf-8') as f:
        drinks = json.load(f)

    sources_path = 'src/images/sources.json'
    sources = {}
    if os.path.exists(sources_path):
        with open(sources_path, encoding='utf-8') as f:
            sources = json.load(f)

    success_count = 0
    fail_count = 0

    print(f"Starting online drink image fetch for {len(drinks)} drinks...")

    for i, drink in enumerate(drinks):
        drink_id = drink['id']
        name = drink['name']
        out_file = f"src/images/do_uong/{drink_id}.webp"

        # Check if already downloaded and valid
        if os.path.exists(out_file) and os.path.getsize(out_file) > 1000 and drink_id in sources:
            print(f"[{i+1}/{len(drinks)}] SKIP (Already done): {name} -> {out_file}")
            success_count += 1
            continue

        queries = list(drink.get('queries', []))
        if drink_id in CURATED_FALLBACKS:
            queries.append(CURATED_FALLBACKS[drink_id])

        found = False
        for q in queries:
            try:
                candidates = search_commons_files(q)
                for cand in candidates:
                    img_url, clean_title, artist, license_str = get_file_info(cand)
                    if not img_url:
                        continue
                    try:
                        w, h = download_and_process(img_url, out_file)
                        print(f"[{i+1}/{len(drinks)}] OK: {name} <- {clean_title} ({w}x{h})")
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
                            "note": "Cắt khung 4:3, thu nhỏ 640×480 và chuyển WebP từ nguồn ẩm thực Wikimedia Commons."
                        }
                        found = True
                        success_count += 1
                        time.sleep(0.3)
                        break
                    except Exception as err:
                        # try next candidate
                        continue
                if found:
                    break
            except Exception as e:
                time.sleep(1)
                continue

        if not found:
            print(f"[{i+1}/{len(drinks)}] FAILED: {name} with queries {queries}")
            fail_count += 1

    with open(sources_path, 'w', encoding='utf-8') as f:
        json.dump(sources, f, ensure_ascii=False, indent=2)

    print(f"\nDone! Success: {success_count}, Failed: {fail_count}")

if __name__ == '__main__':
    main()
