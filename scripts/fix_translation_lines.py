import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

new_trans_updates = {
    'ko_a_6': {
        'vi': {'name': 'Thịt heo luộc cuộn kim chi Bossam', 'desc': 'Thịt ba chỉ heo tươi luộc mềm mọng nước cùng gừng tỏi quế, cuộn lá cải thảo muối và kim chi củ cải cay giòn.'},
        'en': {'name': 'Traditional Pork Bossam', 'desc': 'Tender boiled pork belly wrapped in crisp salted cabbage with spicy radish kimchi.'},
        'ja': {'name': '伝統ポッサム', 'desc': 'じっくり茹で上げたジューシーな豚バラ肉を白菜キムチで包んでいただく名物料理。'},
        'ko': {'name': '전통 보쌈', 'desc': '부드럽게 삶아낸 돼지고기 수육과 아삭한 무김치, 절임 배추의 환상적인 조화.'},
        'zh': {'name': '正宗传统菜包肉', 'desc': '炖煮鲜嫩的五花肉片搭配爽脆白菜与特制泡菜，浓香四溢。'}
    },
    'ko_a_2': {
        'vi': {'name': 'Dồi sụn truyền thống chiên xù Sundae', 'desc': 'Từng khoanh dồi sụn miến thơm lừng gia vị chiên phồng giòn tan chấm muối ớt bột tiêu cay nồng.'},
        'en': {'name': 'Crispy Fried Sundae Blood Sausage', 'desc': 'Deep-fried Korean traditional blood sausage with glass noodles, crispy outside and soft inside.'},
        'ja': {'name': '揚げスンデ', 'desc': '香ばしくサクサクに揚げた韓国伝統の春雨入りスンデ。ピリ辛塩で。'},
        'ko': {'name': '바삭 전통 순대튀김', 'desc': '겉은 바삭하고 속은 쫄깃한 고소한 전통 순대 튀김.'},
        'zh': {'name': '香脆炸米肠', 'desc': '炸至金黄酥脆的韩国传统血肠，外脆里嫩香气扑鼻。'}
    },
    'ko_l_6': {
        'vi': {'name': 'Gà hầm sâm thuốc bắc Samgyetang', 'desc': 'Nguyên con gà non nhồi gạo nếp, nhân sâm Geumsan, táo đỏ, hạt dẻ hầm nhừ ngọt lịm bổ dưỡng phục hồi thể lực.'},
        'en': {'name': 'Ginseng Chicken Soup Samgyetang', 'desc': 'Whole young chicken stuffed with sweet rice, Korean ginseng, red dates, and garlic in nourishing broth.'},
        'ja': {'name': '栄養サムゲタン', 'desc': '若鶏にもち米、高麗人参、ナツメを詰めて煮込んだ伝統のスタミナ健康料理。'},
        'ko': {'name': '영양 삼계탕', 'desc': '영계에 찹쌀, 금산 인삼, 대추를 넣고 푹 고아낸 원기 회복 최고의 보양식.'},
        'zh': {'name': '营养参鸡汤', 'desc': '精选嫩鸡肚内塞入糯米、高丽参、红枣慢火炖至软烂，温润滋补。'}
    },
    'zh_m_7': {
        'vi': {'name': 'Hủ tiếu bò tái gân Triều Châu', 'desc': 'Bát hủ tiếu bánh mềm mượt chan nước súp xương bò hầm thanh ngọt, thịt bắp bò tái mềm và bò viên giòn sần sật.'},
        'en': {'name': 'Chaoshan Beef Rice Noodle Soup', 'desc': 'Silky flat rice noodles in clear sweet beef broth with tender beef slices and crunchy meatballs.'},
        'ja': {'name': '潮汕風牛肉米粉', 'desc': '澄んだ牛骨スープに柔らかい牛肉ともちもちの平打ち米粉麺が絶品。'},
        'ko': {'name': '조산식 소고기 쌀국수', 'desc': '맑고 깊은 소뼈 육수에 부드러운 소고기와 쫄깃한 쌀국수 면이 어우러진 맛.'},
        'zh': {'name': '潮汕牛肉粿条', 'desc': '浓郁牛骨清汤搭配鲜嫩手切牛肉与爽口牛肉丸，滑爽顺喉。'}
    },
    'zh_dr_5': {
        'vi': {'name': 'Trà bưởi hồng mật ong thanh nhiệt', 'desc': 'Tép bưởi hồng chín mọng ngào mật ong hoa rừng thơm lừng, vị chua ngọt thanh mát giàu vitamin C.'},
        'en': {'name': 'Honey Red Pomelo Tea', 'desc': 'Refreshing tea brewed with sweet wild honey and juicy red pomelo pulp, packed with vitamin C.'},
        'ja': {'name': '蜂蜜グレープフルーツティー', 'desc': '濃厚なハチミツと爽やかなルビーグレープフルーツ果肉が弾けるアイスティー。'},
        'ko': {'name': '꿀 자몽 허니 티', 'desc': '달콤한 야생화 꿀과 상큼한 자몽 과육이 가득 담긴 청량한 과일차.'},
        'zh': {'name': '蜂蜜柚子茶', 'desc': '新鲜红柚果粒融入天然野花蜂蜜，酸甜可口润喉生津。'}
    },
    'zh_a_9': {
        'vi': {'name': 'Mì tương đen Bắc Kinh Zha Jiang Mian', 'desc': 'Sợi mì tươi trụng dai giòn trộn đẫm sốt tương ngọt xào thịt ba chỉ băm, ăn kèm dưa leo và giá đỗ giòn ngọt.'},
        'en': {'name': 'Old Beijing Zha Jiang Mian Noodles', 'desc': 'Fresh chewy noodles tossed in rich savory soybean paste with diced pork and crunchy vegetables.'},
        'ja': {'name': '本場北京ジャージャー麺', 'desc': '豚肉の旨味が詰まった濃厚な黒味噌だれをコシのある手打ち麺とキュウリに絡めて。'},
        'ko': {'name': '베이징식 전통 짜장면', 'desc': '고소한 춘장 소스에 볶은 돼지고기와 신선한 오이를 비벼 먹는 북경 전통 면 요리.'},
        'zh': {'name': '老北京炸酱面', 'desc': '传统六必居干黄酱小火慢炸五花肉丁，配菜清爽面条劲道。'}
    },
    'en_l_8': {
        'vi': {'name': 'Mì Ý sốt bò băm cà chua hầm', 'desc': 'Sợi mì Ý luộc al dente phủ đẫm sốt thịt bò băm nấu rượu vang cà chua hầm nhừ 4 tiếng và phô mai Parmesan bào.'},
        'en': {'name': 'Classic Spaghetti Bolognese', 'desc': 'Al dente spaghetti tossed in rich slow-cooked beef ragù and San Marzano tomatoes, topped with grated Parmesan.'},
        'ja': {'name': '特製ボロネーゼ スパゲッティ', 'desc': '牛肉と完熟トマトをじっくり煮込んだ芳醇なミートソースに削りたてパルメザンチーズを添えて。'},
        'ko': {'name': '클래식 볼로네제 스파게티', 'desc': '오랜 시간 정성스레 끓여낸 깊고 진한 소고기 토마토 라구 소스와 파마산 치즈.'},
        'zh': {'name': '经典意式肉酱面', 'desc': '慢火煨炖浓郁番茄牛肉酱搭配弹牙意面，撒上现磨帕玛森干酪。'}
    },
    'en_l_10': {
        'vi': {'name': 'Cá hồi áp chảo sốt bơ chanh măng tây', 'desc': 'Miếng phi lê cá hồi Đại Tây Dương da giòn thịt mềm ngậy rưới sốt bơ chanh tỏi và ngọn măng tây nướng giòn ngọt.'},
        'en': {'name': 'Pan-Seared Salmon with Asparagus', 'desc': 'Crispy skin Atlantic salmon fillet drizzled with lemon butter garlic glaze, served with tender grilled asparagus.'},
        'ja': {'name': 'サーモンのムニエル 焼きアスパラ添え', 'desc': '皮面はカリッと身はしっとり焼き上げたサーモンにレモンバターソースと香ばしいアスパラガス。'},
        'ko': {'name': '팬프라이 연어 스테이크와 아스파라거스', 'desc': '바삭한 껍질과 촉촉한 연어 살에 향긋한 레몬 버터 소스와 아삭한 구운 아스파라거스.'},
        'zh': {'name': '香煎三文鱼配芦笋', 'desc': '外皮金黄焦脆内里肉质滑嫩的厚切三文鱼，佐以柠檬黄油汁与清脆烤芦笋。'}
    },
    'en_l_12': {
        'vi': {'name': 'Súp hành tây nướng phô mai kiểu Pháp', 'desc': 'Thố súp hầm từ hành tây caramen hóa ngọt lịm với nước dùng bò, phủ lát bánh mì nướng và ngập tràn phô mai Gruyère vàng ruộm kéo sợi.'},
        'en': {'name': 'French Onion Soup Gratinée', 'desc': 'Rich beef broth loaded with caramelized onions, topped with toasted French baguette and melted bubbly Gruyère cheese.'},
        'ja': {'name': 'オニオングラタンスープ', 'desc': 'じっくり炒めた甘い玉ねぎと芳醇なコンソメスープに、とろ〜り香ばしいグリュイエールチーズ。'},
        'ko': {'name': '프렌치 어니언 스프', 'desc': '카라멜라이징한 양파의 깊은 단맛과 바게트 위로 노릇하게 녹아내린 그뤼에르 치즈.'},
        'zh': {'name': '法式焗烤洋葱汤', 'desc': '慢炒焦糖洋葱与浓醇牛清汤炖煮，覆以法棍与厚厚一层焦香拉丝格鲁耶尔芝士。'}
    },
    'ja_m_3': {
        'vi': {'name': 'Cơm chan nước trà cá tráp đỏ Tai-chazuke', 'desc': 'Lát cá tráp đỏ biển tươi ướp sốt mè đậm đà đặt lên cơm nóng rồi chan ngập nước trà xanh dashi sôi nghi ngút khói.'},
        'en': {'name': 'Kyoto Red Sea Bream Chazuke', 'desc': 'Fresh slices of delicate sea bream marinated in rich sesame tare over steamed rice, drenched in hot dashi tea.'},
        'ja': {'name': '鯛茶漬け', 'desc': '新鮮な真鯛を特製胡麻ダレに絡め、熱々の香り高いお出汁を注いでいただく京都名物。'},
        'ko': {'name': '교토식 도미 오차즈케', 'desc': '고소한 참깨 소스에 버무린 신선한 도미 살을 따뜻한 밥 위에 얹고 향긋한 다시 차를 부어 먹는 요리.'},
        'zh': {'name': '京都红鲷鱼茶泡饭', 'desc': '鲜活红鲷鱼片裹满秘制芝麻酱汁，浇上滚烫香浓出汁高汤，清雅至味。'}
    }
}

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    replaced = False
    for k, tr in new_trans_updates.items():
        if re.match(rf"^\s*{k}:", line):
            clean_str = f"  {k}: {json.dumps(tr, ensure_ascii=False)},\n"
            new_lines.append(clean_str)
            replaced = True
            print(f"Cleaned line for {k}")
            break
    if not replaced:
        new_lines.append(line)

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("data.js cleaned successfully!")
