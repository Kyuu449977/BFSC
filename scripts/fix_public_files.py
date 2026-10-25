import os
import re

with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    text = f.read()

new_files = [f'images/regional/{f}' for f in sorted(os.listdir('src/images/regional')) if f.endswith('.webp')]

# Reset STYLE_SOURCES
text = re.sub(r"'themes\.css'[\s\S]*?\)", "'themes.css'\n)", text)

# Insert into PUBLIC_FILES
target = "    'ui.js',\n"
replacement = "    'ui.js',\n" + "".join(f"    '{nf}',\n" for nf in new_files)
text = text.replace(target, replacement)

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Cleaned up scripts/public_files.py')
