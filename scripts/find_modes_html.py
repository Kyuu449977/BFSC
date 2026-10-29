with open('src/index.html', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<div[^>]*class="[^"]*mode[^"]*"[^>]*>[\s\S]*?</div>', text)
print("Modes:", matches)

matches2 = re.findall(r'<nav[^>]*>[\s\S]*?</nav>', text)
for m in matches2:
    print("Nav:", m[:120])
