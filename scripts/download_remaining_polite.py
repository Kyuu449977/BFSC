import urllib.request, urllib.parse, json, os, io, sys, re, time
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_download_specs.json', 'r', encoding='utf-8') as f:
    dish_specs = json.load(f)

headers = {'User-Agent': 'BestFoodAppBot/2.0 (https://github.com/phamp/BFSC; info@foodpreview.app)'}

def resize_and_crop(img, target_size=(640, 480)):
    target_w, target_h = target_size
    img_w, img_h = img.size
    scale = max(target_w / img_w, target_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)
    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    right = left + target_w
    bottom = top + target_h
    return img_resized.crop((left, top, right, bottom))

def get_image_url(lang, query):
    if not query:
        return None, None
    clean_q = re.sub(r'\(.*?\)|（.*?）', '', query).strip()
    
    # 1. Summary
    try:
        url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(clean_q)}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img = data.get('thumbnail', {}).get('source') or data.get('originalimage', {}).get('source')
            if img:
                return img, data.get('title')
    except urllib.error.HTTPError as e:
        if e.code == 429:
            time.sleep(3)
    except Exception:
        pass

    # 2. Search
    try:
        s_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(clean_q)}&format=json"
        req = urllib.request.Request(s_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            for r in results[:2]:
                top_title = r['title']
                sub_url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(top_title)}"
                sub_req = urllib.request.Request(sub_url, headers=headers)
                try:
                    with urllib.request.urlopen(sub_req, timeout=10) as sub_resp:
                        sub_data = json.loads(sub_resp.read().decode('utf-8'))
                        img = sub_data.get('thumbnail', {}).get('source') or sub_data.get('originalimage', {}).get('source')
                        if img:
                            return img, top_title
                except Exception:
                    pass
    except urllib.error.HTTPError as e:
        if e.code == 429:
            time.sleep(3)
    except Exception:
        pass

    # 3. Commons search
    try:
        c_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(clean_q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url"
        req = urllib.request.Request(c_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                img_url = ii.get('url', '')
                if img_url and any(title.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    return img_url, title
    except urllib.error.HTTPError as e:
        if e.code == 429:
            time.sleep(3)
    except Exception:
        pass

    return None, None

remaining = []
for spec in dish_specs:
    out_file = f"src/images/regional/{spec['region']}/{spec['id']}.webp"
    if not os.path.exists(out_file) or os.path.getsize(out_file) < 2048:
        remaining.append(spec)

print(f"Total remaining dishes to download: {len(remaining)} / {len(dish_specs)}")

saved_count = 0
fail_count = 0

for i, spec in enumerate(remaining):
    did = spec['id']
    region = spec['region']
    queries = spec['queries']
    out_file = f"src/images/regional/{region}/{did}.webp"
    
    img_url = None
    title = None
    for lang, q in queries:
        img_url, title = get_image_url(lang, q)
        if img_url:
            break
        # also try 'en' search with the query
        if lang != 'en':
            img_url, title = get_image_url('en', q)
            if img_url:
                break
                
    if not img_url:
        print(f"[{i+1}/{len(remaining)}] FAILED: {did} ({spec['name']})")
        fail_count += 1
        time.sleep(0.3)
        continue
        
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read()
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        cropped = resize_and_crop(im, (640, 480))
        cropped.save(out_file, 'WEBP', quality=80)
        saved_count += 1
        print(f"[{i+1}/{len(remaining)}] SAVED: {out_file} ({title})")
    except urllib.error.HTTPError as e:
        if e.code == 429:
            print("Rate limit 429, sleeping 5s...")
            time.sleep(5)
        fail_count += 1
    except Exception as e:
        print(f"[{i+1}/{len(remaining)}] ERROR: {did} - {e}")
        fail_count += 1
        
    time.sleep(0.2)

print(f"\nFinished run: {saved_count} saved, {fail_count} failed.")
