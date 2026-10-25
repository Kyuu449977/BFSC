import sys
sys.stdout.reconfigure(encoding='utf-8')

KO_QUERIES = {
    # Morning (8)
    "ko_m_1": ["Kongnamul-gukbap", "Kongnamul guk", "Bean sprout soup Korean"],
    "ko_m_2": ["Gilgeori-toast", "Korean street toast", "Gilgeori toast"],
    "ko_m_3": ["Jeonbok-juk", "Abalone porridge Korean", "Jeonbokjuk"],
    "ko_m_4": ["Gyeran-ppang", "Egg bread Korean", "Gyeranppang"],
    "ko_m_5": ["Miyeok-guk", "Seaweed soup Korean", "Beef seaweed soup"],
    "ko_m_6": ["Haejang-guk", "Pork bone hangover soup", "Gamja-tang"],
    "ko_m_7": ["Hobak-juk", "Pumpkin porridge Korean", "Hobakjuk"],
    "ko_m_8": ["Garae-tteok grilled", "Garaetteok", "Grilled rice cake Korean"],

    # Lunch (12)
    "ko_l_1": ["Dolsot-bibimbap", "Bibimbap in hot stone pot", "Dolsot bibimbap"],
    "ko_l_2": ["Tuna gimbap", "Gimbap sliced", "Kimbap roll"],
    "ko_l_3": ["Jajangmyeon bowl", "Ganjajang noodles", "Jajangmyeon"],
    "ko_l_4": ["Jjamppong spicy seafood noodles", "Jjamppong", "Seafood jjamppong"],
    "ko_l_5": ["Kimchi-jjigae stew bowl", "Kimchi jjigae", "Pork kimchi stew"],
    "ko_l_6": ["Samgye-tang chicken soup", "Samgyetang ginseng chicken", "Samgyetang"],
    "ko_l_7": ["Dwaeji-gukbap Busan", "Dwaeji gukbap", "Pork soup rice Korean"],
    "ko_l_8": ["Mul-naengmyeon cold noodles", "Naengmyeon cold noodles", "Mul naengmyeon"],
    "ko_l_9": ["Bajirak-kalguksu clam noodles", "Kalguksu noodle soup", "Bajirak kalguksu"],
    "ko_l_10": ["Kimchi-bokkeum-bap fried rice", "Kimchi fried rice with egg", "Kimchi bokkeumbap"],
    "ko_l_11": ["Ttukbaegi-bulgogi beef", "Bulgogi beef stew", "Ttukbaegi bulgogi"],
    "ko_l_12": ["Andong-jjimdak braised chicken", "Andong jjimdak", "Jjimdak"],

    # Afternoon (10)
    "ko_a_1": ["Rose tteokbokki", "Tteokbokki cheese", "Tteok-bokki bowl"],
    "ko_a_2": ["Sundae blood sausage fried", "Sundae blood sausage", "Sundae Korean food"],
    "ko_a_3": ["Potato hot dog Korean corn dog", "Korean corn dog cheese", "Gamja hotdog"],
    "ko_a_4": ["Tornado potato spiral", "Tornado potato street food", "Spiral potato"],
    "ko_a_5": ["Eomuk skewers fish cake", "Eomuk fish cakes in broth", "Odeng skewers"],
    "ko_a_6": ["Bossam boiled pork belly", "Bossam Korean pork", "Bossam wraps"],
    "ko_a_7": ["Twigim Korean deep fried vegetables", "Yachae twigim", "Korean fried vegetables"],
    "ko_a_8": ["Gimmari fried seaweed rolls", "Gimmari", "Seaweed noodle rolls"],
    "ko_a_9": ["Sundae-bokkeum stir fried", "Sundae bokkeum", "Stir-fried sundae"],
    "ko_a_10": ["Rabokki ramen tteokbokki", "Rabokki", "Spicy rabokki"],

    # Dinner (10)
    "ko_d_1": ["Samgyeopsal grilled pork belly", "Samgyeopsal barbecue", "Pork belly grill Korean"],
    "ko_d_2": ["Gopchang grilled intestines Korean", "Gopchang BBQ", "Gopchang-gui"],
    "ko_d_3": ["Korean fried chicken chimaek", "Yangnyeom chicken", "Korean fried chicken"],
    "ko_d_4": ["Budae-jjigae army stew", "Budae jjigae hot pot", "Army stew Korean"],
    "ko_d_5": ["Galbi-jjim braised short ribs", "Spicy galbijjim", "Galbijjim"],
    "ko_d_6": ["Dak-galbi spicy stir fried chicken", "Chuncheon dakgalbi", "Dakgalbi"],
    "ko_d_7": ["Gwamegi dried fish Korean", "Gwamegi plate", "Gwamegi"],
    "ko_d_8": ["Altang fish roe soup", "Haemul altang", "Fish roe stew Korean"],
    "ko_d_9": ["Osam-bulgogi squid pork", "Osam bulgogi", "Squid and pork bulgogi"],
    "ko_d_10": ["Deunggalbi-jjim back ribs kimchi", "Galbi jjim ribs", "Braised pork ribs Korean"],

    # Snacks / Dessert (7)
    "ko_s_1": ["Bungeo-ppang fish pastry", "Bungeoppang", "Korean fish shaped bread"],
    "ko_s_2": ["Hotteok sweet pancake", "Korean hotteok", "Hotteok street food"],
    "ko_s_3": ["Injeolmi-bingsu shaved ice", "Injeolmi bingsu", "Bingsu with injeolmi"],
    "ko_s_4": ["Mango bingsu shaved ice dessert", "Mango shaved ice Korean", "Mango bingsu"],
    "ko_s_5": ["Fatcaron Korean macaron", "Ddungcaron", "Korean macaron"],
    "ko_s_6": ["Kkwabaegi twisted donut Korean", "Twisted doughnut Korean", "Kkwabaegi"],
    "ko_s_7": ["Dalgona candy Korean honeycomb", "Dalgona toffee", "Ppopgi honeycomb"],

    # Drinks (8)
    "ko_dr_1": ["Banana flavored milk Binggrae", "Banana milk Korean bottle", "Banana Flavored Milk"],
    "ko_dr_2": ["Milkis can drink", "Milkis beverage", "Milkis soda"],
    "ko_dr_3": ["Sikhye sweet rice drink", "Korean sikhye bowl", "Sikhye"],
    "ko_dr_4": ["Sujeonggwa cinnamon punch", "Sujeonggwa drink", "Sujeonggwa"],
    "ko_dr_5": ["Dalgona coffee whipped glass", "Dalgona coffee latte", "Dalgona coffee"],
    "ko_dr_6": ["Green grape ade drink", "Cheongpo-do ade", "Grape ade cafe"],
    "ko_dr_7": ["Makgeolli rice wine in bowl", "Makgeolli bottle and bowl", "Makgeolli"],
    "ko_dr_8": ["Soju bottle and shot glass", "Chamisul soju glass", "Korean soju bottle"]
}
