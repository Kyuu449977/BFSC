import sys

sys.stdout.reconfigure(encoding='utf-8')

for p in ['tests/test_places.py', 'tests/test_places_budget.py', 'tests/test_public_security.py', 'tests/test_server.py']:
    with open(p, 'r', encoding='utf-8') as f:
        text = f.read()
    print(f"=== {p} ===")
    for l in text.splitlines()[:15]:
        print(" ", l)
