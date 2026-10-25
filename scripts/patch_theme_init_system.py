import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/theme-init.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update defaults and allowed
text = text.replace(
    "const defaults = { theme: 'orange', appearance: 'light', timezone: 'auto', language: 'vi' };",
    "const defaults = { theme: 'system', appearance: 'light', timezone: 'auto', language: 'vi' };"
)

text = text.replace(
    "theme: ['orange', 'green', 'blue', 'rose', 'custom'],",
    "theme: ['system', 'orange', 'green', 'blue', 'rose', 'custom'],"
)

# 2. Update condition for dynamic time-of-day color transitions
text = text.replace(
    "if (theme === 'orange') {",
    "if (theme === 'system' || theme === 'orange') {"
)

with open('src/js/theme-init.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/js/theme-init.js updated successfully!")
