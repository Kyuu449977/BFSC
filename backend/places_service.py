"""Google Places adapter. Credentials and coordinates never go into static assets."""
import json
import math
import os
from pathlib import Path
import socket
import threading
import time
from backend.places_budget import BudgetBlocked, reserve_request
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit, urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent / 'data'
DISHES = json.loads((ROOT / 'dish-search.json').read_text(encoding='utf-8-sig'))
GOOGLE_ENDPOINT = 'https://places.googleapis.com/v1/places:searchText'
FIELD_MASK = ','.join('places.' + field for field in (
    'id', 'displayName', 'formattedAddress', 'location', 'rating', 'userRatingCount',
    'priceLevel', 'priceRange', 'googleMapsUri', 'websiteUri', 'currentOpeningHours',
    'businessStatus', 'attributions',
))

class PlacesError(Exception):
    def __init__(self, code, message, status=400):
        super().__init__(message)
        self.code, self.message, self.status = code, message, status


def configured():
    return bool(os.environ.get('GOOGLE_PLACES_API_KEY', '').strip())


def safe_url(value):
    if not isinstance(value, str):
        return None
    try:
        parsed = urlsplit(value)
        return value if parsed.scheme in ('http', 'https') and parsed.hostname and not parsed.username else None
    except ValueError:
        return None


def number(value, low, high):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or not low <= value <= high:
        raise PlacesError('INVALID_REQUEST', 'Thông tin vị trí hoặc bộ lọc không hợp lệ.')
    return value


def validate(payload):
    if not isinstance(payload, dict):
        raise PlacesError('INVALID_REQUEST', 'Yêu cầu tìm quán không hợp lệ.')
    dish_id = payload.get('dishId')
    if not isinstance(dish_id, str) or dish_id not in DISHES:
        raise PlacesError('INVALID_DISH', 'Món ăn không có trong thực đơn.')
    lat = number(payload.get('latitude'), -90, 90)
    lng = number(payload.get('longitude'), -180, 180)
    radius = payload.get('radiusMeters', 3000)
    if isinstance(radius, bool) or radius not in (1000, 3000, 5000, 10000):
        raise PlacesError('INVALID_REQUEST', 'Hãy chọn bán kính từ 1 đến 10 km.')
    quality = payload.get('quality', 'recommended')
    if quality not in ('recommended', 'all'):
        raise PlacesError('INVALID_REQUEST', 'Bộ lọc đánh giá không hợp lệ.')
    return dish_id, lat, lng, radius, quality


def distance_meters(lat1, lng1, lat2, lng2):
    a, b = math.radians(lat1), math.radians(lat2)
    dlat, dlng = b - a, math.radians(lng2 - lng1)
    h = math.sin(dlat / 2) ** 2 + math.cos(a) * math.cos(b) * math.sin(dlng / 2) ** 2
    return 6371000 * 2 * math.asin(min(1, math.sqrt(h)))


def google_search(body, key):
    request = Request(GOOGLE_ENDPOINT, data=json.dumps(body).encode('utf-8'), method='POST', headers={
        'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELD_MASK,
    })
    try:
        with urlopen(request, timeout=12) as response:
            return json.load(response)
    except HTTPError as error:
        if error.code == 429:
            raise PlacesError('QUOTA_EXCEEDED', 'Dịch vụ tìm quán đã đạt giới hạn. Vui lòng thử lại sau.', 429) from None
        if error.code in (401, 403):
            raise PlacesError('PROVIDER_CONFIGURATION', 'Kết nối Google Maps chưa sẵn sàng. Bạn vẫn có thể mở Google Maps bên dưới.', 503) from None
        raise PlacesError('PROVIDER_ERROR', 'Google Maps chưa trả được kết quả. Vui lòng thử lại.', 502) from None
    except (URLError, TimeoutError, socket.timeout, json.JSONDecodeError):
        raise PlacesError('PROVIDER_UNAVAILABLE', 'Không kết nối được Google Maps. Vui lòng thử lại.', 502) from None


def verified_menu(place_id, dish_id):
    """Optional owner-maintained prices with a real menu source, never Google estimates."""
    try:
        entries = json.loads((ROOT / 'venue-menus.json').read_text(encoding='utf-8-sig'))
        entry = entries.get(place_id, {}).get(dish_id)
        if not isinstance(entry, dict):
            return None
        amount = entry.get('amount')
        url = safe_url(entry.get('sourceUrl'))
        date = entry.get('checkedAt')
        if isinstance(amount, bool) or not isinstance(amount, (int, float)) or not math.isfinite(amount) or amount <= 0 or not url or not isinstance(date, str):
            return None
        from datetime import date as date_type
        date_type.fromisoformat(date)
        return {'amount': amount, 'currency': 'VND', 'sourceUrl': url, 'checkedAt': date}
    except (OSError, ValueError, TypeError, AttributeError):
        return None


def normalize(place, lat, lng, radius, quality, dish_id):
    if not isinstance(place, dict) or place.get('businessStatus') in ('CLOSED_PERMANENTLY', 'CLOSED_TEMPORARILY'):
        return None
    place_id = place.get('id')
    if not isinstance(place_id, str) or not place_id:
        return None
    location = place.get('location')
    if not isinstance(location, dict):
        return None
    try:
        distance = distance_meters(lat, lng, number(location.get('latitude'), -90, 90), number(location.get('longitude'), -180, 180))
    except PlacesError:
        return None
    if distance > radius:
        return None
    rating = place.get('rating')
    rating = rating if type(rating) in (float, int) and math.isfinite(rating) and 1 <= rating <= 5 else None
    count = place.get('userRatingCount', 0)
    count = count if type(count) is int and count >= 0 else 0
    if quality == 'recommended' and (rating is None or rating < 4 or count < 10):
        return None
    display = place.get('displayName')
    name = display.get('text') if isinstance(display, dict) else None
    name = name if isinstance(name, str) and name else 'Quán ăn'
    maps_url = safe_url(place.get('googleMapsUri')) or 'https://www.google.com/maps/search/?' + urlencode({'api': 1, 'query': name, 'query_place_id': place_id})
    directions_url = 'https://www.google.com/maps/dir/?' + urlencode({'api': 1, 'destination': name, 'destination_place_id': place_id})
    price_range = place.get('priceRange')
    price_range = price_range if isinstance(price_range, dict) else {}
    hours = place.get('currentOpeningHours')
    open_now = hours.get('openNow') if isinstance(hours, dict) else None
    def money(value):
        if not isinstance(value, dict) or not isinstance(value.get('currencyCode'), str):
            return None
        try:
            amount = int(value.get('units', 0)) + int(value.get('nanos', 0)) / 1e9
            if amount < 0 or not math.isfinite(amount):
                return None
            return {'amount': amount, 'currency': value['currencyCode']}
        except (ValueError, TypeError, OverflowError):
            return None
    attributions = [{'provider': str(a.get('provider', '')), 'url': safe_url(a.get('providerUri'))} for a in (place.get('attributions') or []) if isinstance(a, dict) and a.get('provider')]
    return {
        'id': place_id, 'name': name, 'address': place.get('formattedAddress') or 'Chưa có địa chỉ chi tiết',
        'rating': rating, 'reviewCount': count, 'distanceMeters': round(distance),
        'priceLevel': place.get('priceLevel'),
        'priceRange': {'start': money(price_range.get('startPrice')), 'end': money(price_range.get('endPrice'))},
        'openNow': open_now if type(open_now) is bool else None,
        'mapsUrl': maps_url, 'directionsUrl': directions_url, 'websiteUrl': safe_url(place.get('websiteUri')),
        'menu': verified_menu(place_id, dish_id), 'attributions': attributions,
    }


def search_places(payload):
    dish_id, lat, lng, radius, quality = validate(payload)
    key = os.environ.get('GOOGLE_PLACES_API_KEY', '').strip()
    if not key:
        raise PlacesError('NOT_CONFIGURED', 'Danh sách quán chưa được kết nối. Bạn vẫn có thể tìm trên Google Maps.', 503)
    body = {
        'textQuery': DISHES[dish_id]['query'], 'languageCode': 'vi',
        'pageSize': 20, 'rankPreference': 'RELEVANCE',
        'locationBias': {'circle': {'center': {'latitude': lat, 'longitude': lng}, 'radius': radius}},
    }
    if quality == 'recommended':
        body['minRating'] = 4.0
    try:
        usage = reserve_request()
    except BudgetBlocked as error:
        raise PlacesError(error.code, error.message, 429 if error.code in ('DAILY_LIMIT', 'WINDOW_LIMIT') else 503) from None
    raw = google_search(body, key)
    if not isinstance(raw, dict) or not isinstance(raw.get('places', []), list):
        raise PlacesError('PROVIDER_ERROR', 'Google Maps trả về dữ liệu chưa hợp lệ. Vui lòng thử lại.', 502)
    seen, places = set(), []
    for place in raw.get('places', []):
        item = normalize(place, lat, lng, radius, quality, dish_id)
        if item and item['id'] not in seen:
            seen.add(item['id'])
            places.append(item)
    places.sort(key=lambda p: (-(p['rating'] or 0), -p['reviewCount'], p['distanceMeters']))
    return {'places': places[:5], 'dishName': DISHES[dish_id]['name'], 'radiusMeters': radius,
            'quality': quality, 'attribution': 'Google Maps', 'usage': usage}


class RequestLimiter:
    """In-process budget guard. Google Cloud quotas remain the deployment-wide limit."""
    def __init__(self):
        self.lock = threading.Lock()
        self.requests = []

    def allow(self, client):
        with self.lock:
            now = time.monotonic()
            self.requests = [(stamp, who) for stamp, who in self.requests if stamp > now - 60]
            if len(self.requests) >= 60 or sum(who == client for _, who in self.requests) >= 20:
                return False
            self.requests.append((now, client))
            return True

LIMITER = RequestLimiter()


def send_json(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False, allow_nan=False).encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store')
    handler.send_header('Content-Length', str(len(body)))
    handler.send_header('X-Content-Type-Options', 'nosniff')
    handler.end_headers()
    handler.wfile.write(body)


def handle_post(handler):
    try:
        if handler.headers.get('Sec-Fetch-Site') == 'cross-site':
            raise PlacesError('FORBIDDEN', 'Yêu cầu không hợp lệ.', 403)
        origin = handler.headers.get('Origin')
        if origin and urlsplit(origin).netloc != handler.headers.get('Host'):
            raise PlacesError('FORBIDDEN', 'Yêu cầu không hợp lệ.', 403)
        if handler.headers.get_content_type() != 'application/json':
            raise PlacesError('INVALID_REQUEST', 'Yêu cầu cần định dạng JSON.', 415)
        try:
            length = int(handler.headers.get('Content-Length', '0'))
        except ValueError:
            length = 0
        if not 0 < length <= 2048:
            raise PlacesError('INVALID_REQUEST', 'Kích thước yêu cầu không hợp lệ.', 400)
        try:
            payload = json.loads(handler.rfile.read(length))
        except (ValueError, UnicodeDecodeError):
            raise PlacesError('INVALID_REQUEST', 'Yêu cầu JSON không hợp lệ.') from None
        validate(payload)
        if not LIMITER.allow(handler.client_address[0]):
            raise PlacesError('RATE_LIMITED', 'Bạn tìm quá nhanh. Vui lòng thử lại sau một phút.', 429)
        send_json(handler, 200, search_places(payload))
    except PlacesError as error:
        send_json(handler, error.status, {'error': {'code': error.code, 'message': error.message}})
