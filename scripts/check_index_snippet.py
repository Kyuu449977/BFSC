import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('class="theme-options"')
print(text[idx-50:idx+450])
