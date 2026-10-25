import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

reg_idx = text.find('const REGIONAL_DATABASES = {')

dish_specs = []

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
    
    for cat_k, cat in r_data.items():
        for d in cat['dishes']:
            did = d['id']
            name = d['name']
            
            clean_q = re.sub(r'\(.*?\)|（.*?）', '', name).strip()
            # specific cleaning
            clean_q = re.sub(r'^\d+円パン.*', '10円パン', clean_q)
            clean_q = re.sub(r'\s*\d+本', '', clean_q)
            
            queries = [(region, clean_q)]
            
            # Additional fallback queries based on keywords
            if region == 'ja':
                if '寿司' in name: queries.append(('ja', '握り寿司')); queries.append(('en', 'Sushi'))
                elif 'ラーメン' in name: queries.append(('ja', 'ラーメン')); queries.append(('en', 'Ramen'))
                elif 'うどん' in name: queries.append(('ja', 'うどん')); queries.append(('en', 'Udon'))
                elif '蕎麦' in name or 'そば' in name: queries.append(('ja', '蕎麦')); queries.append(('en', 'Soba'))
                elif 'カレー' in name: queries.append(('ja', '日本のカレー')); queries.append(('en', 'Japanese curry'))
                elif 'サンド' in name: queries.append(('ja', 'たまごサンド')); queries.append(('en', 'Tamago sando'))
                elif 'トースト' in name: queries.append(('ja', '小倉トースト')); queries.append(('en', 'Ogura toast'))
                elif '丼' in name: queries.append(('ja', clean_q)); queries.append(('en', clean_q))
                elif '鍋' in name: queries.append(('ja', clean_q)); queries.append(('en', 'Nabemono'))
                elif '焼き鳥' in name: queries.append(('ja', '焼き鳥')); queries.append(('en', 'Yakitori'))
                elif '刺身' in name: queries.append(('ja', '刺身')); queries.append(('en', 'Sashimi'))
                elif 'すき焼き' in name: queries.append(('ja', 'すき焼き')); queries.append(('en', 'Sukiyaki'))
                elif 'たこ焼き' in name: queries.append(('ja', 'たこ焼き')); queries.append(('en', 'Takoyaki'))
                elif 'お好み焼き' in name: queries.append(('ja', 'お好み焼き')); queries.append(('en', 'Okonomiyaki'))
                elif 'わらび餅' in name: queries.append(('ja', 'わらび餅')); queries.append(('en', 'Warabimochi'))
                elif 'パフェ' in name: queries.append(('ja', 'パフェ')); queries.append(('en', 'Parfait'))
                elif 'メロンソーダ' in name: queries.append(('ja', 'メロンソーダ')); queries.append(('en', 'Melon soda'))
                elif '抹茶ラテ' in name: queries.append(('ja', '抹茶')); queries.append(('en', 'Matcha latte'))
                elif 'ラムネ' in name: queries.append(('ja', 'ラムネ (清涼飲料)')); queries.append(('en', 'Ramune'))
                elif 'カルピス' in name: queries.append(('ja', 'カルピス')); queries.append(('en', 'Calpis'))
                else: queries.append(('en', clean_q))
            elif region == 'ko':
                if '토스트' in name: queries.append(('ko', '길거리 토스트')); queries.append(('en', 'Street toast'))
                elif '계란빵' in name: queries.append(('ko', '계란빵')); queries.append(('en', 'Gyeran-ppang'))
                elif '비빔밥' in name: queries.append(('ko', '비빔밥')); queries.append(('en', 'Bibimbap'))
                elif '김밥' in name: queries.append(('ko', '김밥')); queries.append(('en', 'Gimbap'))
                elif '짜장' in name: queries.append(('ko', '짜장면')); queries.append(('en', 'Jajangmyeon'))
                elif '짬뽕' in name: queries.append(('ko', '짬뽕')); queries.append(('en', 'Jjamppong'))
                elif '김치찌개' in name: queries.append(('ko', '김치찌개')); queries.append(('en', 'Kimchi-jjigae'))
                elif '삼계탕' in name: queries.append(('ko', '삼계탕')); queries.append(('en', 'Samgye-tang'))
                elif '냉면' in name: queries.append(('ko', '냉면')); queries.append(('en', 'Naengmyeon'))
                elif '칼국수' in name: queries.append(('ko', '칼국수')); queries.append(('en', 'Kal-guksu'))
                elif '불고기' in name: queries.append(('ko', '불고기')); queries.append(('en', 'Bulgogi'))
                elif '찜닭' in name: queries.append(('ko', '안동찜닭')); queries.append(('en', 'Andong jjimdak'))
                elif '떡볶이' in name: queries.append(('ko', '떡볶이')); queries.append(('en', 'Tteokbokki'))
                elif '순대' in name: queries.append(('ko', '순대')); queries.append(('en', 'Sundae (food)'))
                elif '핫도그' in name: queries.append(('ko', '핫도그')); queries.append(('en', 'Corn dog'))
                elif '어묵' in name: queries.append(('ko', '어묵')); queries.append(('en', 'Eomuk'))
                elif '보쌈' in name: queries.append(('ko', '보쌈')); queries.append(('en', 'Bossam'))
                elif '삼겹살' in name: queries.append(('ko', '삼겹살')); queries.append(('en', 'Samgyeopsal'))
                elif '치킨' in name: queries.append(('ko', '한국식 치킨')); queries.append(('en', 'Korean fried chicken'))
                elif '갈비' in name: queries.append(('ko', '갈비구이')); queries.append(('en', 'Galbi'))
                elif '감자탕' in name: queries.append(('ko', '감자탕')); queries.append(('en', 'Gamja-tang'))
                elif '부대찌개' in name: queries.append(('ko', '부대찌개')); queries.append(('en', 'Budae-jjigae'))
                elif '파전' in name: queries.append(('ko', '파전')); queries.append(('en', 'Pajeon'))
                elif '빙수' in name: queries.append(('ko', '팥빙수')); queries.append(('en', 'Bingsu'))
                elif '호떡' in name: queries.append(('ko', '호떡')); queries.append(('en', 'Hotteok'))
                elif '붕어빵' in name: queries.append(('ko', '붕어빵')); queries.append(('en', 'Bungeo-ppang'))
                elif '바나나맛 우유' in name: queries.append(('ko', '바나나맛 우유')); queries.append(('en', 'Banana Flavored Milk'))
                elif '식혜' in name: queries.append(('ko', '식혜')); queries.append(('en', 'Sikhye'))
                elif '수정과' in name: queries.append(('ko', '수정과')); queries.append(('en', 'Sujeonggwa'))
                elif '소주' in name: queries.append(('ko', '소주')); queries.append(('en', 'Soju'))
                elif '막걸리' in name: queries.append(('ko', '막걸리')); queries.append(('en', 'Makgeolli'))
                else: queries.append(('en', clean_q))
            elif region == 'zh':
                if '小笼包' in name: queries.append(('zh', '小籠包')); queries.append(('en', 'Xiaolongbao'))
                elif '生煎包' in name: queries.append(('zh', '生煎馒头')); queries.append(('en', 'Shengjian mantou'))
                elif '热干面' in name: queries.append(('zh', '热干面')); queries.append(('en', 'Hot dry noodles'))
                elif '油条' in name: queries.append(('zh', '油条')); queries.append(('en', 'Youtiao'))
                elif '皮蛋瘦肉粥' in name: queries.append(('zh', '皮蛋瘦肉粥')); queries.append(('en', 'Congee'))
                elif '粿条' in name: queries.append(('zh', '粿条')); queries.append(('en', 'Kway teow'))
                elif '拉面' in name: queries.append(('zh', '兰州牛肉面')); queries.append(('en', 'Lanzhou beef lamian'))
                elif '肉夹馍' in name: queries.append(('zh', '肉夹馍')); queries.append(('en', 'Rou jia mo'))
                elif '麻婆豆腐' in name: queries.append(('zh', '麻婆豆腐')); queries.append(('en', 'Mapo tofu'))
                elif '宫保鸡丁' in name: queries.append(('zh', '宫保鸡丁')); queries.append(('en', 'Kung Pao chicken'))
                elif '叉烧' in name: queries.append(('zh', '叉烧')); queries.append(('en', 'Char siu'))
                elif '虾饺' in name: queries.append(('zh', '虾饺')); queries.append(('en', 'Har gow'))
                elif '凉皮' in name: queries.append(('zh', '凉皮')); queries.append(('en', 'Liangpi'))
                elif '螺蛳粉' in name: queries.append(('zh', '螺蛳粉')); queries.append(('en', 'Luosifen'))
                elif '锅包肉' in name: queries.append(('zh', '锅包肉')); queries.append(('en', 'Guobaorou'))
                elif '蛋炒饭' in name: queries.append(('zh', '蛋炒饭')); queries.append(('en', 'Egg fried rice'))
                elif '鸡蛋仔' in name: queries.append(('zh', '鸡蛋仔')); queries.append(('en', 'Egg waffle'))
                elif '冰糖葫芦' in name: queries.append(('zh', '冰糖葫芦')); queries.append(('en', 'Tanghulu'))
                elif '臭豆腐' in name: queries.append(('zh', '臭豆腐')); queries.append(('en', 'Stinky tofu'))
                elif '炸酱面' in name: queries.append(('zh', '炸酱面')); queries.append(('en', 'Zhajiangmian'))
                elif '烤鸭' in name: queries.append(('zh', '北京烤鸭')); queries.append(('en', 'Peking duck'))
                elif '火锅' in name: queries.append(('zh', '重庆火锅')); queries.append(('en', 'Hot pot'))
                elif '煲仔饭' in name: queries.append(('zh', '煲仔饭')); queries.append(('en', 'Claypot rice'))
                elif '东坡肉' in name: queries.append(('zh', '东坡肉')); queries.append(('en', 'Dongpo pork'))
                elif '水煮鱼' in name: queries.append(('zh', '水煮鱼')); queries.append(('en', 'Shuizhu'))
                elif '叫花鸡' in name: queries.append(('zh', '叫化鸡')); queries.append(('en', 'Beggar\'s Chicken'))
                elif '佛跳墙' in name: queries.append(('zh', '佛跳墙')); queries.append(('en', 'Buddha Jumps Over the Wall'))
                elif '杨枝甘露' in name: queries.append(('zh', '杨枝甘露')); queries.append(('en', 'Mango pomelo sago'))
                elif '双皮奶' in name: queries.append(('zh', '双皮奶')); queries.append(('en', 'Double skin milk'))
                elif '柠檬茶' in name: queries.append(('zh', '柠檬茶')); queries.append(('en', 'Lemon tea'))
                elif '丝袜奶茶' in name: queries.append(('zh', '丝袜奶茶')); queries.append(('en', 'Hong Kong-style milk tea'))
                elif '酸梅汤' in name: queries.append(('zh', '酸梅汤')); queries.append(('en', 'Suanmeitang'))
                elif '青岛啤酒' in name: queries.append(('zh', '青岛啤酒')); queries.append(('en', 'Tsingtao Brewery'))
                else: queries.append(('en', clean_q))
            elif region == 'en':
                queries.append(('en', clean_q))
                if 'Breakfast' in name: queries.append(('en', 'Full English breakfast'))
                elif 'Pancakes' in name: queries.append(('en', 'Pancake'))
                elif 'Eggs Benedict' in name: queries.append(('en', 'Eggs Benedict'))
                elif 'Avocado Toast' in name: queries.append(('en', 'Avocado toast'))
                elif 'Bagel' in name: queries.append(('en', 'Bagel'))
                elif 'Waffles' in name: queries.append(('en', 'Chicken and waffles'))
                elif 'Biscuits' in name: queries.append(('en', 'Biscuits and gravy'))
                elif 'Cheeseburger' in name: queries.append(('en', 'Cheeseburger'))
                elif 'Pizza' in name: queries.append(('en', 'Pizza'))
                elif 'Fish & Chips' in name: queries.append(('en', 'Fish and chips'))
                elif 'Philly Cheesesteak' in name: queries.append(('en', 'Cheesesteak'))
                elif 'Clam Chowder' in name: queries.append(('en', 'Clam chowder'))
                elif 'Lobster Roll' in name: queries.append(('en', 'Lobster roll'))
                elif 'Hot Chicken' in name: queries.append(('en', 'Hot chicken'))
                elif 'Spaghetti Bolognese' in name: queries.append(('en', 'Bolognese sauce'))
                elif 'Cobb Salad' in name: queries.append(('en', 'Cobb salad'))
                elif 'Salmon' in name: queries.append(('en', 'Salmon as food'))
                elif 'BLT' in name: queries.append(('en', 'BLT'))
                elif 'French Onion Soup' in name: queries.append(('en', 'French onion soup'))
                elif 'Mac & Cheese' in name: queries.append(('en', 'Macaroni and cheese'))
                elif 'Buffalo Chicken Wings' in name: queries.append(('en', 'Buffalo wing'))
                elif 'Churros' in name: queries.append(('en', 'Churro'))
                elif 'Beignets' in name: queries.append(('en', 'Beignet'))
                elif 'Cornish Pasties' in name: queries.append(('en', 'Pasty'))
                elif 'Scotch Egg' in name: queries.append(('en', 'Scotch egg'))
                elif 'Onion Rings' in name: queries.append(('en', 'Onion ring'))
                elif 'Chili Cheese Fries' in name: queries.append(('en', 'Cheese fries'))
                elif 'Pretzel' in name: queries.append(('en', 'Pretzel'))
                elif 'Ribeye Steak' in name: queries.append(('en', 'Rib eye steak'))
                elif 'Beef Brisket' in name: queries.append(('en', 'Brisket'))
                elif 'Pork Ribs' in name: queries.append(('en', 'Ribs (food)'))
                elif 'Sunday Roast' in name: queries.append(('en', 'Sunday roast'))
                elif "Shepherd's Pie" in name: queries.append(('en', "Shepherd's pie"))
                elif 'Jambalaya' in name: queries.append(('en', 'Jambalaya'))
                elif 'Fettuccine Alfredo' in name: queries.append(('en', 'Fettuccine Alfredo'))
                elif 'Cioppino' in name: queries.append(('en', 'Cioppino'))
                elif 'Cheesecake' in name: queries.append(('en', 'Cheesecake'))
                elif 'Lava Cake' in name: queries.append(('en', 'Molten chocolate cake'))
                elif 'Apple Pie' in name: queries.append(('en', 'Apple pie'))
                elif 'Cold Brew' in name: queries.append(('en', 'Cold brew coffee'))

            dish_specs.append({
                'region': region,
                'id': did,
                'name': name,
                'queries': queries
            })

# Also add Vietnam dishes needing custom photos
vn_custom = [
    ('toi_5_1', 'Lẩu cua đồng bắp bò', [('vi', 'Lẩu cua đồng'), ('vi', 'Bún riêu cua'), ('en', 'Crab hot pot')]),
    ('toi_5_3', 'Bò nướng lá lốt', [('vi', 'Bò lá lốt'), ('en', 'Bò lá lốt')]),
    ('toi_4_1', 'Ốc hương xào bơ tỏi', [('vi', 'Ốc hương'), ('en', 'Babylonia areolata')]),
    ('toi_mi_vit_tiem', 'Mì gà quay da giòn', [('vi', 'Cơm gà xối mỡ'), ('en', 'Crispy chicken')]),
    ('more_dinner_bun_hen', 'Bún bò giò heo Huế', [('vi', 'Bún bò Huế'), ('en', 'Bún bò Huế')]),
    ('vat_5_2', 'Chè sương sa hạt lựu', [('vi', 'Sương sa'), ('en', 'Tub tim krob')]),
    ('hl_phin_sua_da', 'Cà phê dừa non nướng', [('vi', 'Cà phê cốt dừa'), ('en', 'Coconut coffee')]),
    ('nuoc_ngot_1', 'Nước sấu ngâm gừng Hà Nội', [('vi', 'Sấu'), ('vi', 'Nước sấu ngâm')]),
    ('nuoc_coca_zero', 'Nước mơ ngâm Chùa Hương', [('vi', 'Mơ (thực vật)'), ('en', 'Apricot')]),
    ('nuoc_pepsi_chanh', 'Nước mía cốt dừa tươi', [('vi', 'Nước mía'), ('en', 'Sugarcane juice')]),
    ('nuoc_ngot_3', 'Sữa chua nếp cẩm Mộc Châu', [('vi', 'Sữa chua nếp cẩm'), ('vi', 'Nếp cẩm')]),
    ('nuoc_sprite', 'Cà phê cốt dừa Hải Phòng', [('vi', 'Cà phê cốt dừa'), ('en', 'Coconut coffee')]),
    ('nuoc_ngot_4', 'Nước râu ngô mía lau mã đề', [('vi', 'Nước sâm'), ('en', 'Tisane')]),
    ('nuoc_sting_vang', 'Trà mạn sen Tây Hồ truyền thống', [('vi', 'Trà sen'), ('en', 'Lotus tea')]),
    ('nuoc_ngot_5', 'Sinh tố dừa sapoche Bến Tre', [('vi', 'Hồng xiêm'), ('en', 'Sapodilla')]),
    ('nuoc_mirinda_xa_xi', 'Nước dừa xiêm tắc muối', [('vi', 'Nước dừa'), ('en', 'Coconut water')]),
    ('nuoc_revive', 'Trà thanh long đỏ hạt chia', [('vi', 'Thanh long'), ('en', 'Pitaya')]),
    ('hl_freeze_tra_xanh', 'Freeze Trà Xanh thạch matcha', [('vi', 'Trà xanh đá xay'), ('en', 'Green tea frappe')]),
    ('pl_tra_mang_cau', 'Trà Ô Long Mãng Cầu', [('vi', 'Mãng cầu xiêm'), ('en', 'Soursop')])
]

for did, name, q_list in vn_custom:
    dish_specs.append({
        'region': 'vi',
        'id': did,
        'name': name,
        'queries': q_list
    })

with open('scripts/all_download_specs.json', 'w', encoding='utf-8') as f:
    json.dump(dish_specs, f, ensure_ascii=False, indent=2)

print(f"Generated specs for {len(dish_specs)} dishes total.")
