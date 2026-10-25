import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('const REGIONAL_DATABASES')
sub = text[idx:]

# Parse out each region
regions = ['ja', 'ko', 'zh', 'en']
for i, r in enumerate(regions):
    r_start = sub.find(f"\n  {r}: {{")
    r_end = sub.find(f"\n  {regions[i+1]}: {{" if i+1 < len(regions) else "\n};", r_start)
    block = sub[r_start:r_end]
    print(f"==================== REGION: {r} ====================")
    meals = ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks']
    for m in meals:
        m_start = block.find(f"{m}: {{")
        if m_start == -1:
            continue
        m_next = len(block)
        for m2 in meals:
            p = block.find(f"{m2}: {{", m_start + 10)
            if p != -1 and p < m_next:
                m_next = p
        m_block = block[m_start:m_next]
        dishes = re.findall(r"id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?price:\s*([0-9]+)", m_block, re.DOTALL)
        print(f"  [{m}] ({len(dishes)} dishes):")
        for d in dishes:
            print(f"    - {d[0]}: {d[1]} ({d[2]})")
