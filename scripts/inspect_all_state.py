import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print('=== 1. Maps Banner vs Header Logo ===')
banner_match = re.search(r'(<aside[^>]*class="[^"]*maps-banner[^"]*"[\s\S]*?</aside>)', html)
if banner_match:
    print('Found maps-banner in HTML! Length:', len(banner_match.group(0)))
else:
    print('maps-banner not found in HTML.')

header_match = re.search(r'<header[\s\S]*?</header>', html)
if header_match:
    header_html = header_match.group(0)
    print('Header buttons:')
    for b in re.findall(r'<button[^>]*>[\s\S]*?</button>', header_html):
        print('  Button:', b.replace('\n', ' '))

print('\n=== 2. Modes / Buổi vs Món chính ===')
modes_match = re.search(r'<div class="modes"[^>]*>[\s\S]*?</div>', html)
if modes_match:
    print(modes_match.group(0))

print('\n=== 3. Custom Wheel Dialog ===')
cw_match = re.search(r'<dialog id="customWheelDialog"[\s\S]*?</dialog>', html)
if cw_match:
    print(cw_match.group(0)[:1000])

print('\n=== 4. Universe Dialog ===')
u_match = re.search(r'<dialog id="universeDishDialog"[\s\S]*?</dialog>', html)
print('Universe dialog exists:', bool(u_match))
