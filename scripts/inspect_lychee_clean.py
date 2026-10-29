import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for t in [
    'File:Lychee sorbet black tea with mint leaf.jpg',
    'File:Lychee sorbet black tea.jpg',
    'File:Lychee Oolong Tea Drink, Oct 2024.jpg',
    'File:Iced lychee tea and Es teh manis - Bali 2025-09-25.jpg'
]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(t)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for pid, p in data['query']['pages'].items():
                if pid != '-1':
                    ii = p['imageinfo'][0]
                    print(t)
                    print("  url:", ii.get('url'))
                    print("  thumb:", ii.get('thumburl'))
                    print("  desc:", ii.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')[:100])
    except Exception as e:
        print("Error:", e)
