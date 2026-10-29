import sys, os, time, json, urllib.request, urllib.parse, re
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

MAP = {
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
    "nuoc_tra_sua_truyen_thong": "File:Pearl Milk Tea in Chun Shui Tang.jpg",
    "nuoc_tra_sua_oolong": "File:Classic bubble tea.jpg",
    "nuoc_tra_sua_lai": "File:Bubble tea by Johnny.jpg",
    "nuoc_tra_sua_thiet_quan_am": "File:50 Lan Bubble Tea in Taichung 20141201.jpg",
    "nuoc_tra_sua_earl_grey": "File:Cup of Earl Gray.jpg",
    "nuoc_tra_sua_thai_do": "File:Thai Red Ice Milk Tea - Siam Siam 2024-07-31.jpg",
    "nuoc_tra_sua_thai_xanh": "File:Iced Thai Green Tea in Teanol Cafe & Working Space.jpg",
    "nuoc_tra_sua_khoai_mon": "File:Taro flavored milk tea.jpg",
    "nuoc_tra_sua_socola": "File:Vanilla chocolate milk shake and ice lemon tea.jpg",
    "nuoc_tra_sua_bac_ha": "File:Fresh mint tea in a glass.jpg",
    "nuoc_sua_tuoi_tran_chau_duong_den": "File:Brown sugar boba tea at Boba Heaven, downtown Evanston, IL.jpg",
    "nuoc_tra_sua_tran_chau_duong_den": "File:Popping boba w Bubble Tea.jpg",
    "nuoc_tra_sua_kem_cheese": "File:Fat glass mug.jpg",
    "nuoc_tra_sua_kem_trung_chay": "File:Strawberry milk - fluffy cheesecake, raspberry - citrus sorbet - green tea creme brûlée.jpg",
    "nuoc_tra_sua_nuong": "File:Cold drinks at Granny's Café 2025-06-23.jpg",
    "nuoc_tra_dao_cam_sa": "File:IceTea Migros.jpg",
    "nuoc_tra_dao_mieng": "File:Peach soda soft drink.jpg",
    "nuoc_tra_vai": "File:Bubble tea on a hot day.jpg",
    "nuoc_tra_mang_cut": "File:Mangosteen.jpg",
    "nuoc_tra_oi_hong_chia": "File:Guava Juice 2025 02.png",
    "nuoc_tra_dua_luoi": "File:Brisk Strawberry Melon Iced Tea.jpg",
    "nuoc_tra_dau_tay_dam": "File:Milkshake beverage strawberry drink-1021027.jpg",
    "nuoc_tra_chanh_gia_tay": "File:Iced Tea with Lemon, First Watch, Melbourne, Florida.jpg",
    "nuoc_tra_tac_xi_muoi": "File:KALAMASI SYRUP FOR REFRESHING COLD DRINKS SOURCE OF VITAMIN C PANGASINAN.jpg",
    "nuoc_matcha_latte": "File:Matcha Latte KF.JPG",
    "nuoc_matcha_macchiato": "File:Matcha Latte with Seasalt Cream.jpg",
    "nuoc_matcha_nuoc_dua": "File:Kultura Drinks.png",
    "nuoc_dirty_matcha": "File:Green tea latte 1.jpg",
    "nuoc_strawberry_matcha": "File:Iced Strawberry Shortcake Matcha - M&S Café, Worthing 2026-06-20.jpg",
    "nuoc_matcha_frappuccino": "File:Matcha-Kari smoothies.jpg",
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
    "nuoc_dua_xiem_got_vo": "File:Drinking coconut.jpg",
    "nuoc_dua_tac_dua_thom": "File:Green coconut fruit.jpg",
    "nuoc_cam_vat": "File:(a glass of orange juice bread with and jelly and a waffle).jpg",
    "nuoc_ep_buoi_hong": "File:Self-made gin grapefruit long drink.jpg",
    "nuoc_ep_dua_hau": "File:Watermelon juice in glass.jpg",
    "nuoc_ep_dua_thom": "File:Pineapple juice in glass.jpg",
    "nuoc_ep_tao": "File:Apple juice glass.jpg",
    "nuoc_ep_oi": "File:Fruit Salad Or Fruit Bowl.jpg",
    "nuoc_ep_ca_rot": "File:Təbrizdə bir qutu makaron và bir stəkan yerkökü suyu.jpg",
    "nuoc_ep_ca_chua": "File:A glass of tomato juice on a black plate.jpg",
    "nuoc_mia_sieu_sach": "File:Glass of sugarcane juice.jpg",
    "nuoc_ca_phe_den_da": "File:Ice coffee image.jpg",
    "nuoc_ca_phe_sua_da": "File:CÀ PHÊ SỮA PHA PHIN.jpg",
    "nuoc_bac_xiu": "File:Vietnamese Iced Coffee Ba Chi Canteen.jpg",
    "nuoc_ca_phe_trung": "File:Egg Coffee (6923068614).jpg",
    "nuoc_ca_phe_cot_dua": "File:Vietnamese Salted Coffee & Xin chao's coconut Coffee - Xin Chao, Eastbourne 2026-08-14.jpg"
}

def get_file_thumb(file_title):
    clean_title = file_title if file_title.startswith('File:') else f"File:{file_title}"
    url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_title)}&prop=imageinfo&iiprop=url|user|extmetadata&iiurlwidth=800&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if 'imageinfo' in p and p['imageinfo']:
                    info = p['imageinfo'][0]
                    thumb = info.get('thumburl') or info.get('url')
                    orig = info.get('url')
                    user = info.get('user', 'Wikimedia Commons Contributor')
                    meta = info.get('extmetadata', {})
                    artist = meta.get('Artist', {}).get('value', user)
                    artist = re.sub(r'<[^>]+>', '', artist).strip() or user
                    license_str = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                    return thumb, orig, clean_title, artist, license_str
    except Exception as e:
        pass
    return None, None, None, None, None

def check_all():
    print(f"Checking {len(MAP)} files against Wikimedia API...", flush=True)
    missing = []
    for k, v in MAP.items():
        thumb, orig, title, artist, lic = get_file_thumb(v)
        if not thumb:
            print(f"FAILED: {k} -> {v}")
            missing.append((k, v))
        else:
            # print first 5 as sample
            if len(missing) == 0 and list(MAP.keys()).index(k) < 3:
                print(f"OK sample: {k} -> thumb={thumb[:60]}... artist={artist}")
    print(f"\nVerification finished! Valid: {len(MAP) - len(missing)}/{len(MAP)}, Missing: {len(missing)}")

if __name__ == '__main__':
    check_all()
