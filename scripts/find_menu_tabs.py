import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', encoding='utf-8') as f:
    text = f.read()

m = re.findall(r'<div class="[^"]*menu-filter[^"]*"[\s\S]*?</div>', text)
if m:
    print("Found menu-filter:", m[0][:400])
else:
    for line in text.split('\n'):
        if 'Buổi Sáng' in line or 'Đồ Uống' in line:
            print(line.strip())
