import urllib.request, urllib.parse, json, sys, re

sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'}

def search_commons(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
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
                license_val = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                return {
                    'title': title,
                    'url': img_url,
                    'artist': artist,
                    'license': license_val
                }
    except Exception as e:
        # print("Commons error:", e)
        pass
    return None

test_queries = [
    "鯛茶漬け",
    "たまごサンド",
    "たい焼き",
    "길거리 토스트",
    "계란빵",
    "天津煎饼果子",
    "顺德炸牛奶",
    "Chicken and Waffles",
    "Cornish Pasties",
    "Chè sương sa hạt lựu",
    "Nước sấu ngâm",
    "Sữa chua nếp cẩm",
    "Lẩu cua đồng"
]

for q in test_queries:
    res = search_commons(q)
    print(f"Query '{q}' ->", "FOUND:" if res else "NOT FOUND", res.get('title') if res else "")
