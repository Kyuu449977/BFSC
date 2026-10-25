import sys, urllib.request, urllib.parse, json
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/3.0 (https://github.com/phamp/BFSC; food education application)'}

def test_queries(tests):
    for label, qs in tests.items():
        print(f"\n--- {label} ---")
        for q in qs:
            url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=5"
            req = urllib.request.Request(url, headers=headers)
            try:
                with urllib.request.urlopen(req, timeout=8) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    results = data.get('query', {}).get('search', [])
                    for r in results:
                        t = r['title']
                        if any(t.lower().endswith(e) for e in ['.jpg', '.jpeg', '.png', '.webp']):
                            if not any(b in t.lower() for b in ['.pdf', '.djvu', 'statue', 'museum', 'building', 'portrait']):
                                print(f"  [{q}] -> {t}")
                                break
            except Exception as e:
                pass

tests = {
    "zh_m_7": ["Wontons in red oil", "Chaoshou", "Hongyou chaoshou", "Sichuan wontons"],
    "chieu_banh_dap": ["Bánh đập", "Banh dap Hoi An", "Banh trang nuong", "Com hen"],
    "nuoc_coca_zero": ["Apricot juice", "Glass of apricot juice", "Apricot nectar"],
    "nuoc_ngot_4": ["Liangcha", "Chinese herbal tea drink", "Herbal tea glass"],
    "nuoc_ngot_5": ["Avocado smoothie glass", "Fruit smoothie glass", "Mango smoothie glass"],
    "nuoc_revive": ["Dragon fruit juice", "Pitaya juice", "Red smoothie glass"],
    "pl_tra_mang_cau": ["Iced fruit tea", "Fruit tea glass", "Passion fruit tea iced"]
}

test_queries(tests)
