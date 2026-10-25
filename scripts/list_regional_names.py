import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

reg_idx = text.find('const REGIONAL_DATABASES = {')

# Extract ja, ko, zh, en
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
    print(f"\n==================== REGION: {region.upper()} ====================")
    for p_id, p_obj in r_data.items():
        dishes = p_obj.get('dishes', [])
        names = [d['name'] for d in dishes]
        print(f"[{p_id}] ({len(dishes)} dishes): {', '.join(names[:6])}...")
