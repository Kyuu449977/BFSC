import sys, os, time, json, io, urllib.request, urllib.parse, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/4.0 (contact: phamp@example.com)'}

from engine_online_drinks import resize_and_crop, get_file_info, search_commons_files

with open('scripts/drinks_def.json', encoding='utf-8') as f:
    drinks = json.load(f)

for i, drink in enumerate(drinks[:5]):
    print(f"\n--- Drink {i+1}: {drink['name']} ({drink['id']}) ---", flush=True)
    queries = drink.get('queries', [])
    for q in queries:
        print(f"  Searching '{q}'...", flush=True)
        cands = search_commons_files(q)
        print(f"    Found {len(cands)} candidates: {cands[:2]}", flush=True)
        for cand in cands[:2]:
            img_url, clean_title, artist, license_str = get_file_info(cand)
            print(f"      File info: url={bool(img_url)}, title={clean_title}, artist={artist}", flush=True)
            if img_url:
                # Test downloading
                try:
                    req = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(req, timeout=10) as resp:
                        data = resp.read()
                    img = Image.open(io.BytesIO(data))
                    print(f"      Downloaded {img.width}x{img.height}, format={img.format}", flush=True)
                    out = f"src/images/do_uong/{drink['id']}.webp"
                    cropped = resize_and_crop(img)
                    cropped.save(out, format='WEBP', quality=85)
                    print(f"      Saved {out} successfully!", flush=True)
                    break
                except Exception as e:
                    print(f"      Download error: {e}", flush=True)
        if os.path.exists(f"src/images/do_uong/{drink['id']}.webp"):
            break
