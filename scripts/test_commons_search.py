import urllib.request, urllib.parse, json, sys
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

def search_commons_files(query):
    print(f"\nSearch Commons for: {query}")
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=5"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for r in data.get('query', {}).get('search', []):
            title = r['title']
            print(" ", title)

search_commons_files('Tamago sando food')
search_commons_files('egg salad sandwich Japanese')
search_commons_files('Natto rice food')
search_commons_files('Yakizakana salmon food')
search_commons_files('asari miso soup')
