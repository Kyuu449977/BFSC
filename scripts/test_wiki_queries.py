import urllib.request, urllib.parse, json, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

def test_query(lang, q):
    print(f"\n--- Testing lang={lang}, query={q} ---")
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(q)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("Title:", data.get('title'))
            print("Description:", data.get('description'))
            img = data.get('thumbnail', {}).get('source')
            print("Thumbnail:", img)
    except Exception as e:
        print("Error:", e)

test_query('ja', 'たまごサンド')
test_query('ja', 'サンドイッチ')
test_query('ja', '納豆')
test_query('ja', '鮭の塩焼き')
