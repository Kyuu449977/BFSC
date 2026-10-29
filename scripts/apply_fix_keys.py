with open('scripts/download_and_deploy_73_drinks.py', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"nuoc_tra_vai":', '"nuoc_tra_vai_lai":')
text = text.replace('"nuoc_tra_oi_hong_chia":', '"nuoc_tra_oi_hong_hat_chia":')
text = text.replace('"nuoc_matcha_macchiato":', '"nuoc_matcha_kem_cheese":')
text = text.replace('def get_file_thumb(file_title):', 'def get_file_thumb(file_title):\n    if not file_title: return None, None, None, None, None')

with open('scripts/download_and_deploy_73_drinks.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated download_and_deploy_73_drinks.py successfully.')
