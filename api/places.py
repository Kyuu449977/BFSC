"""Maps-link mode: no endpoint in this function invokes a paid Google API."""
from http.server import BaseHTTPRequestHandler
from backend.places_service import send_json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        send_json(self, 200, {'configured': False, 'mode': 'maps-link'})

    def do_POST(self):
        send_json(self, 410, {'error': {'code': 'API_DISABLED', 'message': 'Website dùng link Google Maps trực tiếp. API trả phí đã tắt.'}})

    def log_message(self, format, *args):
        pass
