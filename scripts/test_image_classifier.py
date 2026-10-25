import glob, os, sys

sys.stdout.reconfigure(encoding='utf-8')

images = [p.replace('\\', '/').replace('src/', '') for p in glob.glob('src/images/**/*.webp', recursive=True)]

def pick_image(meal, name, vi_name, desc):
    full_text = f"{name} {vi_name} {desc}".lower()
    
    if meal == 'drinks':
        # Specific drink matching
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
        
    # Food categories
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
        
    # Default fallbacks per meal
    defaults = {
        'morning': 'images/buoi_sang/pho_bo.webp',
        'lunch': 'images/buoi_trua/com_tam.webp',
        'afternoon': 'images/buoi_chieu/banh_xeo.webp',
        'dinner': 'images/buoi_toi/bbq_nuong.webp',
        'snacks': 'images/do_an_vat/ca_vien_chien.webp',
        'drinks': 'images/do_uong/tra_sua.webp',
    }
    return defaults.get(meal, 'images/buoi_trua/com_tam.webp')

print("Image classifier ready!")
