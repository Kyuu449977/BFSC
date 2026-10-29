import urllib.parse
import urllib.request
import json
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

for title in [
    'File:Gatorade.jpg',
    'File:Gatorade Cool Blue bottle.jpg',
    'File:Bottle of Pocari Sweat.JPG',
    'File:Aquarius bottle.jpg',
    'File:Powerade.jpg',
    'File:Can of Red Bull.jpg'
]:
    time.sleep(1.5)
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (contact@example.com)'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if pid != "-1":
                    ii = p.get('imageinfo', [{}])[0]
                    meta = ii.get('extmetadata', {})
                    desc = meta.get('ImageDescription', {}).get('value', '')
                    print(f"\nTITLE: {title}")
                    print(f"URL: {ii.get('url')}")
                    print(f"DESC: {desc[:200]}")
    except Exception as e:
        print(f"Error {title}: {e}")
