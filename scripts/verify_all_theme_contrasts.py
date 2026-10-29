import asyncio
import json
import os
import sys
import tempfile
import urllib.request
import websockets
import subprocess
import base64
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = Path(r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e")
PORT = 9435

async def cdp_call(ws, req_id, method, params=None):
    payload = {"id": req_id, "method": method, "params": params or {}}
    await ws.send(json.dumps(payload))
    while True:
        raw = await ws.recv()
        data = json.loads(raw)
        if data.get("id") == req_id:
            return data.get("result", {})

async def main():
    user_data = tempfile.mkdtemp(prefix="chrome-theme-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "--window-size=1280,950",
        "about:blank",
    ])
    await asyncio.sleep(2)

    try:
        req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json", timeout=5)
        tabs = json.loads(req.read().decode())
        page_tabs = [t for t in tabs if t.get("type") == "page"]
        ws_url = page_tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=50_000_000) as ws:
            req_id = 1
            await cdp_call(ws, req_id, "Page.enable"); req_id += 1
            await cdp_call(ws, req_id, "Page.navigate", {"url": "http://localhost:8080"}); req_id += 1
            await asyncio.sleep(2.5)

            test_cases = [
                ("light", "system", "verify_light_system.png", False),
                ("dark", "system", "verify_dark_system.png", False),
                ("light", "green", "verify_light_green_dialog.png", True),
                ("dark", "green", "verify_dark_green_dialog.png", True),
                ("light", "rose", "verify_light_rose.png", False),
                ("dark", "blue", "verify_dark_blue_dialog.png", True),
            ]

            for app, thm, out_name, open_dialog in test_cases:
                script = f"""
                (function() {{
                    const prefs = AppearancePreferences.read();
                    prefs.appearance = '{app}';
                    prefs.theme = '{thm}';
                    AppearancePreferences.apply(prefs);
                    const d = document.getElementById('themeDialog');
                    if ({str(open_dialog).lower()}) {{
                        if (d && !d.open) d.showModal();
                    }} else {{
                        if (d && d.open) d.close();
                    }}
                }})()
                """
                await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script}); req_id += 1
                await asyncio.sleep(1.0)

                shot = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
                raw = base64.b64decode(shot["data"])
                out_path = ARTIFACT_DIR / out_name
                out_path.write_bytes(raw)
                print(f"Captured {out_name}: {len(raw)} bytes")

    finally:
        proc.kill()
        print("Cleaned up Chrome.")

if __name__ == '__main__':
    asyncio.run(main())
