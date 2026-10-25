with open('public/index.html', 'r', encoding='utf-8') as f:
    text_pub = f.read()

with open('src/index.html', 'r', encoding='utf-8') as f:
    text_src = f.read()

print('auto in public?', 'data-appearance-choice="auto"' in text_pub)
print('auto in src?', 'data-appearance-choice="auto"' in text_src)
print('customColor in public?', 'customThemeColor' in text_pub)
print('customColor in src?', 'customThemeColor' in text_src)
