import sys, urllib.request, urllib.parse, json
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/3.0 (https://github.com/phamp/BFSC; food education application)'}

queries = {
    "ja_a_8": ["baked sweet potato", "roasted sweet potato food", "Yaki-imo"],
    "ja_d_10": ["Saikyo yaki", "Saikyoyaki", "Miso black cod"],
    "ja_dr_6": ["Iced milk tea glass", "Milk tea glass", "Hong Kong milk tea cup"],
    "ja_dr_7": ["Draft beer glass foam", "Beer mug draft foam", "Japanese draft beer"],
    "ko_d_8": ["Maeuntang", "Fish soup Korean spicy", "Haemul tang"],
    "ko_s_7": ["Dalgona", "Ppopgi", "Honeycomb toffee Korean"],
    "ko_dr_6": ["Sparkling grape drink glass", "Fruit ade cafe glass", "Green grape juice"],
    "zh_m_7": ["Hong you chao shou", "Red oil wontons", "Sichuan spicy wonton"],
    "zh_dr_6": ["Chinese tea ceremony", "Gongfu tea cup", "Oolong tea cup"],
    "en_d_6": ["Jambalaya plate", "Seafood jambalaya rice", "Jambalaya food"],
    "en_d_7": ["Fettuccine Alfredo plate", "Pasta Alfredo bowl", "Fettuccine pasta"],
    "en_dr_1": ["Iced latte glass", "Iced coffee glass milk"],
    "en_dr_2": ["Cold brew coffee glass", "Glass of iced coffee"],
    "chieu_banh_dap": ["Bánh đập", "Banh dap"],
    "toi_5_1": ["Bún riêu cua", "Bun rieu cua bowl", "Crab noodle soup"],
    "toi_4_1": ["Ốc xào bơ tỏi", "Escargot garlic butter", "Fried sea snails"],
    "toi_lau_bo": ["Beef hot pot", "Shabu shabu beef", "Lẩu bò"],
    "nuoc_coca_zero": ["Apricot juice glass", "Iced apricot drink", "Umeshu drink glass"],
    "nuoc_ngot_4": ["Herbal iced tea glass", "Winter melon tea glass", "Chrysanthemum iced tea glass"],
    "nuoc_ngot_5": ["Fruit smoothie glass straw", "Tropical fruit shake", "Sapodilla smoothie"],
    "nuoc_revive": ["Dragon fruit juice glass", "Pitaya drink glass", "Dragon fruit iced tea"],
    "pl_tra_mang_cau": ["Fruit iced tea glass", "Soursop drink", "Tropical iced tea"]
}

for k, q_list in queries.items():
    found = None
    for q in q_list:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=6"
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                for r in data.get('query', {}).get('search', []):
                    t = r['title']
                    tl = t.lower()
                    if any(tl.endswith(e) for e in ['.jpg', '.jpeg', '.png', '.webp']):
                        if not any(bad in tl for bad in ['pdf', 'djvu', 'statue', 'museum', 'building', 'portrait', 'man', 'woman']):
                            found = (q, t)
                            break
            if found:
                break
        except Exception:
            pass
    print(f"[{k}] -> {found}")
