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
ARTIFACT_DIR = r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e"
PORT = 9363

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
            await send("Emulation.setDeviceMetricsOverride", {
                "width": 1280,
                "height": 960,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            async def eval_js(expr):
                r = await send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
                return r.get("result", {}).get("result", {}).get("value")

            async def screenshot(filename):
                r = await send("Page.captureScreenshot", {"format": "png"})
                if "result" in r and "data" in r["result"]:
                    path = os.path.join(ARTIFACT_DIR, filename)
                    with open(path, "wb") as f:
                        f.write(base64.b64decode(r["result"]["data"]))
                    print(f"Captured: {filename}")

            await send("Page.navigate", {"url": "http://localhost:8080/"})
            await asyncio.sleep(2.5)

            # 1. Korea Afternoon (Bossam & Sundae)
            await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="Asia/Seoul"]')?.click();
                document.querySelector('[data-filter="afternoon"]')?.click();
            })()""")
            await asyncio.sleep(0.5)
            await screenshot("verify_korea_menu_bossam.png")

            # 2. China Afternoon (Zha Jiang Mian)
            await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="Asia/Shanghai"]')?.click();
                document.querySelector('[data-filter="afternoon"]')?.click();
            })()""")
            await asyncio.sleep(0.5)
            await screenshot("verify_china_menu_zhajiang.png")

            # 3. US Lunch (Bolognese & Salmon)
            await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="America/New_York"]')?.click();
                document.querySelector('[data-filter="lunch"]')?.click();
            })()""")
            await asyncio.sleep(0.5)
            await screenshot("verify_us_menu_bolognese.png")

    finally:
        proc.terminate()

asyncio.run(run())
