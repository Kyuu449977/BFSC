import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

terms = ['Nước Ép Ổi', 'Sinh Tố Xoài', 'Trà Vải', 'Revive', 'Trà Ổi Hồng']
for term in terms:
    pos = text.find(term)
    if pos != -1:
        start = max(0, pos - 200)
        end = min(len(text), pos + 400)
        snippet = text[start:end]
        print(f"=== Found '{term}' ===")
        print(snippet)
        print("-" * 50)
    else:
        print(f"NOT found: '{term}'")
