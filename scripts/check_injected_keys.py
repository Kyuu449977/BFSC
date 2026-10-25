import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

keys = ['ko_a_6', 'ko_a_2', 'ko_l_6', 'zh_m_7', 'zh_dr_5', 'zh_a_9', 'en_l_8', 'en_l_10', 'en_l_12', 'ja_m_3']

for k in keys:
    for i, line in enumerate(lines):
        if f"{k}:" in line:
            print(f"Line {i+1} for {k}:")
            print(line[:200] + " ... " + line[-100:])
