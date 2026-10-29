import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

for q in ["Mango lassi", "Mango juice", "Avocado smoothie", "Sports drink", "Pink drink"]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            print(f"\n=== Query: {q} ===")
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl')
                if not any(b in title.lower() for b in ['pdf', 'djvu', 'svg', 'person', 'people', 'man', 'woman', 'drinker', 'athletics']):
                    print(f"  {title}")
    except Exception as e:
        print(e)
