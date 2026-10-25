import re
import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

# 1. Parse implementation_plan.md
plan_path = r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md'
with open(plan_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_country = None
current_period = None
countries = {}

dish_pattern = r'^\s*\d+\.\s+\*\*([^*]+)\*\*\s+\|\s+\*([^*]+)\*\s+\|\s+([^|]+)\|\s*(.+)$'

for line in lines:
    line_s = line.strip()
    if line_s.startswith('### '):
        if 'NHẬT BẢN' in line_s:
            current_country = 'ja'
        elif 'HÀN QUỐC' in line_s:
            current_country = 'ko'
        elif 'TRUNG QUỐC' in line_s:
            current_country = 'zh'
        elif 'ÂU - MỸ' in line_s:
            current_country = 'en'
        else:
            current_country = None
        if current_country and current_country not in countries:
            countries[current_country] = {}
        continue
    
    if line_s.startswith('#### '):
        if 'Morning' in line_s or 'Bữa Sáng' in line_s:
            current_period = 'morning'
        elif 'Lunch' in line_s or 'Bữa Trưa' in line_s:
            current_period = 'lunch'
        elif 'Afternoon' in line_s or 'Bữa Xế' in line_s:
            current_period = 'afternoon'
        elif 'Dinner' in line_s or 'Bữa Tối' in line_s:
            current_period = 'dinner'
        elif 'Snacks' in line_s or 'Đồ Ăn Vặt' in line_s or 'Ăn Vặt' in line_s or 'Tráng Miệng' in line_s or 'Bữa Đêm' in line_s:
            current_period = 'snacks'
        elif 'Drinks' in line_s or 'Đồ Uống' in line_s:
            current_period = 'drinks'
        else:
            current_period = None
        if current_country and current_period and current_period not in countries[current_country]:
            countries[current_country][current_period] = []
        continue

    m = re.match(dish_pattern, line_s)
    if m and current_country and current_period and current_country in countries:
        native_name = m.group(1).strip()
        vi_name = m.group(2).strip()
        price_str = m.group(3).strip()
        desc = m.group(4).strip()
        
        p_clean = re.sub(r'[^\d.]', '', price_str)
        price_val = float(p_clean) if '.' in p_clean else int(p_clean)
        
        countries[current_country][current_period].append({
            'native_name': native_name,
            'vi_name': vi_name,
            'price_str': price_str,
            'price': price_val,
            'desc': desc
        })

print("Parsed dishes from plan:")
for c in ['ja', 'ko', 'zh', 'en']:
    print(f" {c}: {sum(len(d) for d in countries[c].values())} dishes")

# Image picker
def pick_image(meal, name, vi_name, desc):
    full_text = f"{name} {vi_name} {desc}".lower()
    
    if meal == 'drinks':
        if any(k in full_text for k in ['coffee', 'cà phê', 'espresso', 'latte', 'americano', 'cold brew', '珈琲', 'コーヒー', '아메리카노']):
            if any(k in full_text for k in ['đen', 'black', 'cold brew', 'americano']):
                return 'images/do_uong/ca_phe_den_da.webp'
            if any(k in full_text for k in ['bạc xỉu', 'oat milk', 'sữa']):
                return 'images/do_uong/bac_xiu.webp'
            if 'muối' in full_text or 'salt' in full_text:
                return 'images/do_uong/ca_phe_muoi.webp'
            if 'trứng' in full_text or 'egg' in full_text:
                return 'images/do_uong/ca_phe_trung.webp'
            return 'images/do_uong/ca_phe_sua_da.webp'
        if any(k in full_text for k in ['trà sữa', 'boba', 'bubble tea', 'milk tea', '밀크티', '奶茶']):
            return 'images/do_uong/tra_sua.webp'
        if any(k in full_text for k in ['matcha', 'trà xanh', 'greentea', '抹茶', '녹차']):
            return 'images/do_uong/tra_lai_kem_cheese.webp'
        if any(k in full_text for k in ['chanh', 'lemon', 'lemonade', '레모네이드', '柠檬']):
            if 'muối' in full_text:
                return 'images/do_uong/chanh_muoi.webp'
            if 'tắc' in full_text or 'kumquat' in full_text:
                return 'images/do_uong/tra_tac.webp'
            return 'images/binh_dan/chanh_day.webp'
        if any(k in full_text for k in ['cam', 'orange', '오렌지', '橙']):
            return 'images/binh_dan/nuoc_cam.webp'
        if any(k in full_text for k in ['dưa', 'thơm', 'dứa', 'pineapple', 'ổi', 'guava', 'melon']):
            if 'thơm' in full_text or 'dứa' in full_text:
                return 'images/do_uong/nuoc_ep_thom.webp'
            if 'ổi' in full_text:
                return 'images/do_uong/nuoc_ep_oi_hong.webp'
            if 'melon' in full_text or 'dưa lưới' in full_text or 'dưa hấu' in full_text:
                return 'images/do_uong/soda_viet_quat.webp'
            return 'images/do_uong/nuoc_dua.webp'
        if any(k in full_text for k in ['dâu', 'strawberry', '딸기', '草莓']):
            return 'images/do_uong/sinh_to_dau.webp'
        if any(k in full_text for k in ['chuối', 'banana', '바나나', '香蕉', 'bắp', 'ngô']):
            return 'images/do_uong/sua_bap.webp'
        if any(k in full_text for k in ['sữa đậu', 'soy milk', '두유', '豆浆']):
            return 'images/binh_dan/sua_dau_nanh.webp'
        if any(k in full_text for k in ['bia', 'beer', 'ale', 'ipa', '맥주', '啤酒', 'rượu', 'wine', 'soju', 'sake', 'cocktail', '술']):
            return 'images/do_uong/coca_cola.webp'
        if any(k in full_text for k in ['soda', 'milkis', 'cola', 'pepsi', 'sprite', 'ga', 'float', '탄산']):
            if 'cola' in full_text or 'coke' in full_text:
                return 'images/do_uong/coca_cola.webp'
            if 'pepsi' in full_text:
                return 'images/do_uong/pepsi.webp'
            return 'images/do_uong/7up.webp'
        if any(k in full_text for k in ['trà', 'tea', 'sen', 'vải', 'đào', 'ô long', 'oolong', '茶']):
            if 'đào' in full_text:
                return 'images/do_uong/tra_dao.webp'
            if 'vải' in full_text:
                return 'images/do_uong/tra_vai.webp'
            if 'sen' in full_text:
                return 'images/do_uong/tra_sen_vang.webp'
            return 'images/do_uong/tra_trai_cay.webp'
        return 'images/binh_dan/tra_da.webp'
        
    if any(k in full_text for k in ['bánh mì', 'sandwich', 'burger', 'toast', 'bagel', 'hot dog', 'hotdog', 'pan', 'sando', 'roujiamo', 'kẹp', 'hamburger', '샌드위치', '토스트', '버거']):
        if any(k in full_text for k in ['chảo', 'bò né', 'steak', 'meat', 'sườn', 'thịt']):
            return 'images/buoi_sang/banh_mi_chao.webp'
        if any(k in full_text for k in ['xíu mại', 'thịt băm', 'viên']):
            return 'images/binh_dan/banh_mi_xiu_mai.webp'
        return 'images/buoi_sang/banh_mi_pate.webp'
        
    if any(k in full_text for k in ['bánh bao', 'há cảo', 'tiểu long bao', 'sủi cảo', 'dumpling', 'dim sum', 'baozi', 'shengjian', 'har gow', 'manti', 'hoành thánh', 'wonton', 'chao shou', '만두', '소롱포', '교자']):
        return 'images/sinh_vien/banh_bao.webp'
        
    if any(k in full_text for k in ['bánh xèo', 'okonomiyaki', 'jeon', 'pancake', 'waffle', 'chiên bột', 'bột chiên', '전', '부침개', '煎饼']):
        return 'images/buoi_chieu/banh_xeo.webp'
        
    if any(k in full_text for k in ['lẩu', 'súp', 'sukiyaki', 'soup', 'pot', 'cháo', 'porridge', 'jjigae', 'canh', 'hầm', 'ochazuke', 'stew', '탕', '찌개', '전골', '锅']):
        if any(k in full_text for k in ['cháo', 'porridge', 'congee', '죽', '粥']):
            return 'images/buoi_toi/chao_suon.webp'
        if any(k in full_text for k in ['súp', 'soup', 'chowder', 'nghêu', 'cua', 'bắp', 'clam']):
            return 'images/buoi_chieu/sup_cua.webp'
        return 'images/buoi_toi/lau_thai.webp'
        
    if any(k in full_text for k in ['mì', 'ramen', 'udon', 'soba', 'bún', 'phở', 'hủ tiếu', 'noodle', 'pasta', 'spaghetti', 'lamian', 'naengmyeon', 'jjajang', 'mie', '면', '국수', '라멘', '우동', '소바', '拉面', '面']):
        if any(k in full_text for k in ['bò', 'beef', '소고기', '牛肉']):
            return 'images/buoi_sang/pho_bo.webp'
        if any(k in full_text for k in ['cay', 'chua cay', 'tứ xuyên', 'chả cá', 'thái', '짬뽕', '麻辣']):
            return 'images/binh_dan/bun_thai.webp'
        if any(k in full_text for k in ['trộn', 'khô', 'lạnh', 'zaru', 'soba', '비빔', '냉면', '拌面', '凉面']):
            return 'images/buoi_trua/bun_thit_nuong.webp'
        return 'images/buoi_sang/bun_bo_hue.webp'
        
    if any(k in full_text for k in ['thịt nướng', 'bbq', 'bít tết', 'steak', 'sườn', 'ribs', 'samgyeopsal', 'bulgogi', 'yakitori', 'roast', 'grill', 'nướng', 'gà rán', 'chimaek', 'karaage', 'fried chicken', 'chiên giòn', '구이', '불고기', '갈비', '삼겹살', '치킨', '烤肉', '炸鸡']):
        if any(k in full_text for k in ['bít tết', 'steak', 'bò né', '스테이크', '牛排']):
            return 'images/buoi_toi/bo_ne.webp'
        return 'images/buoi_toi/bbq_nuong.webp'
        
    if any(k in full_text for k in ['sushi', 'sashimi', 'kimbap', 'chirashi', 'cơm cuộn', '초밥', '사시미', '김밥', '寿司', '生鱼片']):
        return 'images/buoi_chieu/goi_cuon.webp'
        
    if any(k in full_text for k in ['cơm', 'rice', 'donburi', 'katsudon', 'gyudon', 'oyakodon', 'bibimbap', 'curry', 'cà ri', 'xôi', 'fried rice', 'dương châu', 'chiên', '밥', '비빔밥', '덮밥', '炒饭', '饭']):
        if any(k in full_text for k in ['gà', 'chicken', '치킨', '닭', '鸡']):
            return 'images/buoi_trua/com_ga.webp'
        if any(k in full_text for k in ['chiên', 'fried', 'rang', 'dương châu', 'tân cương']):
            return 'images/buoi_trua/com_rang.webp'
        return 'images/buoi_trua/com_tam.webp'
        
    if any(k in full_text for k in ['bánh ngọt', 'bánh kem', 'cheesecake', 'bingsu', 'parfait', 'pie', 'tart', 'pudding', 'chè', 'dessert', 'kem', 'ice cream', 'mochi', 'dango', 'waffle', 'kẹo', 'sweet', '케이크', '빙수', '디저트', '蛋糕', '甜品', '冰淇淋']):
        if any(k in full_text for k in ['chè', 'bingsu', 'sago', 'hwachae', '빙수', '화채', '杨枝甘露']):
            return 'images/do_an_vat/che_thai.webp'
        if any(k in full_text for k in ['flan', 'pudding', 'custard', 'brûlée', '푸딩', '布丁']):
            return 'images/sinh_vien/banh_flan.webp'
        return 'images/sinh_vien/banh_bo.webp'
        
    if any(k in full_text for k in ['snack', 'xiên', 'que', 'viên', 'takoyaki', 'tteokbokki', 'khoai tây', 'fries', 'chips', 'wings', 'nachos', 'bánh tráng', 'nem chua']):
        if any(k in full_text for k in ['nem', 'rán', 'chả giò', 'spring roll']):
            return 'images/do_an_vat/nem_chua_ran.webp'
        if any(k in full_text for k in ['viên', 'xiên', 'que', 'takoyaki', 'tteokbokki']):
            return 'images/do_an_vat/ca_vien_chien.webp'
        return 'images/do_an_vat/banh_trang_nuong.webp'
        
    defaults = {
        'morning': 'images/buoi_sang/pho_bo.webp',
        'lunch': 'images/buoi_trua/com_tam.webp',
        'afternoon': 'images/buoi_chieu/banh_xeo.webp',
        'dinner': 'images/buoi_toi/bbq_nuong.webp',
        'snacks': 'images/do_an_vat/ca_vien_chien.webp',
        'drinks': 'images/do_uong/tra_sua.webp',
    }
    return defaults.get(meal, 'images/buoi_trua/com_tam.webp')

# Banner config per country and period
PERIOD_METADATA = {
    'ja': {
        'morning': {'name': '朝食', 'title': '今朝は何を食べる？', 'bannerName': '伝統と人気の朝食', 'subtitle': '焼きたてトーストや温かいお茶漬けで素晴らしい一日の始まりを', 'bannerImage': 'images/buoi_sang/pho_bo.webp'},
        'lunch': {'name': '昼食', 'title': '今日のお昼は何にする？', 'bannerName': '大満足のランチ名物', 'subtitle': '寿司、ラーメン、カツ丼など活力をチャージする絶品料理', 'bannerImage': 'images/buoi_trua/com_tam.webp'},
        'afternoon': {'name': '軽食・おやつ', 'title': '午後のひと息に何食べる？', 'bannerName': '定番のストリートフード', 'subtitle': 'たこ焼き、お好み焼き、たい焼きなど心躍る屋台の味', 'bannerImage': 'images/buoi_chieu/banh_xeo.webp'},
        'dinner': {'name': '夕食・居酒屋', 'title': '今夜は何で乾杯する？', 'bannerName': '心温まる夜のご馳走', 'subtitle': '特選刺身、すき焼き、焼き鳥など贅沢で豊かなディナータイム', 'bannerImage': 'images/buoi_toi/bbq_nuong.webp'},
        'snacks': {'name': '夜食・和菓子', 'title': '夜のひとときのお供に', 'bannerName': '深夜の誘惑と和スイーツ', 'subtitle': 'わらび餅、抹茶パフェ、串カツなど至福のデザート＆スナック', 'bannerImage': 'images/do_an_vat/ca_vien_chien.webp'},
        'drinks': {'name': 'お飲み物', 'title': '喉を潤す一杯', 'bannerName': '日本の人気ドリンク', 'subtitle': '淹れたて抹茶ラテ、メロンソーダ、冷酒など爽快なドリンク', 'bannerImage': 'images/do_uong/tra_sua.webp'},
    },
    'ko': {
        'morning': {'name': '아침식사', 'title': '오늘 아침 뭐 먹지?', 'bannerName': '든든하고 따뜻한 아침', 'subtitle': '부드러운 전복죽과 얼큰한 해장국으로 깨우는 활기찬 하루', 'bannerImage': 'images/buoi_sang/pho_bo.webp'},
        'lunch': {'name': '점심식사', 'title': '오늘 점심 뭐 먹을까?', 'bannerName': '한국인이 사랑하는 런치', 'subtitle': '비빔밥, 짜장면, 김치찌개 등 든든하고 맛있는 밥상', 'bannerImage': 'images/buoi_trua/com_tam.webp'},
        'afternoon': {'name': '간식 & 분식', 'title': '출출할 때 즐기는 길거리 분식', 'bannerName': '매콤달콤 국민 분식', 'subtitle': '로제 떡볶이, 바삭한 튀김, 핫도그 등 멈출 수 없는 맛', 'bannerImage': 'images/buoi_chieu/banh_xeo.webp'},
        'dinner': {'name': '저녁식사', 'title': '오늘 저녁 푸짐한 한 끼', 'bannerName': '지글지글 고기 & 찌개 파티', 'subtitle': '두툼한 삼겹살, 소갈비구이, 치맥으로 완성하는 즐거운 저녁', 'bannerImage': 'images/buoi_toi/bbq_nuong.webp'},
        'snacks': {'name': '디저트 & 야식', 'title': '달콤한 디저트와 야식', 'bannerName': '심야 분식 & K-디저트', 'subtitle': '인절미 눈꽃빙수, 호떡, 화채 등 달콤한 힐링', 'bannerImage': 'images/do_an_vat/ca_vien_chien.webp'},
        'drinks': {'name': '한국 음료', 'title': '시원하고 개운한 K-음료', 'bannerName': '전통 음료와 국민 커피', 'subtitle': '아이스 아메리카노, 바나나우유, 달콤한 식혜 한 잔', 'bannerImage': 'images/do_uong/tra_sua.webp'},
    },
    'zh': {
        'morning': {'name': '早餐', 'title': '今天早晨吃点什么？', 'bannerName': '地道经典的传统早点', 'subtitle': '热气腾腾的小笼包、金黄酥脆的煎饼果子唤醒元气早晨', 'bannerImage': 'images/buoi_sang/pho_bo.webp'},
        'lunch': {'name': '午餐', 'title': '午饭时间吃什么？', 'bannerName': '大江南北的人气美味', 'subtitle': '兰州牛肉面、正宗麻婆豆腐、广式叉烧饭等开胃午餐', 'bannerImage': 'images/buoi_trua/com_tam.webp'},
        'afternoon': {'name': '下午茶与小吃', 'title': '午后解馋特色小吃', 'bannerName': '舌尖上的街头烟火气', 'subtitle': '港式鸡蛋仔、冰糖葫芦、长沙臭豆腐等不可错过的风味', 'bannerImage': 'images/buoi_chieu/banh_xeo.webp'},
        'dinner': {'name': '晚餐盛宴', 'title': '今晚吃一顿丰盛盛宴', 'bannerName': '中华传统八大菜系', 'subtitle': '老北京烤鸭、四川麻辣火锅、富贵东坡肉等珍馐佳肴', 'bannerImage': 'images/buoi_toi/bbq_nuong.webp'},
        'snacks': {'name': '中式甜品与夜食', 'title': '晚间美味与清润甜品', 'bannerName': '温润身心的夜市滋味', 'subtitle': '杨枝甘露、双皮奶、桂花冰汤圆等甜蜜抚慰', 'bannerImage': 'images/do_an_vat/ca_vien_chien.webp'},
        'drinks': {'name': '特色饮品', 'title': '清凉解渴的人气茶饮', 'bannerName': '中华茶饮与清爽特调', 'subtitle': '手打柠檬茶、满杯多肉葡萄、港式丝袜奶茶等畅爽体验', 'bannerImage': 'images/do_uong/tra_sua.webp'},
    },
    'en': {
        'morning': {'name': 'Breakfast & Brunch', 'title': 'What are you craving this morning?', 'bannerName': 'Classic Morning Plates', 'subtitle': 'Fluffy buttermilk pancakes, avocado toast, and hearty eggs benedict', 'bannerImage': 'images/buoi_sang/pho_bo.webp'},
        'lunch': {'name': 'Lunch & Deli', 'title': 'What is on for lunch today?', 'bannerName': 'Deli Favorites & Comfort Bowls', 'subtitle': 'Double smash cheeseburgers, NY pepperoni pizza, and grilled panini', 'bannerImage': 'images/buoi_trua/com_tam.webp'},
        'afternoon': {'name': 'Pub Grub & Bites', 'title': 'Afternoon bites and tasty snacks', 'bannerName': 'Crispy Finger Foods & Pub Classics', 'subtitle': 'Golden chicken tenders, loaded nachos, and buffalo wings', 'bannerImage': 'images/buoi_chieu/banh_xeo.webp'},
        'dinner': {'name': 'Dinner & Steaks', 'title': 'What sounds good for dinner tonight?', 'bannerName': 'Hearty Feasts & Grills', 'subtitle': 'Prime ribeye steak, slow-smoked BBQ ribs, and rich creamy pastas', 'bannerImage': 'images/buoi_toi/bbq_nuong.webp'},
        'snacks': {'name': 'Desserts & Sweets', 'title': 'Treat yourself to something sweet', 'bannerName': 'Decadent Treats & Baked Delights', 'subtitle': 'New York cheesecake, warm lava cake, and fresh cinnamon rolls', 'bannerImage': 'images/do_an_vat/ca_vien_chien.webp'},
        'drinks': {'name': 'Beverages & Brews', 'title': 'Refresh your day with a chilled sip', 'bannerName': 'Artisan Coffee & Cool Sips', 'subtitle': 'Chilled cold brew, iced oat milk latte, and refreshing strawberry lemonade', 'bannerImage': 'images/do_uong/tra_sua.webp'},
    }
}

# Read existing data.js
with open('src/js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# 1. Clean existing parenthesized Vietnamese endings from DISH_TRANSLATIONS
# Matches: en: { name: "Foo (Bar)", desc: "..." } -> en: { name: "Foo", desc: "..." }
def clean_parens_in_translations(match):
    full = match.group(0)
    # Strip (Vietnamese Name) inside name: "..."
    # Replace (Tiếng Việt) at the end of the name
    cleaned = re.sub(r'(\bname:\s*["\'][^"\']+?)\s*\([^)]*\)(["\'])', r'\1\2', full)
    return cleaned

data_content = re.sub(r'(en|ja|ko|zh):\s*\{[^}]+?\}', clean_parens_in_translations, data_content)

# 2. Extract existing DISH_TRANSLATIONS and append 220 new dishes
reg_databases = {'vi': 'FOOD_DATABASE'}
new_translations = {}

period_prefix_map = {
    'morning': 'm',
    'lunch': 'l',
    'afternoon': 'a',
    'dinner': 'd',
    'snacks': 's',
    'drinks': 'dr',
}

for country in ['ja', 'ko', 'zh', 'en']:
    reg_databases[country] = {}
    c_periods = countries.get(country, {})
    for period in ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks']:
        dishes_raw = c_periods.get(period, [])
        p_meta = PERIOD_METADATA[country][period]
        
        dishes_list = []
        for idx, d_raw in enumerate(dishes_raw):
            dish_id = f"{country}_{period_prefix_map[period]}_{idx+1}"
            nat_name = d_raw['native_name']
            vi_name = d_raw['vi_name']
            price = d_raw['price']
            vi_desc = d_raw['desc']
            
            # Determine rarity
            rarity = 3
            if any(k in vi_name.lower() or k in nat_name.lower() for k in ['sushi', 'sashimi', 'bít tết', 'steak', 'wagyu', 'lẩu', 'sukiyaki', 'vịt quay', 'hải sản', 'nhung', 'cao cấp', 'bbq']):
                rarity = 5
            elif any(k in vi_name.lower() or k in nat_name.lower() for k in ['ramen', 'kimbap', 'tiểu long bao', 'burger', 'pizza', 'sườn', 'gà rán', 'mì', 'chả']):
                rarity = 4
                
            # Price range
            p_min = int(round(price * 0.85))
            p_max = int(round(price * 1.15))
            if country == 'en':
                p_min = round(price * 0.85, 2)
                p_max = round(price * 1.15, 2)
                
            img_path = pick_image(period, nat_name, vi_name, vi_desc)
            
            dish_obj = {
                'id': dish_id,
                'name': nat_name,
                'rarity': rarity,
                'type': vi_name.split()[0] if len(vi_name.split()) > 0 else 'Món ngon',
                'image': img_path,
                'desc': vi_desc,
                'calories': 350 + (idx * 37) % 350,
                'tags': [nat_name, period, country],
                'price': price,
                'priceRange': [p_min, p_max],
                'priceMin': p_min,
                'priceMax': p_max,
            }
            dishes_list.append(dish_obj)
            
            # Clean English name
            clean_en = nat_name if country == 'en' else ""
            if not clean_en:
                m_p = re.search(r'\(([^)]+)\)', vi_name)
                if m_p and re.match(r'^[A-Za-z0-9\s\-\'\.]+$', m_p.group(1)):
                    clean_en = m_p.group(1).strip()
                else:
                    clean_en = re.sub(r'\s*\([^)]*\)$', '', vi_name).strip()
                    
            clean_vi = re.sub(r'\s*\([^)]*\)$', '', vi_name).strip()
            
            new_translations[dish_id] = {
                'vi': {
                    'name': clean_vi,
                    'desc': vi_desc
                },
                'en': {
                    'name': clean_en,
                    'desc': f"Delightful and authentic {clean_en} prepared with fresh high quality ingredients."
                },
                'ja': {
                    'name': nat_name if country == 'ja' else clean_vi,
                    'desc': f"本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"
                },
                'ko': {
                    'name': nat_name if country == 'ko' else clean_vi,
                    'desc': f"신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."
                },
                'zh': {
                    'name': nat_name if country == 'zh' else clean_vi,
                    'desc': f"正宗地道风味，选用上等食材精心烹饪而成。"
                }
            }
            
        featured_name = dishes_list[0]['name'] if dishes_list else ''
        for d in dishes_list:
            if d['rarity'] == 5:
                featured_name = d['name']
                break
                
        reg_databases[country][period] = {
            'id': period,
            'name': p_meta['name'],
            'title': p_meta['title'],
            'bannerName': p_meta['bannerName'],
            'subtitle': p_meta['subtitle'],
            'featured5Star': featured_name,
            'bannerImage': p_meta['bannerImage'],
            'theme': period if period != 'snacks' else 'dinner',
            'dishes': dishes_list
        }

print(f"Generated {len(new_translations)} translations for foreign dishes!")

# Convert new_translations to JavaScript object lines
trans_js_lines = []
for dish_id, tr in new_translations.items():
    trans_js_lines.append(f"  {dish_id}: {json.dumps(tr, ensure_ascii=False)},")
trans_js_str = "\n".join(trans_js_lines)

# Inject into DISH_TRANSLATIONS right before `};\n\nfunction getDishName`
dt_marker = "};\n\nfunction getDishName"
if dt_marker in data_content:
    data_content = data_content.replace(dt_marker, f"\n{trans_js_str}\n{dt_marker}", 1)
else:
    print("WARNING: DISH_TRANSLATIONS end marker not found!")

# Upgrade getDishName and getDishDesc
old_get_dish = """function getDishName(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (currentLang === 'vi') return dish.name;
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  return (t && t.name) ? t.name : dish.name;
}

function getDishDesc(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (currentLang === 'vi') return dish.desc;
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  return (t && t.desc) ? t.desc : dish.desc;
}"""

new_get_dish = """function getDishName(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (currentLang === 'vi') {
    const t = DISH_TRANSLATIONS[dish.id]?.vi;
    return (t && t.name) ? t.name : dish.name;
  }
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  const name = (t && t.name) ? t.name : dish.name;
  return name.replace(/\\s*\\([^)]*\\)$/, '').trim();
}

function getDishDesc(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (currentLang === 'vi') {
    const t = DISH_TRANSLATIONS[dish.id]?.vi;
    return (t && t.desc) ? t.desc : dish.desc;
  }
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  return (t && t.desc) ? t.desc : dish.desc;
}"""

if old_get_dish in data_content:
    data_content = data_content.replace(old_get_dish, new_get_dish, 1)
else:
    print("Notice: old_get_dish exact match not found, looking with regex...")
    data_content = re.sub(
        r'function getDishName[\s\S]*?function getDishDesc[\s\S]*?\n\}',
        new_get_dish,
        data_content,
        count=1
    )

# Format REGIONAL_DATABASES
# We keep `vi: FOOD_DATABASE`
reg_blocks = ["const REGIONAL_DATABASES = {\n  vi: FOOD_DATABASE,"]
for c in ['ja', 'ko', 'zh', 'en']:
    c_json = json.dumps(reg_databases[c], ensure_ascii=False, indent=4)
    # indent by 2 spaces
    c_indented = "\n".join("  " + line for line in c_json.splitlines())
    reg_blocks.append(f"  {c}: {c_indented.strip()},")
reg_blocks.append("};\n")
reg_final_str = "\n".join(reg_blocks)

# Replace REGIONAL_DATABASES in data_content
reg_idx = data_content.find("const REGIONAL_DATABASES")
if reg_idx != -1:
    data_content = data_content[:reg_idx] + reg_final_str
else:
    data_content += "\n\n" + reg_final_str

with open('src/js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print("src/js/data.js successfully rebuilt with mega regional database and translations!")
