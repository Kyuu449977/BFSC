import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', encoding='utf-8') as f:
    text = f.read()

for d in ['tamago', 'natto', 'asari', 'salmon', 'tkg', 'ogura', 'sando']:
    matches = re.findall(rf'id:\s*[\'"]([^\'"]*{d}[^\'"]*)[\'"].*?image:\s*[\'"]([^\'"]+)[\'"]', text, re.IGNORECASE | re.DOTALL)
    for m in matches:
        print(f'{m[0]} -> {m[1]}')
