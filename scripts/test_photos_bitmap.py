import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

def search_photos(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl')
                meta = ii.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons')
                lic = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                bad_words = ['pdf', 'djvu', 'svg', 'roi fabito', 'youtuber', 'person', 'people', 'man', 'woman', 'boy', 'girl', 'selfie', 'portrait', 'drinker', 'drinking', 'vendor']
                if any(b in title.lower() for b in bad_words):
                    continue
                if thumb and (title.lower().endswith('.jpg') or title.lower().endswith('.png') or title.lower().endswith('.jpeg')):
                    results.append((title, thumb, artist, lic))
            return results
    except Exception as e:
        print(f"Error {query}: {e}")
    return []

for q in ["Guava juice", "Mango smoothie", "Lychee tea", "Fruit iced tea", "Isotonic drink", "Energy drink glass"]:
    res = search_photos(q)
    print(f"\n=== Query: {q} ===")
    for t, thumb, artist, lic in res[:3]:
        print(f"  {t} -> {thumb[:60]}")
