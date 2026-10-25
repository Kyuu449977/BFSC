import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's split by country sections
sections = re.split(r'###\s+([^\n]+)', text)
countries = {}
current_country = None

country_map = {
    'ja': 'ja',
    'ko': 'ko',
    'zh': 'zh',
    'en': 'en',
    'vi': 'vi',
}

# The sections array alternates between title and content
for i in range(1, len(sections), 2):
    header = sections[i]
    content = sections[i+1]
    
    code = None
    if 'NHẬT BẢN' in header:
        code = 'ja'
    elif 'HÀN QUỐC' in header:
        code = 'ko'
    elif 'TRUNG QUỐC' in header:
        code = 'zh'
    elif 'ÂU - MỸ' in header:
        code = 'en'
    elif 'VIỆT NAM' in header:
        code = 'vi'
        
    if not code or code == 'vi':
        continue
        
    # Split content by meal periods (#### ...)
    period_blocks = re.split(r'####\s+([^\n]+)', content)
    periods = {}
    for j in range(1, len(period_blocks), 2):
        p_head = period_blocks[j]
        p_text = period_blocks[j+1]
        
        p_key = None
        if 'Morning' in p_head or 'Bữa Sáng' in p_head:
            p_key = 'morning'
        elif 'Lunch' in p_head or 'Bữa Trưa' in p_head:
            p_key = 'lunch'
        elif 'Afternoon' in p_head or 'Bữa Xế' in p_head:
            p_key = 'afternoon'
        elif 'Dinner' in p_head or 'Bữa Tối' in p_head:
            p_key = 'dinner'
        elif 'Snacks' in p_head or 'Đồ Ăn Vặt' in p_head or 'Bữa Đêm' in p_head or 'Tráng Miệng' in p_head:
            p_key = 'snacks'
        elif 'Drinks' in p_head or 'Đồ Uống' in p_head:
            p_key = 'drinks'
            
        dish_pattern = r'^\s*\d+\.\s+\*\*([^*]+)\*\*\s+\|\s+\*([^*]+)\*\s+\|\s+([^|]+)\|\s*(.+)$'
        dishes = []
        for line in p_text.splitlines():
            m = re.match(dish_pattern, line.strip())
            if m:
                native_name = m.group(1).strip()
                vi_name = m.group(2).strip()
                price_str = m.group(3).strip()
                desc = m.group(4).strip()
                
                # Parse numeric price
                price_num_str = re.sub(r'[^\d.]', '', price_str)
                price_num = float(price_num_str) if '.' in price_num_str else int(price_num_str)
                
                dishes.append({
                    'native_name': native_name,
                    'vi_name': vi_name,
                    'price_str': price_str,
                    'price': price_num,
                    'desc': desc
                })
        periods[p_key] = dishes
    countries[code] = periods

for c_code, c_periods in countries.items():
    total = sum(len(d) for d in c_periods.values())
    print(f"Country {c_code}: Total {total} dishes")
    for p_name, p_dishes in c_periods.items():
        print(f"  {p_name}: {len(p_dishes)} dishes")
