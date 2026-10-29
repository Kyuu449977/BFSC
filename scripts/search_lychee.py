import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

queries = [
    'filetype:bitmap lychee tea',
    'filetype:bitmap lychee drink',
    'filetype:bitmap lychee iced tea',
    'filetype:bitmap jasmine tea glass'
]

for q in queries:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&srlimit=5"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"\n--- {q} ---")
            for item in data.get('query', {}).get('search', []):
                print(" ", item.get('title'))
    except Exception as e:
        print("Error:", e)
