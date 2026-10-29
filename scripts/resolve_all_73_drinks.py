import sys, os, time, json, urllib.request, urllib.parse, re
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

BAD_KEYWORDS = [
    'pdf', 'djvu', 'svg', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    'girl', 'boy', 'child', 'band', 'concert', 'album', 't-shirt', 'anime', 'manga', 'drawing',
    'illustration', 'map', 'diagram', 'car', 'bus', 'train', 'station', 'fauna', 'specimen',
    'street', 'dog', 'cat', 'pit bull', 'puppy', 'kitten', 'bird', 'horse', 'animal', 'insect', 'plant'
]

DIRECT_CONFIRMED = {
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
    "nuoc_revive": "File:Electrolyte replacement drink with lemon.jpg",
    "nuoc_tra_sua_truyen_thong": "File:Pearl Milk Tea in Chun Shui Tang.jpg",
    "nuoc_tra_sua_oolong": "File:Classic bubble tea.jpg",
    "nuoc_tra_sua_lai": "File:Bubble tea by Johnny.jpg",
    "nuoc_tra_sua_thiet_quan_am": "File:50 Lan Bubble Tea in Taichung 20141201.jpg",
    "nuoc_tra_sua_earl_grey": "File:London fog tea latte.jpg",
    "nuoc_tra_sua_thai_do": "File:Thai Iced Bubble Tea - Sonoma Pho - Stierch - 2019.jpg",
    "nuoc_tra_sua_thai_xanh": "File:Thai green iced tea.jpg",
    "nuoc_tra_sua_khoai_mon": "File:Taro bubble tea boba.jpg",
    "nuoc_tra_sua_socola": "File:Chocolate milkshake with straw.jpg",
    "nuoc_tra_sua_bac_ha": "File:Mint iced tea with leaves.jpg",
    "nuoc_sua_tuoi_tran_chau_duong_den": "File:Brown sugar boba tea at Boba Heaven, downtown Evanston, IL.jpg",
    "nuoc_tra_sua_tran_chau_duong_den": "File:Popping boba w Bubble Tea.jpg",
    "nuoc_tra_sua_kem_cheese": "File:Cheese foam milk tea.jpg",
    "nuoc_tra_sua_kem_trung_chay": "File:Creme brulee bubble tea.jpg",
    "nuoc_tra_sua_nuong": "File:Roasted milk tea.jpg",
    "nuoc_tra_dao_cam_sa": "File:Iced peach tea with lemon and mint.jpg",
    "nuoc_tra_dao_mieng": "File:Iced tea with peach slices.jpg",
    "nuoc_tra_vai": "File:Lychee iced tea drink.jpg",
    "nuoc_tra_mang_cut": "File:Fruit tea in glass mug.jpg",
    "nuoc_tra_oi_hong_chia": "File:Pink guava juice in glass.jpg",
    "nuoc_tra_dua_luoi": "File:Melon iced tea in glass.jpg",
    "nuoc_tra_dau_tay_dam": "File:Strawberry iced tea in glass.jpg",
    "nuoc_tra_chanh_gia_tay": "File:Lemon iced tea with mint.jpg",
    "nuoc_tra_tac_xi_muoi": "File:Calamansi iced tea in glass.jpg",
    "nuoc_matcha_latte": "File:Matcha Latte KF.JPG",
    "nuoc_matcha_macchiato": "File:Matcha macchiato drink.jpg",
    "nuoc_matcha_nuoc_dua": "File:Iced matcha coconut drink.jpg",
    "nuoc_dirty_matcha": "File:Matcha espresso layered latte.jpg",
    "nuoc_strawberry_matcha": "File:Strawberry matcha latte in glass.jpg",
    "nuoc_matcha_frappuccino": "File:Green tea frappuccino with whipped cream.jpg",
    "nuoc_sinh_to_bo": "File:Avocado milkshake in glass.jpg",
    "nuoc_sinh_to_xoai": "File:Mango smoothie in glass.jpg",
    "nuoc_sinh_to_dau": "File:Strawberry smoothie with fresh mint.jpg",
    "nuoc_sinh_to_chuoi": "File:Banana smoothie in glass.jpg",
    "nuoc_sinh_to_mang_cau": "File:Guanabana soursop smoothie.jpg",
    "nuoc_sinh_to_sapoche": "File:Chikoo sapodilla milkshake.jpg",
    "nuoc_sinh_to_bo_xoai": "File:Layered tropical mango smoothie.jpg",
    "nuoc_sinh_to_chuoi_dau": "File:Strawberry banana smoothie in glass.jpg",
    "nuoc_sinh_to_chuoi_bo_dau_phong": "File:Peanut butter banana smoothie.jpg",
    "nuoc_sinh_to_berry_mix": "File:Mixed berry smoothie in glass.jpg",
    "nuoc_sinh_to_xoai_chanh_day": "File:Mango passion fruit drink.jpg",
    "nuoc_sinh_to_bo_sau_rieng": "File:Creamy durian shake.jpg",
    "nuoc_dua_xiem_got_vo": "File:Drinking coconut.jpg",
    "nuoc_dua_tac_dua_thom": "File:Coconut water in glass with straw.jpg",
    "nuoc_cam_vat": "File:Glass of orange juice.jpg",
    "nuoc_ep_buoi_hong": "File:Grapefruit juice in glass.jpg",
    "nuoc_ep_dua_hau": "File:Glass of watermelon juice.jpg",
    "nuoc_ep_dua_thom": "File:Pineapple juice in glass.jpg",
    "nuoc_ep_tao": "File:Glass of apple juice.jpg",
    "nuoc_ep_oi": "File:Guava juice in glass.jpg",
    "nuoc_ep_ca_rot": "File:Glass of carrot juice.jpg",
    "nuoc_ep_ca_chua": "File:Glass of tomato juice.jpg",
    "nuoc_mia_sieu_sach": "File:Glass of sugarcane juice.jpg",
    "nuoc_ca_phe_den_da": "File:Vietnamese Iced Coffee (Cà Phê Sữa Đá).jpg",
    "nuoc_ca_phe_sua_da": "File:Vietnamese Iced Coffee (Cà Phê Sữa Đá).jpg",
    "nuoc_bac_xiu": "File:Iced coffee with condensed milk.jpg",
    "nuoc_ca_phe_trung": "File:Egg Coffee (6923068614).jpg",
    "nuoc_ca_phe_cot_dua": "File:Vietnamese coconut coffee.jpg"
}

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

def search_commons(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=8"
    req = urllib.request.Request(url, headers=headers)
    candidates = []
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for r in data.get('query', {}).get('search', []):
                t = r['title']
                lower = t.lower()
                if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                if any(bad in lower for bad in BAD_KEYWORDS):
                    continue
                candidates.append(t)
    except Exception:
        pass
    return candidates

def main():
    with open('scripts/drinks_def.json', encoding='utf-8') as f:
        drinks = json.load(f)

    results = {}
    print(f"Resolving online images for {len(drinks)} drinks...", flush=True)

    for i, drink in enumerate(drinks):
        drink_id = drink['id']
        name = drink['name']

        target_file = None
        img_url = None
        clean_title = None
        artist = None
        license_str = None

        # 1. Try DIRECT_CONFIRMED
        if drink_id in DIRECT_CONFIRMED:
            cand = DIRECT_CONFIRMED[drink_id]
            u, t, a, l = get_file_info(cand)
            if u:
                img_url, clean_title, artist, license_str = u, t, a, l
                target_file = cand

        # 2. If not, try search queries
        if not img_url:
            for q in drink.get('queries', []):
                cands = search_commons(q)
                for cand in cands:
                    u, t, a, l = get_file_info(cand)
                    if u:
                        img_url, clean_title, artist, license_str = u, t, a, l
                        target_file = cand
                        break
                if img_url:
                    break

        if img_url:
            print(f"[{i+1}/{len(drinks)}] RESOLVED: {name} -> {clean_title}", flush=True)
            results[drink_id] = {
                "dish_id": drink_id,
                "name": name,
                "file_title": clean_title,
                "artist": artist,
                "license": license_str,
                "url": img_url,
                "dest": f"src/images/do_uong/{drink_id}.webp"
            }
        else:
            print(f"[{i+1}/{len(drinks)}] UNRESOLVED: {name}", flush=True)

    with open('scripts/confirmed_73_drinks.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Finished resolving: {len(results)}/{len(drinks)} drinks confirmed.")

if __name__ == '__main__':
    main()
