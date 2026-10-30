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
    def test_generated_worker_manifest_matches_allowlist(self):
        manifest = (PUBLIC_ROOT / 'sw-assets.js').read_text(encoding='utf-8')
        data = json.loads(manifest.split(' = ', 1)[1].rstrip().removesuffix(';'))
        cached = set(data['essential']) | set(data['optional'])
        self.assertTrue(all('./' + name in data['essential'] for name in PUBLIC_FILES if name.endswith('.js') and '/' not in name and name not in {'sw.js', 'sw-assets.js'}))
        self.assertEqual(cached, {'./'} | {'./' + name for name in PUBLIC_FILES if name not in {'sw.js', 'sw-assets.js'}})
        self.assertFalse(any('://' in name or '/api/' in name for name in cached))
        self.assertIn('./index.html', data['essential'])
        self.assertIn('./', data['essential'])
        self.assertIn('./assets/attribution-data.js', data['essential'])

    def test_generated_credits_and_runtime_attribution_cover_every_dish(self):
        audit = json.loads((ROOT / 'docs' / 'reports' / 'image-attribution-audit.json').read_text(encoding='utf-8'))
        page = (PUBLIC_ROOT / 'credits.html').read_text(encoding='utf-8')
        bundle = (PUBLIC_ROOT / 'assets' / 'attribution-data.js').read_text(encoding='utf-8')
        self.assertNotIn('FOOD_IMAGE_CREDITS_START', page)
        self.assertNotIn('FOOD_IMAGE_CREDITS_END', page)
        self.assertEqual(page.count('data-review-required="true"'), audit['summary']['reviewRequired'])
        self.assertEqual(page.count('data-review-required="false"'), audit['summary']['attributed'])
        self.assertIn('pending review', page)
        prefix = 'window.BFSC_ATTRIBUTION_DATA = '
        self.assertTrue(bundle.startswith(prefix))
        runtime_data = json.loads(bundle[len(prefix):].rstrip().removesuffix(';'))
        self.assertEqual(len(runtime_data), 382)
        self.assertEqual(sum(bool(record['reviewRequired']) for record in runtime_data.values()), audit['summary']['reviewRequired'])
        self.assertTrue(all('attribution' not in record for record in runtime_data.values() if record['reviewRequired']))

    def test_photo_and_font_content_types_are_explicit_on_windows(self):
        for path, expected in [('/images/binh_dan/nuoc_cam.webp', 'image/webp'), ('/assets/fonts/be-vietnam-pro-latin-400-normal.woff2', 'font/woff2')]:
            code, headers, body = self.request(path)
            self.assertEqual(code, 200)
            self.assertEqual(headers.get('Content-type') or headers.get('Content-Type'), expected)
            self.assertTrue(body)

    def test_security_headers_and_head_api(self):
        for path in ['/','/style.css','/api/server-info','/api/custom-dishes','/missing.js']:
            for method in ['GET', 'HEAD']:
                code,headers,body=self.request(path,method); self.assertEqual(headers.get('X-Content-Type-Options'),'nosniff'); self.assertEqual(headers.get('X-Frame-Options'),'DENY'); self.assertIn("script-src 'self'",headers['Content-Security-Policy']); self.assertNotIn('Python',headers.get('Server',''))
                if method == 'HEAD': self.assertEqual(body,b'')
        code,headers,body=self.request('/api/server-info','HEAD'); self.assertEqual(code,200); self.assertEqual(body,b''); self.assertIn('application/json',headers['Content-Type'])
    def test_build_contains_exact_allowlist_and_removes_stale_files(self):
        stale=PUBLIC_ROOT/'old-internal-report.txt';stale.write_text('internal test fixture',encoding='utf-8');build_public();self.assertFalse(stale.exists())
        files={p.relative_to(PUBLIC_ROOT).as_posix() for p in PUBLIC_ROOT.rglob('*') if p.is_file()};self.assertEqual(files,set(PUBLIC_FILES))
    def test_controlled_ipv4_burst_and_recovery(self):
        started=time.perf_counter()
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as pool: codes=list(pool.map(lambda _:self.request('/api/server-info')[0],range(100)))
        self.assertEqual(codes,[200]*100);self.assertEqual(self.request('/')[0],200)

if __name__=='__main__': unittest.main()
