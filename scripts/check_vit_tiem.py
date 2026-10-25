with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('toi_mi_vit_tiem')
if idx != -1:
    print(text[idx-30:idx+400])
