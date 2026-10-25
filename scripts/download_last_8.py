import urllib.request, urllib.parse, json, os, io, sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

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

targets = [
    ('ja', 'ja_a_8', '焼き芋'),
    ('ja', 'ja_d_8', '串かつ'),
    ('ko', 'ko_m_3', '전복죽'),
    ('ko', 'ko_a_4', '회오리감자'),
    ('ko', 'ko_d_7', '곱창'),
    ('ko', 'ko_dr_5', '유자차'),
    ('ko', 'ko_dr_6', '밀키스'),
    ('zh', 'zh_a_6', '烧饼')
]

for lang, did, title in targets:
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(title)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img_url = data.get('thumbnail', {}).get('source') or data.get('originalimage', {}).get('source')
            if img_url:
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                    raw = img_resp.read()
                im = Image.open(io.BytesIO(raw)).convert('RGB')
                cropped = resize_and_crop(im, (640, 480))
                out_path = f"src/images/regional/{lang}/{did}.webp"
                cropped.save(out_path, 'WEBP', quality=82)
                print(f"[SUCCESS] {did}: Saved {out_path} ({data.get('title')})")
            else:
                print(f"[FAIL] {did}: No image in summary for {title}")
    except Exception as e:
        print(f"[ERROR] {did}: {e}")
