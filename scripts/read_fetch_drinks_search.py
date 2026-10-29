import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/fetch_real_online_drinks.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for l in lines[30:100]:
    print(l.rstrip())
