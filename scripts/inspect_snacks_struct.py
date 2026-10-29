import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('snacks: {')
end = text.find('drinks: {', start)
print(text[start:start+1200])
