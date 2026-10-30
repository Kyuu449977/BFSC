import sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path

for fname in ['src/robots.txt', 'src/sitemap.xml']:
    p = Path(fname)
    if p.exists():
        print(f"=== {fname} ===")
        print(p.read_text(encoding='utf-8'))
    else:
        print(f"=== {fname} NOT FOUND ===")
