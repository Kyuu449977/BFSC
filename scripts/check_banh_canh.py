with open('src/js/data.js', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'\{\s*id:\s*[\'\"]sv_lunch_banh_canh[\'\"].*?\}', text, re.DOTALL)
if m:
    print(m.group(0))
else:
    print('Not found')
