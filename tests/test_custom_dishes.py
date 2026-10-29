import importlib.util
import json
import os
from pathlib import Path
import socket
import sys
import threading
import time
import unittest
from urllib.request import urlopen, Request

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
spec = importlib.util.spec_from_file_location('food_server', ROOT / 'backend' / 'server.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class CustomDishesApiTests(unittest.TestCase):
    def setUp(self):
        self.server = module.http.server.ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.origin = f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def test_get_custom_dishes(self):
        with urlopen(f'{self.origin}/api/custom-dishes') as response:
            self.assertEqual(response.headers.get_content_type(), 'application/json')
            dishes = json.load(response)
            self.assertIsInstance(dishes, list)

    def test_post_custom_dish_validation(self):
        payload = json.dumps({'name': 'A'}).encode('utf-8')
        req = Request(f'{self.origin}/api/custom-dishes', data=payload, headers={'Content-Type': 'application/json'})
        try:
            urlopen(req)
            self.fail('Expected 400 Bad Request for short name')
        except Exception as e:
            self.assertTrue('400' in str(e))

    def test_post_and_get_valid_dish(self):
        dish_data = {
            'name': 'Bánh Mì Nướng Muối Ớt Đặc Biệt',
            'mealId': 'snacks',
            'type': 'Ăn vặt',
            'price': 25000,
            'desc': 'Bánh mì nướng giòn rụm phết sốt muối ớt cay nồng.',
            'image': 'images/brand.svg'
        }
        payload = json.dumps(dish_data).encode('utf-8')
        req = Request(f'{self.origin}/api/custom-dishes', data=payload, headers={'Content-Type': 'application/json'})
        with urlopen(req) as resp:
            self.assertEqual(resp.status, 201)
            created = json.load(resp)
            self.assertTrue(created.get('success'))
            dish = created.get('dish')
            self.assertTrue(dish['id'].startswith('custom_'))
            self.assertEqual(dish['name'], dish_data['name'])

if __name__ == '__main__':
    unittest.main()
