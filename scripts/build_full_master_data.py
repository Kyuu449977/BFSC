# -*- coding: utf-8 -*-
"""
Builder for the 5-country regional food database and 2-way translations.
"""
import json
import re

# Load existing translations to preserve all 124 VN dishes
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# 1. Clean existing DISH_TRANSLATIONS (strip parentheses with Vietnamese text)
t_start = data_js.find('const DISH_TRANSLATIONS = {')
t_end = data_js.find(';\n\nconst CURRENCY_CONFIG', t_start)
if t_end == -1:
    t_end = data_js.find(';\nconst CURRENCY_CONFIG', t_start)

trans_raw = data_js[t_start + len('const DISH_TRANSLATIONS = '):t_end].strip()
# Convert JS object into JSON
try:
    existing_trans = json.loads(trans_raw)
except Exception:
    # If not strict JSON, evaluate safely
    import ast
    # Replace true/false/null
    cleaned = re.sub(r':\s*true', ': True', trans_raw)
    cleaned = re.sub(r':\s*false', ': False', cleaned)
    cleaned = re.sub(r':\s*null', ': None', cleaned)
    existing_trans = ast.literal_eval(cleaned)

print(f"Loaded {len(existing_trans)} existing dish translations.")

# Clean trailing parentheses with Vietnamese names in non-VN translations
cleaned_trans = {}
for dish_id, trans in existing_trans.items():
    cleaned_trans[dish_id] = {}
    for lang, val in trans.items():
        name = val.get('name', '')
        desc = val.get('desc', '')
        if lang != 'vi':
            # Remove trailing parentheses, e.g. "Crispy Vietnamese Pancake (Bánh Xèo)" -> "Crispy Vietnamese Pancake"
            name = re.sub(r'\s*\([^)]*[\u00C0-\u1EF9][^)]*\)$', '', name)
            name = re.sub(r'\s*\([A-ZÀ-Ỹa-zà-ỹ\s]+\)$', '', name).strip()
        cleaned_trans[dish_id][lang] = {'name': name, 'desc': desc}

print(f"Cleaned parentheses from non-VN languages for {len(cleaned_trans)} dishes.")
