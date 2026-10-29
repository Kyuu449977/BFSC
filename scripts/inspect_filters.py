import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'(<div[^>]*class=["\'][^"\']*filters[^"\']*["\'][^>]*>[\s\S]*?</div>\s*</div>)', text)
if m:
    print(m.group(0)[:600])
else:
    # search for filter buttons
    btns = re.findall(r'<button[^>]*data-filter=[^>]*>.*?</button>', text)
    print("Filter buttons found:", btns)
