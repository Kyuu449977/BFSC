import json
import urllib.request
import urllib.parse
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Search Wikipedia API directly for title
query = "鯛茶漬け"
url = f"https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&format=json"
headers = {'User-Agent': 'FoodApp/1.0 (test@example.com)'}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=10) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    results = data.get('query', {}).get('search', [])
    for r in results[:3]:
        print("Search result title:", r.get('title'))
        # Get summary of first result
        s_url = f"https://ja.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(r.get('title'))}"
        s_req = urllib.request.Request(s_url, headers=headers)
        with urllib.request.urlopen(s_req, timeout=10) as s_resp:
            s_data = json.loads(s_resp.read().decode('utf-8'))
            img = s_data.get('thumbnail', {}).get('source')
            print("  Image:", img)
            break
