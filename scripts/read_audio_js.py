import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/audio.js', encoding='utf-8') as f:
    text = f.read()

print(text)
