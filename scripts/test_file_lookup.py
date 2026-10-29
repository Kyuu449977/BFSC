import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

file_title = "File:Glass of orange juice.jpg"
url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(file_title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
with urllib.request.urlopen(req, timeout=10) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    pages = data.get('query', {}).get('pages', {})
    for pid, page in pages.items():
        ii = page.get('imageinfo', [{}])[0]
        thumb = ii.get('thumburl')
        print(f"Title: {page.get('title')}")
        print(f"Thumb URL: {thumb}")
