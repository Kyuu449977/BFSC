import urllib.request, urllib.parse, json, os, io, sys, re, time
from PIL import Image
import concurrent.futures

sys.stdout.reconfigure(encoding='utf-8')

# Ensure directories exist
for r in ['vi', 'ja', 'ko', 'zh', 'en']:
    os.makedirs(f'src/images/regional/{r}', exist_ok=True)

headers = {'User-Agent': 'FoodApp/1.0 (contact: info@foodapp.local)'}

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

def get_image_url_for_query(lang, query):
    if not query:
        return None, None
    clean_q = re.sub(r'\(.*?\)|（.*?）', '', query).strip()
    
    # 1. Direct Wikipedia summary
    try:
        url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(clean_q)}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img = data.get('thumbnail', {}).get('source') or data.get('originalimage', {}).get('source')
            if img:
                return img, data.get('title')
    except Exception:
        pass

    # 2. Wikipedia search API
    try:
        s_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(clean_q)}&format=json"
        req = urllib.request.Request(s_url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = data.get('query', {}).get('search', [])
            for r in results[:2]:
                top_title = r['title']
                sub_url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(top_title)}"
                sub_req = urllib.request.Request(sub_url, headers=headers)
                try:
                    with urllib.request.urlopen(sub_req, timeout=8) as sub_resp:
                        sub_data = json.loads(sub_resp.read().decode('utf-8'))
                        img = sub_data.get('thumbnail', {}).get('source') or sub_data.get('originalimage', {}).get('source')
                        if img:
                            return img, top_title
                except Exception:
                    pass
    except Exception:
        pass

    # 3. Wikimedia Commons search
    try:
        c_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(clean_q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url"
        req = urllib.request.Request(c_url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                title = p.get('title', '')
                ii = p.get('imageinfo', [{}])[0]
                img_url = ii.get('url', '')
                if img_url and any(title.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    return img_url, title
    except Exception:
        pass

    return None, None

def fetch_dish_image(dish_spec):
    region = dish_spec['region']
    dish_id = dish_spec['id']
    queries = dish_spec['queries']
    out_file = f"src/images/regional/{region}/{dish_id}.webp"
    
    # If already exists and size > 2KB, skip download
    if os.path.exists(out_file) and os.path.getsize(out_file) > 2048:
        return dish_id, True, f"Existing {out_file}"
        
    img_url = None
    title = None
    for lang, q in queries:
        img_url, title = get_image_url_for_query(lang, q)
        if img_url:
            break
            
    if not img_url:
        return dish_id, False, f"Failed to find image for {dish_id} ({queries})"
        
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read()
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        cropped = resize_and_crop(im, (640, 480))
        cropped.save(out_file, 'WEBP', quality=82)
        return dish_id, True, f"Saved {out_file} ({title})"
    except Exception as e:
        return dish_id, False, f"Error saving {dish_id}: {e}"

print("Script template ready!")
