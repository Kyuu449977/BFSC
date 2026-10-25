import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Collect all files in src/images/regional that actually exist
reg_files = []
for root, dirs, files in os.walk('src/images/regional'):
    for file in files:
        if file.endswith('.webp'):
            rel = os.path.relpath(os.path.join(root, file), 'src').replace('\\', '/')
            if os.path.exists(os.path.join('src', rel)):
                reg_files.append(rel)

reg_files.sort()
print(f"Adding {len(reg_files)} verified existing regional files to PUBLIC_FILES")

insert_str = "".join(f"    '{f}',\n" for f in reg_files)
target = ")\n\n\ndef source_path(root, public_name):"
if target in content:
    content = content.replace(target, insert_str + target)
    with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated scripts/public_files.py!")
else:
    print("Target not found!")
