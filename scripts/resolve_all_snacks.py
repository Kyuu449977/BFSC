import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

snack_queries = {
    "banh_trang_tron": ["Banh trang tron (mua tai truong thpt giadinh).jpg", "Vietnamese \"banh trang tron\".JPG"],
    "banh_trang_nuong": ["Bánh tráng nướng TP. Hồ Chí Minh - street food in Ho Chi Minh City, Vietnam.jpg", "Pizzabanhtrangnuong1.jpg"],
    "banh_trang_cuon_bo": ["Bánh tráng cuốn 2013.jpg", "Bánh tráng phô mai.jpg"],
    "banh_trang_cham_me": ["Bánh Tráng Cù Lao Mây.JPG", "Bánh tráng phô mai.jpg"],
    "banh_trang_kep": ["Pizzabanhtrangnuong2.jpg", "Bánh tráng phô mai.jpg"],
    "ca_vien_chien_mam": ["Fried fish balls", "Fish ball skewer", "Fishball"],
    "nem_chua_ran": ["Nem chua", "Nem rán", "Fried spring roll"],
    "chan_ga_sa_tac": ["Chicken feet. Hong Kong. (16841735339).jpg", "Pickled chicken feet"],
    "banh_mi_muoi_ot": ["Bánh mì nướng", "Banh mi Vietnam", "Vietnamese baguette"],
    "khoai_lang_lac": ["Sweet potato fries", "Fried sweet potato"],
    "khoai_tay_lac": ["Cajun fries from Popeyes Louisiana Kitchen, Stratford, Ontario, 2025-08-04.jpg", "French fries"],
    "xoai_lac": ["Green mangoes with vinegar, chili, salt, and soy sauce (Philippines) 01.jpg", "Mango salad"],
    "coc_lac": ["Ambarella", "Spiced green mango", "Fruit salad spicy"],
    "bap_xao_bo": ["Mmm... buttered sweet corn and a BLT for lunch (7670120520).jpg", "Corn butter"],
    "pho_mai_que": ["Mozzarella Sticks at Mobtown Ballroom.jpg", "Mozzarella sticks"],
    "trung_cut_lon_me": ["Quail eggs in tomato sauce", "Boiled quail eggs", "Balut"],
    "hot_vit_lon_me": ["Balut egg", "Duck embryo", "Balut"],
    "bo_bia_man": ["LunBhia.jpg", "Popiah", "Lumpia"],
    "ga_lac_pho_mai": ["KFC Popcorn Chicken (12956064765).jpg", "Popcorn chicken"],
    "da_heo_chay_toi": ["Chicharron", "Pork rinds", "Fried pork skin"],
    "banh_ga_pho_mai": ["Chicken croquette", "Chicken katsu nugget", "Croquette"],
    "xien_que_nuong": ["Meatballs on skewer", "Yakitori skewers", "Fishball skewer"],
    "tau_hu_tran_chau": ["Douhua with tapioca", "Tofu pudding", "Douhua"],
    "banh_trang_lui": ["Pizzabanhtrangnuong3.JPG", "Bánh tráng cuốn"],
    "tokbokki_pho_mai": ["Tteokbokki", "Cheese tteokbokki", "Spicy rice cake"],
    "muc_rim_me": ["Dried squid chili", "Dried squid snack", "Spicy dried squid"],
    "goi_cuon_tom_thit": ["Gỏi cuốn.jpg", "Summer roll", "Spring roll"],
    "banh_crepe_sau_rieng": ["Durian crepe", "Crepe cake", "Mille crepe"],
    "trung_long_dao": ["Ajitsuke tamago", "Soft boiled egg", "Boiled egg half"],
    "doi_sun_nuong": ["Grilled sausage", "Chinese sausage grilled", "Kielbasa grilled"],
    "nem_lui_nuong": ["Nem nướng", "Nem lụi", "Lemongrass pork skewer"],
    "banh_bao_chien": ["Shengjian mantou", "Fried baozi", "Pan fried bun"],
    "banh_bot_loc_chien": ["Bánh bột lọc", "Fried tapioca dumpling", "Tapioca dumpling"],
    "kho_ga_la_chanh": ["Shredded chicken jerky", "Chicken floss", "Rousong"],
    "kho_bo_den": ["Beef jerky", "Biltong", "Spicy beef jerky"],
    "ha_cao_chien": ["Fried gyoza dumplings", "Potstickers", "Fried wonton"],
    "banh_flan": ["Creme caramel flan", "Flan dessert", "Caramel custard"]
}

resolved = {}

for key, queries in snack_queries.items():
    found_title = None
    found_thumb = None
    found_artist = "Wikimedia Commons"
    found_lic = "CC BY-SA"
    for q in queries:
        if q.startswith("File:") or q.endswith(".jpg") or q.endswith(".JPG") or q.endswith(".png"):
            file_name = q if q.startswith("File:") else f"File:{q}"
            url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(file_name)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
        else:
            url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
        
        req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, p in pages.items():
                    if pid == "-1" and 'imageinfo' not in p: continue
                    t = p.get('title', '')
                    ii = p.get('imageinfo', [{}])[0]
                    thumb = ii.get('thumburl')
                    meta = ii.get('extmetadata', {})
                    if thumb and not any(bad in t.lower() for bad in ['svg', 'pdf', 'djvu', 'people', 't-shirt', 'building', 'car']):
                        found_title = t
                        found_thumb = thumb
                        found_artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons')
                        found_lic = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                        break
        except Exception:
            pass
        if found_title:
            break
    resolved[key] = (found_title, found_thumb, found_artist, found_lic)
    print(f"[{key}] -> {found_title}")

with open('scripts/resolved_snacks.json', 'w', encoding='utf-8') as f:
    json.dump(resolved, f, ensure_ascii=False, indent=2)
print("Saved resolved_snacks.json")
