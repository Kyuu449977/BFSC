import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('Ăn vặt')
print(text[pos-250:pos+250])
