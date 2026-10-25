import urllib.request, urllib.parse, json, os, re
from PIL import Image
import io

os.makedirs('src/images/regional', exist_ok=True)

dish_map = {
    'vat_banh_lot': {
        'name': 'Bánh lọt nước cốt dừa',
        'title': 'File:Cendol in Penang.jpg',
        'file': 'images/regional/banh_lot.webp',
        'desc': 'Sợi bánh lọt dẻo thơm hương lá dứa chan nước cốt dừa béo ngậy'
    },
    'sang_banh_tam_bi': {
        'name': 'Bánh tằm bì',
        'title': 'File:Steamed Rice Noodles with Pork Loaf and Mung Bean Pie - Thanh Ha (3014200871).jpg',
        'file': 'images/regional/banh_tam_bi.webp',
        'desc': 'Bánh tằm se tay miền Tây chan nước cốt dừa ngọt béo kèm bì thính'
    },
    'chieu_banh_can': {
        'name': 'Bánh căn Đà Lạt',
        'title': 'File:Bánh căn in phan rang, vietnam.jpg',
        'file': 'images/regional/banh_can.webp',
        'desc': 'Bánh căn nướng khuôn đất nhân trứng tôm chấm xíu mại cay nóng'
    },
    'chieu_banh_cong': {
        'name': 'Bánh cống Sóc Trăng',
        'title': 'File:Banh Cong Mung Bean Pie - Thanh Tam AUD2.50 (4906952131).jpg',
        'file': 'images/regional/banh_cong.webp',
        'desc': 'Bánh cống chiên giòn rụm nhân đậu xanh, thịt bằm và tôm tươi'
    },
    'chieu_banh_duc_nong': {
        'name': 'Bánh đúc nóng Hà Nội',
        'title': 'File:Banhduc-northern.jpg',
        'file': 'images/regional/banh_duc.webp',
        'desc': 'Bánh đúc dẻo quánh chan nước mắm ngọt, thịt băm mộc nhĩ và hành phi'
    },
    'trua_cao_lau': {
        'name': 'Cao lầu Hội An',
        'title': 'File:Cao Lau - Ba Be, Hoi An Market VND15000.jpg',
        'file': 'images/regional/cao_lau.webp',
        'desc': 'Sợi mì vàng dai trộn thịt xá xíu đậm đà, tóp mỡ giòn và rau Trà Quế'
    },
    'sang_banh_uot_long_ga': {
        'name': 'Bánh ướt lòng gà',
        'title': 'File:Bánh ướt.jpg',
        'file': 'images/regional/banh_uot_long_ga.webp',
        'desc': 'Bánh ướt mềm mượt ăn kèm thịt gà xé phay, lòng gà trứng non thơm nức'
    },
    'vat_che_buoi': {
        'name': 'Chè bưởi An Giang',
        'title': 'File:Chè đỗ xanh.jpg',
        'file': 'images/regional/che_buoi.webp',
        'desc': 'Cùi bưởi giòn sần sật nấu đậu xanh bùi béo và nước cốt dừa sánh mịn'
    },
    'toi_nem_nuong': {
        'name': 'Nem nướng Ninh Hòa',
        'title': 'File:Mẹt nem nướng Nha Trang.jpg',
        'file': 'images/regional/nem_nuong.webp',
        'desc': 'Nem nướng than hoa cuốn bánh tráng, rau thơm chấm sốt tương ngọt đặc trưng'
    },
    'trua_bun_ca': {
        'name': 'Bún cá Nha Trang',
        'title': 'File:Bun cha ca nha trang.jpg',
        'file': 'images/regional/bun_ca.webp',
        'desc': 'Nước dùng cá ngọt thanh trong veo ăn cùng chả cá thu chiên hấp giòn dai'
    },
    'toi_mi_vit_tiem': {
        'name': 'Mì vịt tiềm',
        'title': 'File:Yellow noodle soup with duck at Urai Roasted Duck, Nawamin Road (8636850619).jpg',
        'file': 'images/regional/mi_vit_tiem.webp',
        'desc': 'Đùi vịt tiềm thảo mộc da vàng ươm thịt mềm rục ăn kèm mì sợi tươi'
    },
    'toi_chao_long': {
        'name': 'Cháo lòng',
        'title': 'File:Chao long.jpg',
        'file': 'images/regional/chao_long.webp',
        'desc': 'Cháo gạo rang ninh nước xương sánh mịn kèm dồi trường, gan, tim nóng hổi'
    },
    'toi_lau_bo': {
        'name': 'Lẩu bò nhúng dấm',
        'title': 'File:Beef hot pot.jpg',
        'file': 'images/regional/lau_bo.webp',
        'desc': 'Nước lẩu dấm dừa chua thanh thơm sả dứa nhúng bắp bò cuộn bánh tráng'
    },
    'chieu_banh_dap': {
        'name': 'Bánh đập hến xào',
        'title': 'File:Bánh tráng nướng TP. Hồ Chí Minh - street food in Ho Chi Minh City, Vietnam.jpg',
        'file': 'images/regional/banh_dap.webp',
        'desc': 'Bánh tráng nướng kẹp bánh ướt đập giòn ăn kèm hến xào hành răm xứ Quảng'
    },
    'vat_che_ba_ba': {
        'name': 'Chè bà ba',
        'title': 'File:Chè bà ba.jpg',
        'file': 'images/regional/che_ba_ba.webp',
        'desc': 'Chè khoai lang, bột báng, đậu xanh nấu nước cốt dừa béo thơm miền Nam'
    },
    'vat_banh_cam': {
        'name': 'Bánh cam · Bánh tiêu',
        'title': 'File:Banh Cam - Vietnamese fried sesame balls.jpg',
        'file': 'images/regional/banh_cam.webp',
        'desc': 'Bánh cam chiên phủ mè vàng ươm nhân đậu xanh ngọt bùi kèm bánh tiêu xốp'
    },
    'trua_com_hen': {
        'name': 'Cơm hến Huế',
        'title': 'File:Com-hen-hue.jpg',
        'file': 'images/regional/com_hen.webp',
        'desc': 'Cơm nguội trộn thịt hến xào măng khô, tóp mỡ, đậu phộng và mắm ruốc cay'
    }
}

def resize_and_crop(img, target_size=(640, 480)):
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

new_sources_entries = {}

for did, info in dish_map.items():
    title = info['title']
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles={urllib.parse.quote(title)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        page = next(iter(pages.values()))
        ii = page.get('imageinfo', [{}])[0]
        img_url = ii.get('url')
        meta = ii.get('extmetadata', {})
        artist = re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', 'Wikimedia Commons contributor')).strip() or 'Wikimedia Commons contributor'
        license_name = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
        
        # Download image bytes
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'})
        with urllib.request.urlopen(img_req, timeout=20) as img_resp:
            img_bytes = img_resp.read()
            
        im = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        im_cropped = resize_and_crop(im, (640, 480))
        target_path = os.path.join('src', info['file'])
        im_cropped.save(target_path, 'WEBP', quality=85)
        print(f"[SAVED] {info['file']} ({im_cropped.size})")
        
        new_sources_entries[did] = {
            "name": info['name'],
            "file": info['file'],
            "artist": artist,
            "license": license_name,
            "source": f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title.replace(' ', '_'))}",
            "original": img_url,
            "kind": "photo"
        }
    except Exception as e:
        print(f"[FAIL] {did} ({title}): {e}")

with open('scripts/downloaded_sources_entries.json', 'w', encoding='utf-8') as f:
    json.dump(new_sources_entries, f, ensure_ascii=False, indent=2)
print(f"Total downloaded and converted: {len(new_sources_entries)} / {len(dish_map)}")
