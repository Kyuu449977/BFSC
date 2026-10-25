import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

groups = re.findall(r'^\s*([a-zA-Z0-9_]+):\s*\{', fd_str, re.MULTILINE)
print("Groups in FOOD_DATABASE:", groups)
