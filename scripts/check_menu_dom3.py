import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('function menu()')
print(text[idx+3500:idx+4500])
