import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print('Searching for modes / category buttons:')
for m in re.finditer(r'<div class="[^"]*mode[^"]*"[\s\S]*?</div>', html):
    print(m.group(0)[:500])

print('Searching for "Món chính" or "Buổi Sáng":')
for line in html.splitlines():
    if any(k in line for k in ['Món chính', 'món chính', 'Buổi Sáng', 'Buổi Trưa', 'customWheel', 'giá tham khảo']):
        print(line[:120])
