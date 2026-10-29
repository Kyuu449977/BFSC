import urllib.request, sys
sys.stdout.reconfigure(encoding='utf-8')

test_url = "https://upload.wikimedia.org/wikipedia/commons/a/ae/Coca_Cola_-_Mexican_death_sentence.jpg"

headers = {
    'User-Agent': 'BestFoodVietApp/1.0 (https://github.com/phamp/BFSC; phamp@gmail.com)'
}

try:
    req = urllib.request.Request(test_url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as r:
        data = r.read()
        print(f"Success! Downloaded {len(data)} bytes", flush=True)
except Exception as e:
    print(f"Error: {e}", flush=True)
