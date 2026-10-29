import urllib.parse
import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

candidates = {
    'nuoc_ep_oi': [
        'File:Agua de guayaba.jpg',
        'File:Glass of Guava Juice.jpg',
        'File:Guava Juice.jpg',
        'File:Pink guava juice.jpg'
    ],
    'nuoc_tra_oi_hong_hat_chia': [
        'File:Fresh Gvava Juice.JPG',
        'File:Pink Guava Juice.jpg',
        'File:Guava juice drink.jpg',
        'File:Amrud ka juice.jpg'
    ],
    'nuoc_sinh_to_xoai': [
        'File:Costco treats - Lassi.jpg',
        'File:Mango smoothie.jpg',
        'File:Mango Smoothie (5630323380).jpg',
        'File:Mango smoothie with mint.jpg'
    ],
    'nuoc_tra_vai_lai': [
        'File:Lychee Tea.jpg',
        'File:Iced lychee tea.jpg',
        'File:Lychee iced tea.jpg',
        'File:Jasmine tea.jpg'
    ],
    'nuoc_revive': [
        'File:Gatorade.jpg',
        'File:Gatorade Cool Blue bottle.jpg',
        'File:Bottle of Pocari Sweat.JPG',
        'File:Aquarius bottle.jpg',
        'File:Bottle of Powerade.jpg'
    ]
}

headers = {'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC; contact@example.com)'}

for key, titles in candidates.items():
    print(f"\n--- Checking for {key} ---")
    for title in titles:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800"
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, p in pages.items():
                    if pid != "-1":
                        ii = p.get('imageinfo', [{}])[0]
                        thumb = ii.get('thumburl')
                        meta = ii.get('extmetadata', {})
                        artist = meta.get('Artist', {}).get('value', 'Unknown')
                        license_name = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                        print(f"FOUND: {title} -> {thumb}")
                        print(f"  Artist: {artist[:40]} | License: {license_name}")
        except Exception as e:
            print(f"Error {title}: {e}")
