import http.server
import socketserver
import os
import sys
import socket
import subprocess
import threading
import time
import json
import re

# Ensure UTF-8 output encoding across Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
CLOUDFLARED_EXE = os.path.join(DIRECTORY, "cloudflared.exe")

server_state = {
    "public_url": "",
    "lan_url": "",
    "local_url": f"http://localhost:{PORT}",
    "status": "starting"
}

def get_lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

class ThreadingHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # API endpoint to provide live server and tunnel info to client apps
        if self.path == '/api/server-info':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.end_headers()
            self.wfile.write(json.dumps(server_state).encode('utf-8'))
            return
        super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Quiet logger: suppress high-frequency 200 logs
        pass

def generate_qr_code(url):
    try:
        import qrcode
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=3
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color='#111111', back_color='#ffffff')
        qr_path = os.path.join(DIRECTORY, "images", "qr_mobile.png")
        img.save(qr_path)
        print(f"[QR] Generated qr_mobile.png for {url}", flush=True)
    except Exception as e:
        print(f"[QR] Warning: Could not generate QR locally ({e})", flush=True)

def start_http_server():
    socketserver.TCPServer.allow_reuse_address = True
    server = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), ThreadingHTTPHandler)
    server.daemon_threads = True
    print(f"[HTTP] ThreadingHTTPServer listening on 0.0.0.0:{PORT}", flush=True)
    server.serve_forever()

def run_cloudflared_tunnel():
    if not os.path.exists(CLOUDFLARED_EXE):
        print(f"[Tunnel] Error: {CLOUDFLARED_EXE} not found.", flush=True)
        return

    while True:
        print("[Tunnel] Starting Cloudflare tunnel...", flush=True)
        cmd = [CLOUDFLARED_EXE, "tunnel", "--url", f"http://127.0.0.1:{PORT}"]
        try:
            proc = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                encoding='utf-8',
                errors='replace'
            )
            
            for line in proc.stdout:
                line_str = line.strip()
                if "trycloudflare.com" in line_str:
                    match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line_str)
                    if match:
                        tunnel_url = match.group(0)
                        server_state["public_url"] = tunnel_url
                        server_state["status"] = "online"
                        print("\n" + "="*60, flush=True)
                        print(">>> WEBSITE DA HOAT DONG THANH CONG! <<<", flush=True)
                        print(f"[PUBLIC URL CHO DIEN THOAI] {tunnel_url}", flush=True)
                        print(f"[WI-FI NOI BO (LAN)]       {server_state['lan_url']}", flush=True)
                        print(f"[MAY TINH (LOCAL)]         {server_state['local_url']}", flush=True)
                        print("="*60 + "\n", flush=True)
                        generate_qr_code(tunnel_url)
            proc.wait()
        except Exception as e:
            print(f"[Tunnel] Exception: {e}", flush=True)
        
        print("[Tunnel] Cloudflared exited. Reconnecting in 3 seconds...", flush=True)
        time.sleep(3)

if __name__ == '__main__':
    lan_ip = get_lan_ip()
    server_state["lan_url"] = f"http://{lan_ip}:{PORT}"
    
    # 1. Start HTTP Server in background thread
    t_http = threading.Thread(target=start_http_server, daemon=True)
    t_http.start()
    
    # 2. Start Cloudflared tunnel
    run_cloudflared_tunnel()
