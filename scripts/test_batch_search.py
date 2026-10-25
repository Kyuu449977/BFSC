import urllib.request, urllib.parse, json, sys

sys.stdout.reconfigure(encoding='utf-8')

test_samples = [
    # JA
    ("ja", "卵かけご飯", "Tamago kake gohan"),
    ("ja", "握り寿司", "Nigirizushi"),
    ("ja", "豚骨ラーメン", "Tonkotsu ramen"),
    ("ja", "讃岐うどん", "Sanuki udon"),
    ("ja", "たこ焼き", "Takoyaki"),
    ("ja", "お好み焼き", "Okonomiyaki"),
    # KO
    ("ko", "보쌈", "Bossam"),
    ("ko", "순대", "Sundae (food)"),
    ("ko", "삼계탕", "Samgye-tang"),
    ("ko", "떡볶이", "Tteokbokki"),
    ("ko", "비빔밥", "Bibimbap"),
    # ZH
    ("zh", "小笼包", "Xiaolongbao"),
    ("zh", "北京烤鸭", "Peking duck"),
    ("zh", "麻婆豆腐", "Mapo tofu"),
    ("zh", "炸酱面", "Zhajiangmian"),
    ("zh", "粿条", "Kway teow"),
    # EN
    ("en", "Spaghetti bolognese", "Bolognese sauce"),
    ("en", "Cheeseburger", "Cheeseburger"),
    ("en", "Pepperoni pizza", "Pepperoni"),
    ("en", "French onion soup", "French onion soup"),
    ("en", "Clam chowder", "Clam chowder")
]

headers = {'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'}

def get_wiki_image(lang, title):
    # 1. Page summary
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img = data.get('thumbnail', {}).get('source')
            if img:
                return img, data.get('title')
    except Exception:
        pass
    
    # 2. Search API
    search_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(title)}&format=json"
    try:
        req = urllib.request.Request(search_url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            if results:
                top_title = results[0]['title']
                s_url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(top_title)}"
                s_req = urllib.request.Request(s_url, headers=headers)
                with urllib.request.urlopen(s_req, timeout=5) as s_resp:
                    s_data = json.loads(s_resp.read().decode('utf-8'))
                    img = s_data.get('thumbnail', {}).get('source')
                    if img:
                        return img, top_title
    except Exception:
        pass
        
    return None, None

for lang, native_name, en_name in test_samples:
    img, title = get_wiki_image(lang, native_name)
    if not img and en_name:
        img, title = get_wiki_image("en", en_name)
    status = f"FOUND ({title})" if img else "NOT FOUND"
    print(f"[{lang}] {native_name} / {en_name} -> {status}")
