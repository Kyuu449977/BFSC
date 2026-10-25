with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('REGIONAL_DATABASES')
print(text[idx:idx+500])
