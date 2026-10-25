import sys
sys.stdout.reconfigure(encoding='utf-8')

# Curated queries for Japan (55 dishes)
JA_QUERIES = {
    # Morning (9)
    "ja_m_1": ["Tamagokake-gohan 001.jpg", "Tamagokake-gohan", "TKG egg rice"],
    "ja_m_2": ["Breakfast of grilled salmon, miso soup and rice", "Shioyaki", "Grilled Salmon Japanese"],
    "ja_m_3": ["Tai chazuke", "Sake chazuke", "Ochazuke"],
    "ja_m_4": ["Japanese egg sandwich in a sandwich case", "Egg Sandwich 001.jpg", "Japanese egg sandwich"],
    "ja_m_5": ["Ogura Toast (Toast with Sweet Red Bean Paste)", "Ogura toast", "Nagoya Ogura toast"],
    "ja_m_6": ["Umeboshi okayu", "Okayu umeboshi", "Nanakusa-gayu"],
    "ja_m_7": ["Natto on rice.jpg", "Natto on rice", "Rice seasoned with Natto"],
    "ja_m_8": ["SABAMISO Zen", "Saba no misoni", "Mackerel simmered in miso"],
    "ja_m_9": ["Miso soup of Japanese littleneck clam(asari) 2014.jpg", "Asari miso soup", "Onigiri miso soup"],

    # Lunch (12)
    "ja_l_1": ["Nigiri Sushi (26505096851).jpg", "Nigiri Sushi (25966163204).jpg", "Nigiri sushi plate"],
    "ja_l_2": ["Chirashizushi in Kyoto", "Chirashizushi bowl", "Kaisen don"],
    "ja_l_3": ["Ikkousha tonkotsu bowl.jpg", "Hakata ramen tonkotsu", "Tonkotsu ramen bowl"],
    "ja_l_4": ["Miso ramen bowl", "Sapporo miso ramen", "Ramen with corn and butter"],
    "ja_l_5": ["Katsudon 001.jpg", "Katsudon bowl", "Tonkatsu katsudon"],
    "ja_l_6": ["Gyuu-don 001.jpg", "Gyudon beef bowl", "Gyudon with egg"],
    "ja_l_7": ["Tempura-Udon-Nudeln.JPG", "Ebi tempura udon", "Sanuki udon tempura"],
    "ja_l_8": ["Zaru soba by jetalone", "Zaru soba cold buckwheat", "Zaru soba tempura"],
    "ja_l_9": ["Katsu-curry 003.jpg", "Katsu curry rice", "Tonkatsu curry"],
    "ja_l_10": ["ひつまぶし (8866834170).jpg", "Hitsumabushi unagi", "Unagi eel rice bowl"],
    "ja_l_11": ["Oyakodon 003.jpg", "Oyakodon chicken egg", "Oyakodon bowl"],
    "ja_l_12": ["Hiyashi chuka by woinary at 551 Horai in Osaka Intl Airport.jpg", "Hiyashi chuka cold noodles", "Hiyashi chuka"],

    # Afternoon (9)
    "ja_a_1": ["Takoyaki balls Osaka", "Takoyaki octopus balls", "Takoyaki"],
    "ja_a_2": ["Hiroshima-style okonomiyaki", "Hiroshima okonomiyaki", "Okonomiyaki Hiroshima"],
    "ja_a_3": ["10-yen coin pancake cheese", "10 yen bread", "Korean coin bread cheese"],
    "ja_a_4": ["Taiyaki sweet red bean", "Taiyaki fish waffle", "Taiyaki"],
    "ja_a_5": ["Yakisoba pan sandwich", "Yakisoba pan bun", "Yakisoba pan"],
    "ja_a_6": ["Karaage fried chicken skewers", "Karaage chicken skewer", "Japanese fried chicken karaage"],
    "ja_a_7": ["Mitarashi dango skewers", "Mitarashi dango", "Dango sweet soy sauce"],
    "ja_a_8": ["Yakiimo roasted sweet potato", "Baked sweet potato Yakiimo", "Yakiimo"],
    "ja_a_9": ["Ikayaki grilled squid", "Grilled squid Japanese ikayaki", "Ikayaki"],

    # Dinner (10)
    "ja_d_1": ["Assorted sashimi platter Japanese", "Sashimi moriawase", "Sashimi plate"],
    "ja_d_2": ["Sukiyaki beef hot pot", "Sukiyaki Wagyu hotpot", "Sukiyaki"],
    "ja_d_3": ["Yakitori skewers platter", "Yakitori platter", "Yakitori grilled chicken"],
    "ja_d_4": ["Motsunabe hot pot Fukuoka", "Hakata motsunabe", "Motsunabe"],
    "ja_d_5": ["Shabu-shabu beef hot pot", "Shabu shabu", "Beef shabu shabu"],
    "ja_d_6": ["Monjayaki Tsukishima cabbage", "Monjayaki", "Monjayaki cheese"],
    "ja_d_7": ["Jingisukan Hokkaido mutton", "Jingisukan grilled lamb", "Jingisukan"],
    "ja_d_8": ["Kushikatsu skewers Osaka", "Kushikatsu platter Shinsekai", "Kushikatsu"],
    "ja_d_9": ["Tsukemen dipping noodles bowl", "Tsukemen ramen", "Tsukemen"],
    "ja_d_10": ["Gindara saikyo yaki black cod", "Saikyoyaki grilled fish", "Gindara saikyoyaki"],

    # Snacks / Dessert (7)
    "ja_s_1": ["Warabimochi with kinako and kuromitsu", "Warabimochi", "Warabi mochi"],
    "ja_s_2": ["Matcha parfait Kyoto", "Matcha parfait dessert", "Green tea parfait"],
    "ja_s_3": ["Raindrop cake Mizu shingen mochi", "Mizu shingen mochi", "Raindrop cake"],
    "ja_s_4": ["Ichigo daifuku strawberry mochi", "Strawberry daifuku", "Ichigo daifuku"],
    "ja_s_5": ["Matcha soft serve ice cream cone", "Matcha ice cream cone", "Green tea soft serve"],
    "ja_s_6": ["Dorayaki red bean pancake", "Dorayaki dessert", "Dorayaki"],
    "ja_s_7": ["Japanese soufflé pancakes fluffy", "Fluffy souffle pancakes", "Souffle pancake"],

    # Drinks (8)
    "ja_dr_1": ["Melon cream soda float", "Melon soda float", "Japanese melon soda"],
    "ja_dr_2": ["Matcha latte iced green tea", "Iced matcha latte", "Matcha latte"],
    "ja_dr_3": ["Hojicha latte drink", "Roasted green tea latte", "Hojicha latte"],
    "ja_dr_4": ["Ramune soda bottle", "Ramune marble soda", "Ramune drink"],
    "ja_dr_5": ["Calpis soda drink", "Calpico soda glass", "Calpis drink"],
    "ja_dr_6": ["Royal milk tea glass", "Royal milk tea Japanese", "Royal milk tea"],
    "ja_dr_7": ["Asahi Super Dry beer glass draft", "Draft beer mug Japanese", "Asahi draft beer"],
    "ja_dr_8": ["Umeshu soda plum wine glass", "Umeshu with soda", "Umeshu on the rocks"]
}
