with open('src/js/app.js', encoding='utf-8') as f:
    for i, l in enumerate(f):
        if 'filter' in l and ('let ' in l or 'var ' in l or 'const ' in l):
            print(f"Line {i+1}: {l.strip()}")
