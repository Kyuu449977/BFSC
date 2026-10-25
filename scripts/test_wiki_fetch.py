import json
import urllib.request
import urllib.parse
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Test Wikipedia REST API for a dish image
dish = "Sushi"
url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(dish)}"
headers = {'User-Agent': 'FoodApp/1.0 (test@example.com)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Title:", data.get('title'))
        print("Thumbnail:", data.get('thumbnail', {}).get('source'))
        print("Original:", data.get('originalimage', {}).get('source'))
except Exception as e:
    print("Error:", e)
