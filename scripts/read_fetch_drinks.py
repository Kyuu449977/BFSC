import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/fetch_real_online_drinks.py', 'r', encoding='utf-8') as f:
    print(f.read()[:1000])
