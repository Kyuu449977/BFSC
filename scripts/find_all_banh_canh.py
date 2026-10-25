import os, sys

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith(('.js', '.json', '.html', '.py', '.txt')):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8') as file:
                    content = file.read()
                    if 'bánh canh' in content.lower():
                        c = content.lower().count('bánh canh')
                        print(f"{p}: {c} times")
            except Exception:
                pass
