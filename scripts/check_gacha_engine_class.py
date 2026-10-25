import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/gacha.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('class GachaEngine')
print(text[idx:idx+600])
