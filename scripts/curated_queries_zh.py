import sys
sys.stdout.reconfigure(encoding='utf-8')

ZH_QUERIES = {
    # Morning (8)
    "zh_m_1": ["Jianbing guozi", "Jianbing street food", "Chinese jianbing"],
    "zh_m_2": ["Xiaolongbao soup dumplings", "Xiaolongbao basket", "Xiao long bao"],
    "zh_m_3": ["Shengjian mantou", "Shengjianbao pan fried buns", "Shengjianbao"],
    "zh_m_4": ["Hot dry noodles Wuhan", "Reganmian Wuhan", "Hot dry noodles"],
    "zh_m_5": ["Youtiao and soy milk", "Youtiao fried dough", "Youtiao"],
    "zh_m_6": ["Century egg and pork congee", "Peidan shourou zhou", "Pork congee"],
    "zh_m_7": ["Chaoshu spicy wontons", "Red oil chaoshu", "Sichuan wontons spicy"],
    "zh_m_8": ["Shrimp rice noodle roll", "Ha cheung fun dim sum", "Steamed rice roll shrimp"],

    # Lunch (12)
    "zh_l_1": ["Lanzhou beef lamian", "Lanzhou beef noodles", "Lanzhou pulled noodles"],
    "zh_l_2": ["Zhajiangmian bowl", "Zha jiang mian Beijing", "Zhajiangmian noodles"],
    "zh_l_3": ["Char siu rice Cantonese", "Char siu pork over rice", "BBQ pork char siu"],
    "zh_l_4": ["Hainanese chicken rice plate", "Hainanese chicken rice", "Chicken rice Hainan"],
    "zh_l_5": ["Beef kway teow soup Chaozhou", "Chaozhou beef noodles", "Beef ho fun soup"],
    "zh_l_6": ["Dan dan noodles Sichuan", "Dandanmian spicy", "Sichuan dandan noodles"],
    "zh_l_7": ["Roast goose Cantonese", "Roast goose over rice", "Siu ngo roast goose"],
    "zh_l_8": ["Biang biang noodles", "Youpo noodles Shaanxi", "Biangbiang noodles"],
    "zh_l_9": ["Taiwanese beef noodle soup", "Taiwan beef noodles", "Braised beef noodle soup"],
    "zh_l_10": ["Yangzhou fried rice", "Yeung chow fried rice", "Yangzhou chaofan"],
    "zh_l_11": ["Guilin rice noodles", "Guilin mifen", "Guilin noodles"],
    "zh_l_12": ["Luosifen noodles Liuzhou", "River snail rice noodles", "Luosifen"],

    # Afternoon (9)
    "zh_a_1": ["Har gow crystal shrimp dumplings", "Har gow dim sum", "Ha gow"],
    "zh_a_2": ["Steamed pork ribs dim sum", "Pork ribs with black bean sauce", "Pork ribs dim sum"],
    "zh_a_3": ["Steamed chicken feet dim sum", "Feng zhao dim sum", "Chicken feet dim sum"],
    "zh_a_4": ["Pineapple bun with butter", "Bolo bao butter", "Pineapple bun Hong Kong"],
    "zh_a_5": ["Roujiamo Chinese burger", "Rou jia mo Shaanxi", "Roujiamo pork"],
    "zh_a_6": ["Changsha stinky tofu black", "Stinky tofu fried", "Stinky tofu"],
    "zh_a_7": ["Taiwanese popcorn chicken", "Salt and pepper chicken Taiwan", "Yan su ji"],
    "zh_a_8": ["Tanghulu candied hawthorn", "Tanghulu skewer", "Candied fruit skewer"],
    "zh_a_9": ["Portuguese egg tart Macau", "Pastel de nata Macau", "Egg tart Hong Kong"],

    # Dinner (10)
    "zh_d_1": ["Peking roast duck sliced", "Peking duck platter", "Peking duck"],
    "zh_d_2": ["Mapo tofu Sichuan spicy", "Mapo doufu bowl", "Mapo tofu"],
    "zh_d_3": ["Shuizhu beef Sichuan", "Sichuan water boiled beef", "Shuizhu niurou"],
    "zh_d_4": ["Chongqing hot pot spicy", "Sichuan hot pot spicy oil", "Nine grid hot pot"],
    "zh_d_5": ["Dongpo pork braised pork belly", "Dongpo rou pork", "Dongpo pork"],
    "zh_d_6": ["Kung Pao chicken peanuts", "Gongbao jiding", "Kung pao chicken"],
    "zh_d_7": ["Xinjiang lamb skewers cumin", "Chuanr lamb skewers", "Xinjiang mutton skewer"],
    "zh_d_8": ["Squirrel shaped mandarin fish", "Songshu guiyu sweet and sour", "Squirrel fish"],
    "zh_d_9": ["Claypot fish head Cantonese", "Braised fish head claypot", "Clay pot fish"],
    "zh_d_10": ["Chaozhou beef hot pot", "Chaoshan beef hotpot", "Beef hot pot sliced"],

    # Snacks / Desserts (8)
    "zh_s_1": ["Mango pomelo sago dessert", "Yeung ji gam lu", "Mango pomelo sago"],
    "zh_s_2": ["Double skin milk Shunde", "Double skin milk pudding", "Shuangpi nai"],
    "zh_s_3": ["Jiuniang tangyuan sweet fermented rice", "Sweet fermented rice soup", "Jiuniang"],
    "zh_s_4": ["Black sesame soup dessert", "Black sesame paste Cantonese", "Sesame sweet soup"],
    "zh_s_5": ["Liu sha bao custard lava buns", "Salted egg yolk lava buns", "Custard buns dim sum"],
    "zh_s_6": ["Taro sago coconut milk dessert", "Taro sago soup", "Taro tapioca dessert"],
    "zh_s_7": ["Red bean cake Chinese dessert", "Hong dou gao", "Red bean jelly cake"],
    "zh_s_8": ["Ciba glutinous rice cake brown sugar", "Hongtang ciba", "Fried rice cakes brown sugar"],

    # Drinks (8)
    "zh_dr_1": ["Hong Kong milk tea cup", "Pantihose milk tea Hong Kong", "Hong Kong style milk tea"],
    "zh_dr_2": ["Hong Kong iced lemon tea", "Dong ning cha iced lemon", "Iced lemon tea glass"],
    "zh_dr_3": ["Brown sugar boba fresh milk tiger", "Brown sugar pearl milk", "Boba milk brown sugar"],
    "zh_dr_4": ["Suanmeitang sour plum drink", "Smoked plum drink glass", "Suanmeitang"],
    "zh_dr_5": ["Sugar cane water chestnut drink", "Water chestnut sugarcane drink", "Sugarcane juice drink"],
    "zh_dr_6": ["Kung fu tea set Tieguanyin", "Gongfu tea ceremony oolong", "Chinese tea set porcelain"],
    "zh_dr_7": ["Moutai Baijiu bottle ceramic", "Chinese baijiu bottle glass", "Baijiu liquor"],
    "zh_dr_8": ["Tsingtao draft beer glass mug", "Tsingtao beer glass", "Chinese beer draft"]
}
