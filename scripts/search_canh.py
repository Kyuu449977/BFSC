import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find all dishes in FOOD_DATABASE
fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_str = text[fd_start:fd_end]

for line in fd_str.splitlines():
    if 'name:' in line and 'canh' in line.lower():
        print("FD match:", line.strip())

# What about in DISH_TRANSLATIONS?
dt_start = text.find('const DISH_TRANSLATIONS = {')
dt_end = text.find('function getDishName')
dt_str = text[dt_start:dt_end]

for line in dt_str.splitlines():
    if 'name:' in line and 'bánh canh' in line.lower():
        print("DT match:", line.strip())
