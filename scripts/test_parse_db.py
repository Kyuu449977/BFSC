import json
import re
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Read data.js
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# We can parse REGIONAL_DATABASES directly from JSON if formatted as JSON
# Let's inspect where REGIONAL_DATABASES starts
reg_idx = text.find('const REGIONAL_DATABASES = {')
if reg_idx != -1:
    # Let's extract ja, ko, zh, en from REGIONAL_DATABASES
    for region in ['ja', 'ko', 'zh', 'en']:
        r_start = text.find(f'{region}:', reg_idx)
        if r_start != -1:
            # find opening brace
            b_start = text.find('{', r_start)
            # count braces
            count = 0
            b_end = b_start
            for i in range(b_start, len(text)):
                if text[i] == '{':
                    count += 1
                elif text[i] == '}':
                    count -= 1
                    if count == 0:
                        b_end = i + 1
                        break
            r_json_str = text[b_start:b_end]
            try:
                r_data = json.loads(r_json_str)
                total = sum(len(m.get('dishes', [])) for m in r_data.values())
                print(f"Region {region}: successfully parsed {total} dishes across {len(r_data)} periods")
            except Exception as e:
                print(f"Region {region} parse error: {e}")

# Also let's extract all dishes from FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]
# Extract all dish names in FOOD_DATABASE
vn_dish_names = re.findall(r"name:\s*'([^']+)'", fd_str)
print(f"FOOD_DATABASE (Vietnam): {len(vn_dish_names)} dish names found")
