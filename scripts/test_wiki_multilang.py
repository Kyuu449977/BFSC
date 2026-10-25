import json
import urllib.request
import urllib.parse
import sys

sys.stdout.reconfigure(encoding='utf-8')

test_dishes = [
    ("vi", "Bánh lọt"),
    ("vi", "Chè bưởi"),
    ("ko", "보쌈"),
    ("zh", "小笼包"),
    ("en", "Spaghetti bolognese"),
    ("ja", "鯛茶漬け")
]

headers = {'User-Agent': 'FoodApp/1.0 (test@example.com)'}

for lang, dish in test_dishes:
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(dish)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img = data.get('thumbnail', {}).get('source') or data.get('originalimage', {}).get('source')
            print(f"[{lang}] {dish} -> {data.get('title')}: {img}")
    except Exception as e:
        print(f"[{lang}] {dish} -> Error: {e}")
