import re

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find dish objects
pattern = re.compile(r'{\s*id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*category:\s*["\']([^"\']+)["\'],\s*image:\s*["\']([^"\']+)["\']')

matches = pattern.findall(content)
print(f"Total dishes found: {len(matches)}")
for d_id, name, cat, img in matches:
    if 'regional/ja' in img:
        print(f"{d_id} | {name} | {img}")
