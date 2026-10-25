import urllib.request, urllib.parse, json, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

clean_q = 'たまごサンド'
s_url = f"https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(clean_q)}&format=json"
req = urllib.request.Request(s_url, headers=headers)
with urllib.request.urlopen(req, timeout=10) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    results = data.get('query', {}).get('search', [])
    for r in results[:5]:
        print("Search result title:", r['title'])
        sub_url = f"https://ja.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(r['title'])}"
        try:
            sub_req = urllib.request.Request(sub_url, headers=headers)
            with urllib.request.urlopen(sub_req) as s_resp:
                s_data = json.loads(s_resp.read().decode('utf-8'))
                print("  Summary:", s_data.get('description'))
                print("  Thumb:", s_data.get('thumbnail', {}).get('source'))
        except Exception as e:
            print("  Error:", e)
