import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    text = f.read()

ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', text)
print(f"Total IDs found: {len(ids)}")
sample = [i for i in ids if 'ja' in i or 'jp' in i or 'japan' in i]
print(f"Sample Japan IDs: {sample[:20]}")
