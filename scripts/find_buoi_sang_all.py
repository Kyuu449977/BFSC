import glob, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in glob.glob('src/js/*.js'):
    with open(f, encoding='utf-8') as fp:
        lines = fp.readlines()
    for i, l in enumerate(lines):
        if 'Buổi Sáng' in l:
            print(f"{f}:{i+1}: {l.strip()}")
