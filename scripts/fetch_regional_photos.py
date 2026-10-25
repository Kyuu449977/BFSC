import urllib.request, urllib.parse, json, os, re
from PIL import Image
import io

os.makedirs('src/images/regional', exist_ok=True)

queries = {
    'vat_banh_lot': ('banh lot', 'Bánh lọt nước cốt dừa', 'banh_lot.webp'),
    'sang_banh_tam_bi': ('banh tam bi', 'Bánh tằm bì', 'banh_tam_bi.webp'),
    'chieu_banh_can': ('banh can phan rang', 'Bánh căn Đà Lạt', 'banh_can.webp'),
    'chieu_banh_cong': ('banh cong', 'Bánh cống Sóc Trăng', 'banh_cong.webp'),
    'chieu_banh_duc_nong': ('banh duc', 'Bánh đúc nóng Hà Nội', 'banh_duc.webp'),
    'trua_cao_lau': ('cao lau hoi an', 'Cao lầu Hội An', 'cao_lau.webp'),
    'sang_banh_uot_long_ga': ('banh uot', 'Bánh ướt lòng gà', 'banh_uot_long_ga.webp'),
    'vat_che_buoi': ('che buoi', 'Chè bưởi An Giang', 'che_buoi.webp'),
    'toi_nem_nuong': ('nem nuong ninh hoa', 'Nem nướng Ninh Hòa', 'nem_nuong.webp'),
    'trua_bun_ca': ('bun ca nha trang', 'Bún cá Nha Trang', 'bun_ca.webp'),
    'toi_mi_vit_tiem': ('mi vit tiem', 'Mì vịt tiềm', 'mi_vit_tiem.webp'),
    'toi_chao_long': ('chao long', 'Cháo lòng', 'chao_long.webp'),
    'toi_lau_bo': ('lau bo', 'Lẩu bò nhúng dấm', 'lau_bo.webp'),
    'chieu_banh_dap': ('banh dap', 'Bánh đập hến xào', 'banh_dap.webp'),
    'vat_che_ba_ba': ('che ba ba', 'Chè bà ba', 'che_ba_ba.webp'),
    'vat_banh_cam': ('banh cam', 'Bánh cam · Bánh tiêu', 'banh_cam.webp'),
    'trua_com_hen': ('com hen hue', 'Cơm hến Huế', 'com_hen.webp'),
}

results = {}

for dish_id, (q, display_name, file_name) in queries.items():
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata"
    req = urllib.request.Request(url, headers={'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        found = None
        for pid, p in pages.items():
            title = p.get('title', '')
            ii = p.get('imageinfo', [{}])[0]
            img_url = ii.get('url', '')
            if not img_url:
                continue
            lower_title = title.lower()
            if any(lower_title.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                meta = ii.get('extmetadata', {})
                artist = re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', 'Wikimedia Commons contributor')).strip() or 'Wikimedia Commons contributor'
                license_val = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA 3.0')
                found = {
                    'dish_id': dish_id,
                    'name': display_name,
                    'title': title,
                    'url': img_url,
                    'artist': artist,
                    'license': license_val,
                    'file': f'images/regional/{file_name}'
                }
                break
        if found:
            results[dish_id] = found
            print(f"[OK] {dish_id}: {found['title']} ({found['license']})")
        else:
            print(f"[MISSING] {dish_id} for query {q}")
    except Exception as e:
        print(f"[ERR] {dish_id}: {e}")

print(f"Total found: {len(results)} / {len(queries)}")

with open('scripts/regional_photos_meta.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
