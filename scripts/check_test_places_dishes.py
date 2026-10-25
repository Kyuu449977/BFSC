with open('tests/test_places.py', 'r', encoding='utf-8') as f:
    text = f.read()

for l in text.splitlines():
    if 'dish' in l.lower() or 'search' in l.lower():
        print(l)
