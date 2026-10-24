"""Optional Cloudflare sharing; the local server works without cloudflared."""
import os
import re
import subprocess
import threading
import time
from backend.server import PORT, DIRECTORY, create_server, server_state

CLOUDFLARED_EXE = os.path.join(DIRECTORY, 'cloudflared.exe')

def run_cloudflared_tunnel():
    while True:
        server_state['public_url'] = ''
        server_state['status'] = 'local'
        try:
            with subprocess.Popen([CLOUDFLARED_EXE, 'tunnel', '--url', f'http://127.0.0.1:{PORT}'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace') as proc:
                for line in proc.stdout:
                    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
                    if match:
                        server_state.update(public_url=match.group(0), status='online')
                        print(f"Internet: {match.group(0)}", flush=True)
        except OSError as error:
            print(f'Tunnel unavailable: {error}', flush=True)
        server_state.update(public_url='', status='local')
        time.sleep(3)

def main():
    with create_server() as server:
        print(f"Local: {server_state['local_url']}\nWi-Fi: {server_state['lan_url']}", flush=True)
        if os.path.isfile(CLOUDFLARED_EXE):
            threading.Thread(target=run_cloudflared_tunnel, daemon=True).start()
        else:
            print('cloudflared.exe missing: local and Wi-Fi access remain available.', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
