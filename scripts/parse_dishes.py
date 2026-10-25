import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract dishes with their object blocks
# Looking for { id: '...', name: '...', ... image: '...' }
blocks = re.findall(r'\{\s*id:\s*[\'\"]([^\'\"]+)[\'\"].*?name:\s*[\'\"]([^\'\"]+)[\'\"].*?image:\s*[\'\"]([^\'\"]+)[\'\"].*?\}', text, re.DOTALL)
print(f'Total matched blocks: {len(blocks)}')
for b in blocks[:10]:
    print(b)
