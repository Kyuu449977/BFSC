import re
import sys
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all dish definitions: id, name, image
dishes = []
pattern = r"{\s*id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"][^}]*?image:\s*['\"]([^'\"]+)['\"]"
for m in re.finditer(pattern, text):
    dishes.append({
        'id': m.group(1),
        'name': m.group(2),
        'image': m.group(3)
    })

print(f"Total dishes found by pattern: {len(dishes)}")

# Count image frequencies
image_counts = Counter(d['image'] for d in dishes)
print("\nTop 20 most reused images:")
for img, count in image_counts.most_common(20):
    print(f"  {img}: {count} dishes")

# List dishes reusing images more than once
print("\nExamples of mismatched or reused images:")
for img, count in image_counts.items():
    if count > 1:
        reused_dishes = [d['name'] for d in dishes if d['image'] == img]
        print(f"\nImage '{img}' is used for {count} dishes: {reused_dishes[:8]}...")
