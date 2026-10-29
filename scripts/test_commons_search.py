import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

def search_commons(query, limit=3):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'AnGiDayBot/3.0 (food-app-audit)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for pid, page in pages.items():
                title = page.get('title', '')
                ii = page.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl') or ii.get('url')
                meta = ii.get('extmetadata', {})
                artist = meta.get('Artist', {}).get('value', 'Wikimedia Commons')
                license_name = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                results.append((title, thumb, artist, license_name))
            return results
    except Exception as e:
        print(f"Error searching '{query}': {e}")
        return []

queries = [
    "Bánh tráng trộn",
    "Bánh tráng nướng",
    "Nem chua rán",
    "Tamago sando",
    "Natto rice",
    "Onigiri miso soup",
    "Orange juice glass",
    "Guava juice"
]

for q in queries:
    res = search_commons(q, 1)
    if res:
        print(f"Query '{q}': FOUND -> {res[0][0]}")
    else:
        print(f"Query '{q}': NOT FOUND")
