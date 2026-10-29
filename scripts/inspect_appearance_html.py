import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('appearance-options')
if pos != -1:
    print(text[pos-100:pos+500])
