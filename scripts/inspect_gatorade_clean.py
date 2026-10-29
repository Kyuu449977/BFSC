import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for t in [
    'File:Gatorade Thirst Quencher.jpg',
    'File:100Plus.png',
    'File:Active diet by AQUARIUS.JPG'
]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(t)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for pid, p in data['query']['pages'].items():
                if pid != '-1':
                    ii = p['imageinfo'][0]
                    print(t)
                    print("  url:", ii.get('url'))
                    print("  thumb:", ii.get('thumburl'))
                    print("  desc:", ii.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')[:100])
    except Exception as e:
        print(f"Error {t}: {e}")
