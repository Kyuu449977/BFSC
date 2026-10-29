import http.server
import json
import time
import os
from pathlib import Path
import socket
import threading
from urllib.parse import urlsplit, unquote
from scripts.build_public import build_public, ROOT
from scripts.public_files import PUBLIC_FILES
from backend.places_service import send_json

PORT = int(os.environ.get('PORT', 8080))
DIRECTORY = str(ROOT)  # Optional tunnel executable remains outside the public web root.
PUBLIC_DIRECTORY = str(build_public())
ALLOWED = {('/' + name).casefold(): name for name in PUBLIC_FILES}
server_state = {'public_url': '', 'lan_url': '', 'local_url': f'http://localhost:{PORT}', 'status': 'local'}
SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://quge5.com https://*.quge5.com https://*.monetag.com https://*.propellerads.com https://bauval.org https://*.bauval.org https://*.adsterra.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' https: data:; connect-src 'self' https://quge5.com https://*.quge5.com https://*.monetag.com https://*.propellerads.com https://bauval.org https://*.bauval.org https://*.adsterra.com https:; frame-src 'self' https: data:; child-src 'self' https: blob:; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
}

def get_lan_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as connection:
            connection.connect(('8.8.8.8', 80))
            return connection.getsockname()[0]
    except OSError:
        return '127.0.0.1'

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.js': 'text/javascript', '.json': 'application/json'}
    server_version = 'FoodPreview'
    sys_version = ''

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIRECTORY, **kwargs)

    def version_string(self):
        return self.server_version

    def do_POST(self):
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
            send_json(self, 404, {'error': {'code': 'NOT_FOUND', 'message': 'Không tìm thấy dịch vụ.'}})

    def do_GET(self):
        self.serve_public(head=False)

    def do_HEAD(self):
        self.serve_public(head=True)

    def serve_public(self, head):
        try:
            path = unquote(urlsplit(self.path).path, errors='strict')
        except (ValueError, UnicodeError):
            self.send_error(404)
            return
        if path in ('/api/places', '/api/server-info', '/api/custom-dishes'):
            if path == '/api/custom-dishes':
                custom_file = ROOT / 'backend' / 'data' / 'custom-dishes.json'
                data = json.loads(custom_file.read_text(encoding='utf-8')) if custom_file.exists() else []
            elif path == '/api/places':
                data = {'configured': False, 'mode': 'maps-link'}
            else:
                data = server_state
            body = json.dumps(data, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if not head:
                self.wfile.write(body)
            return
        if path == '/':
            path = '/index.html'
        if any(character in path for character in ('\\', '\x00', '%', ':')) or '//' in path or any(part in ('.', '..') for part in path.split('/')):
            self.send_error(404)
            return
        name = ALLOWED.get(path.casefold())
        if name is None:
            self.send_error(404)
            return
        target = Path(PUBLIC_DIRECTORY) / name
        if not target.resolve().is_relative_to(Path(PUBLIC_DIRECTORY)) or not target.is_file():
            self.send_error(404)
            return
        self.path = '/' + name
        super().do_HEAD() if head else super().do_GET()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        for name, value in SECURITY_HEADERS.items():
            self.send_header(name, value)
        super().end_headers()

    def log_message(self, format, *args):
        pass

class PreviewServer(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True

    def __init__(self, *args, **kwargs):
        self.slots = threading.BoundedSemaphore(32)
        super().__init__(*args, **kwargs)

    def get_request(self):
        connection, address = super().get_request()
        connection.settimeout(10)
        return connection, address

    def process_request(self, request, address):
        self.slots.acquire()
        try:
            super().process_request(request, address)
        except BaseException:
            self.slots.release()
            raise

    def process_request_thread(self, request, address):
        try:
            super().process_request_thread(request, address)
        finally:
            self.slots.release()

def create_server():
    server_state['lan_url'] = f'http://{get_lan_ip()}:{PORT}'
    return PreviewServer(('0.0.0.0', PORT), Handler)

def main():
    with create_server() as server:
        print(f"Local: {server_state['local_url']}\nWi-Fi: {server_state['lan_url']}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
