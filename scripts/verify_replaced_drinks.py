import asyncio
import json
import os
import sys
import tempfile
import urllib.request
import websockets
import subprocess
import base64

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_IMG = r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\verify_replaced_guava.png"
PORT = 9397

async def run():
    user_data = tempfile.mkdtemp(prefix="chrome-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "about:blank"
    ])
    try:
        await asyncio.sleep(2)
        req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")
        tabs = json.loads(req.read().decode())
        page_tabs = [t for t in tabs if t.get("type") == "page"]
        ws_url = page_tabs[0]["webSocketDebuggerUrl"]
        
        async with websockets.connect(ws_url, max_size=30*1024*1024) as ws:
            msg_id = 0
            async def send(method, params=None):
                nonlocal msg_id
                msg_id += 1
                cmd = {"id": msg_id, "method": method}
                if params:
                    cmd["params"] = params
                await ws.send(json.dumps(cmd))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == msg_id:
                        return resp

            await send("Page.enable")
            await send("DOM.enable")
            await send("Runtime.enable")
            await send("Emulation.setDeviceMetricsOverride", {
                "width": 1400,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(2)

            # Switch filter to drinks
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const btn = document.querySelector('button[data-filter="drinks"]');
                    if (btn) btn.click();
                })()"""
            })
            await asyncio.sleep(0.5)

            # Click "Sinh tố & Nước ép"
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const btns = document.querySelectorAll('.drink-sub-btn');
                    if (btns[3]) btns[3].click();
                })()"""
            })
            await asyncio.sleep(1)

            # Scroll down to nuoc_ep_oi
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    window.scrollTo(0, 1600);
                })()"""
            })
            await asyncio.sleep(1)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            shot_data = base64.b64decode(shot["result"]["data"])
            with open(OUT_IMG, "wb") as f:
                f.write(shot_data)
            print(f"Captured screenshot to {OUT_IMG}")

    finally:
        proc.kill()

if __name__ == "__main__":
    asyncio.run(run())
