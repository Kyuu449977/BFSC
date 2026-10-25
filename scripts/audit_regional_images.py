import json
import re
import sys
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

reg_idx = text.find('const REGIONAL_DATABASES = {')
for region in ['ja', 'ko', 'zh', 'en']:
    r_start = text.find(f'{region}:', reg_idx)
    b_start = text.find('{', r_start)
    count = 0
    b_end = b_start
    for i in range(b_start, len(text)):
        if text[i] == '{':
            count += 1
        elif text[i] == '}':
            count -= 1
            if count == 0:
                b_end = i + 1
                break
    r_data = json.loads(text[b_start:b_end])
    
    images = []
    for cat_k, cat in r_data.items():
        for d in cat['dishes']:
            images.append(d.get('image'))
            
    c = Counter(images)
    print(f"\nRegion: {region} ({len(images)} dishes total, {len(c)} distinct images):")
    for img, cnt in c.most_common(5):
        print(f"  {img}: {cnt} dishes")
