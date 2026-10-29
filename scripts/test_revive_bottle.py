import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

for title in [
    "File:Gatorade.jpg",
    "File:Gatorade Cool Blue bottle.jpg",
    "File:Bottle of Pocari Sweat.JPG",
    "File:A bottle of Pocari Sweat on a wooden table.jpg",
    "File:Aquarius bottle.jpg",
    "File:Bottle of Powerade.jpg",
    "File:Powerade.jpg"
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
    except Exception as e:
        print(f"Error {title}: {e}")
