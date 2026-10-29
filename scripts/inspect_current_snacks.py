import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('snacks: {')
end = text.find('drinks: {')
snacks_chunk = text[start:end]
names = re.findall(r"name:\s*'([^']+)'", snacks_chunk)
print(f'Total names found in snacks: {len(names)}')
for i, name in enumerate(names):
    print(f'{i+1}. {name}')
