import sys, os, time, json, io, urllib.request, urllib.parse, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scripts'))

from curated_queries_ja import JA_QUERIES
from curated_queries_ko import KO_QUERIES
from curated_queries_zh import ZH_QUERIES
from curated_queries_en import EN_QUERIES
from curated_queries_vi import VI_QUERIES

headers = {
    'User-Agent': 'BestFoodAppBot/3.0 (https://github.com/phamp/BFSC; food education application)'
}

BAD_KEYWORDS = [
    'tomb', 'cemetery', 'grave', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    't-shirt', 'anime', 'manga', 'drawing', 'illustration', 'vector', 'logo', 'map', 'diagram',
    'street', 'road', 'conference', 'festival', 'parade', 'car', 'bus', 'train', 'station',
    'fauna', 'specimen', 'taxidermy', 'ichthyology', 'wildlife', 'macro', 'micro', 'signboard',
    'interior', 'room', 'auditorium', 'stage', 'banner', 'poster'
]

def resize_and_crop(img, target_size=(640, 480)):
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
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

def get_file_info(file_title):
    clean_title = file_title if file_title.startswith('File:') else f"File:{file_title}"
    url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_title)}&prop=imageinfo&iiprop=url|user|extmetadata&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                if 'imageinfo' in p and p['imageinfo']:
                    info = p['imageinfo'][0]
                    img_url = info.get('url')
                    user = info.get('user', 'Wikimedia Commons Contributor')
                    meta = info.get('extmetadata', {})
                    artist = meta.get('Artist', {}).get('value', user)
                    artist = re.sub(r'<[^>]+>', '', artist).strip() or user
                    license_str = meta.get('LicenseShortName', {}).get('value', 'CC BY-SA')
                    return img_url, clean_title, artist, license_str
    except Exception as e:
        if '429' in str(e):
            time.sleep(4)
    return None, None, None, None

def search_commons_files(query):
    # Check if direct file title
    if query.startswith('File:') or any(query.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']):
        return [query]
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=10"
    req = urllib.request.Request(url, headers=headers)
    candidates = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for r in data.get('query', {}).get('search', []):
                title = r['title']
                lower = title.lower()
                if not any(ext in lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    continue
                if any(bad in lower for bad in BAD_KEYWORDS):
                    continue
                candidates.append(title)
    except Exception as e:
        if '429' in str(e):
            time.sleep(4)
    return candidates

def download_and_save(dish_id, queries, dest_path):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    for q in queries:
        candidates = search_commons_files(q)
        time.sleep(0.15)
        for cand in candidates:
            img_url, file_title, artist, license_str = get_file_info(cand)
            time.sleep(0.15)
            if not img_url:
                continue
            # Download image bytes
            try:
                dl_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(dl_req, timeout=15) as dl_resp:
                    raw_bytes = dl_resp.read()
                    if len(raw_bytes) < 4096:
                        continue
                    img = Image.open(io.BytesIO(raw_bytes))
                    if img.width < 150 or img.height < 150:
                        continue
                    # Crop & resize to 640x480
                    processed = resize_and_crop(img, (640, 480))
                    processed.save(dest_path, format='WEBP', quality=82)
                    print(f"[{dish_id}] SAVED -> {file_title} ({img.width}x{img.height}) -> {dest_path}")
                    return {
                        'dish_id': dish_id,
                        'file_title': file_title,
                        'artist': artist,
                        'license': license_str,
                        'url': img_url,
                        'dest': dest_path
                    }
            except Exception as e:
                if '429' in str(e):
                    time.sleep(4)
                continue
    print(f"[{dish_id}] FAILED to find suitable food photo from queries: {queries}")
    return None

def build_all_tasks():
    with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
        all_dishes = json.load(f)
    vi_map = {d['id']: d['image'] for d in all_dishes['vi']}
    
    tasks = []
    # 1. JA
    for dish_id, queries in JA_QUERIES.items():
        tasks.append((dish_id, queries, f"src/images/regional/ja/{dish_id}.webp"))
    # 2. KO
    for dish_id, queries in KO_QUERIES.items():
        tasks.append((dish_id, queries, f"src/images/regional/ko/{dish_id}.webp"))
    # 3. ZH
    for dish_id, queries in ZH_QUERIES.items():
        tasks.append((dish_id, queries, f"src/images/regional/zh/{dish_id}.webp"))
    # 4. EN
    for dish_id, queries in EN_QUERIES.items():
        tasks.append((dish_id, queries, f"src/images/regional/en/{dish_id}.webp"))
    # 5. VI
    for dish_id, queries in VI_QUERIES.items():
        rel_path = vi_map.get(dish_id)
        if rel_path:
            tasks.append((dish_id, queries, f"src/{rel_path}"))
            
    return tasks

if __name__ == '__main__':
    all_tasks = build_all_tasks()
    print(f"Starting master download for {len(all_tasks)} dishes...")
    results = {}
    success_count = 0
    fail_count = 0
    
    for idx, (dish_id, queries, dest_path) in enumerate(all_tasks, 1):
        print(f"\n({idx}/{len(all_tasks)}) Processing {dish_id}...")
        meta = download_and_save(dish_id, queries, dest_path)
        if meta:
            results[dish_id] = meta
            success_count += 1
        else:
            fail_count += 1
            
    with open('scripts/master_downloaded_meta.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"\n==========================================")
    print(f"COMPLETE: {success_count} success, {fail_count} failed out of {len(all_tasks)}")
    print(f"==========================================")
