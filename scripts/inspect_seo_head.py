import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

m_desc = re.search(r'name="description"\s+content="([^"]+)"', text)
if m_desc:
    print('Description:', m_desc.group(1))

m_kw = re.search(r'name="keywords"\s+content="([^"]+)"', text)
if m_kw:
    print('\nKeywords:', m_kw.group(1))

m_ld = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', text)
if m_ld:
    print('\nJSON-LD:', m_ld.group(1))
