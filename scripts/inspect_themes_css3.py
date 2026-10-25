import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
for i, l in enumerate(lines[250:]):
    print(f"{i+251}: {l}")
