with open('scripts/verify_images_live.py', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('async def verify_region')
if idx != -1:
    print(text[idx:idx+1200])
else:
    print(text[800:2000])
