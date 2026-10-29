import json

with open('scripts/drinks_def.json', encoding='utf-8') as f:
    drinks = json.load(f)

with open('scripts/public_files.py', 'r', encoding='utf-8') as f:
    text = f.read()

drink_lines = []
for d in drinks:
    p = f"images/do_uong/{d['id']}.webp"
    if f"'{p}'" not in text:
        drink_lines.append(f"    '{p}',")

if drink_lines:
    joined = "\n".join(drink_lines)
    target = "    'images/regional/zh/zh_s_7.webp',"
    replacement = f"{target}\n{joined}"
    new_text = text.replace(target, replacement)
    with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f"Added {len(drink_lines)} drink images to scripts/public_files.py!")
else:
    print("All drink images already present in scripts/public_files.py.")
