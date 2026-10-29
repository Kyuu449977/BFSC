import sys
import json

sys.stdout.reconfigure(encoding='utf-8')
with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

for k, v in sources.items():
    if k.startswith('nuoc_'):
        t = v.get('title', '')
        # check keywords
        if any(w in t.lower() for w in ['drink', 'drinker', 'vendor', 'people', 'person', 'woman', 'man', 'boy', 'girl', 'holding', 'pours', 'pours fresh fruit', 'market stall', 'market']):
            print(f"{k} => {t}")
