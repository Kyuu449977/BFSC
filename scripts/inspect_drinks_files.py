import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# find drinks: { dishes: [ ... ] }
start_drinks = text.find('drinks: {')
end_drinks = text.find('// 05.', start_drinks)
if end_drinks == -1: end_drinks = text.find('const REGIONAL', start_drinks)

chunk = text[start_drinks:end_drinks]
import re
dishes = re.findall(r"id:\s*'([^']+)',\s*name:\s*'([^']+)',.*?image:\s*'([^']+)'", chunk, re.DOTALL)
print(f"Total drinks: {len(dishes)}")
for did, dname, dimg in dishes:
    exists = os.path.exists(os.path.join('src', dimg.replace('/', os.sep)))
    size = os.path.getsize(os.path.join('src', dimg.replace('/', os.sep))) if exists else 0
    print(f"{did} | {dname} | {dimg} | exists={exists} | size={size}")
