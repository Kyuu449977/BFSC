import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

test_queries = [
    ("Tamago sando", ["Egg salad sandwich", "Tamagoyaki sandwich", "Japanese egg sandwich"]),
    ("Bánh tráng nướng", ["Vietnamese pizza", "Grilled rice paper", "Banh trang nuong Da Lat"]),
    ("Nem chua rán", ["Fried fermented pork", "Nem chua", "Nem rán"]),
    ("Gỏi cuốn", ["Summer rolls", "Fresh spring rolls Vietnam", "Goi cuon"]),
    ("Chân gà sả tắc", ["Chicken feet Vietnam", "Pickled chicken feet"]),
    ("Xoài lắc", ["Green mango chili salt", "Green mango salad Vietnam"]),
    ("Bắp xào", ["Stir fried corn Vietnam", "Sweet corn butter"]),
    ("Bánh mì nướng muối ớt", ["Vietnamese baguette", "Banh mi"]),
    ("Bò bía", ["Popiah", "Vietnamese spring roll"]),
    ("Pepsi", ["Can of Pepsi", "Pepsi cola can", "Pepsi glass"]),
    ("Cơm cá tráp đỏ", ["Tai chazuke", "Chazuke", "Ochazuke"]),
    ("Lunch Nhật", ["Sashimi teishoku", "Kaisendon seafood", "Japanese lunch set"])
]

for name, q_list in test_queries:
    found = None
    for q in q_list:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
        req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, p in pages.items():
                    title = p.get('title', '')
                    ii = p.get('imageinfo', [{}])[0]
                    thumb = ii.get('thumburl')
                    if thumb and not any(bad in title.lower() for bad in ['svg', 'pdf', 'djvu', 'people', 't-shirt', 'building', 'street', 'center']):
                        found = (title, thumb)
                        break
        except Exception:
            pass
        if found:
            break
    if found:
        print(f"[{name}] -> {found[0]}")
    else:
        print(f"[{name}] -> None")
