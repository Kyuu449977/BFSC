import sys; sys.path.insert(0, 'scripts')
from find_commons_photos import search

queries = {
    "nuoc_tra_sua_bac_ha": ["mint tea glass", "mint iced tea", "peppermint iced tea"],
    "nuoc_tra_mang_cut": ["mangosteen drink", "mangosteen juice", "Garcinia mangostana fruit"],
    "nuoc_matcha_macchiato": ["Matcha latte", "Green tea latte art", "Matcha macchiato"],
    "nuoc_dirty_matcha": ["Matcha latte espresso", "Green tea latte", "Matcha coffee"],
    "nuoc_strawberry_matcha": ["Strawberry latte", "Strawberry matcha", "Strawberry milk drink"],
    "nuoc_matcha_frappuccino": ["Green tea frappuccino", "Matcha smoothie", "Iced matcha latte"],
    "nuoc_sinh_to_bo_xoai": ["Mango smoothie glass", "Mango shake glass", "Mango lassi glass"],
    "nuoc_sinh_to_chuoi_bo_dau_phong": ["Banana smoothie", "Banana milkshake", "Banana shake glass"],
    "nuoc_revive": ["Gatorade bottle", "Isotonic drink", "Sports drink"],
    "nuoc_tra_oi_hong_chia": ["Guava juice", "Pink guava", "Guava drink"],
    "nuoc_sinh_to_chuoi": ["Banana smoothie glass", "Banana milkshake glass", "Banana smoothie"],
    "nuoc_sinh_to_mang_cau": ["Guanabana drink", "Soursop juice", "Annona muricata juice"],
    "nuoc_bac_xiu": ["Vietnamese iced coffee", "Ca phe sua da", "Iced coffee with condensed milk"]
}

for k, q_list in queries.items():
    print(f"\nTarget: {k}")
    for q in q_list:
        res = search(q)
        if res:
            print(f"  Query '{q}': {res[:3]}")
            break
