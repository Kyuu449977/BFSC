import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    text = f.read()

# show last 30 lines
lines = text.splitlines()
for l in lines[-35:]:
    print(l)
