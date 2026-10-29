import sys, time, json, urllib.request, urllib.parse
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

def test_query(q):
    t0 = time.time()
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=3"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        results = [r['title'] for r in data.get('query', {}).get('search', [])]
        print(f"[{time.time()-t0:.2f}s] Query '{q}' -> {results}", flush=True)

test_query("Coca Cola can")
test_query("Bubble tea boba")
test_query("Matcha Latte KF.JPG")
