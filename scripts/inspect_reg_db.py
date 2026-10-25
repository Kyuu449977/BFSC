import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('REGIONAL_DATABASES')
if idx != -1:
    print(text[idx:idx+2000])
