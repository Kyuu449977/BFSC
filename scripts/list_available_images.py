import glob, os, sys

sys.stdout.reconfigure(encoding='utf-8')

images = [p.replace('\\', '/').replace('src/', '') for p in glob.glob('src/images/**/*.webp', recursive=True)]
print(f'Total available images: {len(images)}')
for cat in ['buoi_sang', 'buoi_trua', 'buoi_chieu', 'buoi_toi', 'do_an_vat', 'do_uong', 'binh_dan', 'sinh_vien', 'regional']:
    cat_imgs = [img for img in images if cat in img]
    print(f"{cat}: {len(cat_imgs)} images")
