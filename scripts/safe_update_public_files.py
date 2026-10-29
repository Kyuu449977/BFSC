import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Collect all files in src/
all_src_files = set()
for root, dirs, files in os.walk('src'):
    for file in files:
        full = os.path.join(root, file)
        rel = os.path.relpath(full, 'src').replace('\\', '/')
        # if in src/js/ and not sw.js, map to filename directly if needed or keep standard
        all_src_files.add(rel)

# Map js files to their public names as expected by public_files.py
public_names = set()
for rel in all_src_files:
    if rel.startswith('js/') and rel != 'sw.js':
        public_names.add(rel[3:]) # remove 'js/'
    elif rel.startswith('styles/'):
        # style.css is built from styles/
        continue
    else:
        public_names.add(rel)

public_names.add('style.css')
sorted_public = sorted(list(public_names))

tuple_body = 'PUBLIC_FILES = (\n' + '\n'.join(f"    '{p}'," for p in sorted_public) + '\n)\n'

idx_start = text.find('PUBLIC_FILES = (')
idx_end = text.find('\n)\n', idx_start) + len('\n)\n')

new_text = text[:idx_start] + tuple_body + text[idx_end:]

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(new_text)

print(f"Updated public_files.py with {len(sorted_public)} public files!")
