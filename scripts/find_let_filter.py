with open('src/js/app.js', encoding='utf-8') as f:
    for i, l in enumerate(f):
        if 'let filter' in l:
            print(f"Line {i+1}: {l.strip()}")
