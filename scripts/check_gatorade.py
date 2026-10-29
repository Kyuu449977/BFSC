import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote('File:Gatorade.jpg')}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    pages = data.get('query', {}).get('pages', {})
    for pid, p in pages.items():
        ii = p.get('imageinfo', [{}])[0]
        thumb = ii.get('thumburl') or ii.get('url')
        print("Gatorade thumb:", thumb)
