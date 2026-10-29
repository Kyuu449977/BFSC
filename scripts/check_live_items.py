import json, re

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# Check drink images in data.js
suspect_keys = [
    'nuoc_ep_oi',
    'nuoc_sinh_to_xoai',
    'nuoc_tra_oi_hong_hat_chia',
    'nuoc_tra_vai_lai',
    'nuoc_revive'
]

print("=== CHECK DRINK IMAGES IN data.js ===")
for key in suspect_keys:
    matches = re.findall(rf'"{key}"[\s\S]*?image:\s*["\']([^"\']+)["\']', data_content)
    if not matches:
        matches = re.findall(rf'id:\s*"{key}"[\s\S]*?image:\s*["\']([^"\']+)["\']', data_content)
    print(f"{key}: {matches}")
