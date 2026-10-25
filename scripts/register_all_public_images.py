import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Collect all files in src/images/regional
reg_files = []
for root, dirs, files in os.walk('src/images/regional'):
    for file in files:
        if file.endswith('.webp'):
            rel_path = os.path.relpath(os.path.join(root, file), 'src').replace('\\', '/')
            reg_files.append(rel_path)

reg_files.sort()
print(f"Total regional files to register: {len(reg_files)}")

# Check which ones are already in public_files.py
existing_chunk = content[content.find('PUBLIC_FILES = ('):content.find(')\n\ndef source_path')]
new_entries = []
for rf in reg_files:
    if f"'{rf}'" not in existing_chunk and f'"{rf}"' not in existing_chunk:
        new_entries.append(rf)

print(f"New files to add: {len(new_entries)}")

# Add new files before closing paren of PUBLIC_FILES
insert_str = "".join(f"    '{f}',\n" for f in new_entries)
insert_pos = content.find(')\n\ndef source_path')
content = content[:insert_pos] + insert_str + content[insert_pos:]

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("scripts/public_files.py updated with all regional image assets!")
