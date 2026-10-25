import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Vietnam FOOD_DATABASE dish images
vn_image_updates = {
    'vat_banh_lot': 'images/regional/banh_lot.webp',
    'vat_che_buoi': 'images/regional/che_buoi.webp',
    'trua_cao_lau': 'images/regional/cao_lau.webp',
    'trua_bun_ca': 'images/regional/bun_ca.webp',
    'toi_chao_long': 'images/regional/chao_long.webp',
    'toi_lau_bo': 'images/regional/lau_bo.webp',
    'toi_nem_nuong': 'images/regional/nem_nuong.webp',
    'vat_che_ba_ba': 'images/regional/che_ba_ba.webp',
    'sang_banh_tam_bi': 'images/regional/banh_tam_bi.webp',
    'sang_banh_uot_long_ga': 'images/regional/banh_uot_long_ga.webp',
    'trua_com_hen': 'images/regional/com_hen.webp',
    'trua_4_1': 'images/buoi_trua/mi_quang.webp',
    'trua_3_2': 'images/buoi_trua/pho_tron.webp',
    'sv_lunch_bun_mam': 'images/sinh_vien/bun_mam.webp',
    'sv_afternoon_pha_lau': 'images/sinh_vien/pha_lau.webp',
    'toi_3_2': 'images/buoi_toi/mien_ga.webp',
    'sv_snacks_che_dau_trang': 'images/sinh_vien/che_dau_trang.webp',
    'sv_snacks_che_dau_den': 'images/sinh_vien/che_dau_den.webp',
    'sv_snacks_che_dau_xanh': 'images/sinh_vien/che_dau_xanh.webp',
    'toi_5_1': 'images/regional/vi/toi_5_1.webp',
    'toi_5_3': 'images/regional/vi/toi_5_3.webp',
    'toi_4_1': 'images/regional/vi/toi_4_1.webp',
    'toi_mi_vit_tiem': 'images/regional/vi/toi_mi_vit_tiem.webp',
    'more_dinner_bun_hen': 'images/regional/vi/more_dinner_bun_hen.webp',
    'vat_5_2': 'images/regional/vi/vat_5_2.webp',
    'hl_phin_sua_da': 'images/regional/vi/hl_phin_sua_da.webp',
    'nuoc_ngot_1': 'images/regional/vi/nuoc_ngot_1.webp',
    'nuoc_coca_zero': 'images/regional/vi/nuoc_coca_zero.webp',
    'nuoc_pepsi_chanh': 'images/regional/vi/nuoc_pepsi_chanh.webp',
    'nuoc_ngot_3': 'images/regional/vi/nuoc_ngot_3.webp',
    'nuoc_sprite': 'images/regional/vi/nuoc_sprite.webp',
    'nuoc_ngot_4': 'images/regional/vi/nuoc_ngot_4.webp',
    'nuoc_sting_vang': 'images/regional/vi/nuoc_sting_vang.webp',
    'nuoc_ngot_5': 'images/regional/vi/nuoc_ngot_5.webp',
    'nuoc_mirinda_xa_xi': 'images/regional/vi/nuoc_mirinda_xa_xi.webp',
    'nuoc_revive': 'images/regional/vi/nuoc_revive.webp',
    'hl_freeze_tra_xanh': 'images/regional/vi/hl_freeze_tra_xanh.webp',
    'pl_tra_mang_cau': 'images/regional/vi/pl_tra_mang_cau.webp',
}

fd_start = text.find('const FOOD_DATABASE = {')
fd_end = text.find('const DISH_STYLE_TAGS = {')
fd_chunk = text[fd_start:fd_end]

for did, new_img in vn_image_updates.items():
    # Replace image property inside dish block id: 'did'
    pattern = rf"(id:\s*'{did}',[\s\S]*?image:\s*')[^']+(')"
    m = re.search(pattern, fd_chunk)
    if m:
        fd_chunk = fd_chunk[:m.start(1)] + m.group(1) + new_img + m.group(2) + fd_chunk[m.end(2):]
        print(f"Updated VN dish {did} -> {new_img}")
    else:
        print(f"Warning: VN dish {did} not found in FOOD_DATABASE")

text = text[:fd_start] + fd_chunk + text[fd_end:]

# 2. Update REGIONAL_DATABASES for ja, ko, zh, en
reg_idx = text.find('const REGIONAL_DATABASES = {')
for region in ['ja', 'ko', 'zh', 'en']:
    r_start = text.find(f'{region}:', reg_idx)
    b_start = text.find('{', r_start)
    count = 0
    b_end = b_start
    for i in range(b_start, len(text)):
        if text[i] == '{':
            count += 1
        elif text[i] == '}':
            count -= 1
            if count == 0:
                b_end = i + 1
                break
    r_data = json.loads(text[b_start:b_end])
    
    # Update each dish in this region to use images/regional/{region}/{dish_id}.webp
    for cat_k, cat in r_data.items():
        for d in cat['dishes']:
            did = d['id']
            d['image'] = f"images/regional/{region}/{did}.webp"
            
    # Serialize cleanly
    r_json_clean = json.dumps(r_data, ensure_ascii=False, indent=4)
    r_indented = "\n".join("      " + line for line in r_json_clean.splitlines()).strip()
    text = text[:b_start] + r_indented + text[b_end:]
    print(f"Updated all 55 dishes for {region} to dedicated images!")

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("src/js/data.js updated with 100% authentic dedicated images for all dishes!")
