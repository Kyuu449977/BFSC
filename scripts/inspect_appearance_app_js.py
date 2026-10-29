import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('data-appearance-choice')
if pos != -1:
    print(text[pos-100:pos+500])
