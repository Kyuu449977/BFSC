import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'drinks:\s*\{(.*?)\n  \},', text, re.DOTALL)
if m:
    section = m.group(1)
    dishes = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"].*?name:\s*[\'"]([^\'"]+)[\'"]', section, re.DOTALL)
    print(f'Total drinks currently in data.js: {len(dishes)}')
    for did, name in dishes:
        print(f" - {did}: {name}")
