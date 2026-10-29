import urllib.request, sys
sys.stdout.reconfigure(encoding='utf-8')

test_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Coca_Cola_-_Mexican_death_sentence.jpg/640px-Coca_Cola_-_Mexican_death_sentence.jpg"

agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'BestFoodVietApp/1.0 (https://bestfood.vn/; contact@bestfood.vn) python-requests/2.31',
    'WikimediaDownloader/1.0 (https://commons.wikimedia.org; info@wikimedia.org)',
    'Wget/1.21.3'
]

for ua in agents:
    try:
        req = urllib.request.Request(test_url, headers={'User-Agent': ua})
        with urllib.request.urlopen(req, timeout=5) as r:
            data = r.read()
            print(f"Success with '{ua[:40]}...': downloaded {len(data)} bytes", flush=True)
            break
    except Exception as e:
        print(f"Failed with '{ua[:40]}...': {e}", flush=True)
