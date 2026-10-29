import re, glob, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in glob.glob('src/js/*.js'):
    with open(f, encoding='utf-8') as fp:
        c = fp.read()
    if 'Đồ Uống & Nước Ngọt' in c or 'Đang xem' in c or 'menu-tabs' in c or 'filter-btn' in c:
        print(f"Match in {f}!")
        for line in c.split('\n'):
            if 'Đang xem' in line:
                print(' ', line.strip())
