import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('const REGIONAL_DATABASES')
sub = text[idx:]

for r in ['ja', 'ko', 'zh', 'en']:
    r_idx = sub.find(f"{r}: {{")
    next_r = sub.find(f"\n  ", r_idx + 20)
    print(f"*** REGION {r} ***")
    block = sub[r_idx:r_idx+12000]
    dish_names = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", block)
    print("Found names:", len(dish_names))
    print(dish_names[:25])
