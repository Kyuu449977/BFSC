import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for orange, theme, dark, etc.
lines = text.splitlines()
for i, l in enumerate(lines[:120]):
    print(f"{i+1}: {l}")
