import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

targets = [
    ("Banh trang tron", "Bánh tráng trộn"),
    ("Banh trang nuong", "Bánh tráng nướng"),
    ("Nem chua ran", "Nem chua rán"),
    ("Cha gio", "Chả giò"),
    ("Goi cuon", "Gỏi cuốn"),
    ("Tamago sando", "Tamago Sando"),
    ("Natto rice", "Natto"),
    ("Onigiri", "Onigiri"),
    ("Kaisendon", "Hải sản Kaisendon"),
    ("Guava juice", "Nước ép ổi"),
    ("Pepsi can", "Pepsi"),
    ("Brown sugar boba", "Trà sữa trân châu"),
    ("French fries", "Khoai tây chiên"),
    ("Mozzarella sticks", "Phô mai que"),
    ("Fried chicken popcorn", "Gà lắc"),
]

for q, label in targets:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            found = []
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl')
                if thumb and not any(bad in title.lower() for bad in ['svg', 'pdf', 'djvu', 'people', 't-shirt', 'building', 'street']):
                    found.append((title, thumb))
            if found:
                print(f"[{label}] -> {found[0][0]}")
            else:
                print(f"[{label}] -> No clean image found")
    except Exception as e:
        print(f"[{label}] -> Error: {e}")
