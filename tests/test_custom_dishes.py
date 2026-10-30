import importlib.util
import json
import sys
import tempfile
import threading
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
spec = importlib.util.spec_from_file_location('food_server', ROOT / 'backend' / 'server.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class CustomDishesApiTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.old_data, self.old_file = module.DATA_DIRECTORY, module.CUSTOM_DISH_FILE
        module.DATA_DIRECTORY = Path(self.temp.name)
        module.CUSTOM_DISH_FILE = Path(self.temp.name) / 'custom-dishes.json'
        self.server = module.http.server.ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.origin = f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown(); self.server.server_close(); self.thread.join()
        module.DATA_DIRECTORY, module.CUSTOM_DISH_FILE = self.old_data, self.old_file
        self.temp.cleanup()

    def post(self, payload):
        request = Request(self.origin + '/api/custom-dishes', data=payload if isinstance(payload, bytes) else json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
        try:
            with urlopen(request) as response:
                return response.status, json.load(response)
        except HTTPError as error:
            try:
                return error.code, json.load(error)
            except Exception:
                return error.code, {}
            finally:
                error.close()

    def test_get_custom_dishes_uses_empty_temporary_fixture(self):
        with urlopen(self.origin + '/api/custom-dishes') as response:
            self.assertEqual(response.headers.get_content_type(), 'application/json')
            self.assertEqual(json.load(response), [])

    def test_region_persists_and_local_fallback_id_can_retry(self):
        payload = {'id': 'custom_dbcdb5b2-74ef-4b51-a48e-e7f98d66a18b', 'region': 'ja', 'name': 'Test regional dish', 'price': 600}
        code, body = self.post(payload)
        self.assertEqual(code, 201)
        self.assertEqual(body['dish']['region'], 'ja')
        self.assertEqual(body['dish']['id'], payload['id'])
        self.assertEqual(self.post(payload)[0], 200)
        with urlopen(self.origin + '/api/custom-dishes') as response:
            rows = json.load(response)
            self.assertEqual(len(rows), 1)
            self.assertEqual(rows[0]['region'], 'ja')

    def test_cross_site_post_is_rejected(self):
        request = Request(self.origin + '/api/custom-dishes', data=json.dumps({'name': 'Drive by dish'}).encode(), headers={'Content-Type': 'application/json', 'Origin': 'https://other.example', 'Sec-Fetch-Site': 'cross-site'})
        with self.assertRaises(HTTPError) as caught:
            urlopen(request)
        self.assertEqual(caught.exception.code, 403)
        caught.exception.close()
        self.assertFalse(module.CUSTOM_DISH_FILE.exists())

    def test_contract_validation(self):
        cases = [({'name': 'A'}, 400), ({'name': ' valid ', 'mealId': 'brunch'}, 400),
                 ({'name': 'valid', 'region': 'xx'}, 400), ({'name': 'valid', 'price': 1.25}, 400),
                 ({'name': 'valid', 'region': 'en', 'price': 1.25}, 201),
                 ({'name': 'valid', 'rarity': 2}, 400), ({'name': 'valid', 'calories': 10001}, 400),
                 ({'name': 'valid', 'type': 'x' * 81}, 400), ({'name': 'valid', 'desc': 'x' * 2001}, 400),
                 ({'name': 'valid', 'quote': 'x' * 301}, 400), ({'name': 'valid', 'image': 'data:image/png;base64,AAAA'}, 400),
                 ({'name': 'valid', 'image': 'images/../secret.webp'}, 400)]
        for payload, expected in cases:
            with self.subTest(payload=str(payload)[:80]):
                self.assertEqual(self.post(payload)[0], expected)

    def test_post_get_and_uuid_idempotency(self):
        payload = {'name': 'Bánh Mì Nướng Muối Ớt', 'mealId': 'snacks', 'type': 'Ăn vặt', 'price': 25000,
                   'desc': 'Bánh mì giòn.', 'image': 'images/brand.svg', 'idempotencyKey': 'f896fbb4-b3f7-44e6-b1b0-2d29db4b406e'}
        code, created = self.post(payload)
        self.assertEqual(code, 201)
        self.assertEqual(created['dish']['id'], 'custom_f896fbb4-b3f7-44e6-b1b0-2d29db4b406e')
        code, duplicate = self.post(payload)
        self.assertEqual(code, 200); self.assertTrue(duplicate['duplicate'])
        id_payload = {'name': 'Different', 'id': 'f896fbb4-b3f7-44e6-b1b0-2d29db4b406e'}
        code, duplicate_by_id = self.post(id_payload)
        self.assertEqual(code, 409)
        same_by_id = {**payload, 'id': payload['idempotencyKey']}
        del same_by_id['idempotencyKey']
        self.assertEqual(self.post(same_by_id)[0], 200)
        with urlopen(self.origin + '/api/custom-dishes') as response:
            self.assertEqual(len(json.load(response)), 1)

    def test_body_limit_and_corrupted_store_is_preserved(self):
        self.assertEqual(self.post(b' ' * (module.MAX_BODY_BYTES + 1))[0], 413)
        module.CUSTOM_DISH_FILE.write_text('{broken', encoding='utf-8')
        self.assertEqual(self.post({'name': 'valid'})[0], 500)
        self.assertEqual(module.CUSTOM_DISH_FILE.read_text(encoding='utf-8'), '{broken')

if __name__ == '__main__':
    unittest.main()
