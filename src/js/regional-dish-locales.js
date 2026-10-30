/* Authored cross-region translations. Empty cells retain the native-language entry.
 * Columns: stable ID | English | Japanese | Korean | Simplified Chinese.
 * Keep this data independent from the currently selected cuisine/currency. */
const REGIONAL_DISH_NAMES = `
ja_m_1|Rice with raw egg (TKG)||날달걀 비빔밥|生鸡蛋拌饭
ja_m_2|Grilled salted salmon breakfast set||소금구이 연어 아침 정식|盐烤三文鱼早餐套餐
ja_m_3|Kyoto sea bream tea rice||교토식 도미 차밥|京都鲷鱼茶泡饭
ja_m_4|Japanese egg sandwich||일본식 달걀 샌드위치|日式鸡蛋三明治
ja_m_5|Red bean and butter toast||팥 버터 토스트|红豆黄油吐司
ja_m_6|Rice porridge with pickled plum||매실 장아찌 쌀죽|梅干白粥
ja_m_7|Natto breakfast set||낫토 아침 정식|纳豆早餐套餐
ja_m_8|Miso-simmered mackerel set||고등어 미소조림 정식|味噌炖鲭鱼套餐
ja_m_9|Clam miso soup and salted rice balls||조개 된장국과 소금 주먹밥|蛤蜊味噌汤配盐饭团
ja_l_1|Premium nigiri sushi assortment||특선 니기리 초밥 모둠|特级握寿司拼盘
ja_l_2|Seafood chirashi sushi bowl||해산물 지라시 초밥 덮밥|海鲜散寿司饭
ja_l_3|Hakata pork bone ramen||하카타 돈코츠 라멘|博多豚骨拉面
ja_l_4|Sapporo miso ramen with butter and corn||삿포로 버터 옥수수 미소 라멘|札幌黄油玉米味噌拉面
ja_l_5|Pork cutlet and egg rice bowl||돈가스 달걀 덮밥|猪排鸡蛋盖饭
ja_l_6|Beef rice bowl with soft egg||수란을 올린 소고기 덮밥|温泉蛋牛肉饭
ja_l_7|Sanuki udon with shrimp tempura||새우튀김 사누키 우동|赞岐天妇罗虾乌冬面
ja_l_8|Cold buckwheat noodles with tempura||튀김 곁들인 냉메밀국수|天妇罗冷荞麦面
ja_l_9|Pork cutlet curry rice||돈가스 카레라이스|猪排咖喱饭
ja_l_10|Nagoya grilled eel rice||나고야 장어 덮밥|名古屋烤鳗鱼饭
ja_l_11|Chicken and egg rice bowl||닭고기 달걀 덮밥|亲子鸡肉鸡蛋饭
ja_l_12|Chilled noodles with sesame dressing||참깨 소스 냉라멘|芝麻酱日式凉面
ja_a_1|Osaka octopus balls||오사카 타코야키|大阪章鱼烧
ja_a_2|Hiroshima savory pancake||히로시마 오코노미야키|广岛风味什锦煎饼
ja_a_3|Cheese-filled ten-yen coin bread||치즈 십 엔 동전빵|芝士十日元硬币饼
ja_a_4|Fish-shaped red bean cake||팥소 붕어빵|红豆鲷鱼烧
ja_a_5|Fried noodle bread roll||야키소바빵|炒面面包
ja_a_6|Japanese fried chicken skewers||가라아게 닭튀김 꼬치|日式炸鸡串
ja_a_7|Rice dumplings with sweet soy glaze||달콤한 간장 소스 경단|甜酱油烤团子
ja_a_8|Caramelized roasted sweet potato||캐러멜 군고구마|焦糖烤红薯
ja_a_9|Grilled squid||오징어구이|烤鱿鱼
ja_d_1|Seasonal sashimi assortment||제철 모둠 사시미|时令刺身拼盘
ja_d_2|Wagyu beef sukiyaki||와규 스키야키|和牛寿喜烧
ja_d_3|Assorted charcoal-grilled chicken skewers||숯불 닭꼬치 모둠|炭烤鸡肉串拼盘
ja_d_4|Hakata beef offal hot pot||하카타 소곱창 전골|博多牛杂锅
ja_d_5|Beef shabu-shabu||소고기 샤부샤부|牛肉涮涮锅
ja_d_6|Pollock roe and cheese monjayaki||명란 치즈 몬자야키|明太子芝士文字烧
ja_d_7|Hokkaido grilled lamb||홋카이도 양고기구이|北海道铁板烤羊肉
ja_d_8|Osaka assorted fried skewers||오사카 모둠 꼬치튀김|大阪炸串拼盘
ja_d_9|Dipping noodles with rich seafood and pork broth||진한 해물 돈코츠 쓰케멘|浓郁海鲜豚骨蘸面
ja_d_10|Miso-marinated grilled black cod||은대구 미소구이|西京味噌烤银鳕鱼
ja_s_1|Warabi mochi with brown sugar syrup||흑당 시럽 와라비모치|黑糖黄豆粉蕨饼
ja_s_2|Uji matcha parfait||우지 말차 파르페|宇治抹茶芭菲
ja_s_3|Raindrop cake||물방울떡|水信玄饼
ja_s_4|Strawberry-filled mochi||딸기 찹쌀떡|草莓大福
ja_s_5|Uji matcha Mont Blanc soft serve||우지 말차 몽블랑 소프트아이스크림|宇治抹茶蒙布朗软冰淇淋
ja_s_6|Red bean dorayaki pancakes||팥소 도라야키|红豆铜锣烧
ja_s_7|Fluffy soufflé pancakes||수플레 팬케이크|舒芙蕾松饼
ja_dr_1|Melon soda with vanilla ice cream||바닐라 아이스크림 멜론소다|香草冰淇淋蜜瓜汽水
ja_dr_2|Rich Uji matcha latte||진한 우지 말차 라테|浓郁宇治抹茶拿铁
ja_dr_3|Roasted green tea latte||호지차 라테|焙茶拿铁
ja_dr_4|Ramune marble-bottle soda||구슬병 라무네 탄산음료|弹珠汽水
ja_dr_5|Calpis soda||칼피스 소다|可尔必思汽水
ja_dr_6|Royal milk tea||로열 밀크티|皇家奶茶
ja_dr_7|Asahi Super Dry beer||아사히 슈퍼 드라이 맥주|朝日超爽啤酒
ja_dr_8|Japanese plum wine with soda||매실주 소다|日式梅酒苏打
ko_m_1|Jeonju bean sprout soup with rice|全州もやしクッパ||全州豆芽汤饭
ko_m_2|Korean street toast|韓国屋台トースト||韩式街头吐司
ko_m_3|Jeju abalone porridge|済州アワビ粥||济州鲍鱼粥
ko_m_4|Myeongdong egg bread|明洞の卵パン||明洞鸡蛋面包
ko_m_5|Beef and seaweed soup|牛肉とワカメのスープ||牛肉海带汤
ko_m_6|Pork bone and cabbage hangover soup|豚骨と白菜のヘジャングク||猪骨白菜醒酒汤
ko_m_7|Sweet pumpkin porridge|かぼちゃ粥||甜南瓜粥
ko_m_8|Grilled rice cakes with rice syrup|焼き餅の米飴添え||烤年糕配米糖浆
ko_l_1|Jeonju hot stone bibimbap|全州石焼きビビンバ||全州石锅拌饭
ko_l_2|Tuna mayonnaise seaweed rice rolls|ツナマヨキンパ||金枪鱼蛋黄酱紫菜包饭
ko_l_3|Stir-fried black bean noodles|炒め黒味噌ジャージャー麺||干炒炸酱面
ko_l_4|Spicy seafood noodle soup|辛口海鮮チャンポン||韩式辣海鲜汤面
ko_l_5|Pork and kimchi stew|豚肉キムチチゲ||猪肉泡菜锅
ko_l_6|Ginseng chicken soup|薬膳参鶏湯||人参鸡汤
ko_l_7|Busan pork soup with rice|釜山の豚肉クッパ||釜山猪肉汤饭
ko_l_8|Cold noodles in chilled broth|水冷麺||冰汤冷面
ko_l_9|Hand-cut noodles with clams|アサリの手打ちカルグクス||蛤蜊手切面
ko_l_10|Spam and kimchi fried rice|スパム入りキムチ炒飯||午餐肉泡菜炒饭
ko_l_11|Bulgogi beef in an earthenware pot|土鍋プルコギ||砂锅烤牛肉
ko_l_12|Andong braised chicken with glass noodles|安東チムタク||安东炖鸡粉条
ko_a_1|Cheese rosé tteokbokki|チーズ入りロゼトッポッキ||芝士玫瑰酱辣炒年糕
ko_a_2|Crispy Korean blood sausage|韓国式スンデの唐揚げ||酥炸韩式血肠
ko_a_3|Potato-crusted mozzarella corn dog|ポテト衣のモッツァレラホットドッグ||脆薯马苏里拉芝士热狗
ko_a_4|Cheese and onion tornado potato|チーズオニオンのトルネードポテト||芝士洋葱旋风土豆
ko_a_5|Busan fish cake skewers|釜山おでん串||釜山鱼饼串
ko_a_6|Boiled pork wraps|茹で豚のポッサム||韩式菜包白切猪肉
ko_a_7|Crispy vegetable fritters|韓国式野菜天ぷら||韩式酥炸蔬菜饼
ko_a_8|Fried seaweed rolls with glass noodles|春雨海苔巻き揚げ||炸紫菜粉条卷
ko_a_9|Sillim stir-fried blood sausage|新林洞の白スンデ炒め||新林洞炒白血肠
ko_a_10|Spicy chicken cheese noodle rice cakes|激辛チキンチーズラポッキ||辣鸡芝士拉面炒年糕
ko_d_1|Grilled pork belly|サムギョプサル||韩式烤五花肉
ko_d_2|Half plain, half spicy Korean fried chicken|プレーンと甘辛のハーフチキン||原味辣酱双拼炸鸡
ko_d_3|Grilled marinated beef ribs|牛カルビ焼き||韩式烤牛排骨
ko_d_4|Chuncheon spicy stir-fried chicken|春川タッカルビ||春川辣炒鸡
ko_d_5|Spicy pork bone and potato stew|豚骨とじゃがいものカムジャタン||辣猪骨土豆汤
ko_d_6|Uijeongbu army stew|議政府プデチゲ||议政府部队锅
ko_d_7|Grilled Hanwoo beef offal assortment|韓牛ホルモン盛り合わせ焼き||韩牛烤内脏拼盘
ko_d_8|Seafood and scallion pancake|海鮮ネギチヂミ||海鲜葱煎饼
ko_d_9|Hanwoo beef tartare with pear|梨添え韓牛ユッケ||韩牛生牛肉拌梨
ko_d_10|Young chicken and ginseng soup|若鶏の参鶏湯||童子鸡人参汤
ko_s_1|Brown cheese croffle|ブラウンチーズのクロッフル||棕色芝士可颂华夫饼
ko_s_2|Injeolmi shaved ice with red beans|きな粉餅と小豆のかき氷||黄豆粉年糕红豆刨冰
ko_s_3|Sweet honey-filled pancakes|蜜入りホットク||蜂蜜甜煎饼
ko_s_4|Fish-shaped custard cakes|カスタード入りたい焼き||卡仕达鱼形饼
ko_s_5|Traditional honey cookies|韓国伝統の蜜菓ヤックァ||传统蜂蜜药果
ko_s_6|Dalgona honeycomb candy|ダルゴナのカルメ焼き||椪糖饼
ko_s_7|Watermelon fruit punch|スイカのフルーツポンチ||西瓜水果甜饮
ko_dr_1|Binggrae banana milk|ビングレのバナナミルク||宾格瑞香蕉牛奶
ko_dr_2|Iced Americano|アイスアメリカーノ||冰美式咖啡
ko_dr_3|Chilled sweet rice drink|冷たい甘酒シッケ||冰镇甜米酿
ko_dr_4|Cinnamon, ginger and dried persimmon punch|シナモン・生姜・干し柿のスジョングァ||桂皮生姜柿饼饮
ko_dr_5|Goheung honey citron tea|高興の蜂蜜柚子茶||高兴蜂蜜柚子茶
ko_dr_6|Milkis milk soda|ミルキス乳性炭酸飲料||妙之吻乳味汽水
ko_dr_7|Chamisul soju|チャミスル焼酎||真露烧酒
ko_dr_8|Traditional makgeolli rice wine|伝統マッコリ||传统马格利米酒
zh_m_1|Tianjin crispy breakfast crepe|天津の揚げせんべい入りクレープ|톈진식 바삭한 아침 전병|
zh_m_2|Shanghai soup dumplings|上海小籠包|상하이 샤오룽바오|
zh_m_3|Shanghai pan-fried pork buns|上海焼き小籠包|상하이 군만두|
zh_m_4|Wuhan sesame dry noodles|武漢のゴマだれ和え麺|우한 참깨 비빔면|
zh_m_5|Warm soy milk with fried dough sticks|豆乳と揚げパン|따뜻한 두유와 튀김 빵|
zh_m_6|Cantonese century egg and pork congee|ピータンと豚肉の広東粥|광둥식 피단 돼지고기죽|
zh_m_7|Chaoshan beef rice noodle soup|潮汕の牛肉米麺スープ|차오산 소고기 쌀국수|
zh_m_8|Steamed pork ribs in black bean sauce|スペアリブの豆豉蒸し|검은콩 소스 돼지갈비찜|
zh_l_1|Lanzhou hand-pulled beef noodles|蘭州牛肉手延べ麺|란저우 수타 소고기탕면|
zh_l_2|Shaanxi braised pork flatbread sandwich|陝西の豚煮込み肉挟みパン|산시식 돼지고기 납작빵 샌드|
zh_l_3|Sichuan mapo tofu|四川麻婆豆腐|쓰촨 마파두부|
zh_l_4|Kung pao chicken rice|鶏肉とピーナッツの宮保炒め丼|궁바오 닭고기 덮밥|
zh_l_5|Cantonese honey barbecue pork rice|広東式蜂蜜チャーシュー丼|광둥식 꿀 차슈 덮밥|
zh_l_6|Crystal shrimp dumplings|海老の水晶蒸し餃子|수정 새우 딤섬|
zh_l_7|Shaanxi spicy cold skin noodles|陝西の辛口涼皮麺|산시식 매콤한 량피 냉면|
zh_l_8|Liuzhou river snail rice noodles|柳州のタニシだし米麺|류저우 우렁이 쌀국수|
zh_l_9|Harbin sweet and sour crispy pork|ハルビンの豚肉甘酢揚げ|하얼빈 꿔바로우|
zh_l_10|Chongqing spicy noodles|重慶のしびれ辛い小麺|충칭 매운 소면|
zh_l_11|Yangzhou egg fried rice|揚州卵チャーハン|양저우 달걀 볶음밥|
zh_l_12|Xinjiang lamb and carrot pilaf|新疆の羊肉とニンジンのピラフ|신장 양고기 당근 볶음밥|
zh_a_1|Hong Kong egg waffles|香港エッグワッフル|홍콩 에그와플|
zh_a_2|Beijing candied hawthorn skewers|北京のサンザシ飴串|베이징 산사 탕후루|
zh_a_3|Changsha fried stinky tofu|長沙の揚げ臭豆腐|창사식 취두부 튀김|
zh_a_4|Harbin grilled cold noodle rolls|ハルビンの焼き冷麺巻き|하얼빈 구운 냉면말이|
zh_a_5|Leshan chicken skewers in chili sesame sauce|楽山の冷製鶏串ラー油だれ|러산 고추 참깨 소스 닭꼬치|
zh_a_6|Shaanxi flaky baked flatbread|陝西の層焼きパン|산시식 겹겹이 구운 납작빵|
zh_a_7|Shunde fried milk custard|順徳の揚げミルク|순더 우유 튀김|
zh_a_8|Wontons in chili oil|ラー油ワンタン|고추기름 완탕|
zh_a_9|Beijing soybean paste noodles|北京ジャージャー麺|베이징 자장면|
zh_a_10|Chaoshan crispy shrimp fritters|潮汕の海老すり身揚げ|차오산 새우 완자 튀김|
zh_d_1|Peking roast duck|北京ダック|베이징 오리구이|
zh_d_2|Sichuan nine-section spicy beef fat hot pot|四川九つ仕切りの牛脂火鍋|쓰촨 아홉 칸 매운 소기름 훠궈|
zh_d_3|Cantonese cured meat clay pot rice|広東式腸詰め土鍋ご飯|광둥식 훈제육 뚝배기밥|
zh_d_4|Hangzhou Dongpo braised pork belly|杭州の東坡肉|항저우 동파육|
zh_d_5|Chongqing fish with pickled mustard greens|重慶の魚と高菜の酸菜煮|충칭 절임 갓 생선탕|
zh_d_6|Lotus leaf-wrapped beggar's chicken|蓮の葉包みの乞食鶏|연잎으로 감싼 흙구이 닭|
zh_d_7|Wuxi glazed pork ribs|無錫の甘辛スペアリブ|우시식 달콤한 돼지갈비찜|
zh_d_8|Hunan steamed fish head with chopped chilies|湖南の魚の頭の唐辛子蒸し|후난식 다진 고추 생선머리찜|
zh_d_9|Xi'an lamb soup with crumbled flatbread|西安の羊肉とちぎりパンのスープ|시안 양고기 빵조각탕|
zh_d_10|Fujian Buddha jumps over the wall soup|福建の高級乾物スープ佛跳牆|푸젠식 불도장|
zh_s_1|Mango, pomelo and sago dessert|マンゴーとザボンのタピオカデザート|망고 자몽 사고 디저트|
zh_s_2|Shunde double-skin milk pudding|順徳の二層ミルクプリン|순더 이중막 우유푸딩|
zh_s_3|Chengdu brown sugar jelly with rice cakes|成都の黒糖ゼリーと餅|청두 흑당 젤리와 찹쌀떡|
zh_s_4|Ningbo black sesame rice balls|寧波の黒ゴマ団子スープ|닝보 흑임자 찹쌀 경단|
zh_s_5|Beijing almond tofu pudding|北京の杏仁豆腐|베이징 아몬드 두부푸딩|
zh_s_6|Hong Kong mango cream crêpes|香港マンゴークリームクレープ|홍콩 망고 생크림 크레이프|
zh_s_7|Candied sweet potato with spun sugar|糸引き飴がけサツマイモ|실타래 설탕 고구마 맛탕|
zh_dr_1|Hand-shaken fragrant oolong lemon tea|香り高い烏龍レモンティー|향긋한 우롱 레몬차|
zh_dr_2|Hong Kong silk-stocking milk tea|香港式濃厚ミルクティー|홍콩식 밀크티|
zh_dr_3|Beijing chilled smoked plum drink|北京の冷たい燻製梅ジュース|베이징 훈연 매실 냉차|
zh_dr_4|Tieguanyin tea with cheese foam|チーズフォームの鉄観音茶|치즈폼 철관음차|
zh_dr_5|Honey pomelo tea|蜂蜜ザボン茶|꿀 자몽차|
zh_dr_6|Wanglaoji herbal tea|王老吉のハーブティー|왕라오지 허브차|
zh_dr_7|Tsingtao draft beer|青島生ビール|칭다오 생맥주|
zh_dr_8|Shaoxing huadiao rice wine|紹興花彫酒|사오싱 화댜오 황주|
en_m_1||英国式フルブレックファスト|영국식 정통 아침 식사|全套英式早餐
en_m_2||バターミルクパンケーキ|버터밀크 팬케이크|酪乳松饼
en_m_3||エッグベネディクト|에그 베네딕트|班尼迪克蛋
en_m_4||サワードウのアボカドトースト|사워도우 아보카도 토스트|酸面包牛油果吐司
en_m_5||ニューヨーク風スモークサーモンベーグル|뉴욕 훈제연어 베이글|纽约烟熏三文鱼贝果
en_m_6||南部風フライドチキンとワッフル|미국 남부식 프라이드치킨과 와플|美式南方炸鸡配华夫饼
en_m_7||ビスケットのソーセージグレービーがけ|비스킷과 소시지 그레이비|美式松饼配香肠肉汁
en_m_8||スコットランドの燻製ニシンとポーチドエッグ|스코틀랜드 훈제 청어와 수란|苏格兰烟熏鲱鱼配水波蛋
en_l_1||ダブルスマッシュチーズバーガー|더블 스매시 치즈버거|双层压烤牛肉芝士汉堡
en_l_2||ニューヨーク風ペパロニピザ|뉴욕 페퍼로니 피자|纽约意式辣香肠披萨
en_l_3||英国式フィッシュアンドチップス|영국식 피시 앤드 칩스|英式啤酒面糊炸鱼薯条
en_l_4||フィラデルフィアのチーズステーキサンド|필라델피아 치즈스테이크 샌드위치|费城芝士牛肉三明治
en_l_5||サワードウボウルのクラムチャウダー|사워도우 빵 그릇 클램차우더|酸面包碗蛤蜊浓汤
en_l_6||メイン州のロブスターロール|메인주 랍스터롤|缅因龙虾卷
en_l_7||ナッシュビルの辛口チキンサンド|내슈빌 핫치킨 샌드위치|纳什维尔辣鸡三明治
en_l_8||ボロネーゼスパゲッティ|볼로네제 스파게티|意式肉酱面
en_l_9||グリルチキンのコブサラダ|구운 닭고기 콥 샐러드|烤鸡考伯沙拉
en_l_10||サーモンのソテーとアスパラガス|팬에 구운 연어와 아스파라거스|香煎三文鱼配芦笋
en_l_11||ブリオッシュのベーコン・レタス・トマトサンド|브리오슈 베이컨 양상추 토마토 샌드위치|布里欧修培根生菜番茄三明治
en_l_12||オニオングラタンスープ|프렌치 어니언 수프|法式焗洋葱汤
en_a_1||ベーコン入りマカロニチーズ|베이컨 맥앤치즈|培根芝士通心粉
en_a_2||バッファローチキンウィング|버펄로 치킨윙|水牛城辣鸡翅
en_a_3||シナモンシュガーチュロス|시나몬 설탕 추로스|肉桂糖吉拿棒
en_a_4||ニューオーリンズの粉砂糖ベニエ|뉴올리언스 슈거 베녜|新奥尔良糖粉炸面饼
en_a_5||コーンウォールのミートパイ|콘월식 고기 파이|康沃尔肉馅烘饼
en_a_6||粒マスタード添えスコッチエッグ|홀그레인 머스터드 스카치에그|苏格兰肉包蛋配颗粒芥末
en_a_7||ビール衣のオニオンリング|맥주 반죽 양파링|啤酒面糊炸洋葱圈
en_a_8||チリチーズフライ|칠리 치즈 감자튀김|辣肉酱芝士薯条
en_a_9||ビールチーズ添えプレッツェル|맥주 치즈 소스 프레첼|椒盐脆饼配啤酒芝士酱
en_a_10||南部風ピクルスフライ|미국 남부식 피클 튀김|美式南方炸酸黄瓜
en_d_1||米国プライム等級リブアイステーキ|미국산 프라임 립아이 스테이크|美国特级肋眼牛排
en_d_2||テキサス風牛胸肉の燻製|텍사스 훈제 브리스킷|得克萨斯烟熏牛胸肉
en_d_3||燻製バーベキューポークリブ|훈제 바비큐 돼지갈비|烟熏烧烤猪肋排
en_d_4||英国式サンデーロースト|영국식 선데이 로스트|英式周日烤肉餐
en_d_5||英国式ラム肉のシェパーズパイ|영국식 양고기 셰퍼드 파이|英式羊肉牧羊人派
en_d_6||ルイジアナ風シーフードジャンバラヤ|루이지애나 해산물 잠발라야|路易斯安那海鲜什锦饭
en_d_7||トリュフクリームのフェットチーネ|트러플 크림 페투치네|松露奶油宽面
en_d_8||サンフランシスコの海鮮シチュー|샌프란시스코 해산물 스튜|旧金山海鲜炖汤
en_d_9||牛肉とエールビールのパイ|소고기 에일 파이|牛肉麦酒派
en_d_10||大西洋サーモンのソテー|대서양 연어 팬구이|香煎大西洋三文鱼
en_s_1||ニューヨークチーズケーキ|뉴욕 치즈케이크|纽约芝士蛋糕
en_s_2||温かいフォンダンショコラ|따뜻한 초콜릿 라바 케이크|热巧克力熔岩蛋糕
en_s_3||温かいシナモンアップルパイ|따뜻한 시나몬 애플파이|热肉桂苹果派
en_s_4||英国式トフィープディング|영국식 스티키 토피 푸딩|英式太妃糖布丁
en_s_5||イートンメスの苺とメレンゲ|딸기 머랭 이튼 메스|伊顿草莓蛋白霜甜点
en_s_6||アイシングの温かいシナモンロール|따뜻한 아이싱 시나몬롤|糖霜热肉桂卷
en_s_7||クロテッドクリーム添えスコーン|클로티드 크림 스콘|英式司康配凝脂奶油
en_dr_1||アイスバニラオーツミルクラテ|아이스 바닐라 오트밀크 라테|冰香草燕麦奶拿铁
en_dr_2||コールドブリューコーヒー|콜드브루 커피|冷萃咖啡
en_dr_3||フレッシュ苺レモネード|생딸기 레모네이드|鲜草莓柠檬水
en_dr_4||ルートビアフロート|루트비어 플로트|香草冰淇淋沙士汽水
en_dr_5||塩キャラメルミルクシェイク|솔티드 캐러멜 밀크셰이크|海盐焦糖奶昔
en_dr_6||アールグレイのロンドンフォグラテ|얼그레이 런던 포그 라테|伯爵茶伦敦雾奶茶
en_dr_7||アメリカンクラフトIPA生ビール|미국 수제 IPA 생맥주|美式精酿IPA生啤
en_dr_8||コスモポリタンカクテル|코스모폴리탄 칵테일|柯梦波丹鸡尾酒
`;

for (const line of REGIONAL_DISH_NAMES.trim().split('\n')) {
  const [id, ...names] = line.split('|');
  const entry = DISH_TRANSLATIONS[id];
  if (!entry) throw new Error(`Unknown translated dish: ${id}`);
  ['en', 'ja', 'ko', 'zh'].forEach((language, index) => {
    if (names[index]) entry[language].name = names[index];
  });
}

/* These descriptions replace Vietnamese text incorrectly stored in the English
 * locale. Concise descriptions retain the dish's ingredients and preparation. */
const REGIONAL_ENGLISH_DESCRIPTIONS = `
ja_m_1|Hot rice mixed with a fresh raw egg and soy sauce for a simple Japanese breakfast.
ja_m_2|Salt-grilled salmon served with rice and miso soup as a breakfast set.
ja_m_4|Soft bread filled with a creamy Japanese-style egg mixture.
ja_m_5|Toasted bread topped with butter and sweet red bean paste.
ja_m_6|Soft rice porridge with tart, salty pickled plum.
ja_m_7|Fermented soybeans served with rice in a traditional breakfast set.
ja_m_8|Mackerel simmered in a savory miso sauce and served as a rice set.
ja_m_9|Salted rice balls paired with a warm clam miso soup.
ja_l_1|An assortment of hand-pressed sushi topped with selected seafood.
ja_l_2|Sushi rice topped with a colorful assortment of fresh seafood.
ja_l_3|Hakata-style ramen in a rich, slowly simmered pork bone broth.
ja_l_4|Sapporo miso ramen topped with butter and sweet corn.
ja_l_5|Crispy pork cutlet simmered with egg in a savory sauce over rice.
ja_l_6|Thinly sliced beef and onions over rice, topped with a soft egg.
ja_l_7|Chewy Sanuki udon served with crispy shrimp tempura.
ja_l_8|Chilled buckwheat noodles with a dipping sauce and crisp tempura.
ja_l_9|Japanese curry rice topped with a crisp breaded pork cutlet.
ja_l_10|Nagoya-style grilled eel over rice, enjoyed with different accompaniments.
ja_l_11|Chicken and softly cooked egg simmered together and served over rice.
ja_l_12|Chilled noodles with a refreshing sesame dressing and assorted toppings.
ja_a_1|Round Osaka-style batter cakes filled with octopus and cooked in a molded pan.
ja_a_2|Hiroshima-style savory pancake with layered ingredients.
ja_a_3|A coin-shaped baked snack filled with stretchy cheese.
ja_a_4|Fish-shaped cakes filled with sweet red bean paste.
ja_a_5|A soft bread roll filled with savory stir-fried noodles.
ja_a_6|Bite-sized Japanese fried chicken served on skewers.
ja_a_7|Grilled rice dumplings coated in a sweet soy sauce glaze.
ja_a_8|Roasted sweet potato finished with a crisp caramelized sugar topping.
ja_a_9|Squid grilled with a savory soy and ginger seasoning.
ja_d_1|An assortment of sliced raw seafood selected for the season.
ja_d_2|Wagyu beef simmered in sweet-savory sukiyaki broth, with egg for dipping.
ja_d_3|Assorted chicken skewers grilled over charcoal.
ja_d_4|Hakata-style beef offal hot pot seasoned with garlic and chili.
ja_d_5|Thinly sliced beef gently swished through a light hot pot broth.
ja_d_6|Tokyo-style savory griddle batter with pollock roe and cheese.
ja_d_7|Hokkaido-style lamb cooked on a domed grill.
ja_d_8|Osaka-style assorted skewers coated in batter and fried until crisp.
ja_d_9|Noodles served separately from a rich seafood and pork bone dipping broth.
ja_d_10|Black cod marinated in sweet miso and grilled.
ja_s_1|Soft warabi mochi with roasted soybean flour and brown sugar syrup.
ja_s_2|A layered dessert featuring fragrant Uji matcha and ice cream.
ja_s_3|A delicate, clear jelly cake shaped like a large raindrop.
ja_s_4|Soft mochi wrapped around a fresh strawberry.
ja_s_5|Soft-serve ice cream topped with fine strands of Uji matcha Mont Blanc cream.
ja_s_6|Two soft pancakes sandwiching a sweet red bean filling.
ja_s_7|Tall, airy Japanese soufflé pancakes with a tender texture.
ja_dr_1|Sweet melon soda topped with vanilla ice cream.
ja_dr_2|Rich Uji matcha blended with milk for a creamy latte.
ja_dr_3|Roasted green tea combined with milk for a fragrant latte.
ja_dr_4|A nostalgic Japanese carbonated drink in a marble-sealed bottle.
ja_dr_5|Sweet-tart Calpis mixed with sparkling soda.
ja_dr_6|Rich black tea brewed with milk in the Japanese royal milk tea style.
ja_dr_7|Crisp, chilled Asahi Super Dry beer.
ja_dr_8|Japanese plum wine mixed with soda and served over ice.
ko_m_1|Jeonju-style bean sprout soup served with rice.
ko_m_2|Korean street-style toasted bread with a savory egg filling.
ko_m_3|A warm rice porridge made with Jeju abalone.
ko_m_4|Myeongdong-style baked bread with a whole egg.
ko_m_5|A traditional warm soup of beef and seaweed.
ko_m_6|Spicy pork bone soup with cabbage, traditionally served as a hangover soup.
ko_m_7|Smooth, gently sweet pumpkin porridge.
ko_m_8|Chewy grilled rice cakes served with sweet rice syrup.
ko_l_1|Jeonju-style mixed rice served sizzling in a hot stone bowl.
ko_l_2|Seaweed rice rolls filled with tuna and mayonnaise.
ko_l_3|Noodles coated in freshly stir-fried black bean sauce.
ko_l_4|A smoky, spicy noodle soup with seafood.
ko_l_5|A warming stew of pork belly and fermented kimchi.
ko_l_6|Chicken simmered with ginseng in a nourishing broth.
ko_l_7|Busan-style pork soup served with rice.
ko_l_8|Chewy cold noodles served in an icy, refreshing broth.
ko_l_9|Hand-cut wheat noodles cooked in a sweet clam broth.
ko_l_10|Rice stir-fried with kimchi and Spam.
ko_l_11|Marinated bulgogi beef simmered in an earthenware pot.
ko_l_12|Andong-style chicken braised in soy sauce with glass noodles.
ko_a_1|Chewy rice cakes in a creamy rosé sauce with cheese.
ko_a_2|Traditional Korean blood sausage fried until crisp.
ko_a_3|A mozzarella corn dog coated in crisp potato pieces.
ko_a_4|A spiral-cut potato seasoned with cheese and onion.
ko_a_5|Busan fish cake skewers served with warm broth.
ko_a_6|Tender boiled pork served with vegetables and kimchi for wrapping.
ko_a_7|Mixed vegetables coated in batter and fried until crisp.
ko_a_8|Glass noodles wrapped in seaweed and deep-fried.
ko_a_9|Sillim-style blood sausage stir-fried with vegetables and sesame seasoning.
ko_a_10|Noodles and rice cakes in spicy chicken sauce with melted cheese.
ko_d_1|Pork belly grilled on a hot cast-iron surface.
ko_d_2|Korean fried chicken served half plain and half with spicy sauce.
ko_d_3|Beef ribs marinated in a savory-sweet sauce and grilled.
ko_d_4|Chuncheon-style chicken stir-fried with cabbage in a spicy sauce.
ko_d_5|A spicy stew of pork bones and potatoes.
ko_d_6|Uijeongbu-style army stew with an assortment of savory ingredients.
ko_d_7|An assortment of rich Hanwoo beef offal grilled at the table.
ko_d_8|A crisp Korean pancake filled with seafood and scallions.
ko_d_9|Raw Hanwoo beef seasoned and paired with sweet pear.
ko_d_10|A young chicken gently simmered with ginseng.
ko_s_1|A crisp croissant waffle topped with brown cheese.
ko_s_2|Fine shaved ice with red beans and soybean-coated rice cakes.
ko_s_3|Pan-fried sweet pancakes filled with a honey-flavored syrup.
ko_s_4|Fish-shaped cakes filled with smooth egg custard.
ko_s_5|Traditional Korean flower-shaped honey cookies.
ko_s_6|Light, crisp Korean honeycomb sugar candy.
ko_s_7|Watermelon and fruit served in a refreshing sweet milk punch.
ko_dr_1|Sweet banana-flavored milk in Binggrae's distinctive bottle.
ko_dr_2|Espresso diluted with chilled water and served over ice.
ko_dr_3|A traditional sweet rice drink served chilled with ice crystals.
ko_dr_4|A spiced drink made with cinnamon, ginger and dried persimmon.
ko_dr_5|Goheung citron tea sweetened with honey.
ko_dr_6|A smooth, lightly tangy milk-flavored carbonated drink.
ko_dr_7|Chamisul soju served chilled.
ko_dr_8|A traditional, gently sweet fermented rice wine.
zh_m_1|Tianjin-style savory breakfast crepe folded around a crisp fried filling.
zh_m_2|Shanghai steamed dumplings holding a savory broth inside a thin wrapper.
zh_m_3|Shanghai pork buns pan-fried to a golden, crisp base.
zh_m_4|Wuhan noodles tossed with a rich sesame sauce.
zh_m_5|Fresh warm soy milk paired with golden fried dough sticks.
zh_m_6|Cantonese rice congee with century egg and lean pork.
zh_m_7|Chaoshan-style rice noodles in a beef broth.
zh_m_8|Small pork ribs steamed in a savory fermented black bean sauce.
zh_l_1|Lanzhou hand-pulled noodles served in a clear beef broth.
zh_l_2|Shaanxi flatbread filled with tender braised meat.
zh_l_3|Soft tofu in a spicy Sichuan sauce with minced meat.
zh_l_4|Chicken stir-fried with peanuts in a sweet-spicy sauce and served over rice.
zh_l_5|Cantonese honey-glazed barbecue pork served with rice and greens.
zh_l_6|Steamed shrimp dumplings with delicate translucent wrappers.
zh_l_7|Shaanxi cold noodles dressed with a tangy chili sauce.
zh_l_8|Liuzhou rice noodles in a distinctive spicy river snail broth.
zh_l_9|Harbin-style crisp fried pork coated in a sweet and sour sauce.
zh_l_10|Chongqing noodles seasoned with chili and numbing Sichuan pepper.
zh_l_11|Yangzhou-style egg fried rice with shrimp and meat.
zh_l_12|Xinjiang-style rice cooked with lamb and carrots.
zh_a_1|Hong Kong egg waffles with crisp edges and soft centers.
zh_a_2|Beijing hawthorn skewers coated in a crisp sugar shell.
zh_a_3|Changsha fermented tofu fried until crisp and served with chili sauce.
zh_a_4|Harbin-style noodle sheets grilled and rolled with egg and sausage.
zh_a_5|Leshan chicken skewers soaked in a fragrant chili and sesame sauce.
zh_a_6|Shaanxi-style flaky flatbread baked in delicate layers.
zh_a_7|Shunde milk custard fried with a crisp coating and creamy center.
zh_a_8|Tender wontons dressed with aromatic chili oil.
zh_a_9|Beijing noodles tossed with a savory soybean paste sauce.
zh_a_10|Chaoshan shrimp fritters fried until golden and crisp.
zh_d_1|Peking roast duck with crisp skin, served with thin pancakes.
zh_d_2|Sichuan nine-section hot pot with a spicy, numbing beef fat broth.
zh_d_3|Cantonese clay pot rice cooked with cured meat and sausage.
zh_d_4|Hangzhou-style pork belly slowly braised into tender Dongpo pork.
zh_d_5|Chongqing-style fish simmered with pickled mustard greens.
zh_d_6|Chicken wrapped in lotus leaves and baked in a clay casing.
zh_d_7|Wuxi pork ribs coated in a glossy, rich red sauce.
zh_d_8|Hunan fish head steamed with chopped chilies.
zh_d_9|Xi'an lamb soup served with hand-crumbled flatbread.
zh_d_10|A rich Fujian banquet soup combining carefully simmered premium ingredients.
zh_s_1|A chilled dessert of mango, pomelo and chewy sago pearls.
zh_s_2|Shunde steamed milk pudding with two delicate layers of milk skin.
zh_s_3|Chengdu jelly with brown sugar syrup and chewy rice cakes.
zh_s_4|Ningbo glutinous rice balls filled with black sesame, served in warm syrup.
zh_s_5|A chilled Beijing-style almond tofu dessert.
zh_s_6|Soft Hong Kong crêpes wrapped around mango and whipped cream.
zh_s_7|Sweet potato pieces coated in crisp, stretchy caramelized sugar.
zh_dr_1|Fragrant oolong tea shaken with fresh lemon.
zh_dr_2|Hong Kong-style strong black tea blended with creamy milk.
zh_dr_3|A chilled Beijing drink made with smoked sour plums.
zh_dr_4|Freshly brewed Tieguanyin tea topped with salted cheese foam.
zh_dr_5|A refreshing pomelo tea sweetened with honey.
zh_dr_6|Wanglaoji's traditional canned herbal tea.
zh_dr_7|Chilled Tsingtao draft beer.
zh_dr_8|Shaoxing huadiao rice wine, traditionally enjoyed warm.
`;
for (const line of REGIONAL_ENGLISH_DESCRIPTIONS.trim().split('\n')) {
  const [id, desc] = line.split('|');
  DISH_TRANSLATIONS[id].en.desc = desc;
}
// Culinary words are translated too; brand names alone remain unchanged.
DISH_TRANSLATIONS.trua_cao_lau.en.name = 'Hoi An pork noodles';
DISH_TRANSLATIONS.nuoc_red_bull.en.name = 'Red Bull energy drink';
DISH_TRANSLATIONS.sang_banh_tam_bi.zh.name = '越南猪皮米粉';
DISH_TRANSLATIONS.more_morning_banh_uot.en.desc =
  'Warm, silky steamed rice sheets served with Vietnamese pork sausage, herbs and sweet fish sauce.';
DISH_TRANSLATIONS.toi_3_1.en.desc =
  'Silky rice porridge slowly simmered with pork ribs, topped with shredded pork floss and crispy fried dough sticks.';
