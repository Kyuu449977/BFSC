import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

for title in [
    "File:Agua de guayaba.jpg",
    "File:Fresh Gvava Juice.JPG",
    "File:Lychee Tea.jpg",
    "File:Costco treats - Lassi.jpg",
    "File:Compare of sports drinks.jpg",
    "File:Gatorade bottle.jpg",
    "File:Pocari Sweat bottle.jpg",
    "File:Freshippo fresh pressed guava mixed juice.jpg"
]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if pid != "-1":
                    ii = p.get('imageinfo', [{}])[0]
                    thumb = ii.get('thumburl')
                    print(f"FOUND: {title} -> {thumb[:60] if thumb else 'no thumb'}")
                else:
                    print(f"NOT FOUND: {title}")
    except Exception as e:
        print(f"Error {title}: {e}")
