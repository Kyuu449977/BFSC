import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for q in ["filetype:bitmap Pocari Sweat", "filetype:bitmap Gatorade bottle", "filetype:bitmap sports drink bottle", "filetype:bitmap 100plus drink"]:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&srlimit=5"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"\n--- Results for: {q} ---")
            for item in data.get('query', {}).get('search', []):
                print(" ", item.get('title'))
    except Exception as e:
        print("Error:", e)
