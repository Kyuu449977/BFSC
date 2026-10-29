import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

candidates = {
    "nuoc_ep_oi": [
        "Jugo de guayaba",
        "A glass of pink guava juice",
        "Guava juice in a tall glass",
        "Pink guava drink in glass"
    ],
    "nuoc_tra_oi_hong_hat_chia": [
        "Pink iced tea in glass",
        "Iced tea with fruit in glass",
        "Strawberry iced tea in a glass",
        "Fruit tea in clear glass"
    ],
    "nuoc_sinh_to_xoai": [
        "Mango smoothie in a glass",
        "A glass of mango smoothie",
        "Mango shake in tall glass",
        "Fresh mango juice in glass"
    ],
    "nuoc_tra_vai_lai": [
        "Lychee iced tea in glass",
        "Iced tea with lychee",
        "Cold bubble tea in glass cup",
        "Iced tea with fruit slices"
    ],
    "nuoc_revive": [
        "Glass of isotonic sports drink",
        "Energy drink in clear glass with ice",
        "Cold lemon water with ice in glass",
        "Sports drink bottle on table"
    ]
}

def search_clean(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl')
                meta = ii.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons')
                lic = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                # Strict check against person/portrait
                if any(bad in title.lower() for bad in ['roi fabito', 'youtuber', 'person', 'people', 'man', 'woman', 'boy', 'girl', 'selfie', 'portrait', 'terrace', 'vendor', 'drinking', 'drinker']):
                    continue
                if thumb:
                    return title, thumb, artist, lic
    except Exception as e:
        pass
    return None, None, None, None

for key, q_list in candidates.items():
    found = None
    for q in q_list:
        t, thumb, artist, lic = search_clean(q)
        if t:
            found = (t, thumb, artist, lic)
            print(f"[{key}] -> Query '{q}' => {t}")
            break
    if not found:
        print(f"[{key}] -> NOT FOUND")
