import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for q in ["filetype:bitmap banana smoothie", "filetype:bitmap banana milkshake", "filetype:bitmap banana shake"]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&srlimit=6"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"\n--- {q} ---")
            for item in data.get('query', {}).get('search', []):
                print(" ", item.get('title'))
    except Exception as e:
        print("Error:", e)
