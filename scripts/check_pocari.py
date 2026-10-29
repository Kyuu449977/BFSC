import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for title in [
    'File:Pocari Sweat can and bottle.jpg',
    'File:Pocari Sweat.jpg',
    'File:Can of Pocari Sweat.jpg',
    'File:Bottle of Pocari Sweat.JPG',
    'File:Aquarius can.jpg',
    'File:Powerade Ion4 Mountain Blast.jpg',
    'File:Isotonic drink.jpg'
]:
    url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if pid != "-1":
                    ii = p.get('imageinfo', [{}])[0]
                    print(f"FOUND: {title} -> {ii.get('url')}")
                    print(f"  thumb: {ii.get('thumburl')}")
    except Exception as e:
        print(f"Error {title}: {e}")
