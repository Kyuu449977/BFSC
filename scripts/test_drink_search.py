import urllib.request, urllib.parse, json, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC; food education project)'}

test_queries = [
    'Coca-Cola can',
    'Pepsi can',
    'Bubble tea boba',
    'Matcha latte cup',
    'Avocado smoothie glass',
    'Vietnamese iced coffee glass',
    'Egg coffee Hanoi',
    'Sugarcane juice glass'
]

for q in test_queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=3'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            title = results[0]['title'] if results else 'None'
            print(f'Query: {q} -> Found {len(results)} matches: {title}')
    except Exception as e:
        print(f'Error for {q}: {e}')
