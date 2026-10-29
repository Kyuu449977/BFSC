import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('backend/server.py', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add import time
if 'import time' not in code:
    code = code.replace('import json\n', 'import json\nimport time\n')

# 2. Update do_POST
old_post = """    def do_POST(self):
        if urlsplit(self.path).path == '/api/places':
            send_json(self, 410, {'error': {'code': 'API_DISABLED', 'message': 'Website dùng link Google Maps trực tiếp. API trả phí đã tắt.'}})
        else:
            send_json(self, 404, {'error': {'code': 'NOT_FOUND', 'message': 'Không tìm thấy dịch vụ.'}})"""

new_post = """    def do_POST(self):
        path = urlsplit(self.path).path
        if path == '/api/places':
            send_json(self, 410, {'error': {'code': 'API_DISABLED', 'message': 'Website dùng link Google Maps trực tiếp. API trả phí đã tắt.'}})
        elif path == '/api/custom-dishes':
            try:
                length = int(self.headers.get('Content-Length', 0))
                payload = json.loads(self.rfile.read(length).decode('utf-8'))
                name = str(payload.get('name', '')).strip()
                if len(name) < 2:
                    send_json(self, 400, {'error': 'Tên món phải có ít nhất 2 ký tự'})
                    return
                new_dish = {
                    'id': f"custom_{int(time.time() * 1000)}",
                    'name': name,
                    'mealId': payload.get('mealId', 'morning'),
                    'type': payload.get('type', 'Món tự thêm'),
                    'price': int(payload.get('price', 0)),
                    'priceRange': [int(payload.get('price', 0)), int(payload.get('price', 0))],
                    'desc': payload.get('desc', 'Món ăn do người dùng tự đóng góp cho thực đơn.'),
                    'quote': payload.get('quote', 'Hương vị tự sáng tạo đặc sắc.'),
                    'image': payload.get('image', 'images/brand.svg'),
                    'calories': int(payload.get('calories', 350)),
                    'rarity': int(payload.get('rarity', 4)),
                    'isUserCustom': True
                }
                custom_file = ROOT / 'backend' / 'data' / 'custom-dishes.json'
                dishes = []
                if custom_file.exists():
                    try:
                        dishes = json.loads(custom_file.read_text(encoding='utf-8'))
                    except Exception:
                        dishes = []
                dishes.append(new_dish)
                custom_file.write_text(json.dumps(dishes, ensure_ascii=False, indent=2), encoding='utf-8')
                send_json(self, 201, {'success': True, 'dish': new_dish})
            except Exception as e:
                send_json(self, 500, {'error': str(e)})
        else:
            send_json(self, 404, {'error': {'code': 'NOT_FOUND', 'message': 'Không tìm thấy dịch vụ.'}})"""

assert old_post in code, "old_post not found in backend/server.py"
code = code.replace(old_post, new_post)

# 3. Update serve_public
old_get = """        if path in ('/api/places', '/api/server-info'):
            data = {'configured': False, 'mode': 'maps-link'} if path == '/api/places' else server_state
            body = json.dumps(data).encode('utf-8')"""

new_get = """        if path in ('/api/places', '/api/server-info', '/api/custom-dishes'):
            if path == '/api/custom-dishes':
                custom_file = ROOT / 'backend' / 'data' / 'custom-dishes.json'
                data = json.loads(custom_file.read_text(encoding='utf-8')) if custom_file.exists() else []
            elif path == '/api/places':
                data = {'configured': False, 'mode': 'maps-link'}
            else:
                data = server_state
            body = json.dumps(data, ensure_ascii=False).encode('utf-8')"""

assert old_get in code, "old_get not found in backend/server.py"
code = code.replace(old_get, new_get)

with open('backend/server.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated backend/server.py with /api/custom-dishes API successfully!")
