with open('src/index.html', encoding='utf-8') as f:
    for i, l in enumerate(f):
        if 'id="filters"' in l:
            print('Line:', i+1)
