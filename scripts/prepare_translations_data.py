import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
data = json.load(open('outputs/dishes_catalog.json', encoding='utf-8'))

# Print out dishes with IDs and desc
for d in data:
    print(f"ID: {d['id']}")
    print(f"Name: {d['name']}")
    print(f"Desc: {d['desc']}")
    print("-" * 40)
