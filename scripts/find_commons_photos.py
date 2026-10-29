import urllib.request, urllib.parse, json, sys, os
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

BAD_KEYWORDS = [
    'pdf', 'djvu', 'svg', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    'girl', 'boy', 'child', 'band', 'concert', 'album', 't-shirt', 'anime', 'manga', 'drawing',
    'illustration', 'map', 'diagram', 'car', 'bus', 'train', 'station', 'fauna', 'specimen',
    'street', 'dog', 'cat', 'pit bull', 'puppy', 'kitten', 'bird', 'horse', 'animal', 'insect'
]

def search(q):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=10"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = []
            for r in data.get('query', {}).get('search', []):
                t = r['title']
                lower = t.lower()
                if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                if any(bad in lower for bad in BAD_KEYWORDS):
                    continue
                results.append(t)
            return results
    except Exception as e:
        return []

if __name__ == '__main__':
    q = sys.argv[1] if len(sys.argv) > 1 else 'Red Bull can'
    print(f"Searching for: {q}")
    for res in search(q):
        print(f"  {res}")
