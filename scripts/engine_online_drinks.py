import sys, os, time, json, io, urllib.request, urllib.parse, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'BestFoodAppBot/4.0 (https://github.com/phamp/BFSC; food education open web project)'
}

BAD_KEYWORDS = [
    'pdf', 'djvu', 'svg', 'monument', 'statue', 'building', 'architecture',
    'actor', 'actress', 'interview', 'portrait', 'people', 'person', 'man', 'men', 'woman',
    'band', 'concert', 'album', 't-shirt', 'anime', 'manga', 'drawing', 'illustration',
    'map', 'diagram', 'car', 'bus', 'train', 'station', 'fauna', 'specimen', 'street'
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
            time.sleep(3)
    return None, None, None, None

def search_commons_files(query):
    if query.startswith('File:') or any(query.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']):
        return [query]
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json&srlimit=8"
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
            time.sleep(3)
    return candidates

print("Engine helper loaded.")
