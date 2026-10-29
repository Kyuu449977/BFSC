import glob, sys
sys.stdout.reconfigure(encoding='utf-8')

for f in ['src/js/controls.js', 'src/js/experience.js', 'src/js/gacha.js', 'src/js/app.js']:
    with open(f, encoding='utf-8') as fp:
        c = fp.read()
    for word in ['morning', 'Buổi Sáng', 'modes']:
        cnt = c.count(word)
        if cnt:
            print(f"{f}: '{word}' appears {cnt} times")
