with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix unescaped single quotes inside single-quoted strings
text = text.replace("shepherd's pie", "shepherd\\'s pie")
text = text.replace("What's for", "What\\'s for")

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes in data.js')
