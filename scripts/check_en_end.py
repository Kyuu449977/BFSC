import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

reg_idx = text.find('const REGIONAL_DATABASES = {')
en_idx = text.find('en: {', reg_idx)
print('End of file from en_idx:')
print(text[en_idx+51000:])
