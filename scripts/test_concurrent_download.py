import urllib.request, urllib.parse, json, os, io, sys
from PIL import Image
import concurrent.futures

sys.stdout.reconfigure(encoding='utf-8')

test_items = [
    ('ja', 'ja_m_1', '卵かけご飯', 'Tamago kake gohan'),
    ('ko', 'ko_a_6', '보쌈', 'Bossam'),
    ('zh', 'zh_a_9', '老北京炸酱面', 'Zhajiangmian'),
    ('en', 'en_l_8', 'Spaghetti bolognese', 'Bolognese sauce'),
    ('vi', 'vi_che_suong_sa', 'Chè sương sa hạt lựu', 'Chè hạt lựu')
]

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

def fetch_and_save(item):
    lang, did, native_q, fallback_q = item
    queries = [native_q, fallback_q]
    img_url = None
    title = None
    
    for q in queries:
        if not q: continue
        # 1. Direct summary
        try:
            url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(q)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                img_url = data.get('thumbnail', {}).get('source') or data.get('originalimage', {}).get('source')
                if img_url:
                    title = data.get('title')
                    break
        except Exception:
            pass
        
        # 2. Search
        try:
            s_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&format=json"
            req = urllib.request.Request(s_url, headers=headers)
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                results = data.get('query', {}).get('search', [])
                if results:
                    top_title = results[0]['title']
                    s_url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(top_title)}"
                    s_req = urllib.request.Request(s_url, headers=headers)
                    with urllib.request.urlopen(s_req, timeout=8) as s_resp:
                        s_data = json.loads(s_resp.read().decode('utf-8'))
                        img_url = s_data.get('thumbnail', {}).get('source') or s_data.get('originalimage', {}).get('source')
                        if img_url:
                            title = top_title
                            break
        except Exception:
            pass

    if not img_url:
        return did, False, "No image found"

    try:
        img_req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(img_req, timeout=15) as resp:
            raw = resp.read()
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        cropped = resize_and_crop(im, (640, 480))
        out_path = f"src/images/regional/{lang}/{did}.webp"
        cropped.save(out_path, 'WEBP', quality=82)
        return did, True, f"Saved {out_path} ({title})"
    except Exception as e:
        return did, False, str(e)

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(fetch_and_save, test_items))

for r in results:
    print(r)
