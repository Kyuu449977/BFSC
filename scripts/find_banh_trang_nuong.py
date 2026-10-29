import sys
import urllib.parse
import urllib.request
import json

sys.stdout.reconfigure(encoding='utf-8')

for q in ["Banh trang nuong", "banh trang", "Bánh tráng", "Vietnamese street food", "Da Lat street food"]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                title = p.get('title', '')
                print(f"[{q}] -> {title}")
    except Exception as e:
        print(f"Error {q}: {e}")
