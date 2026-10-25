# Test what engine.getAllDishesList() outputs
import re
import json

with open('src/js/data.js', encoding='utf-8') as f:
    data_text = f.read()

# Let's check how FOOD_DATABASE is declared
print('FOOD_DATABASE starts:', data_text[:200])

# Let's check in gacha.js
with open('src/js/gacha.js', encoding='utf-8') as f:
    gacha_text = f.read()

print('gacha getAllDishesList snippet:')
m = re.search(r'getAllDishesList\(\)\s*\{[\s\S]*?\}', gacha_text)
if m:
    print(m.group(0))
