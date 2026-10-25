import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Read data.js
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# 1. Update FOOD_DATABASE
# Replace Thai dishes and commercial sodas
replacements_fd = {
    # Replace Bún Thái with Bún cá cay Hải Phòng
    "'more_lunch_bun_thai'": """'more_lunch_bun_thai',
        name: 'Bún cá cay Hải Phòng',
        rarity: 4,
        type: 'Đặc sản đất Cảng · phần một người',
        image: 'images/binh_dan/bun_thai.webp',
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
        desc: 'Tô bún cá rô đồng chiên giòn rụm trong nước dùng cay nồng chua ngọt đặc sản đất Cảng, ăn kèm dọc mùng giòn sần sật.',
        quote: 'Cá chiên giòn rụm chan nước dùng chua cay cay cực kỳ đã miệng.',
        calories: 460,
        tags: ['bún', 'cá', 'hải phòng', 'chua cay']""",

    # Replace Lẩu Thái with Lẩu cua đồng bắp bò
    "'toi_5_1'": """'toi_5_1',
        name: 'Lẩu cua đồng bắp bò',
        rarity: 5,
        type: 'Món ăn gia đình · nhóm nhỏ',
        image: 'images/buoi_toi/lau_thai.webp',
        price: 90000,
        priceRange: [75000, 120000],
        priceMin: 75000,
        priceMax: 120000,
        desc: 'Nồi lẩu riêu cua đồng thơm lừng gạch cua béo ngậy, bắp bò tươi giòn, đậu rán vàng ươm và rau mồng tơi mướt xanh.',
        quote: 'Nước lẩu riêu cua đồng chua thanh thơm ngậy, nhúng thịt bò hoa chuối ngon quên lối về.',
        calories: 520,
        tags: ['lẩu', 'cua đồng', 'bò', 'tối']""",

    # Replace Chè Thái with Chè sương sa hạt lựu
    "'vat_5_2'": """'vat_5_2',
        name: 'Chè sương sa hạt lựu',
        rarity: 5,
        type: 'Món tráng miệng Nam Bộ',
        image: 'images/do_an_vat/che_thai.webp',
        price: 25000,
        priceRange: [20000, 30000],
        priceMin: 20000,
        priceMax: 30000,
        desc: 'Ly chè thanh mát rực rỡ sắc màu với củ năng giòn sần sật bọc bột lọc, sương sa mềm mượt và nước cốt dừa béo ngậy.',
        quote: 'Củ năng bọc bột lọc dai giòn rực rỡ, cốt dừa thơm béo ăn cùng đá bào mát lạnh.',
        calories: 280,
        tags: ['chè', 'hạt lựu', 'cốt dừa', 'ăn vặt']""",

    # Replace Bún hến in dinner with Bún bò giò heo
    "'more_dinner_bun_hen'": """'more_dinner_bun_hen',
        name: 'Bún bò giò heo Huế',
        rarity: 4,
        type: 'Món nước đậm đà',
        image: 'images/buoi_sang/bun_bo_hue.webp',
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
        desc: 'Tô bún bò cay thơm nồng sả ớt ruốc Huế, khoanh giò heo hầm mềm béo ngậy và chả cua vàng ươm chuẩn vị cố đô.',
        quote: 'Khoanh giò heo ninh nhừ béo ngậy, nước súp cay nồng đậm đà sả ruốc.',
        calories: 550,
        tags: ['bún bò', 'giò heo', 'huế', 'bữa tối']""",

    # Replace Mì vịt tiềm with Mì gà quay da giòn
    "'toi_mi_vit_tiem'": """'toi_mi_vit_tiem',
        name: 'Mì gà quay da giòn',
        rarity: 4,
        type: 'Món mì sợi tươi',
        image: 'images/buoi_trua/com_ga.webp',
        price: 55000,
        priceRange: [45000, 70000],
        priceMin: 45000,
        priceMax: 70000,
        desc: 'Sợi mì trứng tươi dai giòn ăn cùng góc đùi gà quay ngũ vị da giòn rụm, chan nước dùng xương hầm thanh ngọt và cải thìa.',
        quote: 'Da gà giòn thơm ngũ vị, thịt mềm mọng nước ăn cùng sợi mì trứng dai ngon.',
        calories: 580,
        tags: ['mì', 'gà quay', 'tiềm', 'bữa tối']""",
}

# Apply replacements to data_js
for k, rep in replacements_fd.items():
    # Find dish block starting with id: k
    pattern = rf"id:\s*{k},[\s\S]*?tags:\s*\[[^\]]+\]"
    m = re.search(pattern, data_js)
    if m:
        data_js = data_js[:m.start()] + f"id: {rep}" + data_js[m.end():]
        print(f"Replaced {k} successfully!")
    else:
        print(f"Warning: pattern for {k} not matched")

# Now handle moving dishes to the right meal groups in FOOD_DATABASE:
# We need to move Bánh lọt (vat_banh_lot) and Chè bưởi (vat_che_buoi) to `snacks`
# Move Bánh tằm bì (sang_banh_tam_bi) and Bánh ướt lòng gà (sang_banh_uot_long_ga) to `morning`
# Move Cơm hến (trua_com_hen) to `lunch`
# And remove them from `dinner`

# Let's inspect the dishes in dinner to extract them cleanly
print("Inspection complete for replacements!")
