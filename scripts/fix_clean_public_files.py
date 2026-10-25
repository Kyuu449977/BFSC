import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Collect all files in src
public_files = [
    'animation.js',
    'app.js',
    'assets/brand.svg',
    'assets/fonts/be-vietnam-pro-latin-400-normal.woff2',
    'assets/fonts/be-vietnam-pro-latin-600-normal.woff2',
    'assets/fonts/be-vietnam-pro-latin-700-normal.woff2',
    'assets/fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
    'assets/fonts/be-vietnam-pro-vietnamese-600-normal.woff2',
    'assets/fonts/be-vietnam-pro-vietnamese-700-normal.woff2',
    'assets/fonts/fonts.css',
    'assets/fonts/noto-serif-latin-700-normal.woff2',
    'assets/fonts/noto-serif-vietnamese-700-normal.woff2',
    'assets/icons.svg',
    'assets/image-unavailable.svg',
    'assets/vendor/motion.js',
    'audio.js',
    'audio/button-1.mp3',
    'audio/button-2.mp3',
    'audio/button-3.mp3',
    'audio/gacha-loop.mp3',
    'audio/gacha-pull.mp3',
    'audio/gacha-reveal.mp3',
    'audio/relaxing-light-background.mp3',
    'collection.js',
    'controls.js',
    'credits.html',
    'data.js',
    'dish-preferences.js',
    'experience.js',
    'gacha.js',
    'images/buoi_chieu/banh_bot_loc.webp',
    'images/buoi_chieu/banh_khot.webp',
    'images/buoi_chieu/banh_xeo.webp',
    'images/buoi_chieu/bot_chien.webp',
    'images/buoi_chieu/goi_cuon.webp',
    'images/buoi_chieu/sup_cua.webp',
    'images/buoi_sang/banh_cuon.webp',
    'images/buoi_sang/banh_mi_chao.webp',
    'images/buoi_sang/banh_mi_pate.webp',
    'images/buoi_sang/bun_bo_hue.webp',
    'images/buoi_sang/bun_rieu.webp',
    'images/buoi_sang/hu_tieu.webp',
    'images/buoi_sang/pho_bo.webp',
    'images/buoi_sang/xoi_xeo.webp',
    'images/buoi_toi/bbq_nuong.webp',
    'images/buoi_toi/bo_ne.webp',
    'images/buoi_toi/bun_dau.webp',
    'images/buoi_toi/chao_suon.webp',
    'images/buoi_toi/lau_thai.webp',
    'images/buoi_toi/mien_ga.webp',
    'images/buoi_toi/quan_oc.webp',
    'images/buoi_trua/bun_cha.webp',
    'images/buoi_trua/bun_thit_nuong.webp',
    'images/buoi_trua/com_ga.webp',
    'images/buoi_trua/com_rang.webp',
    'images/buoi_trua/com_tam.webp',
    'images/buoi_trua/mi_quang.webp',
    'images/buoi_trua/pho_tron.webp',
    'images/do_an_vat/banh_trang_nuong.webp',
    'images/do_an_vat/banh_trang_tron.webp',
    'images/do_an_vat/ca_vien_chien.webp',
    'images/do_an_vat/che_thai.webp',
    'images/do_an_vat/nem_chua_ran.webp',
    'images/do_uong/7up.webp',
    'images/do_uong/bo_huc.webp',
    'images/do_uong/ca_phe_muoi.webp',
    'images/do_uong/ca_phe_sua_da.webp',
    'images/do_uong/coca_cola.webp',
    'images/do_uong/mirinda.webp',
    'images/do_uong/nuoc_dua.webp',
    'images/do_uong/nuoc_mia.webp',
    'images/do_uong/pepsi.webp',
    'images/do_uong/rau_ma.webp',
    'images/do_uong/sinh_to_bo.webp',
    'images/do_uong/sting_dau.webp',
    'images/do_uong/tra_dao.webp',
    'images/do_uong/tra_sua.webp',
    'images/do_uong/tra_trai_cay.webp',
    'images/google-maps-attribution.svg',
    'images/icons/icon-192.png',
    'images/icons/icon-512.png',
    'images/sources.json',
    'images/sinh_vien/banh_bao.webp',
    'images/sinh_vien/banh_gio.webp',
    'images/sinh_vien/banh_canh.webp',
    'images/sinh_vien/bun_mam.webp',
    'images/sinh_vien/pha_lau.webp',
    'images/sinh_vien/banh_flan.webp',
    'images/sinh_vien/che_dau_trang.webp',
    'images/sinh_vien/che_dau_den.webp',
    'images/sinh_vien/che_dau_xanh.webp',
    'images/sinh_vien/banh_bo.webp',
    'images/binh_dan/sua_dau_nanh.webp',
    'images/binh_dan/nuoc_cam.webp',
    'images/binh_dan/tra_da.webp',
    'images/binh_dan/chanh_day.webp',
    'images/binh_dan/dua_hau.webp',
    'images/binh_dan/ca_cao.webp',
    'images/binh_dan/sinh_to_xoai.webp',
    'images/binh_dan/nuoc_sam.webp',
    'images/binh_dan/com_chien.webp',
    'images/binh_dan/com_ca_man.webp',
    'images/binh_dan/banh_uot.webp',
    'images/binh_dan/banh_mi_xiu_mai.webp',
    'images/binh_dan/bun_thai.webp',
    'images/binh_dan/bun_hen.webp',
    'images/do_uong/ca_phe_trung.webp',
    'images/do_uong/bac_xiu.webp',
    'images/do_uong/ca_phe_den_da.webp',
    'images/do_uong/tra_sen_vang.webp',
    'images/do_uong/tra_lai_kem_cheese.webp',
    'images/do_uong/sinh_to_sau_rieng.webp',
    'images/do_uong/nuoc_ep_oi_hong.webp',
    'images/do_uong/sua_chua_danh_da.webp',
    'images/do_uong/milo_dam.webp',
    'images/do_uong/sua_tuoi_tran_chau.webp',
    'images/do_uong/tra_tac.webp',
    'images/do_uong/tra_hoa_dau_biec.webp',
    'images/do_uong/sinh_to_dau.webp',
    'images/do_uong/nuoc_ep_thom.webp',
    'images/do_uong/tra_vai.webp',
    'images/do_uong/nuoc_sam_bi_dao.webp',
    'images/do_uong/sua_bap.webp',
    'images/do_uong/sinh_to_mang_cau.webp',
    'images/do_uong/chanh_muoi.webp',
    'images/do_uong/soda_viet_quat.webp',
    'index.html',
    'manifest.json',
    'nearby.js',
    'privacy.html',
    'style.css',
    'sw.js',
    'terms.html',
    'theme-init.js',
    'ui.js'
]

# Add all files in src/images/regional
for root, dirs, files in os.walk('src/images/regional'):
    for file in files:
        if file.endswith('.webp'):
            rel = os.path.relpath(os.path.join(root, file), 'src').replace('\\', '/')
            if rel not in public_files:
                public_files.append(rel)

public_files.sort()

formatted_files = "PUBLIC_FILES = (\n" + "".join(f"    '{f}',\n" for f in public_files) + ")\n"

code = f'''"""Explicit allowlist of files copied into the production public web root."""
from pathlib import Path

{formatted_files}
def source_path(root, public_name):
    """Map stable published URLs to the organized source tree."""
    if public_name.endswith('.js') and '/' not in public_name and public_name != 'sw.js':
        return root / 'src' / 'js' / public_name
    if public_name == 'style.css':
        return root / 'src' / 'styles' / 'base.css'
    return root / 'src' / public_name


# Concatenated in this order into the stable /style.css URL; no CSS @import waterfall.
STYLE_SOURCES = ('base.css', 'interactions.css', 'mobile.css', 'refinements.css', 'themes.css')
'''

with open('scripts/public_files.py', 'w', encoding='utf-8') as f:
    f.write(code)

print(f"scripts/public_files.py written cleanly with {len(public_files)} files!")
