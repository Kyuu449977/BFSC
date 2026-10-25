import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search DISH_TRANSLATIONS
for prefix in ['ja_', 'ko_', 'zh_', 'en_']:
    matches = re.findall(rf"({prefix}[a-z_0-9]+):\s*\{{.*?\"vi\":\s*\{{\"name\":\s*\"([^\"]+)\"", text)
    print(f"\n=== Translations for {prefix} ({len(matches)} items) ===")
    names = [m[1] for m in matches]
    # check duplicates
    from collections import Counter
    c = Counter(names)
    for name, cnt in c.items():
        if cnt > 1:
            print(f"  DUPLICATE VIETNAMESE NAME in {prefix}: {name} (x{cnt})")
    for m in matches[:10]:
        print(f"  [{m[0]}] {m[1]}")
