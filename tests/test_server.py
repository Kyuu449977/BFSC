import importlib.util
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import threading
import time
import unittest
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
spec = importlib.util.spec_from_file_location('food_server', ROOT / 'server.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ServerTests(unittest.TestCase):
    def test_static_and_api(self):
        server = module.http.server.ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        origin = f'http://127.0.0.1:{server.server_port}'
        try:
            with urlopen(origin + '/api/server-info?test=1') as response:
                self.assertEqual(response.headers.get_content_type(), 'application/json')
                self.assertIn('lan_url', json.load(response))
            with urlopen(origin + '/') as response:
                self.assertIn('Chọn 3 món', response.read().decode('utf-8'))
        finally:
            server.shutdown()
            server.server_close()
            thread.join()

    @unittest.skipIf((ROOT / 'cloudflared.exe').exists(), 'Tunnel binary present')
    def test_missing_tunnel_still_serves(self):
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0))
            port = sock.getsockname()[1]
        flags = subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
        process = subprocess.Popen([sys.executable, 'run_server.py'], cwd=ROOT, env={**os.environ, 'PORT': str(port)}, stdout=subprocess.PIPE, stderr=subprocess.PIPE, creationflags=flags)
        try:
            for _ in range(40):
                try:
                    with urlopen(f'http://127.0.0.1:{port}/api/server-info', timeout=1) as response:
                        state = json.load(response)
                        self.assertEqual(state['status'], 'local')
                        self.assertEqual(state['public_url'], '')
                        self.assertTrue(state['lan_url'].endswith(f':{port}'))
                        break
                except OSError:
                    time.sleep(.1)
            else:
                self.fail('Local server did not start without cloudflared')
        finally:
            process.terminate()
            process.communicate(timeout=5)

if __name__ == '__main__':
    unittest.main()
