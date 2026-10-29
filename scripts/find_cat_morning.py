import glob, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in glob.glob('src/js/*.js') + glob.glob('src/*.html'):
    with open(f, encoding='utf-8') as fp:
        lines = fp.readlines()
    for i, l in enumerate(lines):
        if 'cat_morning' in l:
            print(f"{f}:{i+1}: {l.strip()}")
