import sys, re
sys.stdout.reconfigure(encoding='utf-8')

for f in ['src/js/experience.js', 'src/js/gacha.js', 'src/js/animation.js']:
    with open(f, encoding='utf-8') as fp:
        lines = fp.readlines()
    print(f"\n--- {f} ---")
    for i, l in enumerate(lines):
        if 'reel' in l.lower() or 'spin' in l.lower() or 'slot' in l.lower() or 'carousel' in l.lower():
            print(f"  {i+1}: {l.strip()}")
            if i > 80:
                break
