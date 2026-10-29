import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

# Find all files in src/
all_src_files = []
for root, dirs, files in os.walk('src'):
    for f in files:
        full_path = os.path.join(root, f)
        rel_path = os.path.relpath(full_path, 'src').replace('\\', '/')
        all_src_files.append(rel_path)

all_src_files.sort()

content = '"""Explicit publish allowlist. Never serve the development checkout directly."""\nPUBLIC_FILES = (\n'
for f in all_src_files:
    content += f"    '{f}',\n"
content += ')\n'

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully updated scripts/public_files.py with {len(all_src_files)} files!")
