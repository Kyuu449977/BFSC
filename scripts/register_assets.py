import os

new_files = [f'images/regional/{f}' for f in sorted(os.listdir('src/images/regional')) if f.endswith('.webp')]
print(f'Adding {len(new_files)} regional image files to public_files.py and sw.js')

# Update scripts/public_files.py
with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    pf_text = f.read()

for nf in new_files:
    entry = f"    '{nf}',\n"
    if nf not in pf_text:
        idx = pf_text.rfind(')')
        pf_text = pf_text[:idx] + entry + pf_text[idx:]

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(pf_text)

# Update src/sw.js
with open('src/sw.js', 'r', encoding='utf-8') as f:
    sw_text = f.read()

for nf in new_files:
    entry = f"  './{nf}',\n"
    if nf not in sw_text:
        idx = sw_text.rfind('];')
        sw_text = sw_text[:idx] + entry + sw_text[idx:]

with open('src/sw.js', 'w', encoding='utf-8') as f:
    f.write(sw_text)

print('Successfully updated public_files.py and sw.js!')
