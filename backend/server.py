import base64
import binascii
import http.server
import json
import math
import os
import re
import socket
import threading
import uuid
from decimal import Decimal, InvalidOperation
from pathlib import Path
from urllib.parse import urlsplit, unquote
from scripts.build_public import ROOT, build_public
from scripts.public_files import PUBLIC_FILES
from backend.places_service import send_json

PORT = int(os.environ.get('PORT', 8080))
DIRECTORY = str(ROOT)
PUBLIC_DIRECTORY = str(Path(os.environ.get('BFSC_PUBLIC_ROOT', ROOT / 'public')).resolve())
DATA_DIRECTORY = Path(os.environ.get('BFSC_DATA_ROOT', ROOT / 'backend' / 'data')).resolve()
CUSTOM_DISH_FILE = DATA_DIRECTORY / 'custom-dishes.json'
ALLOWED = {('/' + name).casefold(): name for name in PUBLIC_FILES}
server_state = {'public_url': '', 'lan_url': '', 'local_url': f'http://localhost:{PORT}', 'status': 'local'}
DATA_LOCK = threading.RLock()
VALID_MEALS = {'morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks'}
VALID_REGIONS = {'vi', 'en', 'ja', 'ko', 'zh'}
CURRENCY_DECIMALS = {'vi': 0, 'en': 2, 'ja': 0, 'ko': 0, 'zh': 2}
MAX_BODY_BYTES = 2 * 1024 * 1024
IMAGE_DATA = re.compile(r'^data:image/webp;base64,[A-Za-z0-9+/]*={0,2}$')
LOCAL_IMAGE = re.compile(r'^(?:assets/(?:image-unavailable|brand)\.svg|images/brand\.svg)$')

SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://quge5.com https://*.quge5.com https://*.monetag.com https://*.propellerads.com https://bauval.org https://*.bauval.org https://*.adsterra.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' https: data:; connect-src 'self' https://quge5.com https://*.quge5.com https://*.monetag.com https://*.propellerads.com https://bauval.org https://*.bauval.org https://*.adsterra.com https:; frame-src 'self' https: data:; child-src 'self' https: blob:; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
}

def validate_dish(payload):
    if not isinstance(payload, dict):
        raise ValueError('JSON body must be an object')
    name = payload.get('name')
    if not isinstance(name, str) or not 2 <= len(name.strip()) <= 120:
        raise ValueError('name must contain 2 to 120 characters')
    region = payload.get('region', 'vi')
    if not isinstance(region, str) or region not in VALID_REGIONS:
        raise ValueError('region must be one of vi, en, ja, ko, zh')
    meal_id = payload.get('mealId', 'morning')
    if not isinstance(meal_id, str) or meal_id not in VALID_MEALS:
        raise ValueError('mealId is invalid')
    dish_type = payload.get('type', 'Món tự thêm')
    desc = payload.get('desc', 'Món ăn do người dùng tự đóng góp cho thực đơn.')
    quote = payload.get('quote', 'Hương vị tự sáng tạo đặc sắc.')
    if not isinstance(dish_type, str) or len(dish_type.strip()) > 80:
        raise ValueError('type must be at most 80 characters')
    if not isinstance(desc, str) or len(desc) > 2000:
        raise ValueError('desc must be at most 2000 characters')
    if not isinstance(quote, str) or len(quote) > 300:
        raise ValueError('quote must be at most 300 characters')
    price = payload.get('price', 0)
    if isinstance(price, bool):
        raise ValueError('price must be a valid amount')
    try:
        amount = Decimal(str(price))
    except (InvalidOperation, ValueError):
        raise ValueError('price must be a valid amount')
    places = CURRENCY_DECIMALS[region]
    if not amount.is_finite() or amount < 0 or amount != amount.quantize(Decimal(1).scaleb(-places)):
        raise ValueError(f'price supports {places} decimal places for region {region}')
    if amount > Decimal('999999999999'):
        raise ValueError('price is too large')
    calories = payload.get('calories', 350)
    rarity = payload.get('rarity', 4)
    if isinstance(calories, bool) or not isinstance(calories, (int, float)) or not math.isfinite(calories) or not 0 <= calories <= 10000:
        raise ValueError('calories must be finite and from 0 to 10000')
    if isinstance(rarity, bool) or not isinstance(rarity, int) or not 3 <= rarity <= 5:
        raise ValueError('rarity must be an integer from 3 to 5')
    image = payload.get('image', 'assets/image-unavailable.svg')
    if not isinstance(image, str) or len(image) > MAX_BODY_BYTES or '..' in image.split('/') or not (IMAGE_DATA.fullmatch(image) or LOCAL_IMAGE.fullmatch(image)):
        raise ValueError('image must be a WebP data URL or approved local placeholder')
    if image.startswith('data:'):
        try:
            image_bytes = base64.b64decode(image.split(',', 1)[1], validate=True)
        except (binascii.Error, ValueError) as error:
            raise ValueError('image must contain valid WebP data') from error
        if len(image_bytes) < 12 or image_bytes[:4] != b'RIFF' or image_bytes[8:12] != b'WEBP':
            raise ValueError('image must contain valid WebP data')
    request_id = payload.get('idempotencyKey', payload.get('requestId', payload.get('id')))
    if request_id is not None:
        try:
            dish_id = 'custom_' + str(uuid.UUID(str(request_id).removeprefix('custom_')))
        except (ValueError, AttributeError):
            raise ValueError('idempotencyKey must be a UUID')
    else:
        dish_id = 'custom_' + str(uuid.uuid4())
    price_value = int(amount) if places == 0 or amount == amount.to_integral_value() else float(amount)
    return {'id': dish_id, 'region': region, 'name': name.strip(), 'mealId': meal_id, 'type': dish_type.strip() or 'Món tự thêm',
            'price': price_value, 'priceRange': [price_value, price_value], 'desc': desc, 'quote': quote,
            'image': image, 'calories': calories, 'rarity': rarity, 'isUserCustom': True}

def read_dishes():
    if not CUSTOM_DISH_FILE.exists():
        return []
    try:
        data = json.loads(CUSTOM_DISH_FILE.read_text(encoding='utf-8'))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError('custom dishes data is corrupted') from error
    if not isinstance(data, list) or any(not isinstance(item, dict) for item in data):
        raise RuntimeError('custom dishes data is corrupted')
    return data

def atomic_write_dishes(dishes):
    temporary = CUSTOM_DISH_FILE.with_name(CUSTOM_DISH_FILE.name + '.tmp')
    try:
        temporary.write_text(json.dumps(dishes, ensure_ascii=False, indent=2), encoding='utf-8')
        os.replace(temporary, CUSTOM_DISH_FILE)
    finally:
        if temporary.exists():
            temporary.unlink()

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

    def handle(self):
        # Navigation, cancellation and offline tests may close a socket mid-response.
        try:
            super().handle()
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, TimeoutError):
            pass

    def version_string(self):
        return self.server_version

    def do_POST(self):
        path = urlsplit(self.path).path
        if path == '/api/places':
            send_json(self, 410, {'error': {'code': 'API_DISABLED', 'message': 'Website dùng link Google Maps trực tiếp. API trả phí đã tắt.'}})
            return
        if path != '/api/custom-dishes':
            send_json(self, 404, {'error': {'code': 'NOT_FOUND', 'message': 'Không tìm thấy dịch vụ.'}})
            return
        if self.headers.get('Sec-Fetch-Site') == 'cross-site':
            send_json(self, 403, {'error': 'Yêu cầu khác nguồn không được phép.'})
            return
        origin = self.headers.get('Origin')
        if origin and urlsplit(origin).netloc != self.headers.get('Host'):
            send_json(self, 403, {'error': 'Yêu cầu khác nguồn không được phép.'})
            return
        if self.headers.get_content_type() != 'application/json':
            send_json(self, 415, {'error': 'Yêu cầu cần JSON.'})
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if length <= 0 or length > MAX_BODY_BYTES:
                send_json(self, 413 if length > MAX_BODY_BYTES else 400, {'error': 'Payload phải từ 1 byte đến 2 MiB'})
                return
            payload = json.loads(self.rfile.read(length).decode('utf-8'))
            dish = validate_dish(payload)
            with DATA_LOCK:
                DATA_DIRECTORY.mkdir(parents=True, exist_ok=True)
                dishes = read_dishes()
                existing = next((item for item in dishes if item.get('id') == dish['id']), None)
                if existing:
                    comparable = {**existing, 'region': existing.get('region', 'vi')}
                    if any(comparable.get(key) != value for key, value in dish.items()):
                        send_json(self, 409, {'error': 'ID món đã được dùng cho nội dung khác.'})
                        return
                    send_json(self, 200, {'success': True, 'dish': existing, 'duplicate': True})
                    return
                dishes.append(dish)
                atomic_write_dishes(dishes)
            send_json(self, 201, {'success': True, 'dish': dish})
        except (ValueError, UnicodeError, InvalidOperation) as error:
            send_json(self, 400, {'error': str(error)})
        except Exception:
            send_json(self, 500, {'error': 'Không thể lưu món ăn.'})

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
                try:
                    with DATA_LOCK:
                        data = read_dishes()
                except (ValueError, RuntimeError):
                    send_json(self, 500, {'error': 'Dữ liệu món ăn tùy chỉnh bị lỗi.'})
                    return
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
        if not target.resolve().is_relative_to(Path(PUBLIC_DIRECTORY).resolve()) or not target.is_file():
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
    if not Path(PUBLIC_DIRECTORY).is_dir() and 'BFSC_PUBLIC_ROOT' not in os.environ:
        build_public()
    if not Path(PUBLIC_DIRECTORY).is_dir():
        raise RuntimeError('Public output directory does not exist: ' + PUBLIC_DIRECTORY)
    server_state['lan_url'] = f'http://{get_lan_ip()}:{PORT}'
    return PreviewServer(('0.0.0.0', PORT), Handler)

def main():
    with create_server() as server:
        print(f"Local: {server_state['local_url']}\nWi-Fi: {server_state['lan_url']}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
