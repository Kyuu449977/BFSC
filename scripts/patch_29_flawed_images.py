import sys, os, time, json, io, urllib.request, urllib.parse, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'BestFoodAppBot/3.0 (https://github.com/phamp/BFSC; food education application)'
}

FIX_MAPPING = {
    "ja_l_4": ("File:Butter corn miso ramen of Bariuma.jpg", "src/images/regional/ja/ja_l_4.webp"),
    "ja_a_8": ("File:Baked potato, baked sweet potato, and steamed kale.jpg", "src/images/regional/ja/ja_a_8.webp"),
    "ja_d_9": ("File:Tsukemen (Dipping Ramen) - Goemon Ramen Bar 2023-06-06.jpg", "src/images/regional/ja/ja_d_9.webp"),
    "ja_d_10": ("File:Sawara Saikyo-yaki.jpg", "src/images/regional/ja/ja_d_10.webp"),
    "ja_dr_6": ("File:Thai iced tea in a typical tall glass.jpg", "src/images/regional/ja/ja_dr_6.webp"),
    "ja_dr_7": ("File:Suntory Draft Beer 2026-05.jpg", "src/images/regional/ja/ja_dr_7.webp"),
    "ko_d_8": ("File:Korea-Gyeongju-Gampo Port-Maeuntang-01.jpg", "src/images/regional/ko/ko_d_8.webp"),
    "ko_s_7": ("File:Dalgona.jpg", "src/images/regional/ko/ko_s_7.webp"),
    "ko_dr_6": ("File:Welch's Sparkling Rose.jpg", "src/images/regional/ko/ko_dr_6.webp"),
    "zh_m_7": ("File:Red Oil Wontons (红油抄手).jpg", "src/images/regional/zh/zh_m_7.webp"),
    "zh_dr_6": ("File:Chinese tea ceremony2.jpg", "src/images/regional/zh/zh_dr_6.webp"),
    "en_d_6": ("File:Jambalaya - 9883543316.jpg", "src/images/regional/en/en_d_6.webp"),
    "en_d_7": ("File:Chicken fettuccine alfredo.JPG", "src/images/regional/en/en_d_7.webp"),
    "en_dr_1": ("File:CafeMia.jpg", "src/images/regional/en/en_dr_1.webp"),
    "en_dr_2": ("File:Chameleon Cold Brew Organic Vanilla Coffee - Glass Bottle (52953262064).jpg", "src/images/regional/en/en_dr_2.webp"),
    "chieu_banh_dap": ("File:Bánh tráng nướng TP. Hồ Chí Minh - street food in Ho Chi Minh City, Vietnam.jpg", "src/images/regional/banh_dap.webp"),
    "trua_com_hen": ("File:Hến trộn.jpg", "src/images/regional/com_hen.webp"),
    "toi_5_1": ("File:Bún riêu cua nước.jpg", "src/images/regional/vi/toi_5_1.webp"),
    "toi_4_1": ("File:Escargot à la Bourguignonne - eatingeast.jpg", "src/images/regional/vi/toi_4_1.webp"),
    "toi_lau_bo": ("File:Chaoshan Beef Hot Pot at Baheli Haiji, ZGC1 (20221003132726).jpg", "src/images/regional/lau_bo.webp"),
    "vat_5_2": ("File:Che suong sa hot luu.jpg", "src/images/regional/vi/vat_5_2.webp"),
    "nuoc_coca_zero": ("File:A peach ice tea.jpg", "src/images/regional/vi/nuoc_coca_zero.webp"),
    "nuoc_sprite": ("File:Coconut cream and coffee.jpg", "src/images/regional/vi/nuoc_sprite.webp"),
    "nuoc_ngot_4": ("File:Herbal Tea 01.jpg", "src/images/regional/vi/nuoc_ngot_4.webp"),
    "nuoc_sting_vang": ("File:Tra sen - Vietnamese Lotus Tea.JPG", "src/images/regional/vi/nuoc_sting_vang.webp"),
    "nuoc_ngot_5": ("File:Fresh fruit smoothie being poured into a glass.jpg", "src/images/regional/vi/nuoc_ngot_5.webp"),
    "nuoc_revive": ("File:Dragon fruit drink.jpg", "src/images/regional/vi/nuoc_revive.webp"),
    "hl_freeze_tra_xanh": ("File:Ceremonial Grade Matcha Frappe (no coffee) and Pumpkin Spice Frappe (blended with espresso) - Brooklands Cafe 2026-09-23.jpg", "src/images/regional/vi/hl_freeze_tra_xanh.webp"),
    "pl_tra_mang_cau": ("File:Iced fruit tea from Brisbane cafe.jpg", "src/images/regional/vi/pl_tra_mang_cau.webp")
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
        print("Error fetching file info:", e)
    return None, None, None, None

def process_fix(dish_id, file_title, dest_path):
    img_url, title, artist, lic = get_file_info(file_title)
    if not img_url:
        print(f"[{dish_id}] Could not get URL for {file_title}")
        return False
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            processed = resize_and_crop(img, (640, 480))
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            processed.save(dest_path, format='WEBP', quality=82)
            print(f"[{dish_id}] FIXED SUCCESS -> {file_title} -> {dest_path}")
            return True
    except Exception as e:
        print(f"[{dish_id}] Failed to download/process: {e}")
        return False

if __name__ == '__main__':
    print(f"Patching {len(FIX_MAPPING)} dishes with verified food images...")
    success = 0
    for did, (ftitle, dest) in FIX_MAPPING.items():
        if process_fix(did, ftitle, dest):
            success += 1
        time.sleep(0.2)
    print(f"Done! {success}/{len(FIX_MAPPING)} successfully patched.")
