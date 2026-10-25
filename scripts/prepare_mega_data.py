import re
import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_country = None
current_period = None
countries = {}

dish_pattern = r'^\s*\d+\.\s+\*\*([^*]+)\*\*\s+\|\s+\*([^*]+)\*\s+\|\s+([^|]+)\|\s*(.+)$'

for line in lines:
    line_s = line.strip()
    if line_s.startswith('### '):
        if 'NHẬT BẢN' in line_s:
            current_country = 'ja'
        elif 'HÀN QUỐC' in line_s:
            current_country = 'ko'
        elif 'TRUNG QUỐC' in line_s:
            current_country = 'zh'
        elif 'ÂU - MỸ' in line_s:
            current_country = 'en'
        elif 'VIỆT NAM' in line_s:
            current_country = 'vi'
        else:
            current_country = None
        if current_country and current_country not in countries:
            countries[current_country] = {}
        continue
    
    if line_s.startswith('#### '):
        if 'Morning' in line_s or 'Bữa Sáng' in line_s:
            current_period = 'morning'
        elif 'Lunch' in line_s or 'Bữa Trưa' in line_s:
            current_period = 'lunch'
        elif 'Afternoon' in line_s or 'Bữa Xế' in line_s:
            current_period = 'afternoon'
        elif 'Dinner' in line_s or 'Bữa Tối' in line_s:
            current_period = 'dinner'
        elif 'Snacks' in line_s or 'Đồ Ăn Vặt' in line_s or 'Ăn Vặt' in line_s or 'Tráng Miệng' in line_s:
            current_period = 'snacks'
        elif 'Drinks' in line_s or 'Đồ Uống' in line_s:
            current_period = 'drinks'
        else:
            current_period = None
        if current_country and current_period and current_period not in countries[current_country]:
            countries[current_country][current_period] = []
        continue

    m = re.match(dish_pattern, line_s)
    if m and current_country and current_period and current_country in countries:
        native_name = m.group(1).strip()
        vi_name = m.group(2).strip()
        price_str = m.group(3).strip()
        desc = m.group(4).strip()
        
        p_clean = re.sub(r'[^\d.]', '', price_str)
        price_val = float(p_clean) if '.' in p_clean else int(p_clean)
        
        countries[current_country][current_period].append({
            'native_name': native_name,
            'vi_name': vi_name,
            'price_str': price_str,
            'price': price_val,
            'desc': desc
        })

print("Parsed dishes summary:")
for c in ['ja', 'ko', 'zh', 'en']:
    print(f"Country {c}: {sum(len(d) for d in countries[c].values())} dishes across {len(countries[c])} periods")
