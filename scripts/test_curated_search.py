import urllib.request, urllib.parse, json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

BAD_KEYWORDS = [
    'tomb', 'cemetery', 'grave', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    't-shirt', 'anime', 'manga', 'drawing', 'illustration', 'vector', 'logo', 'map', 'diagram',
    'street', 'road', 'conference', 'festival', 'parade', 'car', 'bus', 'train', 'station',
    'fauna', 'specimen', 'taxidermy', 'ichthyology', 'wildlife', 'macro', 'micro'
]

def search_commons_food(query, category_hint=None):
    clean_q = query.strip()
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(clean_q)}&srnamespace=6&format=json&srlimit=10"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            candidates = []
            for r in results:
                title = r['title']
                lower_title = title.lower()
                if not any(ext in lower_title for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                # check bad keywords
                if any(bad in lower_title for bad in BAD_KEYWORDS):
                    continue
                candidates.append(title)
            return candidates
    except Exception as e:
        print("Error:", e)
        return []

test_cases = [
    ("ja_m_2", "Shioyaki salmon dish"),
    ("ja_m_4", "Japanese egg sandwich"),
    ("ja_m_7", "Natto on rice"),
    ("ja_m_9", "Asari miso soup clam"),
    ("ja_l_1", "Nigiri sushi platter")
]

for dish_id, q in test_cases:
    print(f"\n--- {dish_id}: {q} ---")
    cands = search_commons_food(q)
    for c in cands[:4]:
        print(" ", c)
