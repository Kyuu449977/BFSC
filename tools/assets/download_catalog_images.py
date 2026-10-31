"""Download exact-name image-search selections; preserve source URLs, not license claims."""
import concurrent.futures
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'artifacts' / 'performance'

def download(record):
    for candidate in record['candidates']:
        try:
            with urlopen(Request(candidate['imageUrl'], headers={'User-Agent':'Mozilla/5.0'}), timeout=12) as response:
                data = response.read(12_000_001)
            if len(data) > 12_000_000:
                continue
            image = Image.open(io.BytesIO(data))
            if min(image.size) < 120:
                continue
            image = ImageOps.exif_transpose(image).convert('RGB')
            image.thumbnail((640,640))
            file = 'images/catalog-20261031/' + record['id'] + '.webp'
            target = ROOT / 'src' / file
            target.parent.mkdir(parents=True, exist_ok=True)
            image.save(target, 'WEBP', quality=78, method=4)
            result = {**record, **candidate, 'file':file, 'licenseVerified':False, 'userApproved':True}
            result.pop('candidates')
            (OUT / ('image-source-' + record['id'] + '.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
            print('OK', record['id'], flush=True)
            return result
        except Exception:
            continue
    print('FAILED',record['id'],flush=True)
    return {'id':record['id'],'error':'No downloadable search image'}

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((ROOT / 'docs/reports/catalog-2026-10-31.json').read_text(encoding='utf-8'))
    records = [{'id':row['dish']['id'], 'name':row['dish']['name'], 'candidates':[row['image']]} for row in manifest['entries']]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(download,records))
    (OUT / 'pdf-image-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Downloaded',sum('file' in r for r in results),'/',len(results))
