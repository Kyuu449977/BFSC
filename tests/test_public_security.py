import concurrent.futures
import http.client
import importlib.util
import json
from pathlib import Path
import sys
import threading
import time
import unittest
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import server
from scripts.public_files import PUBLIC_FILES
from build_public import build_public, PUBLIC_ROOT

class PublicSecurityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = server.PreviewServer(('127.0.0.1', 0), server.Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True); cls.thread.start()
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join()
    def request(self, path, method='GET'):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=10)
        try:
            connection.request(method, path); r = connection.getresponse(); return r.status, dict(r.getheaders()), r.read()
        finally: connection.close()
    def test_sources_internal_paths_and_head_share_one_access_policy(self):
        paths=['/src/js/app.js','/src/index.html','/backend/server.py','/backend/data/dish-search.json','/scripts/public_files.py','/archive/','/docs/README.md','/server.py','/SERVER.PY','/api/PLACES.PY','/tests/BROWSER.CJS','/.git/HEAD','/.env','/tests/','/tools/','/artifacts/','/package.json','/public/index.html','/%73erver%2e%50Y','/%2e%67it/HEAD','/artifacts/audit-2026-10-23/evidence.json','/../server.py','/..%5cserver.py','/index.html.','/index.html::$DATA','/%252e%252e/server.py','/assets/../server.py','/build_public.py']
        for path in paths:
            for method in ['GET','HEAD']:
                with self.subTest(path=path,method=method):
                    code,headers,body=self.request(path,method); self.assertEqual(code,404)
                    if method=='HEAD': self.assertEqual(body,b'')
    def test_all_published_assets_work_no_directory_listing_or_html_asset_fallback(self):
        for name in PUBLIC_FILES:
            code,headers,body=self.request('/'+name); self.assertEqual(code,200,name); self.assertTrue(body,name)
        for path in ['/assets/','/images/','/assets/fonts/','/missing.js','/images/missing.webp','/missing.json']:
            self.assertEqual(self.request(path)[0],404,path)
    def test_photo_and_font_content_types_are_explicit_on_windows(self):
        for path, expected in [('/images/binh_dan/nuoc_cam.webp', 'image/webp'), ('/assets/fonts/be-vietnam-pro-latin-400-normal.woff2', 'font/woff2')]:
            code, headers, body = self.request(path)
            self.assertEqual(code, 200)
            self.assertEqual(headers.get('Content-type') or headers.get('Content-Type'), expected)
            self.assertTrue(body)

    def test_security_headers_and_head_api(self):
        for path in ['/','/style.css','/api/server-info','/missing.js']:
            code,headers,_=self.request(path); self.assertEqual(headers.get('X-Content-Type-Options'),'nosniff'); self.assertEqual(headers.get('X-Frame-Options'),'DENY'); self.assertIn("script-src 'self'",headers['Content-Security-Policy']); self.assertNotIn('Python',headers.get('Server',''))
        code,headers,body=self.request('/api/server-info','HEAD'); self.assertEqual(code,200); self.assertEqual(body,b''); self.assertIn('application/json',headers['Content-Type'])
    def test_build_contains_exact_allowlist_and_removes_stale_files(self):
        stale=PUBLIC_ROOT/'old-internal-report.txt';stale.write_text('internal test fixture',encoding='utf-8');build_public();self.assertFalse(stale.exists())
        files={p.relative_to(PUBLIC_ROOT).as_posix() for p in PUBLIC_ROOT.rglob('*') if p.is_file()};self.assertEqual(files,set(PUBLIC_FILES))
    def test_controlled_ipv4_burst_and_recovery(self):
        started=time.perf_counter()
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as pool: codes=list(pool.map(lambda _:self.request('/api/server-info')[0],range(100)))
        self.assertEqual(codes,[200]*100);self.assertEqual(self.request('/')[0],200)

if __name__=='__main__': unittest.main()
