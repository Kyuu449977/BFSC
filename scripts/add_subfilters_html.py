with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '<nav id="filters" class="filters" aria-label="Lọc thực đơn"></nav>'
replacement = '<nav id="filters" class="filters" aria-label="Lọc thực đơn"></nav>\n          <div id="drinkSubFilters" class="drink-sub-filters" hidden aria-label="Phân loại đồ uống"></div>'

if target in text:
    text = text.replace(target, replacement, 1)
    with open('src/index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Added drinkSubFilters to index.html successfully.')
else:
    print('Target not found in index.html!')
