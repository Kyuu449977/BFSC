import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/drinks_def.json', encoding='utf-8') as f:
    items = json.load(f)

for i, it in enumerate(items):
    print(f"{i+1:02d}. {it['id']:<28} | {it['name']:<32} | {it['filter']:<16} | queries={it['queries']}")
