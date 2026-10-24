import io
import json
import os
from pathlib import Path
import sys
import threading
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import backend.places_service as places
import server

DISH = next(iter(places.DISHES))
PAYLOAD = {'dishId': DISH, 'latitude': 10.77, 'longitude': 106.69, 'radiusMeters': 3000, 'quality': 'recommended'}

def venue(place_id='a', rating=4.5, count=100, lat=10.771, lng=106.691, **extra):
    return {'id': place_id, 'displayName': {'text': 'Quán mẫu kiểm thử'}, 'formattedAddress': 'Địa chỉ kiểm thử', 'location': {'latitude': lat, 'longitude': lng}, 'rating': rating, 'userRatingCount': count, 'businessStatus': 'OPERATIONAL', **extra}

class PlacesTests(unittest.TestCase):
    def setUp(self):
        import tempfile
        from backend.places_budget import reserve_request as durable_reserve
        self.budget_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.budget_dir.cleanup)
        self.reservation = patch.object(places, 'reserve_request', side_effect=lambda: durable_reserve(Path(self.budget_dir.name) / 'usage.sqlite3'))
        self.reservation.start()
        self.addCleanup(self.reservation.stop)

    def test_validation_and_missing_key(self):
        invalid = [None, [], {}, {**PAYLOAD, 'latitude': float('nan')}, {**PAYLOAD, 'latitude': True}, {**PAYLOAD, 'longitude': 181}, {**PAYLOAD, 'radiusMeters': 2000}, {**PAYLOAD, 'dishId': 'not-a-dish'}, {**PAYLOAD, 'quality': []}]
        for payload in invalid:
            with self.subTest(payload=payload), self.assertRaises(places.PlacesError):
                places.validate(payload)
        with patch.dict(os.environ, {'GOOGLE_PLACES_API_KEY': ''}), self.assertRaises(places.PlacesError) as error:
            places.search_places(PAYLOAD)
        self.assertEqual(error.exception.code, 'NOT_CONFIGURED')

    def test_rank_radius_dedup_closed_quality_and_no_menu_guess(self):
        raw = {'places': [venue('a'), venue('b', 4.9, 50), venue('b', 4.9, 50), venue('c', 5, 1), venue('d', 3.9), venue('far', lat=11.0), venue('closed', businessStatus='CLOSED_PERMANENTLY'), venue('e',4.9,100), venue('empty', location={})]}
        with patch.dict(os.environ, {'GOOGLE_PLACES_API_KEY': 'test-only'}), patch.object(places, 'google_search', return_value=raw) as search:
            result = places.search_places(PAYLOAD)
        self.assertEqual([p['id'] for p in result['places']], ['e', 'b', 'a'])
        self.assertTrue(all(p['menu'] is None for p in result['places']))
        body, key = search.call_args.args
        self.assertEqual(key, 'test-only')
        self.assertEqual(body['locationBias']['circle']['center']['latitude'], 10.77)
        self.assertEqual(body['minRating'], 4)
        self.assertNotIn('*', places.FIELD_MASK)
        self.assertLessEqual(result['places'][0]['distanceMeters'], 3000)
        with patch.dict(os.environ, {'GOOGLE_PLACES_API_KEY': 'test-only'}), patch.object(places, 'google_search', return_value=raw):
            all_result = places.search_places({**PAYLOAD, 'quality': 'all'})
        self.assertIn('c', [p['id'] for p in all_result['places']])

    def test_price_range_menu_and_url_safety(self):
        price_range = {'startPrice': {'units': '50000', 'currencyCode': 'VND'}, 'endPrice': {'units': '100000', 'currencyCode': 'VND'}}
        result = places.normalize(venue(priceRange=price_range, websiteUri='javascript:alert(1)', attributions=[{'provider': 'Nguồn mẫu', 'providerUri': 'https://example.com/'}]),10.77,106.69,3000,'recommended',DISH)
        self.assertEqual(result['priceRange']['start']['amount'], 50000)
        self.assertIsNone(result['websiteUrl'])
        self.assertIn('destination_place_id=a', result['directionsUrl'])
        self.assertEqual(result['attributions'][0]['provider'], 'Nguồn mẫu')
        for menu, expected in [({ 'amount':65000, 'sourceUrl':'https://example.com/menu', 'checkedAt':'2026-10-23'}, True), ({'amount':65000,'sourceUrl':'javascript:alert(1)','checkedAt':'2026-10-23'},False), ({'amount':65000,'sourceUrl':'https://example.com/menu','checkedAt':'bad'},False)]:
            with patch.object(Path, 'read_text', return_value=json.dumps({'a':{DISH:menu}})):
                self.assertEqual(places.verified_menu('a',DISH) is not None, expected)

    def test_upstream_failure_does_not_leak_credentials(self):
        for upstream, code in [(HTTPError('url', 403, 'private-key', {}, io.BytesIO()),'PROVIDER_CONFIGURATION'), (HTTPError('url',429,'private-key',{},io.BytesIO()),'QUOTA_EXCEEDED'), (URLError('private-key'),'PROVIDER_UNAVAILABLE')]:
            with patch.object(places,'urlopen',side_effect=upstream), self.assertRaises(places.PlacesError) as error:
                places.google_search({},'secret')
            self.assertEqual(error.exception.code,code)
            self.assertNotIn('private-key',error.exception.message)

    def test_rate_limiter(self):
        limiter=places.RequestLimiter()
        self.assertTrue(all(limiter.allow('a') for _ in range(20)))
        self.assertFalse(limiter.allow('a'))
        self.assertTrue(limiter.allow('b'))

class PlacesHTTPTests(unittest.TestCase):
    def setUp(self):
        import tempfile
        from backend.places_budget import reserve_request as durable_reserve
        self.budget_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.budget_dir.cleanup)
        self.reservation = patch.object(places, 'reserve_request', side_effect=lambda: durable_reserve(Path(self.budget_dir.name) / 'usage.sqlite3'))
        self.reservation.start()
        self.addCleanup(self.reservation.stop)
        self.server=server.http.server.ThreadingHTTPServer(('127.0.0.1',0), server.Handler)
        self.thread=threading.Thread(target=self.server.serve_forever,daemon=True)
        self.thread.start()
        self.origin=f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown(); self.server.server_close(); self.thread.join()

    def post(self,payload,headers=None):
        return urlopen(Request(self.origin+'/api/places',data=json.dumps(payload).encode(),headers=headers or {'Content-Type':'application/json'},method='POST'))

    def test_paid_endpoint_disabled_even_when_key_exists(self):
        with patch.dict(os.environ, {'GOOGLE_PLACES_API_KEY': 'secret-test'}), patch.object(places, 'google_search') as upstream:
            with urlopen(self.origin + '/api/places') as response:
                data = json.load(response)
                self.assertEqual(data, {'configured': False, 'mode': 'maps-link'})
            with self.assertRaises(HTTPError) as error:
                self.post(PAYLOAD)
            self.assertEqual(error.exception.code, 410)
            self.assertEqual(json.load(error.exception)['error']['code'], 'API_DISABLED')
            upstream.assert_not_called()
        for path in ['/.env', '/.git/config', '/server.py']:
            with self.subTest(path=path), self.assertRaises(HTTPError) as error:
                urlopen(self.origin + path)
            self.assertEqual(error.exception.code, 404)

if __name__ == '__main__':
    unittest.main()
