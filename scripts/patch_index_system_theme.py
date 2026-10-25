with open('src/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_snippet = 'data-theme-choice="orange" aria-pressed="true">\n            <span class="theme-dot" aria-hidden="true"></span>Cam đất'
new_snippet = 'data-theme-choice="system" aria-pressed="true">\n            <span class="theme-dot" aria-hidden="true"></span>Màu hệ thống'

assert old_snippet in text, "old_snippet not found in index.html"
text = text.replace(old_snippet, new_snippet, 1)

with open('src/index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/index.html updated successfully!")
