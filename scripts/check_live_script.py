import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/verify_images_live.py', 'r', encoding='utf-8') as f:
    text = f.read()

print(text[:800])
