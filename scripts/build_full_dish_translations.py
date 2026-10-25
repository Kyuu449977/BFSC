# Script to build full dish translations for all 124 dishes in en, ja, ko, zh
import json
import re

# Base translations map by root/topic
BASE_DISH_DATA = {
    # Morning dishes
    'sang_5_1': {
        'en': ('Stir-fried Rare Beef Pho (Phở Tái Lăn)', 'Wok-seared beef with fragrant garlic over 24-hour simmered bone broth, served piping hot in stone bowls to the last drop.'),
        'ja': ('牛肉炒めフォー (Phở Tái Lăn)', '強火で香ばしく炒めた牛肉とニンニクをのせ、24時間じっくり煮込んだ熱々の牛骨スープでいただく伝統のフォー。'),
        'ko': ('퍼 따이 란 - 소고기 볶음 쌀국수 (Phở Tái Lăn)', '마늘과 함께 센 불에 볶아낸 소고기와 24시간 우려낸 진한 사골 육수가 어우러진 하노이식 쌀국수.'),
        'zh': ('生滚蒜香牛肉河粉 (Phở Tái Lăn)', '大火蒜香爆炒鲜牛肉，搭配24小时慢熬浓郁牛骨汤，石锅保温至最后一口。')
    },
    'sang_5_2': {
        'en': ('Hue Spicy Beef Noodle Soup (Bún Bò Huế)', 'Thick noodles with tender beef shank, crab meatballs, and pork knuckle in a robust lemongrass-chili broth.'),
        'ja': ('ブン・ボー・フエ - 辛口牛肉うどん (Bún Bò Huế)', '太麺に柔らかい牛すね肉、カニ団子、豚足をのせ、レモングラスとサテ唐辛子の効いた奥深いスープ。'),
        'ko': ('분보후에 - 후에식 매콤 소고기 쌀국수 (Bún Bò Huế)', '통통한 면발에 부드러운 소사태, 게살 완자, 족발과 향긋한 레몬글라스 고추 기름이 조화를 이룹니다.'),
        'zh': ('顺化香茅辣牛肉粉 (Bún Bò Huế)', '粗圆米粉搭配软烂牛腱、鲜美蟹肉丸与猪蹄，香茅辣椒红油浓汤鲜香四溢。')
    },
    'sang_5_3': {
        'en': ('Vietnamese Sizzling Pan Bread (Bánh Mì Chảo)', 'Cast iron pan with sizzling rich pâté, tender pepper beef, and runny eggs served with crispy baguette.'),
        'ja': ('鉄板バインミー (Bánh Mì Chảo)', '熱々の鉄板でジュージュー焼かれた濃厚レバーパテ、黒胡椒牛肉、半熟卵を焼きたてパンにつけて。'),
        'ko': ('반미 짜오 - 철판 바게트 (Bánh Mì Chảo)', '지글지글 철판에 올린 고소한 파테, 부드러운 소고기, 반숙 계란후라이를 바삭한 바게트와 곁들입니다.'),
        'zh': ('铁板越式法棍 (Bánh Mì Chảo)', '铁板滋滋作响的热热肝酱、黑椒嫩牛肉与溏心双蛋，配酥脆法棍蘸汁享用。')
    },
    'sang_4_1': {
        'en': ('Steamed Rice Rolls (Bánh Cuốn)', 'Delicate paper-thin steamed rice crepes filled with minced pork and wood ear mushrooms, topped with fried shallots.'),
        'ja': ('蒸し春巻き (Bánh Cuốn)', '極薄のもちもち蒸しライスペーパーでひき肉とキクラゲを包み、揚げエシャロットと温かいヌクマムダレで。'),
        'ko': ('반 꾸온 - 베트남식 쌀말이 (Bánh Cuốn)', '얇고 쫄깃한 쌀피에 다진 돼지고기와 목이버섯을 넣고 쪄내 바삭한 샬롯 튀김과 느억맘 소스에 찍어 먹습니다.'),
        'zh': ('越南薄皮鲜肉肠粉 (Bánh Cuốn)', '晶莹剔透手工现蒸薄米皮，裹入鲜猪肉馅与木耳碎，撒满酥脆炸葱酥，蘸温热鱼露。')
    },
    'sang_4_2': {
        'en': ('Nam Vang Clear Noodle Soup (Hủ Tiếu Nam Vang)', 'Chewy noodles topped with plump shrimp, quail eggs, and minced pork in clear sweet pork bone broth.'),
        'ja': ('フーティウ・ナムヴァン (Hủ Tiếu Nam Vang)', 'コシのある米麺にプリプリの海老、うずら卵、ひき肉をのせ、豚骨の澄んだ甘い出汁で。汁あり・汁なし選べます。'),
        'ko': ('후띠우 남방 - 남부식 쌀국수 (Hủ Tiếu Nam Vang)', '쫄깃한 쌀면에 통통한 새우, 메추리알, 다진 고기를 얹은 담백하고 깔끔한 돼지사골 국수.'),
        'zh': ('金边海鲜猪肉粿条 (Hủ Tiếu Nam Vang)', '爽滑筋道粿条搭配大虾、鹌鹑蛋与鲜肉末，骨汤清甜醇美，干捞或汤食皆宜。')
    },
    'sang_4_3': {
        'en': ('Yellow Sticky Rice with Mung Bean (Xôi Xéo)', 'Steamed turmeric sticky rice wrapped in banana leaf, layered with shaved mung bean, chicken fat, and crispy shallots.'),
        'ja': ('ソイ・セオ - 緑豆おこわ (Xôi Xéo)', 'バナナの葉で包まれた温かい黄色のもち米に、滑らかな緑豆ペーストと香ばしい鶏油・揚げエシャロット。'),
        'ko': ('쏘이 쎄오 - 녹두 찹쌀밥 (Xôi Xéo)', '바나나잎에 싼 따뜻한 강황 찹쌀밥 위에 부드러운 녹두 고명과 고소한 샬롯 튀김을 얹은 하노이 명물.'),
        'zh': ('姜黄绿豆黄糯米饭 (Xôi Xéo)', '芭蕉叶包裹温热姜黄糯米饭，铺满细腻绿豆泥，淋纯正鸡油与酥香红葱头。')
    },
    'sang_3_1': {
        'en': ('Vietnamese Baguette with Pâté (Bánh Mì Pate)', 'Crispy warm baguette generously spread with homemade pork liver pâté, Vietnamese ham, cilantro, and chili.'),
        'ja': ('パテ・バインミー (Bánh Mì Pate)', '外はパリパリ中はふんわりのフランスパンに、濃厚な手作りレバーパテ、ハム、パクチーをサンド。'),
        'ko': ('반미 파테 - 파테 바게트 (Bánh Mì Pate)', '바삭하게 구운 바게트 속에 진한 수제 파테와 베트남 햄, 신선한 고수가 듬뿍 들어간 기본 반미.'),
        'zh': ('经典猪肝酱法棍 (Bánh Mì Pate)', '外酥内软温热法棍，抹满秘制香浓猪肝酱，夹越式肉火腿、黄瓜与新鲜芫荽。')
    },
    'sang_3_2': {
        'en': ('Crab Paste Noodle Soup (Bún Riêu Cua)', 'Tangy, savory tomato and freshwater crab paste broth with rice noodles, tofu, and pork blood curd.'),
        'ja': ('カニ汁麺・ブン・ジウ (Bún Riêu Cua)', '田ガニのすり身とトマトの爽やかな酸味が広がるスープに、米麺と揚げ豆腐を入れたベトナム定番麺。'),
        'ko': ('분 리에우 꾸아 - 게살 토마토 쌀국수 (Bún Riêu Cua)', '민물게 살과 신선한 토마토로 우려낸 새콤달콤한 국물에 튀긴 두부와 면을 곁들인 쌀국수.'),
        'zh': ('鲜茄田蟹膏汤米粉 (Bún Riêu Cua)', '淡水田蟹膏搭配鲜熟番茄熬制酸甜鲜醇汤底，配金黄炸豆腐与细腻米粉。')
    },
    'sv_morning_banh_bao': {
        'en': ('Steamed Pork Bun (Bánh Bao Nhân Thịt)', 'Piping hot fluffy steamed bun stuffed with seasoned minced pork, quail egg, Chinese sausage, and mushrooms.'),
        'ja': ('ベトナム風肉まん (Bánh Bao Nhân Thịt)', 'ふわふわ熱々の皮の中に、ジューシーな豚肉、うずら卵、中華ソーセージがぎっしり。'),
        'ko': ('반 바오 - 베트남식 고기만두 (Bánh Bao Nhân Thịt)', '포근한 찐빵 속에 양념 돼지고기, 메추리알, 소시지, 버섯이 꽉 찬 영양 간식.'),
        'zh': ('越式咸蛋肉包 (Bánh Bao Nhân Thịt)', '松软雪白面皮，包裹特调鲜猪肉馅、鹌鹑蛋、香菇与越式腊肠，热气腾腾。')
    },
    'sv_morning_banh_gio': {
        'en': ('Pyramid Rice Dumpling (Bánh Giò)', 'Silky soft rice dumpling wrapped in banana leaves, filled with minced pork, wood ear mushrooms, and shallots.'),
        'ja': ('バイン・ゾー - 蒸しピラミッド餅 (Bánh Giò)', 'バナナの葉に包まれた滑らかな米粉生地の中に、キクラゲと豚ひき肉の旨味が詰まった伝統蒸し菓子。'),
        'ko': ('반 조 - 피라미드 쌀떡 덤플링 (Bánh Giò)', '바나나잎에 싸서 찐 부드러운 쌀 반죽 속에 목이버섯과 다진 돼지고기를 채운 따뜻한 아침 식사.'),
        'zh': ('芭蕉叶越式肉粽 (Bánh Giò)', '嫩滑米粉糕裹入脆嫩木耳与鲜肉，芭蕉叶清香蒸透，软糯咸鲜。')
    },
    'more_morning_banh_uot': {
        'en': ('Wet Steamed Rice Sheets (Bánh Ướt)', 'Warm, silky sheets of steamed rice crepe served with Vietnamese pork sausage (chả lụa), herbs, and sweet fish sauce.'),
        'ja': ('バイン・ウオット - 蒸し生春巻き皮 (Bánh Ướt)', 'つるりとした薄い米粉シートに、ベトナムハムやハーブを添え、特製ヌクマムをかけて。'),
        'ko': ('반 uot - 얇은 쌀전병 (Bánh Ướt)', '부드럽고 얇은 쌀 전병 위에 베트남 햄(짜루아)과 허브를 곁들여 느억맘 소스에 비벼 먹습니다.'),
        'zh': ('越式素蒸粉皮 (Bánh Ướt)', '薄透温热滑嫩蒸粉皮，配越式扎肉火腿与香菜，浇淋甜咸温和鱼露。')
    },
    'more_morning_banh_mi_xiu_mai': {
        'en': ('Baguette with Meatball Stew (Bánh Mì Xíu Mại)', 'Tender seasoned pork meatballs simmered in rich tomato broth, served with crisp warm baguette for dipping.'),
        'ja': ('ミートボール・バインミー (Bánh Mì Xíu Mại)', 'トマトベースの特製スープで煮込んだ柔らかい肉団子に、焼きたてバインミーを浸して食べるダラット名物。'),
        'ko': ('반미 시우마이 - 미트볼 바게트 (Bánh Mì Xíu Mại)', '토마토 소스에 푹 끓인 부드러운 돼지고기 미트볼에 바삭한 바게트를 찍어 먹는 든든한 한 끼.'),
        'zh': ('番茄鲜肉丸法棍 (Bánh Mì Xíu Mại)', '酸甜茄汁文火慢煨软嫩猪肉丸，配酥香法棍面包蘸浓郁汤汁，暖心治愈。')
    },

    # Lunch dishes
    'trua_5_1': {
        'en': ('Broken Rice with Grilled Pork Chop (Cơm Tấm)', 'Charcoal-grilled marinated pork chop over fragrant broken rice, with scallion oil, steamed egg meatloaf, and shredded pork skin.'),
        'ja': ('コムタム・豚ロース焼きご飯 (Cơm Tấm)', '香ばしい炭火焼きポークチョップにネギ油、スチーム卵焼き、豚皮細切りを添えたサイゴン名物の砕米ご飯。'),
        'ko': ('껌 땀 - 숯불 돼지갈비 덮밥 (Cơm Tấm)', '달콤 짭조름한 숯불 돼지갈비와 파기름, 계란찜, 돼지껍질 채를 얹은 사이공 대표 덮밥.'),
        'zh': ('西贡碎米炭烤猪排饭 (Cơm Tấm)', '炭火香烤秘制猪扒淋葱油，佐以蒸蛋肉饼与细切肉皮，搭配经典酸甜鱼露。')
    },
    'trua_5_2': {
        'en': ('Hanoi Grilled Pork with Vermicelli (Bún Chả)', 'Caramelized charcoal-grilled pork patties and pork belly in warm sweet-savory broth with rice vermicelli and herbs.'),
        'ja': ('ブン・チャー - ハノイ風つけ麺 (Bún Chả)', '炭火で香ばしく焼いた豚肉団子とバラ肉が入った温かい甘酸っぱいタレに、米麺と香草をつけて。'),
        'ko': ('분 짜 - 하노이식 숯불고기 비빔국수 (Bún Chả)', '달콤새콤한 느억맘 육수에 숯불 향 가득한 완자와 삼겹살을 쌀국수, 신선한 야채와 함께 적셔 먹습니다.'),
        'zh': ('河内炭烤猪肉蘸汁米粉 (Bún Chả)', '炭火现烤猪肉丸与五花肉浸入温热酸甜特调鱼露汁，配纯白米粉与清爽香草。')
    },
    'trua_5_3': {
        'en': ('Crispy Chicken Fried Rice (Cơm Gà Xối Mỡ)', 'Whole fried chicken quarter with ultra-crispy skin over golden turmeric fried rice, accompanied by spicy soy garlic sauce.'),
        'ja': ('コム・ガー・ソイ・モー - パリパリ揚げ鶏飯 (Cơm Gà Xối Mỡ)', '皮は驚くほどパリパリ、中はジューシーな大山鶏もも肉を、香ばしいガーリックライスとともに。'),
        'ko': ('껌 가 쏘이 모 - 크리스피 치킨 덮밥 (Cơm Gà Xối Mỡ)', '겉은 바삭하고 속은 촉촉한 닭다리 구이를 고소한 강황 볶음밥과 매콤 달콤 간장 소스에 곁들입니다.'),
        'zh': ('金牌脆皮炸鸡油饭 (Cơm Gà Xối Mỡ)', '外皮薄脆酥香、肉汁丰盈的大鸡腿，配金黄鸡油炒饭与秘制蒜香红油酱油。')
    },
    'trua_4_1': {
        'en': ('Quang-style Turmeric Noodles (Mì Quảng)', 'Wide yellow turmeric noodles in a shallow, intense broth topped with shrimp, pork, roasted peanuts, and crispy rice cracker.'),
        'ja': ('ミークアン - 中部風和え麺 (Mì Quảng)', '鮮やかな黄色い平打ち麺に海老、豚肉、砕いたピーナッツ、ライスクラッカーをのせたダナン・ホイアン名物。'),
        'ko': ('미꽝 - 다낭식 비빔 쌀국수 (Mì Quảng)', '노란 강황 넓은 면에 새우, 돼지고기, 고소한 땅콩과 바삭한 라이스 크래커를 자작한 육수에 비벼 먹습니다.'),
        'zh': ('岘港广南姜黄拌面 (Mì Quảng)', '金黄姜黄宽米粉拌入浓醇少汁卤汤，铺鲜虾、猪肉、香脆花生碎与越式烤米饼。')
    },
    'trua_4_2': {
        'en': ('Grilled Pork Noodle Salad (Bún Thịt Nướng)', 'Rice vermicelli bowl layered with lemongrass-grilled pork, crispy spring rolls, fresh herbs, peanuts, and chili nuoc cham.'),
        'ja': ('ブン・ティット・ヌオン - 豚焼き肉のせ和え麺 (Bún Thịt Nướng)', 'レモングラス香る炭火豚肉と揚げ春巻きを米麺にのせ、生野菜とピーナッツ、ヌクマムダレで豪快に混ぜて。'),
        'ko': ('분 팃 느엉 - 숯불 돼지고기 비빔국수 (Bún Thịt Nướng)', '향긋한 레몬글라스 숯불구이 돼지고기, 바삭한 짜조, 채소를 땅콩과 새콤달콤 소스에 비벼 먹는 국수.'),
        'zh': ('香茅炭烤猪肉干拌粉 (Bún Thịt Nướng)', '炭烤香茅猪肉片配酥脆炸春卷，拌入大量生菜、炸花生粒与酸甜辣椒鱼露。')
    },
    'trua_3_1': {
        'en': ('Fried Rice with Beef and Pickled Greens (Cơm Rang Dưa Bò)', 'Wok-charred fried rice topped with tender beef strips stir-fried with crunchy, tangy pickled mustard greens.'),
        'ja': ('高菜と牛肉の炒飯 (Cơm Rang Dưa Bò)', 'パラパラに炒めたご飯に、甘酸っぱい発酵からし菜と柔らかい牛肉の炒めものを合わせた北部の人気飯。'),
        'ko': ('껌 랑 주아 보 - 소고기 갓김치 볶음밥 (Cơm Rang Dưa Bò)', '센 불에 볶아낸 고슬고슬한 볶음밥 위에 새콤한 절임 갓과 부드러운 소고기 볶음을 얹은 메뉴.'),
        'zh': ('酸菜牛肉粒黄金炒饭 (Cơm Rang Dưa Bò)', '大火粒粒分明镬气炒饭，配上酸爽开胃酸菜炒鲜嫩牛肉片，百吃不腻。')
    },
    'trua_3_2': {
        'en': ('Hanoi Mixed Dry Pho (Phở Trộn)', 'Fresh flat rice noodles tossed in a sweet-savory soy dressing with shredded chicken or beef, herbs, and crushed peanuts.'),
        'ja': ('フォー・チョン - 混ぜフォー (Phở Trộn)', '茹でたて平打ちフォーに蒸し鶏や牛肉、揚げエシャロット、ピーナッツを特製甘酸っぱいタレで和えて。'),
        'ko': ('퍼 쫀 - 하노이식 비빔 쌀국수 (Phở Trộn)', '부드러운 쌀면에 닭고기 또는 소고기, 신선한 야채, 땅콩을 새콤달콤 특제 간장 소스에 비빈 여름 별미.'),
        'zh': ('河内特调酸甜拌河粉 (Phở Trộn)', '爽滑宽河粉拌入秘制浓香酱汁，铺嫩撕鸡肉或牛肉片、脆花生与新鲜薄荷叶。')
    },
    'sv_lunch_banh_canh': {
        'en': ('Thick Tapioca Noodle Soup (Bánh Canh)', 'Chewy, thick tapioca-rice noodles in rich savory broth with tender pork, shrimp, and fresh cilantro.'),
        'ja': ('バイン・カン - 極太もちもちうどん (Bánh Canh)', 'タピオカ粉入りの極太モチモチ麺を、豚骨や海鮮の旨味が凝縮した濃厚とろみスープで。'),
        'ko': ('반 까인 - 굵은 쌀우동 (Bánh Canh)', '타피오카가 들어가 쫄깃쫄깃하고 통통한 굵은 면에 진하고 깊은 고기 해산물 육수가 가득.'),
        'zh': ('浓汤粗圆木薯米粉 (Bánh Canh)', '滑糯筋道粗木薯米粉，配鲜甜排骨大虾慢熬浓汤，口感温润醇厚。')
    },
    'sv_lunch_bun_mam': {
        'en': ('Mekong Fermented Fish Noodle Soup (Bún Mắm)', 'Bold, fragrant fermented fish broth filled with crispy pork belly, shrimp, squid, eggplant, and water spinach.'),
        'ja': ('ブン・マム - メコン風発酵魚粉 (Bún Mắm)', '発酵魚の奥深い特製スープに、カリカリ豚バラ、海老、イカ、茄子を贅沢にトッピング。'),
        'ko': ('분 맘 - 메콩식 발효 생선 쌀국수 (Bún Mắm)', '메콩강 특유의 발효 어간장 육수에 바삭한 삼겹살, 새우, 오징어, 가지를 푸짐하게 얹은 요리.'),
        'zh': ('湄公河海鲜发酵鱼汤米粉 (Bún Mắm)', '南越特产香浓鱼露发酵汤底，豪迈加入脆皮烧肉、鲜虾、鱿鱼与多汁茄子。')
    },
    'sv_lunch_sang_4_2': {
        'en': ('Nam Vang Clear Noodle Soup (Hủ Tiếu Nam Vang)', 'Chewy noodles topped with plump shrimp, quail eggs, and minced pork in clear sweet pork bone broth.'),
        'ja': ('フーティウ・ナムヴァン (Hủ Tiếu Nam Vang)', 'コシのある米麺にプリプリの海老、うずら卵、ひき肉をのせ、豚骨の澄んだ甘い出汁で。'),
        'ko': ('후띠우 남방 - 남부식 쌀국수 (Hủ Tiếu Nam Vang)', '쫄깃한 쌀면에 통통한 새우, 메추리알, 다진 고기를 얹은 담백하고 깔끔한 돼지사골 국수.'),
        'zh': ('金边海鲜猪肉粿条 (Hủ Tiếu Nam Vang)', '爽滑筋道粿条搭配大虾、鹌鹑蛋与鲜肉末，骨汤清甜醇美。')
    },
    'more_lunch_com_chien': {
        'en': ('Special Combination Fried Rice (Cơm Chiên Thập Cẩm)', 'Fragrant jasmine fried rice wok-tossed with Chinese sausage, shrimp, pork, eggs, and sweet peas.'),
        'ja': ('五目パラパラ炒飯 (Cơm Chiên Thập Cẩm)', '中華ソーセージ、海老、卵、野菜を強火でパラパラに炒め上げた王道ベトナムチャーハン。'),
        'ko': ('껌 치엔 텁껌 - 모둠 볶음밥 (Cơm Chiên Thập Cẩm)', '소시지, 새우, 돼지고기, 계란, 채소를 센 불에 볶아 고소한 풍미가 가득한 전통 볶음밥.'),
        'zh': ('扬州风味什锦炒饭 (Cơm Chiên Thập Cẩm)', '越式腊肠粒、大虾仁、鲜鸡蛋与甜青豆大火爆炒，粒粒金黄喷香。')
    },
    'more_lunch_com_ca_man': {
        'en': ('Claypot Salted Fish Fried Rice (Cơm Cá Mặn)', 'Aromatic fried rice tossed with shredded savory salted fish and tender minced chicken in a hot claypot.'),
        'ja': ('塩漬け魚と鶏肉の土鍋炒飯 (Cơm Cá Mặn)', '香ばしい塩魚のほぐし身と鶏ひき肉を強火で炒め、土鍋でおこげの風味を引き出した絶品飯。'),
        'ko': ('껌 까 만 - 짠 생선 치킨 볶음밥 (Cơm Cá Mặn)', '짭조름한 염장 생선 살과 닭고기를 넣고 볶아내 감칠맛과 불향이 일품인 볶음밥.'),
        'zh': ('咸鱼鸡粒热煲炒饭 (Cơm Cá Mặn)', '地道咸鱼拆肉金黄爆香，与鲜鸡肉粒同炒，焦香四溢镬气十足。')
    },
    'more_lunch_bun_thai': {
        'en': ('Seafood Tom Yum Noodle Soup (Bún Thái)', 'Spicy and sour Thai-style broth packed with fresh shrimp, squid, clams, mushrooms, and herbs over vermicelli.'),
        'ja': ('ブン・タイ - トムヤム海鮮麺 (Bún Thái)', 'レモングラスとタマリンドの甘酸っぱくスパイシーなスープに、海老やイカなど海の幸がたっぷり。'),
        'ko': ('분 타이 - 똠얌 해물 쌀국수 (Bún Thái)', '매콤새콤한 똠얌 육수에 싱싱한 새우, 오징어, 조개와 향신채를 듬뿍 넣은 해물 쌀국수.'),
        'zh': ('泰式冬阴功海鲜米粉 (Bún Thái)', '酸辣开胃冬阴功汤底，融汇香茅与南姜香气，大虾鱿鱼鲜嫩爽口。')
    },
    'more_lunch_bun_hen': {
        'en': ('Hue Baby Clam Vermicelli (Bún Hến)', 'Rice vermicelli bowl served with seasoned baby clams, crunchy pork cracklings, peanuts, and savory clam broth.'),
        'ja': ('ブン・ヘン - シジミ和え麺 (Bún Hến)', '小ぶりなシジミの旨味、カリカリの豚皮揚げ、ピーナッツ、ハーブを混ぜ、温かいシジミスープとともに。'),
        'ko': ('분 헨 - 후에식 재첩 비빔국수 (Bún Hến)', '작은 재첩 살과 바삭한 돼지껍질 튀김, 땅콩을 쌀국수와 비벼 시원한 재첩 육수를 곁들이는 후에 요리.'),
        'zh': ('顺化小蚬肉干拌粉 (Bún Hến)', '鲜香清甜小蚬肉配炸猪皮、脆花生与新鲜薄荷，附带一碗醇鲜蚬子原汤。')
    },

    # Afternoon dishes
    'chieu_5_1': {
        'en': ('Crispy Vietnamese Pancake (Bánh Xèo)', 'Giant golden crispy turmeric crepe folded with shrimp, pork belly, and bean sprouts, served with mustard greens and herbs.'),
        'ja': ('バインセオ - ベトナム風お好み焼き (Bánh Xèo)', 'ターメリック入りの極薄サクサク生地に海老や豚肉、もやしを挟み、たっぷりの葉野菜で巻いて召し上がれ。'),
        'ko': ('반 쎄오 - 베트남식 바삭 부침개 (Bánh Xèo)', '쌀가루와 강황으로 튀기듯 부쳐낸 바삭한 전 안에 새우, 돼지고기, 숙주를 넣고 쌈 채소에 싸 먹습니다.'),
        'zh': ('金黄酥脆越式黄煎饼 (Bánh Xèo)', '椰浆姜黄酥脆薄皮，包入鲜虾、五花肉与爽脆豆芽，用芥菜新鲜包裹蘸特调水蘸汁。')
    },
    'chieu_5_2': {
        'en': ('Fresh Summer Spring Rolls (Gỏi Cuốn)', 'Translucent rice paper rolls filled with boiled shrimp, sliced pork, vermicelli, and aromatic herbs, paired with peanut sauce.'),
        'ja': ('生春巻き (Gỏi Cuốn)', '透き通るライスペーパーで海老、豚肉、米麺、ミントを巻き、濃厚な自家製ピーナッツ味噌ダレで。'),
        'ko': ('고이 꾸온 - 베트남 생월남쌈 (Gỏi Cuốn)', '투명한 라이스페이퍼에 탱글탱글한 새우, 돼지고기, 쌀국수, 신선한 야채를 말아 고소한 땅콩소스에 찍어 먹습니다.'),
        'zh': ('鲜虾猪肉越式生春卷 (Gỏi Cuốn)', '晶莹透亮薄米纸卷入甜虾、白切肉、米粉与清香薄荷，蘸醇滑秘制花生酱。')
    },
    'chieu_4_1': {
        'en': ('Mini Crispy Savory Pancakes (Bánh Khọt)', 'Bite-sized crispy coconut rice cakes topped with sweet shrimp and scallion oil, wrapped in leafy herbs.'),
        'ja': ('バイン・コット - ミニ海老パンケーキ (Bánh Khọt)', 'ココナッツ香る一口サイズのカリカリ生地にプリプリの海老をのせ、青パパイヤ入りタレとともに。'),
        'ko': ('반 콧 - 미니 새우 바삭 팬케이크 (Bánh Khọt)', '코코넛 향이 감도는 한입 크기 바삭한 쌀 반죽 위에 통새우와 파기름을 얹은 붕따우 명물.'),
        'zh': ('头顿椰香脆皮虾盏 (Bánh Khọt)', '小巧圆盏铁模煎至底部酥脆，上面镶嵌鲜甜整虾与翠绿葱油，裹生菜食用。')
    },
    'chieu_4_2': {
        'en': ('Fried Rice Flour Cakes with Eggs (Bột Chiên)', 'Cubed rice flour cakes fried golden and crisp in a hot pan, coated with beaten eggs, green onions, and sweet soy sauce.'),
        'ja': ('ボット・チエン - 揚げ米粉餅の卵とじ (Bột Chiên)', '表面をカリカリに焼き上げた四角い米粉餅に卵を絡め、細切り青パパイヤと甘口醤油で。'),
        'ko': ('봇 치엔 - 쌀떡 계란 부침 (Bột Chiên)', '주사위 모양의 쌀떡을 철판에 바삭하게 구워 계란을 입힌 후 파파야 채와 특제 간장소스를 뿌려 먹습니다.'),
        'zh': ('西贡香煎米糕炒鸡蛋 (Bột Chiên)', '白米糕切方块铁板煎至金黄焦脆，裹满金黄蛋液，佐甜酱油与青木瓜丝。')
    },
    'chieu_3_1': {
        'en': ('Clear Tapioca Shrimp Dumplings (Bánh Bột Lọc)', 'Translucent chewy tapioca dumplings stuffed with savory caramelized shrimp and pork belly, sprinkled with fried shallots.'),
        'ja': ('バイン・ボット・ロック - タピオカ海老餃子 (Bánh Bột Lọc)', 'ぷるぷる透明なタピオカ粉の皮に、甘辛く煮た小海老と豚肉を包んだフエ伝統の絶品点心。'),
        'ko': ('반 봇 록 - 투명 타피오카 새우 덤플링 (Bánh Bột Lọc)', '쫀득하고 투명한 타피오카 피에 조린 새우와 삼겹살을 넣어 바나나잎에 찐 후에식 만두.'),
        'zh': ('晶莹透明木薯鲜虾饺 (Bánh Bột Lọc)', '通体晶亮弹牙木薯皮，内裹浓郁焦糖香炒小河虾与五花肉，软糯咸鲜。')
    },
    'chieu_3_2': {
        'en': ('Vietnamese Crab and Asparagus Soup (Súp Cua)', 'Comforting velvety soup filled with shredded crab meat, quail eggs, sweet corn, shiitake mushrooms, and cilantro.'),
        'ja': ('スップ・クア - 蟹肉のとろみスープ (Súp Cua)', 'たっぷりの本蟹肉、うずら卵、スイートコーン、キノコが入った熱々で優しい味わいのとろみスープ。'),
        'ko': ('숩 꾸아 - 게살 계란 수프 (Súp Cua)', '부드러운 게살, 메추리알, 옥수수, 버섯이 듬뿍 들어간 속 편하고 따뜻한 영양 보양 수프.'),
        'zh': ('越式鲜蟹肉浓稠羹汤 (Súp Cua)', '拆丝鲜蟹肉配鹌鹑蛋、甜玉米粒与香菇丝，汤羹丝滑浓醇，暖胃润喉。')
    },
    'sv_afternoon_banh_bao': {
        'en': ('Steamed Pork Bun (Bánh Bao Nhân Thịt)', 'Piping hot fluffy steamed bun stuffed with seasoned minced pork, quail egg, Chinese sausage, and mushrooms.'),
        'ja': ('ベトナム風肉まん (Bánh Bao Nhân Thịt)', 'ふわふわ熱々の皮の中に、ジューシーな豚肉、うずら卵、中華ソーセージがぎっしり。'),
        'ko': ('반 바오 - 베트남식 고기만두 (Bánh Bao Nhân Thịt)', '포근한 찐빵 속에 양념 돼지고기, 메추리알, 소시지, 버섯이 꽉 찬 영양 간식.'),
        'zh': ('越式咸蛋肉包 (Bánh Bao Nhân Thịt)', '松软雪白面皮，包裹特调鲜猪肉馅、鹌鹑蛋、香菇与越式腊肠。')
    },
    'sv_afternoon_banh_gio': {
        'en': ('Pyramid Rice Dumpling (Bánh Giò)', 'Silky soft rice dumpling wrapped in banana leaves, filled with minced pork, wood ear mushrooms, and shallots.'),
        'ja': ('バイン・ゾー - 蒸しピラミッド餅 (Bánh Giò)', 'バナナの葉に包まれた滑らかな米粉生地の中に、キクラゲと豚ひき肉の旨味が詰まった伝統蒸し菓子。'),
        'ko': ('반 조 - 피라미드 쌀떡 덤플링 (Bánh Giò)', '바나나잎에 싸서 찐 부드러운 쌀 반죽 속에 목이버섯과 다진 돼지고기를 채운 따뜻한 간식.'),
        'zh': ('芭蕉叶越式肉粽 (Bánh Giò)', '嫩滑米粉糕裹入脆嫩木耳与鲜肉，芭蕉叶清香蒸透，软糯咸鲜。')
    },
    'sv_afternoon_pha_lau': {
        'en': ('Braised Beef Offal with Baguette (Phá Lấu Bánh Mì)', 'Rich coconut milk braised beef stew served with chili tamarind dipping sauce and a crispy warm baguette.'),
        'ja': ('ファー・ラウ - 牛モツのココナッツ煮 (Phá Lấu Bánh Mì)', 'ココナッツミルクと五香粉で柔らかく煮込んだ牛モツに、甘酸っぱいタマリンドダレとパンを添えて。'),
        'ko': ('파 라우 - 소 내장 코코넛 조림 바게트 (Phá Lấu Bánh Mì)', '달콤하고 고소한 코코넛 밀크에 푹 끓여낸 쫄깃한 소 내장을 새콤달콤 타마린드 소스와 바게트에 곁들입니다.'),
        'zh': ('椰香五香卤牛杂配法棍 (Phá Lấu Bánh Mì)', '浓郁椰奶配特选五香炖软烂牛杂，蘸金橘罗望子辣椒酱，佐热法棍。')
    },
    'more_afternoon_banh_uot': {
        'en': ('Wet Steamed Rice Sheets (Bánh Ướt)', 'Warm, silky sheets of steamed rice crepe served with Vietnamese pork sausage (chả lụa), herbs, and sweet fish sauce.'),
        'ja': ('バイン・ウオット - 蒸し生春巻き皮 (Bánh Ướt)', 'つるりとした薄い米粉シートに、ベトナムハムやハーブを添え、特製ヌクマムをかけて。'),
        'ko': ('반 uot - 얇은 쌀전병 (Bánh Ướt)', '부드럽고 얇은 쌀 전병 위에 베트남 햄(짜루아)과 허브를 곁들여 느억맘 소스에 비벼 먹습니다.'),
        'zh': ('越式素蒸粉皮 (Bánh Ướt)', '薄透温热滑嫩蒸粉皮，配越式扎肉火腿与香菜，浇淋甜咸温和鱼露。')
    },
    'more_afternoon_banh_mi_xiu_mai': {
        'en': ('Baguette with Meatball Stew (Bánh Mì Xíu Mại)', 'Tender seasoned pork meatballs simmered in rich tomato broth, served with crisp warm baguette for dipping.'),
        'ja': ('ミートボール・バインミー (Bánh Mì Xíu Mại)', 'トマトベースの特製スープで煮込んだ柔らかい肉団子に、焼きたてバインミーを浸して食べるダラット名物。'),
        'ko': ('반미 시우마이 - 미트볼 바게트 (Bánh Mì Xíu Mại)', '토마토 소스에 푹 끓인 부드러운 돼지고기 미트볼에 바삭한 바게트를 찍어 먹는 든든한 한 끼.'),
        'zh': ('番茄鲜肉丸法棍 (Bánh Mì Xíu Mại)', '酸甜茄汁文火慢煨软嫩猪肉丸，配酥香法棍面包蘸浓郁汤汁。')
    },

    # Dinner dishes
    'toi_5_1': {
        'en': ('Mini Thai Hotpot (Lẩu Thái Mini)', 'Steaming individual tom yum pot loaded with fresh shrimp, squid, beef slices, mushrooms, and greens in lemongrass broth.'),
        'ja': ('ミニ・トムヤム鍋 (Lẩu Thái Mini)', 'レモングラスとハーブ香る甘酸っぱくスパイシーなスープに、海老、イカ、牛肉、キノコを入れた小鍋。'),
        'ko': ('미니 타이 해물 샤브샤브 (Lẩu Thái Mini)', '싱싱한 새우, 오징어, 소고기와 채소가 가득한 향긋하고 칼칼한 똠얌 1인 전골 냄비.'),
        'zh': ('泰式冬阴功单人小火锅 (Lẩu Thái Mini)', '香茅柠檬叶慢火滚煨酸辣浓汤，盛满大虾、鱿鱼、肥牛卷与爽口菌菇鲜蔬。')
    },
    'toi_5_2': {
        'en': ('Tofu, Pork Belly, and Fermented Shrimp Paste Noodles (Bún Đậu Mắm Tôm)', 'Crisp fried tofu cubes, boiled pork belly, crispy rice pork patties, and herbs served with pungent whipped shrimp paste dip.'),
        'ja': ('ブン・ダウ・マム・トム (Bún Đậu Mắm Tôm)', '揚げたて熱々の豆腐、茹で豚バラ、揚げ豚肉パテを、泡立てた特製エビ発酵ダレ(マムトム)につけて。'),
        'ko': ('분 더우 맘 똠 (Bún Đậu Mắm Tôm)', '겉바속촉 튀긴 두부, 부드러운 수육, 꼼 소시지를 쿰쿰하고 매력적인 발효 새우젓(맘똠)에 찍어 먹는 하노이 정통 요리.'),
        'zh': ('河内炸豆腐五花肉蘸虾酱米粉 (Bún Đậu Mắm Tôm)', '金黄外脆内嫩现炸豆腐，配白灼五花肉片、香脆米绿肉饼与特调发酵虾酱。')
    },
    'toi_5_3': {
        'en': ('Vietnamese Sizzling Marinated Beef (Bò Nướng)', 'Tender beef slices marinated with lemongrass, sesame, and butter, grilled table-side on tin foil with spicy dipping sauce.'),
        'ja': ('ベトナム風牛焼き肉 (Bò Nướng)', 'レモングラスやゴマで下味をつけた柔らかい牛肉を、バターを敷いた鉄板で香ばしく焼き上げて。'),
        'ko': ('보 느엉 - 베트남식 소고기 버터 구이 (Bò Nướng)', '레몬글라스와 참깨로 숙성한 부드러운 소고기를 버터와 함께 즉석에서 구워 먹는 별미.'),
        'zh': ('越式香芒黄油炭烤嫩牛肉 (Bò Nướng)', '香茅、秘制沙茶与芝麻腌渍极嫩牛肉片，加浓醇黄油在烤盘上滋滋现烤。')
    },
    'toi_4_1': {
        'en': ('Boiled Snails with Lemongrass and Ginger (Ốc Luộc)', 'Fresh sea snails steamed with fragrant lemongrass stems, kaffir lime leaves, and ginger, paired with tangy spicy ginger fish sauce.'),
        'ja': ('レモングラス蒸し巻き貝 (Ốc Luộc)', 'レモングラスやライムリーフとともにふっくら蒸し上げた新鮮な貝を、ショウガと唐辛子のタレで。'),
        'ko': ('옥 루옥 - 레몬글라스 골뱅이 찜 (Ốc Luộc)', '신선한 고둥과 우렁이를 레몬글라스와 생강으로 쪄내 매콤알싸한 생강 느억맘에 찍어 먹습니다.'),
        'zh': ('香茅姜叶清蒸螺蛳 (Ốc Luộc)', '鲜活田螺配粗剖鲜香茅段与柠檬叶大火煮透，蘸特调姜汁酸甜红椒鱼露。')
    },
    'toi_4_2': {
        'en': ('Sizzling Sliced Beef on Cast Iron (Bò Né)', 'Sizzling hot cast iron skillet with tender beef steak, fried eggs, rich pâté, and melted butter, served with hot baguette.'),
        'ja': ('ボー・ネー - 鉄板サイコロステーキ (Bò Né)', '牛型鉄板でジュージュー焼かれた柔らかい牛肉、目玉焼き、パテ、バターを熱々のバインミーとともに。'),
        'ko': ('보 네 - 베트남식 철판 스테이크 (Bò Né)', '뜨거운 소 모양 철판 위에 부드러운 소고기 스테이크, 계란후라이, 파테, 버터를 바게트와 함께 즐깁니다.'),
        'zh': ('越式铁板滑蛋嫩牛柳 (Bò Né)', '牛形烧热铸铁盘，盛放蒜香牛柳条、荷包蛋、香润肉酱与融化黄油，佐以香脆法棍。')
    },
    'toi_3_1': {
        'en': ('Silky Pork Rib Rice Porridge (Cháo Sườn)', 'Velvety smooth rice porridge slow-simmered with tender pork ribs, garnished with shredded pork floss and crispy crullers (quẩy).'),
        'ja': ('チャオ・スオン - 豚あばら肉のトロトロお粥 (Cháo Sườn)', '豚スペアリブの出汁でじっくり炊き上げたシルクのように滑らかなお粥に、揚げパン(クワイ)と豚肉フロスを添えて。'),
        'ko': ('짜오 쓰언 - 돼지갈비 쌀죽 (Cháo Sườn)', '돼지등갈비를 푹 고아 부드럽고 실크처럼 끓여낸 쌀죽에 바삭한 꽈배기 튀김(꿔이)을 곁들입니다.'),
        'zh': ('软滑生滚排骨稠粥 (Cháo Sườn)', '精磨米浆慢火熬至绸缎般细腻，融汇排骨鲜香，撒蓬松肉松与酥脆油条段。')
    },
    'toi_3_2': {
        'en': ('Chicken Glass Noodle Soup (Miến Gà)', 'Clear, fragrant chicken bone broth with chewy mung bean glass noodles, poached free-range chicken, and fresh kaffir lime leaves.'),
        'ja': ('ミエン・ガー - 鶏肉と春雨のスープ (Miến Gà)', '旨味たっぷりの丸鶏スープに、コシのある緑豆春雨と歯ごたえある地鶏肉、ライムリーフの香りを添えて。'),
        'ko': ('미엔 가 - 닭고기 당면 쌀국수 (Miến Gà)', '진한 토종닭 육수에 쫄깃한 녹두 당면과 쫄깃한 닭고기살, 상큼한 라임 잎을 띄운 맑은 탕.'),
        'zh': ('青柠叶土鸡水晶冬粉 (Miến Gà)', '老母鸡慢火炖出澄黄清汤，滑韧绿豆粉丝配鲜嫩手撕走地鸡肉与细切柠檬叶丝。')
    },
    'sv_dinner_banh_canh': {
        'en': ('Thick Tapioca Noodle Soup (Bánh Canh)', 'Chewy, thick tapioca-rice noodles in rich savory broth with tender pork, shrimp, and fresh cilantro.'),
        'ja': ('バイン・カン - 極太もちもちうどん (Bánh Canh)', 'タピオカ粉入りの極太モチモチ麺を、豚骨や海鮮の旨味が凝縮した濃厚とろみスープで。'),
        'ko': ('반 까인 - 굵은 쌀우동 (Bánh Canh)', '타피오카가 들어가 쫄깃쫄깃하고 통통한 굵은 면에 진하고 깊은 고기 해산물 육수가 가득.'),
        'zh': ('浓汤粗圆木薯米粉 (Bánh Canh)', '滑糯筋道粗木薯米粉，配鲜甜排骨大虾慢熬浓汤。')
    },
    'sv_dinner_pha_lau': {
        'en': ('Braised Beef Offal with Baguette (Phá Lấu Bánh Mì)', 'Rich coconut milk braised beef stew served with chili tamarind dipping sauce and a crispy warm baguette.'),
        'ja': ('ファー・ラウ - 牛モツのココナッツ煮 (Phá Lấu Bánh Mì)', 'ココナッツミルクと五香粉で柔らかく煮込んだ牛モツに、甘酸っぱいタマリンドダレとパンを添えて。'),
        'ko': ('파 라우 - 소 내장 코코넛 조림 바게트 (Phá Lấu Bánh Mì)', '달콤하고 고소한 코코넛 밀크에 푹 끓여낸 쫄깃한 소 내장을 새콤달콤 타마린드 소스와 바게트에 곁들입니다.'),
        'zh': ('椰香五香卤牛杂配法棍 (Phá Lấu Bánh Mì)', '浓郁椰奶配特选五香炖软烂牛杂，蘸金橘罗望子辣椒酱，佐热法棍。')
    },
    'sv_dinner_trua_5_1': {
        'en': ('Broken Rice with Grilled Pork Chop (Cơm Tấm)', 'Charcoal-grilled marinated pork chop over fragrant broken rice, with scallion oil, steamed egg meatloaf, and shredded pork skin.'),
        'ja': ('コムタム・豚ロース焼きご飯 (Cơm Tấm)', '香ばしい炭火焼きポークチョップにネギ油、スチーム卵焼き、豚皮細切りを添えたサイゴン名物の砕米ご飯。'),
        'ko': ('껌 땀 - 숯불 돼지갈비 덮밥 (Cơm Tấm)', '달콤 짭조름한 숯불 돼지갈비와 파기름, 계란찜, 돼지껍질 채를 얹은 사이공 대표 덮밥.'),
        'zh': ('西贡碎米炭烤猪排饭 (Cơm Tấm)', '炭火香烤秘制猪扒淋葱油，佐以蒸蛋肉饼与细切肉皮。')
    },
    'sv_dinner_trua_5_3': {
        'en': ('Crispy Chicken Fried Rice (Cơm Gà Xối Mỡ)', 'Whole fried chicken quarter with ultra-crispy skin over golden turmeric fried rice, accompanied by spicy soy garlic sauce.'),
        'ja': ('コム・ガー・ソイ・モー - パリパリ揚げ鶏飯 (Cơm Gà Xối Mỡ)', '皮は驚くほどパリパリ、中はジューシーな大山鶏もも肉を、香ばしいガーリックライスとともに。'),
        'ko': ('껌 가 쏘이 모 - 크리스피 치킨 덮밥 (Cơm Gà Xối Mỡ)', '겉은 바삭하고 속은 촉촉한 닭다리 구이를 고소한 강황 볶음밥과 매콤 달콤 간장 소스에 곁들입니다.'),
        'zh': ('金牌脆皮炸鸡油饭 (Cơm Gà Xối Mỡ)', '外皮薄脆酥香、肉汁丰盈的大鸡腿，配金黄鸡油炒饭。')
    },
    'sv_dinner_sang_3_2': {
        'en': ('Crab Paste Noodle Soup (Bún Riêu Cua)', 'Tangy, savory tomato and freshwater crab paste broth with rice noodles, tofu, and pork blood curd.'),
        'ja': ('カニ汁麺・ブン・ジウ (Bún Riêu Cua)', '田ガニのすり身とトマトの爽やかな酸味が広がるスープに、米麺と揚げ豆腐を入れたベトナム定番麺。'),
        'ko': ('분 리에우 꾸아 - 게살 토마토 쌀국수 (Bún Riêu Cua)', '민물게 살과 신선한 토마토로 우려낸 새콤달콤한 국물에 튀긴 두부와 면을 곁들인 쌀국수.'),
        'zh': ('鲜茄田蟹膏汤米粉 (Bún Riêu Cua)', '淡水田蟹膏搭配鲜熟番茄熬制酸甜鲜醇汤底，配金黄炸豆腐与细腻米粉。')
    },
    'sv_dinner_chieu_4_2': {
        'en': ('Fried Rice Flour Cakes with Eggs (Bột Chiên)', 'Cubed rice flour cakes fried golden and crisp in a hot pan, coated with beaten eggs, green onions, and sweet soy sauce.'),
        'ja': ('ボット・チエン - 揚げ米粉餅の卵とじ (Bột Chiên)', '表面をカリカリに焼き上げた四角い米粉餅に卵を絡め、細切り青パパイヤと甘口醤油で。'),
        'ko': ('봇 치엔 - 쌀떡 계란 부침 (Bột Chiên)', '주사위 모양의 쌀떡을 철판에 바삭하게 구워 계란을 입힌 후 파파야 채와 특제 간장소스를 뿌려 먹습니다.'),
        'zh': ('西贡香煎米糕炒鸡蛋 (Bột Chiên)', '白米糕切方块铁板煎至金黄焦脆，裹满金黄蛋液，佐甜酱油。')
    },
    'more_dinner_com_chien': {
        'en': ('Special Combination Fried Rice (Cơm Chiên Thập Cẩm)', 'Fragrant jasmine fried rice wok-tossed with Chinese sausage, shrimp, pork, eggs, and sweet peas.'),
        'ja': ('五目パラパラ炒飯 (Cơm Chiên Thập Cẩm)', '中華ソーセージ、海老、卵、野菜を強火でパラパラに炒め上げた王道ベトナムチャーハン。'),
        'ko': ('껌 치엔 텁껌 - 모둠 볶음밥 (Cơm Chiên Thập Cẩm)', '소시지, 새우, 돼지고기, 계란, 채소를 센 불에 볶아 고소한 풍미가 가득한 전통 볶음밥.'),
        'zh': ('扬州风味什锦炒饭 (Cơm Chiên Thập Cẩm)', '越式腊肠粒、大虾仁、鲜鸡蛋与甜青豆大火爆炒，粒粒金黄喷香。')
    },
    'more_dinner_com_ca_man': {
        'en': ('Claypot Salted Fish Fried Rice (Cơm Cá Mặn)', 'Aromatic fried rice tossed with shredded savory salted fish and tender minced chicken in a hot claypot.'),
        'ja': ('塩漬け魚と鶏肉の土鍋炒飯 (Cơm Cá Mặn)', '香ばしい塩魚のほぐし身と鶏ひき肉を強火で炒め、土鍋でおこげの風味を引き出した絶品飯。'),
        'ko': ('껌 까 만 - 짠 생선 치킨 볶음밥 (Cơm Cá Mặn)', '짭조름한 염장 생선 살과 닭고기를 넣고 볶아내 감칠맛과 불향이 일품인 볶음밥.'),
        'zh': ('咸鱼鸡粒热煲炒饭 (Cơm Cá Mặn)', '地道咸鱼拆肉金黄爆香，与鲜鸡肉粒同炒，焦香四溢镬气十足。')
    },
    'more_dinner_bun_thai': {
        'en': ('Seafood Tom Yum Noodle Soup (Bún Thái)', 'Spicy and sour Thai-style broth packed with fresh shrimp, squid, clams, mushrooms, and herbs over vermicelli.'),
        'ja': ('ブン・タイ - トムヤム海鮮麺 (Bún Thái)', 'レモングラスとタマリンドの甘酸っぱくスパイシーなスープに、海老やイカなど海の幸がたっぷり。'),
        'ko': ('분 타이 - 똠얌 해물 쌀국수 (Bún Thái)', '매콤새콤한 똠얌 육수에 싱싱한 새우, 오징어, 조개와 향신채를 듬뿍 넣은 해물 쌀국수.'),
        'zh': ('泰式冬阴功海鲜米粉 (Bún Thái)', '酸辣开胃冬阴功汤底，融汇香茅与南姜香气，大虾鱿鱼鲜嫩爽口。')
    },
    'more_dinner_bun_hen': {
        'en': ('Hue Baby Clam Vermicelli (Bún Hến)', 'Rice vermicelli bowl served with seasoned baby clams, crunchy pork cracklings, peanuts, and savory clam broth.'),
        'ja': ('ブン・ヘン - シジミ和え麺 (Bún Hến)', '小ぶりなシジミの旨味、カリカリの豚皮揚げ、ピーナッツ、ハーブを混ぜ、温かいシジミスープとともに。'),
        'ko': ('분 헨 - 후에식 재첩 비빔국수 (Bún Hến)', '작은 재첩 살과 바삭한 돼지껍질 튀김, 땅콩을 쌀국수와 비벼 시원한 재첩 육수를 곁들이는 후에 요리.'),
        'zh': ('顺化小蚬肉干拌粉 (Bún Hến)', '鲜香清甜小蚬肉配炸猪皮、脆花生与新鲜薄荷，附带一碗醇鲜蚬子原汤。')
    },

    # Snacks
    'vat_5_1': {
        'en': ('Mixed Rice Paper Salad (Bánh Tráng Trộn)', 'Torn rice paper shreds tossed with dried beef, green mango, quail eggs, fried shallots, Vietnamese coriander, and tangy chili dressing.'),
        'ja': ('バイン・チャン・チョン - ベトナム風ライスペーパー和え (Bánh Tráng Trộn)', '細切りライスペーパーに青マンゴー、干し牛肉、うずら卵、ハーブを合わせ、甘酸っぱいタマリンドダレで和えた大人気おやつ。'),
        'ko': ('반 짱 쫀 - 라이스페이퍼 비빔 무침 (Bánh Tráng Trộn)', '잘게 썬 라이스페이퍼에 그린망고, 육포, 메추리알, 튀긴 샬롯을 새콤달콤 타마린드 소스에 무쳐 먹는 국민 길거리 간식.'),
        'zh': ('西贡酸辣什锦拌米纸 (Bánh Tráng Trộn)', '细切薄韧米纸拌入青芒果丝、牛肉干碎、鹌鹑蛋与金不换香草，淋酸甜浓郁罗望子汁。')
    },
    'vat_5_2': {
        'en': ('Thai Mixed Dessert Soup (Chè Thái)', 'Sweet coconut milk dessert bowl brimming with jackfruit, durian, coconut jelly, ruby water chestnuts, and crushed ice.'),
        'ja': ('チェー・タイ - フルーツとゼリーのココナッツ練乳がけ (Chè Thái)', 'ジャックフルーツ、ドリアン、ロンガン、色鮮やかなゼリーに濃厚なココナッツミルクと氷を合わせたデザート。'),
        'ko': ('체 타이 - 타이식 과일 코코넛 화채 (Chè Thái)', '잭푸르트, 두리안, 젤리, 밤에 부드러운 코코넛 밀크와 갈아 넣은 얼음을 띄운 시원하고 달콤한 디저트.'),
        'zh': ('泰式椰汁多宝甜汤 (Chè Thái)', '椰浆冰沙盛满金黄菠萝蜜、榴莲果肉、清脆马蹄粉圆与椰果，甜爽沁凉。')
    },
    'vat_4_1': {
        'en': ('Deep-fried Fermented Pork Rolls (Nem Chua Rán)', 'Crispy golden on the outside, tender and slightly chewy on the inside, served hot with sweet-spicy chili dip.'),
        'ja': ('ネム・チュア・ザン - 揚げ発酵ソーセージ (Nem Chua Rán)', '外はサクサク、中はもっちりジューシーに揚げた発酵豚肉ロール。甘辛いチリソースにつけて。'),
        'ko': ('넴 쭈아 란 - 바삭 튀긴 베트남 소시지 (Nem Chua Rán)', '겉은 바삭하고 속은 쫄깃한 발효 돼지고기 롤 튀김에 매콤달콤 칠리소스를 찍어 먹는 하노이 골목 인기 간식.'),
        'zh': ('香脆炸越式发酵酸肉棒 (Nem Chua Rán)', '外层金黄脆香，内里微酸弹牙鲜韧，热气腾腾蘸甜辣酱。')
    },
    'vat_4_2': {
        'en': ('Grilled Rice Paper "Vietnamese Pizza" (Bánh Tráng Nướng)', 'Crisp charcoal-grilled rice paper topped with butter, quail egg, minced pork, scallions, dried shrimp, and spicy mayo.'),
        'ja': ('バイン・チャン・ヌオン - ベトナム風ピザ (Bánh Tráng Nướng)', '炭火で香ばしく焼いたライスペーパーに、卵、ネギ油、干し海老、マヨネーズをのせたダラット名物ピザ。'),
        'ko': ('반 짱 느엉 - 베트남식 라이스페이퍼 피자 (Bánh Tráng Nướng)', '숯불에 바삭하게 구운 라이스페이퍼 위에 계란, 파기름, 건새우, 칠리 마요네즈를 올린 다랏식 피자.'),
        'zh': ('大叻炭烤米纸脆脆饼 (Bánh Tráng Nướng)', '炭火现烤薄韧米纸，抹黄油、鹌鹑蛋、碎肉末、葱花与小干虾，淋甜辣酱与蛋黄酱。')
    },
    'vat_3_1': {
        'en': ('Assorted Fried Street Meatballs (Cá Viên Chiên)', 'Golden fried fish balls, beef balls, shrimp balls, and tofu skewers glazed with chili garlic sauce.'),
        'ja': ('カー・ビエン・チエン - 魚団子串揚げ (Cá Viên Chiên)', 'ぷりぷりの魚団子や海老団子を油でカリッと揚げ、甘辛チリソースとサクサクのニンニクチップで。'),
        'ko': ('까 비엔 치엔 - 어묵 꼬치 튀김 (Cá Viên Chiên)', '바삭하게 튀겨낸 탱글탱글한 생선 완자, 소고기 완자에 마늘 칠리소스와 매콤한 양념을 곁들인 길거리 꼬치.'),
        'zh': ('经典路边香炸鱼丸串 (Cá Viên Chiên)', '油锅现炸金黄膨脆鱼丸、牛肉丸与虾丸，淋特调甜辣蒜香酱与酥炸大蒜粒。')
    },
    'sv_snacks_banh_flan': {
        'en': ('Vietnamese Caramel Flan (Bánh Flan)', 'Velvety smooth egg caramel custard drenched in robust black coffee and crushed ice.'),
        'ja': ('バイン・フラン - ベトナム風プリン (Bánh Flan)', '濃厚でなめらかな手作り焼きプリンに、ほろ苦いブラックコーヒーと細氷をかけたサイゴンスタイル。'),
        'ko': ('반 플란 - 베트남식 캐러멜 커스터드 푸딩 (Bánh Flan)', '입안에서 부드럽게 녹아내리는 계란 푸딩 위에 진한 에스프레소 커피와 얼음을 얹어 즐기는 디저트.'),
        'zh': ('法式焦糖冰咖啡布丁 (Bánh Flan)', '蛋香滑嫩手作焦糖鸡蛋布丁，淋冰镇香浓黑咖啡与细碎冰晶。')
    },
    'sv_snacks_che_dau_trang': {
        'en': ('Sweet White Bean Sticky Rice Pudding (Chè Đậu Trắng)', 'Tender white black-eyed peas and chewy sticky rice simmered in sweet syrup, topped with rich coconut cream.'),
        'ja': ('チェー・ダウ・チャン - 白豆ともち米のぜんざい (Chè Đậu Trắng)', 'ふっくら煮た白豆ともち米を優しい甘さで仕上げ、濃厚な温かいココナッツミルクをかけて。'),
        'ko': ('체 더우 뜨랑 - 흰콩 찹쌀 단팥죽 (Chè Đậu Trắng)', '부드러운 흰콩과 찰진 찹쌀을 달콤하게 끓여 고소하고 진한 코코넛 크림을 듬뿍 얹은 전통 단죽.'),
        'zh': ('椰香温润白眉豆糯米甜粥 (Chè Đậu Trắng)', '粉糯白眉豆与软黏糯米同煨清甜糖水，厚淋一层香醇浓郁热椰浆。')
    },
    'sv_snacks_che_dau_den': {
        'en': ('Sweet Black Bean Dessert Soup (Chè Đậu Đen)', 'Slow-cooked sweet black beans served chilled with ice, chewy boba pearls, and a drizzle of rich coconut milk.'),
        'ja': ('チェー・ダウ・デン - 黒豆のチェー (Chè Đậu Đen)', 'ほくほくに炊き上げた黒豆の優しい甘さに、もちもちのタピオカとココナッツミルク、氷をプラス。'),
        'ko': ('체 더우 덴 - 검은콩 단팥 화채 (Chè Đậu Đen)', '부드럽게 삶은 달콤한 검은콩에 시원한 얼음, 쫄깃한 펄, 코코넛 밀크를 띄운 대표 디저트.'),
        'zh': ('经典清凉黑豆沙甜汤 (Chè Đậu Đen)', '精选黑豆文火煨透沙糯，加少许冰糖、Q弹椰果与碎冰，清热解燥。')
    },
    'sv_snacks_che_dau_xanh': {
        'en': ('Mung Bean and Aloe Vera Sweet Soup (Chè Đậu Xanh Nha Đam)', 'Refreshing chilled sweet soup with peeled mung beans and juicy crunchy aloe vera in light rock sugar syrup.'),
        'ja': ('チェー・ダウ・サイン・ニャー・ダム - 緑豆とアロエのチェー (Chè Đậu Xanh Nha Đam)', 'さっぱりとした緑豆とシャキシャキのアロエを氷砂糖で煮詰めた、爽やかでヘルシーな冷たいスイーツ。'),
        'ko': ('체 더우 싸인 냐 담 - 녹두 알로에 화채 (Chè Đậu Xanh Nha Đam)', '몸을 맑게 해주는 녹두와 아삭아삭한 신선한 알로에를 맑은 빙탕 시럽에 담아낸 시원한 여름 디저트.'),
        'zh': ('清心绿豆芦荟冰糖甜汤 (Chè Đậu Xanh Nha Đam)', '脱皮金黄绿豆起沙，配爽脆多汁芦荟颗粒与晶莹冰糖水，清心润燥。')
    },
    'sv_snacks_banh_bo': {
        'en': ('Steamed Honeycomb Sponge Cake (Bánh Bò Hấp)', 'Spongy, chewy steamed fermented rice cakes with honeycomb texture, drizzled with salted coconut sauce and toasted sesame.'),
        'ja': ('バイン・ボー - 蒸し米粉ハニカムケーキ (Bánh Bò Hấp)', '蜂の巣状の気泡が美しいモチモチの蒸しケーキに、塩気の効いた温かいココナッツソースと香ばしい胡麻。'),
        'ko': ('반 보 - 베트남식 증편 꿀벌떡 (Bánh Bò Hấp)', '벌집 모양의 쫄깃한 발효 쌀 찜떡에 짭조름하고 고소한 코코넛 소스와 볶은 참깨를 뿌려 먹습니다.'),
        'zh': ('蜂窝蒸米糕配椰浆芝麻 (Bánh Bò Hấp)', '天然米浆发酵呈现细腻蜂窝气孔，松软微甜弹牙，淋咸甜椰子酱撒熟白芝麻。')
    },
    'sv_snacks_chieu_5_2': {
        'en': ('Fresh Summer Spring Rolls (Gỏi Cuốn)', 'Translucent rice paper rolls filled with boiled shrimp, sliced pork, vermicelli, and aromatic herbs, paired with peanut sauce.'),
        'ja': ('生春巻き (Gỏi Cuốn)', '透き通るライスペーパーで海老、豚肉、米麺、ミントを巻き、濃厚な自家製ピーナッツ味噌ダレで。'),
        'ko': ('고이 꾸온 - 베트남 생월남쌈 (Gỏi Cuốn)', '투명한 라이스페이퍼에 탱글탱글한 새우, 돼지고기, 쌀국수, 신선한 야채를 말아 고소한 땅콩소스에 찍어 먹습니다.'),
        'zh': ('鲜虾猪肉越式生春卷 (Gỏi Cuốn)', '晶莹透亮薄米纸卷入甜虾、白切肉、米粉与清香薄荷，蘸醇滑秘制花生酱。')
    },
    'sv_snacks_chieu_3_1': {
        'en': ('Clear Tapioca Shrimp Dumplings (Bánh Bột Lọc)', 'Translucent chewy tapioca dumplings stuffed with savory caramelized shrimp and pork belly, sprinkled with fried shallots.'),
        'ja': ('バイン・ボット・ロック - タピオカ海老餃子 (Bánh Bột Lọc)', 'ぷるぷる透明なタピオカ粉の皮に、甘辛く煮た小海老と豚肉を包んだフエ伝統の絶品点心。'),
        'ko': ('반 봇 록 - 투명 타피오카 새우 덤플링 (Bánh Bột Lọc)', '쫀득하고 투명한 타피오카 피에 조린 새우와 삼겹살을 넣어 바나나잎에 찐 후에식 만두.'),
        'zh': ('晶莹透明木薯鲜虾饺 (Bánh Bột Lọc)', '通体晶亮弹牙木薯皮，内裹浓郁焦糖香炒小河虾与五花肉。')
    },

    # Drinks - Highlands & Phuc Long & Phe La
    'hl_tra_sen_vang': {
        'en': ('Golden Lotus Tea (Highlands Trà Sen Vàng)', 'Highlands signature oolong tea topped with creamy milk foam, whole sweet lotus seeds, and crunchy water chestnut bits.'),
        'ja': ('ハイランズ・ゴールデンロータスティー (Trà Sen Vàng)', '香り高い烏龍茶ベースに、なめらかなミルクフォーム、ほくほくの蓮の実とシャキシャキのクワイを浮かべた名物。'),
        'ko': ('하이랜즈 골든 연꽃차 (Trà Sen Vàng)', '향긋한 우롱차에 부드러운 밀크폼, 달콤하게 졸인 연꽃 씨앗과 아삭한 물밤을 더한 시그니처 티.'),
        'zh': ('高原咖啡 黄金莲子乌龙茶 (Trà Sen Vàng)', '醇香乌龙茶底覆以丝滑浓郁奶盖，搭配软糯清甜莲子与脆爽马蹄粒。')
    },
    'hl_phin_sua_da': {
        'en': ('Traditional Phin Iced Milk Coffee (Highlands Phin Sữa Đá)', 'Slow-dripped dark roast coffee brewed in traditional Vietnamese metal phin filters, blended with sweet condensed milk over ice.'),
        'ja': ('ハイランズ・伝統フィン練乳アイスコーヒー (Phin Sữa Đá)', '伝統のアルミ製フィルター(フィン)で濃いめに抽出した深煎りコーヒーと、甘い練乳の黄金比率。'),
        'ko': ('하이랜즈 핀 연유 아이스커피 (Phin Sữa Đá)', '베트남 전통 금속 핀으로 진하게 내린 원두커피에 달콤한 연유와 얼음을 섞은 정통 커피.'),
        'zh': ('高原咖啡 经典滴漏炼乳冰咖啡 (Phin Sữa Đá)', '传统金属滤壶慢滴深烘特浓咖啡，融入细腻香甜炼乳与爽脆冰块。')
    },
    'hl_freeze_tra_xanh': {
        'en': ('Green Tea Ice Blended Freeze (Highlands Freeze Trà Xanh)', 'Rich Japanese matcha blended with ice, milk, whipped cream, and chewy herbal grass jelly cubes.'),
        'ja': ('ハイランズ・抹茶フリーズ (Freeze Trà Xanh)', '濃厚な抹茶とミルクのスムージーに、たっぷりのホイップクリームとプルプルの仙草ゼリーをトッピング。'),
        'ko': ('하이랜즈 그린티 프리즈 (Freeze Trà Xanh)', '진한 녹차 블렌디드 음료 위에 부드러운 휘핑크림과 쫄깃한 젤리를 얹은 시원한 프라페.'),
        'zh': ('高原咖啡 浓香抹茶雪顶冰沙 (Freeze Trà Xanh)', '浓郁抹茶与鲜奶冰沙细腻融合，顶覆轻柔鲜奶油与清爽仙草冻。')
    },
    'hl_phindi_hanh_nhan': {
        'en': ('PhinDi Almond Iced Coffee (Highlands PhinDi Hạnh Nhân)', 'Modern light-roasted drip coffee shaken with creamy milk and aromatic toasted almond syrup.'),
        'ja': ('ハイランズ・フィンディ アーモンドコーヒー (PhinDi Hạnh Nhân)', '伝統のフィンコーヒーにまろやかなアーモンドの香ばしさとミルクをブレンドした新感覚コーヒー。'),
        'ko': ('하이랜즈 핀디 아몬드 커피 (PhinDi Hạnh Nhân)', '진한 베트남 핀 커피에 고소한 아몬드 향과 부드러운 우유가 어우러진 모던 스타일 커피.'),
        'zh': ('高原咖啡 杏仁特调滴漏咖啡 (PhinDi Hạnh Nhân)', '经典慢滴浓缩咖啡结合浓郁烘烤杏仁香气与丝滑牛奶，优雅怡人。')
    },
    'hl_freeze_socola': {
        'en': ('Chocolate Ice Blended Freeze (Highlands Freeze Socola)', 'Decadent dark chocolate blended with milk and ice, topped with whipped cream and bittersweet chocolate curls.'),
        'ja': ('ハイランズ・ショコラフリーズ (Freeze Socola)', '濃厚なダークチョコレートとミルクの極上アイスブレンドに、ホイップとチョコソースをデコレーション。'),
        'ko': ('하이랜즈 초콜릿 프리즈 (Freeze Socola)', '진한 다크 초콜릿을 얼음과 함께 블렌딩하고 풍성한 휘핑크림을 올린 달콤한 프라페.'),
        'zh': ('高原咖啡 浓郁双重巧克力冰沙 (Freeze Socola)', '精纯可可与鲜奶冰块强力细碎，顶覆现打香草奶油与浓黑巧克力碎。')
    },
    'pl_tra_dao_cam_sa': {
        'en': ('Peach Orange Lemongrass Tea (Phúc Long)', 'Refreshing high-mountain black tea infused with fragrant lemongrass, real orange juice, and sweet sliced peaches.'),
        'ja': ('フックロン・ピーチオレンジレモングラスティー (Trà Đào Cam Sả)', '上質な高山紅茶に生絞りオレンジ果汁、爽やかなレモングラス、ジューシーな黄桃を合わせた名作フルーツティー。'),
        'ko': ('푹롱 복숭아 오렌지 레몬글라스 티 (Trà Đào Cam Sả)', '향긋한 홍차에 신선한 오렌지 착즙, 레몬글라스의 청량감, 달콤한 복숭아 조각이 어우러진 푹롱 베스트셀러.'),
        'zh': ('福隆茶庄 蜜桃香橙香茅冰茶 (Trà Đào Cam Sả)', '严选高山红茶底注入鲜橙汁与现煮香茅清香，沉浸厚切香甜多汁黄桃果肉。')
    },
    'pl_tra_sua': {
        'en': ('Phuc Long Signature Milk Tea (Trà Sữa Phúc Long)', 'Bold and intense steeped tea blend with silky condensed milk, legendary for its deep roasted aroma.'),
        'ja': ('フックロン・特製濃厚ミルクティー (Trà Sữa Phúc Long)', '厳選茶葉をじっくり煮出し、濃厚なミルクと合わせた、お茶の渋みと香りがガツンと際立つ伝説のミルクティー。'),
        'ko': ('푹롱 시그니처 밀크티 (Trà Sữa Phúc Long)', '진하고 쌉싸름한 찻잎의 풍미가 살아있어 입안 가득 깊은 여운을 남기는 베트남 1위 명품 밀크티.'),
        'zh': ('福隆茶庄 招牌浓厚原叶奶茶 (Trà Sữa Phúc Long)', '特选重焙深香茶汤结合丝滑纯脂奶，茶韵深沉回甘悠长，茶香浓郁不腻。')
    },
    'pl_tra_vai_lai': {
        'en': ('Lychee Jasmine Tea (Phúc Long Trà Vải Lài)', 'Fragrant jasmine green tea layered with sweet tropical lychee juice and plump juicy lychee fruits.'),
        'ja': ('フックロン・ライチジャスミンティー (Trà Vải Lài)', '華やかなジャスミンの香りと、果汁あふれる甘いライチの実が贅沢に入った爽やかなアイスティー。'),
        'ko': ('푹롱 리치 자스민 티 (Trà Vải Lài)', '은은한 자스민 녹차에 달콤한 열대 리치 과즙과 통통한 생 리치 과육이 듬뿍 들어간 티.'),
        'zh': ('福隆茶庄 荔枝茉莉绿茶 (Trà Vải Lài)', '高雅茉莉银毫翠绿茶汤，融入鲜甜荔枝原汁与剔透饱满大颗多汁荔枝。')
    },
    'pl_tra_lai_kem_cheese': {
        'en': ('Jasmine Tea with Cream Cheese Foam (Phúc Long Trà Lài Kem Cheese)', 'Delicate floral jasmine green tea topped with a thick, velvety layer of salted savory cheese foam.'),
        'ja': ('フックロン・ジャスミンチーズフォームティー (Trà Lài Kem Cheese)', 'すっきり清らかなジャスミン茶の上に、濃厚でほんのり塩味のあるチーズクリームフォームをたっぷり。'),
        'ko': ('푹롱 자스민 치즈폼 티 (Trà Lài Kem Cheese)', '맑고 향기로운 자스민 티 위에 짭조름하고 묵직한 크림치즈 폼을 얹어 단짠의 조화가 예술인 티.'),
        'zh': ('福隆茶庄 芝士海盐奶盖茉莉茶 (Trà Lài Kem Cheese)', '清幽淡雅茉莉花香茶，顶层淋上微咸厚实咸甜芝士奶盖，层次分明。')
    },
    'pl_tra_mang_cau': {
        'en': ('Soursop Oolong Tea (Phúc Long Trà Ô Long Mãng Cầu)', 'Smooth roasted oolong tea muddled with sweet and tart fresh soursop fruit pulp.'),
        'ja': ('フックロン・サワーソップ烏龍茶 (Trà Ô Long Mãng Cầu)', '芳醇な烏龍茶に、南国フルーツ「トゲバンレイシ(マンカウ)」の甘酸っぱい果肉をたっぷり加えたトレンドドリンク。'),
        'ko': ('푹롱 구아나바나 우롱티 (Trà Ô Long Mãng Cầu)', '구수한 우롱차에 새콤달콤하고 이국적인 사워솝(구아나바나) 과육을 듬뿍 넣은 과일차.'),
        'zh': ('福隆茶庄 红毛榴莲刺果番荔枝乌龙 (Trà Ô Long Mãng Cầu)', '清醇高山乌龙茶融入大量酸甜爽滑的刺果番荔枝果肉，果味清新热烈。')
    },
    'phela_o_long_sua': {
        'en': ('Phe La Signature Oolong Milk Tea (Ô Long Sữa Phê La)', 'Specialty hand-crafted Da Lat roasted oolong tea steeped to perfection and combined with rich fresh dairy.'),
        'ja': ('フェラー・ダラット烏龍ミルクティー (Ô Long Sữa Phê La)', 'ダラットの特選焙煎烏龍茶を使用し、スモーキーな香りとまろやかなミルクが絶妙に調和した人気沸騰ティー。'),
        'ko': ('페라 달랏 우롱 밀크티 (Ô Long Sữa Phê La)', '달랏 고원에서 재배한 프리미엄 로스팅 우롱차의 깊은 훈연 향과 부드러운 우유의 특급 만남.'),
        'zh': ('Phê La 啡啦 招牌大叻炭焙乌龙奶茶 (Ô Long Sữa Phê La)', '精选越南大叻高原手工炭焙乌龙茶，茶气雄浑炭香浓郁，融汇鲜醇原乳。')
    },

    # Soft Drinks
    'nuoc_ngot_1': {
        'en': ('Coca-Cola Classic', 'Ice-cold original Coca-Cola served with crushed ice and a fresh lemon slice.'),
        'ja': ('コカ・コーラ (Coca-Cola)', '氷いっぱいのグラスに注いだ、弾ける炭酸と爽快な味わいの定番コーラ。'),
        'ko': ('코카콜라 (Coca-Cola)', '살얼음 가득한 잔에 따라 마시는 시원하고 짜릿한 오리지널 탄산음료.'),
        'zh': ('可口可乐 经典原味 (Coca-Cola)', '加冰纯爽，经典气泡在舌尖迸发，解腻畅爽。')
    },
    'nuoc_coca_zero': {
        'en': ('Coca-Cola Zero Sugar', 'Zero-calorie, zero-sugar crisp Coca-Cola served chilled over ice.'),
        'ja': ('コカ・コーラ ゼロ (Coca-Cola Zero)', 'カロリーゼロ、糖類ゼロで罪悪感なく爽快感を味わえる人気炭酸。'),
        'ko': ('코카콜라 제로 (Coca-Cola Zero)', '부담 없는 제로 칼로리로 즐기는 깔끔하고 시원한 탄산음료.'),
        'zh': ('可口可乐 零度无糖 (Coca-Cola Zero Sugar)', '无糖零卡路里，畅爽气泡口感不减。')
    },
    'nuoc_ngot_2': {
        'en': ('Pepsi Classic', 'Crisp, sweet, and revitalizing chilled Pepsi over ice.'),
        'ja': ('ペプシコーラ (Pepsi)', 'キレのある甘みと弾ける炭酸で喉を潤す、冷たいペプシ。'),
        'ko': ('펩시 콜라 (Pepsi)', '달콤하고 시원한 청량감으로 갈증을 한 번에 해소해 주는 탄산음료.'),
        'zh': ('百事可乐 劲爽原味 (Pepsi)', '气泡强劲，冰爽甜润，畅快淋漓。')
    },
    'nuoc_pepsi_chanh': {
        'en': ('Pepsi Lime Zero Calories', 'Invigorating zero-calorie Pepsi infused with a vibrant splash of natural lime flavor.'),
        'ja': ('ペプシ 生ライム・ゼロカロリー (Pepsi Lime Zero)', 'フレッシュなライムの香りが広がる、すっきり爽快なゼロカロリーペプシ。'),
        'ko': ('펩시 제로 슈거 라임향 (Pepsi Lime Zero)', '상큼한 라임향이 은은하게 퍼지는 깔끔하고 트렌디한 제로 탄산음료.'),
        'zh': ('百事可乐 无糖青柠味 (Pepsi Lime Zero)', '青柠果香与无糖可乐的灵动融合，清新怡神。')
    },
    'nuoc_ngot_3': {
        'en': ('7Up Lemon-Lime', 'Crisp, caffeine-free bubbly soda bursting with refreshing lemon and lime flavors.'),
        'ja': ('セブンアップ レモンライム (7Up)', 'カフェインゼロ、天然レモンとライムの爽やかな酸味が広がるクリアサイダー。'),
        'ko': ('세븐업 레몬라임 (7Up)', '상쾌한 레몬과 라임 향이 톡톡 터지는 무카페인 청량음료.'),
        'zh': ('七喜 柠檬味汽水 (7Up)', '不含咖啡因，天然柠檬青柠清香，晶透剔透解渴。')
    },
    'nuoc_sprite': {
        'en': ('Sprite Lemon-Lime Soda', 'Crisp, clean lemon-lime sparkling refresher served with ice.'),
        'ja': ('スプライト (Sprite)', '透き通る爽快感、レモンライムのキレの良さが食事によく合う炭酸飲料。'),
        'ko': ('스프라이트 (Sprite)', '입안 가득 시원하게 퍼지는 레몬라임 탄산으로 기름진 식사에 찰떡궁합.'),
        'zh': ('雪碧 冰爽柠檬风味 (Sprite)', '透心凉清爽，柠檬微酸激荡气泡，佐餐绝配。')
    },
    'nuoc_ngot_4': {
        'en': ('Red Strawberry Sting Energy Drink', 'Vietnam’s favorite sparkling strawberry energy drink with a high-octane caffeine and taurine kick.'),
        'ja': ('スティング 赤・ストロベリーエナジー (Sting Dâu Đỏ)', 'ベトナムの若者に大人気！甘いイチゴ風味と炭酸がガツンと効く定番エナジードリンク。'),
        'ko': ('스팅 딸기향 레드 에너지드링크 (Sting)', '베트남 국민 에너지드링크! 달콤하고 강렬한 딸기 탄산으로 활력을 충전하세요.'),
        'zh': ('Sting 红色草莓味能量风味饮料', '越南街头爆款能量汽水，浓郁草莓香气配合能量气泡，元气满满。')
    },
    'nuoc_sting_vang': {
        'en': ('Gold Ginseng Sting Energy Drink', 'Crisp golden energy drink formulated with natural ginseng extract and invigorating B-vitamins.'),
        'ja': ('スティング 黄・高麗人参エナジー (Sting Vàng Nhân Sâm)', '高麗人参エキス配合のゴールドエナジー。フルーティーな甘さと活力みなぎる刺激。'),
        'ko': ('스팅 골드 인삼 에너지드링크 (Sting Vàng)', '인삼 추출물이 함유된 황금빛 탄산 에너지 음료로 피로를 시원하게 날려버리세요.'),
        'zh': ('Sting 金色人参能量汽水', '含天然人参提取物，清冽果香与气泡交织，提神醒脑。')
    },
    'nuoc_ngot_6': {
        'en': ('Red Bull Energy Drink (Bò Húc)', 'Classic gold can energy drink packed with taurine and B-complex vitamins for instant revitalization.'),
        'ja': ('レッドブル タイゴールド缶 (Bò Húc Red Bull)', 'ベトナムで絶大な人気を誇るゴールド缶レッドブル。濃厚な甘みと確かなエナジー補給。'),
        'ko': ('레드불 골드캔 에너지음료 (Bò Húc Red Bull)', '달콤하고 진한 풍미로 즉각적인 에너지를 채워주는 베트남 필수 활력 음료.'),
        'zh': ('红牛 经典强化型金罐饮料 (Bò Húc Red Bull)', '金罐经典原味，富含牛磺酸与维生素B族，注入充沛活力。')
    },
    'nuoc_ngot_5': {
        'en': ('Mirinda Orange Soda', 'Bright and fizzy orange soda bursting with cheerful fruity citrus sweetness.'),
        'ja': ('ミリンダ オレンジ (Mirinda Cam)', '甘くてジューシーなオレンジの香りが弾ける、ベトナムで愛されるオレンジソーダ。'),
        'ko': ('미린다 오렌지맛 탄산음료 (Mirinda Cam)', '상큼하고 달콤한 오렌지 과향이 톡톡 터지는 인기 과일 탄산음료.'),
        'zh': ('美年达 甜橙味汽水 (Mirinda Cam)', '明媚橙汁果香，气泡欢腾，果味浓郁酸甜可口。')
    },
    'nuoc_mirinda_xa_xi': {
        'en': ('Mirinda Sarsaparilla Root Beer (Xá Xị)', 'Traditional herbal sarsaparilla root soda with an aromatic wintergreen and anise spiced profile.'),
        'ja': ('ミリンダ サルサパリラ・サシ (Mirinda Xá Xị)', 'ハーブの香りと独特の清涼感がクセになる、ベトナム伝統のルートビア風炭酸飲料。'),
        'ko': ('미린다 사르사파릴라 루트비어 (Mirinda Xá Xị)', '은은한 허브와 향신료의 독특하고 시원한 풍미가 매력적인 베트남식 전통 탄산음료.'),
        'zh': ('美年达 沙示汽水 (Mirinda Xá Xị)', '南洋风情沙示香气，草本清凉透彻，独具风味。')
    },
    'nuoc_revive': {
        'en': ('Revive Salted Lemon Isotonic Drink', 'Electrolyte-replenishing sparkling isotonic drink with savory salted lemon notes.'),
        'ja': ('リヴァイヴ 塩レモンアイソトニック (Revive Chanh Muối)', 'ベトナム伝統の塩レモン風味を取り入れた、微炭酸スポーツイオン飲料。水分補給に最適。'),
        'ko': ('리바이브 소금 레몬 이온음료 (Revive Chanh Muối)', '짭조름한 절임 레몬 풍미의 약탄산 이온음료로 땀 흘린 뒤 갈증을 빠르게 채워줍니다.'),
        'zh': ('Revive 盐渍柠檬电解质汽水', '微气泡运动电解质饮品，融入越式咸柠檬风味，快速解渴补水。')
    },

    # Bottled Teas
    'nuoc_tra_c2': {
        'en': ('C2 Lemon Green Tea', 'Chilled bottled 100% natural highland green tea infused with zesty natural lemon juice.'),
        'ja': ('C2 レモングリーンティー (Trà Xanh C2)', 'ベトナム産100%茶葉から淹れた緑茶にレモンの酸味を加えた、爽快で大人気のボトルティー。'),
        'ko': ('C2 레몬 녹차 (Trà Xanh C2)', '상큼한 천연 레몬 과즙이 든 베트남 1위 보틀 녹차 음료.'),
        'zh': ('C2 柠檬味天然绿茶 (Trà Xanh C2)', '纯正高山绿茶精萃，酸爽柠檬果汁碰撞，清爽回甘。')
    },
    'nuoc_tra_tea_plus': {
        'en': ('Tea+ Plus Oolong Tea', 'Crisp Japanese technology brewed oolong tea with natural OTPP to help reduce fat absorption.'),
        'ja': ('サントリー TEA+ 烏龍茶 (Trà Ô Long Tea+ Plus)', '日本の焙煎技術で作られた、すっきり香ばしい味わいの微糖烏龍茶。食事のお供に。'),
        'ko': ('티 플러스 플러스 우롱티 (Trà Ô Long Tea+ Plus)', '산뜻하고 고소한 프리미엄 우롱차로 깔끔한 뒷맛이 특징인 건강 음료.'),
        'zh': ('Tea+ 沁润乌龙茶 (Trà Ô Long Tea+ Plus)', '三得利工艺严选焙火乌龙茶，茶香醇和，佐餐去油腻。')
    },

    # Traditional Coffee
    'nuoc_ca_phe_trung': {
        'en': ('Hanoi Egg Coffee (Cà Phê Trứng Hà Nội)', 'Rich dark Vietnamese drip coffee crowned with a luscious custard of whipped egg yolks and condensed milk.'),
        'ja': ('ハノイ・エッグコーヒー (Cà Phê Trứng)', '苦味のある濃厚ドリップコーヒーの上に、卵黄と練乳をふわふわに泡立てたカスタードクリームをたっぷり。'),
        'ko': ('하노이 에그커피 (Cà Phê Trứng Hà Nội)', '진한 베트남 커피 위에 달걀노른자와 연유를 곱게 크림화하여 얹은 하노이의 대표 디저트 커피.'),
        'zh': ('河内经典蛋黄奶盖咖啡 (Cà Phê Trứng Hà Nội)', '慢滴浓黑咖啡注入杯底，盖满金黄打发至丝绸般的蛋黄炼乳浓奶霜，香浓无腥。')
    },
    'nuoc_bac_xiu': {
        'en': ('Saigon Layered White Coffee (Bạc Xỉu)', 'Three-tiered sweet treat layered with condensed milk, fresh milk, and a light crown of dark Vietnamese coffee.'),
        'ja': ('サイゴン・バクシウ 3層ホワイトコーヒー (Bạc Xỉu)', '練乳、フレッシュミルク、ドリップコーヒーが美しい層をなす、甘党に愛されるサイゴン名物。'),
        'ko': ('박씨우 - 사이공 3단 화이트커피 (Bạc Xỉu)', '달콤한 연유와 신선한 우유 층 위에 진한 커피 거품을 띄운 부드럽고 달콤한 커피.'),
        'zh': ('西贡经典三色白咖啡 (Bạc Xỉu)', '底层香甜炼乳、中层鲜牛奶、上层浮动微苦黑咖啡，层次分明奶香浓郁。')
    },
    'nuoc_ca_phe_den_da': {
        'en': ('Iced Black Coffee (Cà Phê Đen Đá)', 'Strong, aromatic Vietnamese dark roast phin coffee poured over clear ice cubes.'),
        'ja': ('ベトナム・アイスブラックコーヒー (Cà Phê Đen Đá)', '深煎りロブスタ豆の力強い苦味と香ばしさをシンプルに氷で味わう、大人の定番コーヒー。'),
        'ko': ('카페 덴 다 - 베트남 아이스 블랙커피 (Cà Phê Đen Đá)', '진하게 로스팅한 베트남 원두의 깊은 풍미를 얼음과 함께 즐기는 강렬한 블랙커피.'),
        'zh': ('越式浓黑冰咖啡 (Cà Phê Đen Đá)', '纯正罗布斯塔深烘原豆慢滤，冰爽甘苦交织，咖啡因充沛提神。')
    },
    'nuoc_4_1': {
        'en': ('Hue Salted Cream Coffee (Cà Phê Muối)', 'Intense Vietnamese coffee topped with a thick cloud of velvety sea salt whipped cream.'),
        'ja': ('塩コーヒークリーム (Cà Phê Muối)', '濃厚なベトナムドリップコーヒーに、ほんのり塩味の効いたクリーミーなホイップを重ねたフエ発祥の人気ドリンク。'),
        'ko': ('솔트 크림 커피 (Cà Phê Muối)', '진한 드립 커피 위에 짭조름하고 부드러운 소금 생크림 폼을 얹어 완벽한 단짠을 자랑하는 후에 명물.'),
        'zh': ('顺化海盐奶盖冰咖啡 (Cà Phê Muối)', '深厚纯正越式滴漏，覆以微咸轻柔海盐鲜奶油，咸甜醇滑余韵悠长。')
    },
    'nuoc_3_1': {
        'en': ('Vietnamese Iced Milk Coffee (Cà Phê Sữa Đá)', 'Iconic dark-roasted drip coffee stirred with luscious sweetened condensed milk over crushed ice.'),
        'ja': ('カフェ・スア・ダー - 練乳アイスコーヒー (Cà Phê Sữa Đá)', 'じっくり抽出した深煎りコーヒーに甘い練乳を合わせ、氷をたっぷり入れたベトナム定番の味。'),
        'ko': ('카페 쓰어다 - 연유 아이스커피 (Cà Phê Sữa Đá)', '진하게 내린 베트남 원두커피에 달콤한 연유와 얼음을 듬뿍 넣은 국민 커피.'),
        'zh': ('经典越南炼乳冰咖啡 (Cà Phê Sữa Đá)', '深烘咖啡慢滴萃取，与甜美炼乳黄金交融，盛入满杯碎冰。')
    },

    # Brewed Teas
    'nuoc_tra_tac': {
        'en': ('Giant Iced Calamansi Green Tea (Trà Tắc)', 'Thirst-quenching iced green tea shaken with fresh tart calamansi juice, dried plum, and sugar over crushed ice.'),
        'ja': ('カラマンシーアイスティー (Trà Tắc)', '爽やかな香りと酸味が特徴のカラマンシー(四季柑)をたっぷり絞った、屋台で大人気の大容量アイスティー。'),
        'ko': ('짜 딱 - 칼라만시 대용량 아이스티 (Trà Tắc)', '상큼한 칼라만시 생즙을 듬뿍 짜 넣은 시원하고 새콤달콤한 길거리 대표 아이스티.'),
        'zh': ('巨无霸生打金橘冰绿茶 (Trà Tắc)', '新鲜酸爽金橘原粒暴槌出汁，融入清香绿茶与碎冰，生津止渴。')
    },
    'nuoc_tra_hoa_dau_biec': {
        'en': ('Butterfly Pea Flower Citrus Tea (Trà Hoa Đậu Biếc)', 'Stunning natural royal blue herbal tea that transforms into magical violet with a squeeze of fresh lime.'),
        'ja': ('バタフライピー・フラワーティー (Trà Hoa Đậu Biếc)', '神秘的な青色からライムを絞ると鮮やかな紫色へ変わる、抗酸化作用たっぷりの目にも美しいハーブティー。'),
        'ko': ('버터플라이피 꽃차 (Trà Hoa Đậu Biếc)', '라임을 넣으면 푸른색에서 보랏빛으로 변하는 신비롭고 건강한 천연 허브티.'),
        'zh': ('蝶豆花幻彩柠檬茶 (Trà Hoa Đậu Biếc)', '天然湛蓝蝶豆花冲泡，遇鲜柠汁幻化为浪漫紫罗兰色，富含花青素。')
    },
    'nuoc_tra_vai': {
        'en': ('Lychee Lotus Seed Iced Tea (Trà Vải Hạt Sen)', 'Fragrant iced tea infusion paired with juicy canned lychees and sweet, tender simmered lotus seeds.'),
        'ja': ('ライチと蓮の実のアイスティー (Trà Vải Hạt Sen)', '上品な紅茶に、甘くみずみずしいライチ果肉とホクホクの蓮の実を浮かべた贅沢なデザートティー。'),
        'ko': ('리치 연꽃씨앗 아이스티 (Trà Vải Hạt Sen)', '향긋한 홍차에 달콤한 리치 열매와 부드러운 연꽃 씨앗이 어우러진 고급스러운 티 음료.'),
        'zh': ('清甜荔枝冰糖莲子茶 (Trà Vải Hạt Sen)', '幽香红茶浸润饱满晶莹荔枝肉与炖至粉糯的白莲子，清润甘美。')
    },
    'nuoc_4_3': {
        'en': ('Tropical Fruit Medley Iced Tea (Trà Trái Cây Nhiệt Đới)', 'Vibrant cold-brewed tea packed with fresh slices of watermelon, orange, apple, strawberry, and chia seeds.'),
        'ja': ('トロピカルフルーツティー (Trà Trái Cây Nhiệt Đới)', 'スイカ、オレンジ、リンゴ、イチゴなどの生フルーツがグラスいっぱいに詰まった爽快フルーツティー。'),
        'ko': ('열대과일 모둠 아이스티 (Trà Trái Cây Nhiệt Đới)', '수박, 오렌지, 사과, 딸기 등 싱싱한 생과일이 듬뿍 들어간 시원한 비타민 폭탄 티.'),
        'zh': ('满满阳光热带水果茶 (Trà Trái Cây Nhiệt Đới)', '西瓜、鲜橙、青苹果与草莓鲜切入杯，茉莉茶底清爽澎湃。')
    },
    'more_drinks_tra_da': {
        'en': ('Street-side Iced Jasmine Tea (Trà Đá)', 'Lightly brewed unsweetened iced tea served in tall glasses on every Vietnamese street corner.'),
        'ja': ('トラ・ダー - ベトナム風冷たいジャスミン茶 (Trà Đá)', 'ベトナムの街角どこでも見かける、食事の後にすっきりと渇きを潤す氷入りのお茶。'),
        'ko': ('짜 다 - 베트남식 시원한 냉차 (Trà Đá)', '베트남 길거리 식당 어디서나 식사와 함께 가볍고 시원하게 마시는 국민 냉차.'),
        'zh': ('街头经典清凉免费冰茶 (Trà Đá)', '清淡纯净茶香配满杯冰粒，去油解腻，越南市井地道风情。')
    },

    # Fresh Juices
    'nuoc_nuoc_ep_oi_hong': {
        'en': ('Fresh Pink Guava Juice (Nước Ép Ổi Hồng)', 'Slow-pressed 100% natural pink guava juice with a pinch of sea salt, rich in Vitamin C.'),
        'ja': ('フレッシュピンクグアバジュース (Nước Ép Ổi Hồng)', '芳醇な香りとビタミンCが豊富なピンクグアバを生絞り。ほんのり塩を加えて甘みを引き立てます。'),
        'ko': ('핑크 구아바 착즙주스 (Nước Ép Ổi Hồng)', '비타민C가 풍부한 천연 핑크 구아바를 그대로 착즙하여 향긋하고 신선한 건강 주스.'),
        'zh': ('鲜榨天然红心番石榴汁 (Nước Ép Ổi Hồng)', '粉润鲜果鲜榨原汁，果香浓郁馥郁，加微量海盐激发清甜。')
    },
    'nuoc_nuoc_ep_thom': {
        'en': ('Fresh Pineapple Juice (Nước Ép Thơm)', 'Sweet and tangy fresh pineapple juice pressed to order over ice cubes.'),
        'ja': ('生搾りパイナップルジュース (Nước Ép Thơm)', '完熟パイナップルのジューシーな甘酸っぱさをそのまま味わう、ビタミンたっぷりのフレッシュジュース。'),
        'ko': ('생 파인애플 착즙주스 (Nước Ép Thơm)', '잘 익은 파인애플을 주문 즉시 착즙하여 달콤하고 상쾌한 활력을 주는 주스.'),
        'zh': ('现榨热带金菠萝汁 (Nước Ép Thơm)', '精选自然熟透菠萝鲜榨，酸甜爽口果香四溢。')
    },
    'more_drinks_dua_hau': {
        'en': ('Chilled Fresh Watermelon Juice (Nước Ép Dưa Hấu)', 'Sweet, hydrating pure watermelon juice served ice cold without added sugar.'),
        'ja': ('スイカ生ジュース (Nước Ép Dưa Hấu)', 'みずみずしいスイカをそのまま搾った、砂糖不使用の体に染み渡る天然ジュース。'),
        'ko': ('시원한 수박 생과일주스 (Nước Ép Dưa Hấu)', '달콤하고 시원한 제철 수박을 그대로 갈아 갈증을 단숨에 없애주는 주스.'),
        'zh': ('清甜生榨无糖西瓜汁 (Nước Ép Dưa Hấu)', '大红多汁西瓜原汁原味鲜榨，天然多汁冰镇畅饮。')
    },
    'more_drinks_nuoc_cam': {
        'en': ('Freshly Squeezed Orange Juice (Nước Cam Vắt)', 'Sweet and tangy fresh Vietnamese green oranges pressed to order over ice.'),
        'ja': ('生搾りオレンジジュース (Nước Cam Vắt)', 'ベトナム特産の緑のオレンジをその場でキュッと絞った、果肉入りのジューシーなジュース。'),
        'ko': ('착즙 생오렌지주스 (Nước Cam Vắt)', '베트남 생오렌지를 그 자리에서 바로 짜내어 과육과 과즙이 살아있는 상큼한 주스.'),
        'zh': ('鲜剥手榨天然绿皮橙汁 (Nước Cam Vắt)', '越南本土多汁绿橙现点现榨，保留粒粒橙茸果肉。')
    },
    'more_drinks_chanh_day': {
        'en': ('Iced Passion Fruit Juice (Nước Chanh Dây)', 'Tart and aromatic fresh passion fruit pulp stirred with light sugar syrup over ice.'),
        'ja': ('パッションフルーツジュース (Nước Chanh Dây)', 'プチプチ食感の種と鮮烈な酸味がたまらない、南国の恵みたっぷりのパッションフルーツドリンク。'),
        'ko': ('패션후르츠 생과일주스 (Nước Chanh Dây)', '톡톡 씹히는 씨앗과 상큼하고 강렬한 향이 입안을 가득 채우는 패션후르츠 주스.'),
        'zh': ('黄金百香果特调冰饮 (Nước Chanh Dây)', '新鲜百香果籽果浆金黄诱人，酸香扑鼻，冰爽提神。')
    },
    'nuoc_chanh_muoi': {
        'en': ('Preserved Salted Lemonade (Nước Chanh Muối)', 'Traditional cured salted lime muddled with sugar and cold sparkling water.'),
        'ja': ('塩レモネード (Nước Chanh Muối)', '塩漬け発酵させた丸ごとライムを潰し、砂糖と水で割ったベトナム伝統の健康ドリンク。'),
        'ko': ('소금 절임 레모네이드 (Nước Chanh Muối)', '소금에 절인 라임을 으깨어 설탕과 물, 얼음과 함께 즐기는 단짠 청량 음료.'),
        'zh': ('越式古法咸柠檬冰饮 (Nước Chanh Muối)', '海盐天然发酵整颗咸柠檬捣碎，配以纯正白糖水与碎冰。')
    },
    'nuoc_3_2': {
        'en': ('Fresh Sugarcane Juice with Kumquat (Nước Mía)', 'Pure sweet sugarcane freshly pressed with a splash of sour kumquat over crushed ice.'),
        'ja': ('搾りたてサトウキビジュース (Nước Mía)', '新鮮なサトウキビを専用機械でその場で搾り、少量のキンカン果汁を加えた自然な甘さのドリンク。'),
        'ko': ('느억 미아 - 착즙 사탕수수 주스 (Nước Mía)', '신선한 천연 사탕수수를 갓 짜내고 상큼한 금귤을 살짝 더한 자연 그대로의 달콤한 주스.'),
        'zh': ('清冽原榨金橘甘蔗汁 (Nước Mía)', '新鲜原根甘蔗压榨，特调滴入小金橘汁去腻提清，天然甘美。')
    },
    'nuoc_5_3': {
        'en': ('Fresh Chilled Young Coconut (Nước Dừa Tươi)', 'Sweet young coconut water served straight from the shell with tender spoonable coconut jelly flesh.'),
        'ja': ('採れたてフレッシュヤングココナッツ (Nước Dừa Tươi)', '冷やしたヤングココナッツの実をそのまま割り、天然の果汁と柔らかい果肉をスプーンで。'),
        'ko': ('신선한 생 영 코코넛 워터 (Nước Dừa Tươi)', '시원하게 냉장 보관된 야자수를 통째로 열어 달콤한 천연 과즙과 부드러운 과육을 맛보세요.'),
        'zh': ('冰爽原只新鲜青椰水 (Nước Dừa Tươi)', '原只嫩青椰现开，椰水清冽甘甜如泉，嫩滑椰肉入口即化。')
    },
    'nuoc_3_3': {
        'en': ('Pennywort Herb Juice with Mung Bean (Rau Má Đậu Xanh)', 'Cooling earthy pennywort herb blended with smooth sweet mung bean milk over crushed ice.'),
        'ja': ('ツボクサと緑豆のヘルシージュース (Rau Má Đậu Xanh)', 'デトックス効果の高いツボクサ(ラウ・マー)の搾り汁に、優しい甘さのすりつぶし緑豆を加えた定番ドリンク。'),
        'ko': ('병풀 녹두 건강음료 (Rau Má Đậu Xanh)', '몸의 열을 식혀주는 건강한 병풀 생즙에 고소하고 달콤한 녹두를 블렌딩한 인기 웰빙 음료.'),
        'zh': ('清热鲜榨雷公根绿豆沙 (Rau Má Đậu Xanh)', '翠绿雷公根草本原汁，搭配绵密香滑绿豆沙，清凉去燥。')
    },
    'nuoc_nuoc_sam_bi_dao': {
        'en': ('Winter Melon Herbal Tea with Chia Seeds (Nước Sâm Bí Đao)', 'Slow-simmered winter melon, dried longan, and monk fruit infusion topped with crunchy chia seeds.'),
        'ja': ('トウガンとハーブの冷たい薬膳茶 (Nước Sâm Bí Đao)', 'トウガン(冬瓜)や羅漢果、竜眼を何時間も煮出して作る、体を冷やす爽やかなハーブ健康茶。'),
        'ko': ('동과 허브 웰빙티 (Nước Sâm Bí Đao)', '동과, 나한과, 용안을 정성껏 달여 낸 베트남식 전통 건강 냉차로 속을 시원하게 다스립니다.'),
        'zh': ('古法罗汉果冬瓜草本凉茶 (Nước Sâm Bí Đao)', '清润冬瓜配罗汉果与桂圆文火慢煨，加入饱满奇亚籽，甘醇清润。')
    },
    'more_drinks_nuoc_sam': {
        'en': ('Saigon 24-Herb Refreshing Tea (Nước Sâm Thảo Mộc)', 'Traditional sweet herbal infusion brewed from cane sugar, corn silk, seaweed, and cooling medicinal roots.'),
        'ja': ('サイゴン伝統ハーブ薬膳茶 (Nước Sâm Thảo Mộc)', 'サトウキビ、とうもろこしのひげ、海藻など24種の天然草本を煮出した、すっきりとした甘さの伝統健康茶。'),
        'ko': ('사이공 전통 24가지 허브 냉차 (Nước Sâm Thảo Mộc)', '사탕수수와 옥수수수염 등 24가지 천연 한방 약재를 정성껏 끓여낸 정통 약선차.'),
        'zh': ('西贡二十四味清凉草本水 (Nước Sâm Thảo Mộc)', '玉米须、甘蔗与天然药草古法熬炼，回甘微甜，消暑降火。')
    },
    'more_drinks_sua_dau_nanh': {
        'en': ('Pandan Soy Milk (Sữa Đậu Nành Lá Dứa)', 'Warm or iced freshly pressed soybean milk infused with fragrant green pandan leaves.'),
        'ja': ('パンダン香る自家製豆乳 (Sữa Đậu Nành Lá Dứa)', '毎朝搾りたての大豆の旨味に、東洋のバニラ「パンダンリーフ」の甘い香りをまとわせた優しい豆乳。'),
        'ko': ('판단 잎 향 수제 두유 (Sữa Đậu Nành Lá Dứa)', '신선한 생 대두를 갈아 은은하고 달콤한 판단 잎 향을 입힌 부드럽고 건강한 홈메이드 두유.'),
        'zh': ('现磨班兰叶香浓纯豆浆 (Sữa Đậu Nành Lá Dứa)', '选用优质黄豆每日现磨，天然斑斓叶汁注入缕缕青草香气。')
    },

    # Milk Drinks & Desserts
    'nuoc_sua_bap': {
        'en': ('Da Lat Sweet Corn Milk (Sữa Bắp Non Đà Lạt)', 'Velvety smooth sweet corn milk pressed from fresh tender Da Lat sweet corn ears.'),
        'ja': ('ダラット産スイートコーンミルク (Sữa Bắp Non Đà Lạt)', 'ダラット高原の甘みたっぷりの完熟トウモロコシをすりつぶして作る、濃厚でクリーミーなコーンミルク。'),
        'ko': ('달랏 스위트 콘밀크 (Sữa Bắp Non Đà Lạt)', '달랏 고원의 달콤하고 신선한 어린 옥수수를 통째로 갈아 만든 부드럽고 고소한 옥수수 우유.'),
        'zh': ('大叻甜鲜嫩玉米乳 (Sữa Bắp Non Đà Lạt)', '精选高原鲜嫩甜玉米现磨过滤，醇厚甘甜，金黄细腻。')
    },
    'nuoc_sua_tuoi_tran_chau': {
        'en': ('Brown Sugar Pearl Fresh Milk (Sữa Tươi Trân Châu)', 'Cold rich fresh milk drizzled with warm flame-torched brown sugar syrup and chewy boba tapioca pearls.'),
        'ja': ('黒糖タピオカフレッシュミルク (Sữa Tươi Trân Châu Đường Đen)', 'じっくり煮込んだモチモチの温かい黒糖タピオカに、冷たい濃厚フレッシュミルクを注いだ極上の一杯。'),
        'ko': ('흑당 버블 생우유 (Sữa Tươi Trân Châu)', '따뜻하고 쫄깃하게 졸인 흑당 버블 타피오카에 차가운 고소한 생우유를 부어 마시는 대세 음료.'),
        'zh': ('黑糖波霸厚鲜奶 (Sữa Tươi Trân Châu)', '现熬温热黑糖珍珠挂壁，冲入冰鲜纯牛奶，软糯爆浆甜而不腻。')
    },
    'nuoc_sua_chua_danh_da': {
        'en': ('Hanoi Shaken Iced Yogurt Coffee (Sữa Chua Đánh Đá)', 'Creamy fermented yogurt whipped with crushed ice, sweetened condensed milk, and a shot of espresso.'),
        'ja': ('ヨーグルトシェイク・コーヒーがけ (Sữa Chua Đánh Đá)', '濃厚なベトナムヨーグルトを細氷とシェイクし、仕上げに濃縮コーヒーを垂らしたハノイ名物。'),
        'ko': ('하노이 요거트 커피 쉐이크 (Sữa Chua Đánh Đá)', '달콤새콤한 수제 요거트를 얼음과 갈아 진한 에스프레소를 끼얹은 하노이의 인기 음료.'),
        'zh': ('河内经典冰摇咖啡酸奶 (Sữa Chua Đánh Đá)', '浓稠发酵酸奶加入炼乳细冰手摇起泡，淋上一勺醇黑浓缩咖啡。')
    },
    'nuoc_milo_dam': {
        'en': ('Milo Lava Crush with Boba (Milo Dầm Trân Châu)', 'Crushed ice drenched in ultra-rich malt chocolate Milo fudge, condensed milk, cocoa powder, and pearls.'),
        'ja': ('濃厚ミロ氷・タピオカのせ (Milo Dầm Trân Châu)', 'たっぷりの氷に超濃厚ミロチョコソース、練乳、ココアパウダー、タピオカを豪快にトッピングした悪魔的スイーツ。'),
        'ko': ('마일로 용암 빙수 (Milo Dầm Trân Châu)', '초콜릿 맥아 마일로 소스와 연유, 카카오 파우더, 쫄깃한 버블을 얼음 위에 쏟아부은 달콤함의 끝판왕.'),
        'zh': ('西贡熔岩阿华田美禄碎冰 (Milo Dầm Trân Châu)', '浓黑美禄可可厚浆浇淋满碗碎冰，撒特浓可可粉与Q弹波霸粉圆。')
    },
    'nuoc_soda_viet_quat': {
        'en': ('Sparkling Blueberry Mint Soda (Soda Việt Quất)', 'Bubbly Italian soda infused with real wild blueberry purée, fresh mint sprigs, and lemon slices.'),
        'ja': ('ブルーベリーミントソーダ (Soda Việt Quất)', '天然ブルーベリーの果肉入りシロップに弾けるソーダ、フレッシュミントとライムを合わせた爽快ドリンク。'),
        'ko': ('블루베리 민트 스파클링 소다 (Soda Việt Quất)', '달콤한 블루베리 과육과 신선한 민트, 톡 쏘는 탄산수가 어우러진 비주얼 만점 에이드.'),
        'zh': ('蓝莓薄荷清爽气泡苏打 (Soda Việt Quất)', '手工蓝莓果酱打底，注入透亮气泡苏打水，配薄荷嫩叶与柠檬片。')
    },
    'more_drinks_ca_cao': {
        'en': ('Rich Vietnamese Hot Cocoa (Ca Cao Nóng)', 'Steaming hot mug of pure Ben Tre cocoa blended with sweet condensed milk.'),
        'ja': ('濃厚ホットベトナムココア (Ca Cao Nóng)', 'ベトナム産の上質なベンチェココアを使い、甘い練乳で仕上げた心温まるホットチョコレート。'),
        'ko': ('벤째 수제 핫초코 (Ca Cao Nóng)', '베트남 벤째산 프리미엄 카카오와 달콤한 연유가 어우러져 깊고 풍부한 핫초콜릿 음료.'),
        'zh': ('槟椥特浓热可可 (Ca Cao Nóng)', '精选越南槟椥特级纯可可粉，与甜美炼乳热泡，浓醇醇厚丝滑入心。')
    },

    # Smoothies
    'nuoc_4_2': {
        'en': ('Creamy Avocado Smoothie (Sinh Tố Bơ)', 'Decadent Da Lat ripe avocado blended silky smooth with sweetened condensed milk and crushed ice.'),
        'ja': ('濃厚アボカドスムージー (Sinh Tố Bơ)', 'ダラット産の完熟アボカドを練乳とミルクとともにクリーミーに仕上げた、ベトナムを代表する贅沢スムージー。'),
        'ko': ('달랏 아보카도 스무디 (Sinh Tố Bơ)', '달랏산 완숙 아보카도에 연유와 우유를 넣어 버터처럼 부드럽고 고소하게 갈아낸 베트남 필수 음료.'),
        'zh': ('大叻特浓牛油果奶昔 (Sinh Tố Bơ)', '优选高山熟透牛油果，与香甜炼乳鲜奶细打至冰淇淋般顺滑绵密。')
    },
    'nuoc_sinh_to_sau_rieng': {
        'en': ('Ri6 Durian Cream Smoothie (Sinh Tố Sầu Riêng)', 'Luxuriously creamy smoothie made with fragrant Ri6 durian fruit and sweet condensed milk.'),
        'ja': ('ドリアン・スムージー (Sinh Tố Sầu Riêng)', '「果物の王様」と呼ばれる最高級Ri6ドリアンの芳醇な果肉を惜しみなく使った濃厚スムージー。'),
        'ko': ('리6 두리안 크림 스무디 (Sinh Tố Sầu Riêng)', '최고급 Ri6 두리안의 진하고 부드러운 과육을 그대로 갈아 만든 강렬하고 달콤한 스무디.'),
        'zh': ('金枕榴莲至尊奶昔 (Sinh Tố Sầu Riêng)', '精选特级Ri6多肉榴莲，香甜如凝脂，口感霸道醇厚绵延。')
    },
    'more_drinks_sinh_to_xoai': {
        'en': ('Hoa Loc Mango Smoothie (Sinh Tố Xoài)', 'Tropical golden smoothie blended from sweet Cat Hoa Loc mangoes and fresh milk.'),
        'ja': ('完熟マンゴースムージー (Sinh Tố Xoài)', 'ベトナムが誇る甘美な「ホアロックマンゴー」を贅沢に使った、濃厚でとろけるようなフルーツスムージー。'),
        'ko': ('호아록 완숙 망고 스무디 (Sinh Tố Xoài)', '달콤하고 향이 뛰어난 호아록 망고를 듬뿍 넣어 부드럽고 과즙미 넘치는 트로피컬 스무디.'),
        'zh': ('和禄香芒冰纯奶昔 (Sinh Tố Xoài)', '名产和禄芒果肉厚香甜，搭配鲜奶碎冰打磨，金黄柔滑果香浓烈。')
    },
    'nuoc_sinh_to_dau': {
        'en': ('Da Lat Fresh Strawberry Smoothie (Sinh Tố Dâu Tây)', 'Vibrant sweet-tart smoothie whipped from fresh mountain Da Lat strawberries and creamy yogurt.'),
        'ja': ('ダラット産いちごスムージー (Sinh Tố Dâu Tây)', '高原都市ダラットで採れた新鮮ないちごとヨーグルトをブレンドした、甘酸っぱく爽やかなピンクスムージー。'),
        'ko': ('달랏 딸기 요거트 스무디 (Sinh Tố Dâu Tây)', '달랏 고원에서 갓 수확한 싱싱한 생딸기와 요거트를 블렌딩한 상큼 달콤한 과일 음료.'),
        'zh': ('大叻高山鲜草莓奶昔 (Sinh Tố Dâu Tây)', '大叻产地直采鲜草莓融入酸甜酸奶，粉润诱人，果酸清新怡人。')
    },
    'nuoc_sinh_to_mang_cau': {
        'en': ('Creamy Soursop Smoothie (Sinh Tố Mãng Cầu)', 'Velvety sweet and tangy tropical smoothie blended from fresh soursop pulp and condensed milk.'),
        'ja': ('サワーソップ(トゲバンレイシ)スムージー (Sinh Tố Mãng Cầu)', 'ヨーグルトのような爽やかな酸味と甘みが広がる南国フルーツ「マンカウ」のフルーティースムージー。'),
        'ko': ('사워솝(구아나바나) 스무디 (Sinh Tố Mãng Cầu)', '요거트처럼 부드럽고 상큼한 풍미를 자랑하는 열대과일 사워솝을 시원하게 갈아낸 인기 음료.'),
        'zh': ('刺果番荔枝雪白奶昔 (Sinh Tố Mãng Cầu)', '天然酸甜果肉富含热带清香，如酸奶般温润柔滑，生津润喉。')
    }
}

print(f"Total base dish entries defined: {len(BASE_DISH_DATA)}")

def generate_js():
    lines = []
    lines.append("// Multi-language dish names and descriptions (en, ja, ko, zh)")
    lines.append("const DISH_TRANSLATIONS = {")
    for did, translations in sorted(BASE_DISH_DATA.items()):
        lines.append(f"  {json.dumps(did)}: {{")
        for lang, (name, desc) in sorted(translations.items()):
            escaped_name = json.dumps(name, ensure_ascii=False)
            escaped_desc = json.dumps(desc, ensure_ascii=False)
            lines.append(f"    {lang}: {{ name: {escaped_name}, desc: {escaped_desc} }},")
        lines.append("  },")
    lines.append("};")
    lines.append("")
    lines.append("function getDishName(dish, lang) {")
    lines.append("  if (!dish) return '';")
    lines.append("  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';")
    lines.append("  if (currentLang === 'vi') return dish.name;")
    lines.append("  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];")
    lines.append("  return (t && t.name) ? t.name : dish.name;")
    lines.append("}")
    lines.append("")
    lines.append("function getDishDesc(dish, lang) {")
    lines.append("  if (!dish) return '';")
    lines.append("  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';")
    lines.append("  if (currentLang === 'vi') return dish.desc;")
    lines.append("  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];")
    lines.append("  return (t && t.desc) ? t.desc : dish.desc;")
    lines.append("}")
    lines.append("")
    return "\n".join(lines)

if __name__ == '__main__':
    with open('src/js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove previous DISH_TRANSLATIONS if already added
    if 'const DISH_TRANSLATIONS =' in content:
        content = content[:content.index('const DISH_TRANSLATIONS =')].rstrip() + '\n'
    
    js_code = generate_js()
    new_content = content.rstrip() + '\n\n' + js_code + '\n'
    
    with open('src/js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Successfully injected DISH_TRANSLATIONS into src/js/data.js")
