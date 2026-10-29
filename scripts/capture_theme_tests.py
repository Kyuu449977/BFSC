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
PORT = 9425

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
        await asyncio.sleep(2.5)
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
                "width": 1280,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            print("Navigating to http://localhost:8080...")
            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(2)

            # Test 1: Open Theme Dialog
            print("Opening theme dialog...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const dialog = document.getElementById('themeDialog');
                    if (dialog) dialog.showModal();
                })()"""
            })
            await asyncio.sleep(0.5)

            # Capture dialog in light mode + green theme
            print("Capturing light green dialog...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    document.querySelector('[data-appearance-choice="light"]').click();
                    document.querySelector('[data-theme-choice="green"]').click();
                })()"""
            })
            await asyncio.sleep(0.5)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            with open(os.path.join(ARTIFACT_DIR, "test_theme_dialog_light_green.png"), "wb") as f:
                f.write(base64.b64decode(shot["result"]["data"]))

            # Capture dialog in dark mode + green theme
            print("Capturing dark green dialog...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    document.querySelector('[data-appearance-choice="dark"]').click();
                })()"""
            })
            await asyncio.sleep(0.5)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            with open(os.path.join(ARTIFACT_DIR, "test_theme_dialog_dark_green.png"), "wb") as f:
                f.write(base64.b64decode(shot["result"]["data"]))

            # Close dialog and capture main page in light mode + system theme
            print("Capturing main page light system...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    document.getElementById('themeDialog').close();
                    document.querySelector('[data-appearance-choice="light"]').click();
                    document.querySelector('[data-theme-choice="system"]').click();
                })()"""
            })
            await asyncio.sleep(0.5)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            with open(os.path.join(ARTIFACT_DIR, "test_main_page_light_system.png"), "wb") as f:
                f.write(base64.b64decode(shot["result"]["data"]))

            # Capture main page in dark mode + system theme
            print("Capturing main page dark system...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    document.querySelector('[data-appearance-choice="dark"]').click();
                })()"""
            })
            await asyncio.sleep(0.5)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            with open(os.path.join(ARTIFACT_DIR, "test_main_page_dark_system.png"), "wb") as f:
                f.write(base64.b64decode(shot["result"]["data"]))

            # Capture main page in light mode + rose theme
            print("Capturing main page light rose...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    document.querySelector('[data-appearance-choice="light"]').click();
                    document.querySelector('[data-theme-choice="rose"]').click();
                })()"""
            })
            await asyncio.sleep(0.5)

            shot = await send("Page.captureScreenshot", {"format": "png"})
            with open(os.path.join(ARTIFACT_DIR, "test_main_page_light_rose.png"), "wb") as f:
                f.write(base64.b64decode(shot["result"]["data"]))

            print("Captured all test screenshots successfully!")

    finally:
        proc.kill()

if __name__ == "__main__":
    asyncio.run(run())
