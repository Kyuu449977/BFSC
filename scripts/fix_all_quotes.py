import re

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed_lines = []
for idx, line in enumerate(lines):
    # If line is like: key: '...words with 's or 't...',
    # Let's check matching quotes
    # E.g. name: 'Traditional British Shepherd's Pie',
    m = re.match(r"^(\s*\w+:\s*)'(.*)'(,?\s*)$", line)
    if m:
        prefix, val, suffix = m.group(1), m.group(2), m.group(3)
        # Check if val has unescaped '
        val_fixed = re.sub(r"(?<!\\)'", r"\'", val)
        fixed_lines.append(f"{prefix}'{val_fixed}'{suffix}")
    else:
        # Also check subtitle or title
        line_fixed = re.sub(r"(?<=\w)'(?=\w)", r"\'", line)
        fixed_lines.append(line_fixed)

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print('Auto-fixed quotes in data.js')
