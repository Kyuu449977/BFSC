import urllib.request, urllib.parse, json, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

BAD_KEYWORDS = [
    'tomb', 'cemetery', 'grave', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    't-shirt', 'anime', 'manga', 'drawing', 'illustration', 'vector', 'logo', 'map', 'diagram',
    'street', 'road', 'conference', 'festival', 'parade', 'car', 'bus', 'train', 'station',
    'fauna', 'specimen', 'taxidermy', 'ichthyology', 'wildlife', 'macro', 'micro', 'signboard'
]

ja_queries = {
  "ja_m_1": ["Tamago kake gohan", "Tamagokake-gohan"],
  "ja_m_2": ["Breakfast of grilled salmon, miso soup and rice", "Grilled Salmon and Ochazuke", "Yakizakana"],
  "ja_m_3": ["Tai chazuke", "Ochazuke"],
  "ja_m_4": ["Japanese egg sandwich", "Tamago sando"],
  "ja_m_5": ["Ogura toast", "Ogura toast Nagoya"],
  "ja_m_6": ["Umeboshi okayu", "Okayu porridge"],
  "ja_m_7": ["Natto on rice", "Rice seasoned with Natto"],
  "ja_m_8": ["Saba no misoni", "Mackerel simmered in miso"],
  "ja_m_9": ["Miso soup of Japanese littleneck clam", "Onigiri and miso soup"],
  "ja_l_1": ["Nigiri Sushi", "Nigiri sushi platter"],
  "ja_l_2": ["Chirashizushi", "Kaisen chirashi"],
  "ja_l_3": ["Hakata ramen", "Tonkotsu ramen bowl"],
  "ja_l_4": ["Miso ramen corn butter", "Sapporo ramen miso"],
  "ja_l_5": ["Katsudon", "Katsudon bowl"],
  "ja_l_6": ["Gyudon beef bowl", "Gyudon"],
  "ja_l_7": ["Tempura udon", "Sanuki udon"],
  "ja_l_8": ["Zaru soba", "Soba noodles tempura"],
  "ja_l_9": ["Katsu curry Japanese", "Katsu curry"],
  "ja_l_10": ["Hitsumabushi", "Unadon eel"],
  "ja_l_11": ["Oyakodon", "Oyako donburi"],
  "ja_l_12": ["Hiyashi chuka", "Hiyashi chuka cold noodles"]
}

def find_best_file(queries):
    for q in queries:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=8"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                for r in data.get('query', {}).get('search', []):
                    title = r['title']
                    lower = title.lower()
                    if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                        continue
                    if any(bad in lower for bad in BAD_KEYWORDS):
                        continue
                    return title
        except Exception:
            pass
    return None

for k, q_list in ja_queries.items():
    best = find_best_file(q_list)
    print(f"{k} -> {best}")
