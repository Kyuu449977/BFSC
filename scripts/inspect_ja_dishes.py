import sys
import json

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# let's parse the json block in data.js
start_reg = text.find('const REGIONAL_DATABASES = {')
if start_reg != -1:
    end_reg = text.find('\nif (typeof window', start_reg)
    chunk = text[start_reg + len('const REGIONAL_DATABASES = '):end_reg].strip()
    if chunk.endswith(';'): chunk = chunk[:-1]
    db = json.loads(chunk)
    ja_dishes = []
    for meal, m_data in db.get('ja', {}).items():
        for d in m_data.get('dishes', []):
            ja_dishes.append((d['id'], d['name'], d.get('image', '')))
    print(f"Total ja dishes: {len(ja_dishes)}")
    for did, dname, dimg in ja_dishes[:20]:
        print(f"{did}: {dname} -> {dimg}")
