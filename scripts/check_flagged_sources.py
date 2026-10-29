import sys
import json

sys.stdout.reconfigure(encoding='utf-8')
with open('src/images/sources.json', 'r', encoding='utf-8') as f:
    sources = json.load(f)

for k in ['nuoc_ep_oi', 'nuoc_tra_oi_hong_hat_chia', 'nuoc_tra_vai_lai', 'nuoc_revive', 'nuoc_sinh_to_xoai']:
    print(k, sources.get(k))
