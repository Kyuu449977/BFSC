import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update theme dot for system
dot_old = """.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #af4023;
}"""

dot_new = """.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #fcc75d 0%, #ffa600 50%, #38bdf8 100%);
}
[data-theme-choice='system'] .theme-dot {
  background: linear-gradient(135deg, #fcc75d 0%, #ffa600 50%, #38bdf8 100%);
}
[data-theme-choice='orange'] .theme-dot {
  background: #af4023;
}"""

if dot_old in text:
    text = text.replace(dot_old, dot_new, 1)

# 2. Update time-period rules from [data-theme='orange'] to support both system and orange
text = text.replace("[data-theme='orange']", ":is([data-theme='system'], [data-theme='orange'], :not([data-theme]))")

# 3. Ensure dark mode default --orange is crisp and vibrant (#ff944d instead of pale #ffae88)
text = text.replace("--orange: #ffae88;", "--orange: #ff944d;")

with open('src/styles/themes.css', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/styles/themes.css updated successfully!")
