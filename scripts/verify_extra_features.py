import asyncio, json, urllib.request, websockets, subprocess, base64
from pathlib import Path

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = Path(r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e")
PORT = 9445

async def cdp_call(ws, req_id, method, params=None):
    payload = {"id": req_id, "method": method, "params": params or {}}
    await ws.send(json.dumps(payload))
    while True:
        raw = await ws.recv()
        data = json.loads(raw)
        if data.get("id") == req_id:
            return data.get("result", {})

async def main():
    import tempfile
    user_data = tempfile.mkdtemp(prefix="chrome-extra-test-")
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

            # 1. Custom Wheel with Alert triggered
            script_custom_wheel = """
            (function() {
                const btn = document.getElementById('customWheelBtn');
                if (btn) btn.click();
                const spinBtn = document.getElementById('customWheelSpinActionBtn');
                if (spinBtn) spinBtn.click();
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_custom_wheel}); req_id += 1
            await asyncio.sleep(0.8)
            shot1 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_custom_wheel_alert.png").write_bytes(base64.b64decode(shot1["data"]))
            print("Captured verify_custom_wheel_alert.png")

            # 2. Close custom wheel and open Universe Dialog
            script_universe = """
            (function() {
                const uBtn = document.getElementById('customWheelUniverseBtn');
                if (uBtn) uBtn.click();
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_universe}); req_id += 1
            await asyncio.sleep(0.8)
            shot2 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_universe_dialog.png").write_bytes(base64.b64decode(shot2["data"]))
            print("Captured verify_universe_dialog.png")

            # 3. Close dialogs and switch to Drinks category
            script_drinks = """
            (function() {
                const uClose = document.querySelector('#universeDishDialog [data-close]');
                if (uClose) uClose.click();
                const cwClose = document.querySelector('#customWheelDialog [data-close]');
                if (cwClose) cwClose.click();
                const drinksBtn = document.querySelector('button[data-mode="drink"]');
                if (drinksBtn) drinksBtn.click();
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_drinks}); req_id += 1
            await asyncio.sleep(1.0)
            shot3 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_drinks_catalog.png").write_bytes(base64.b64decode(shot3["data"]))
            print("Captured verify_drinks_catalog.png")

    finally:
        proc.kill()
        print("Cleaned up Chrome.")

if __name__ == '__main__':
    asyncio.run(main())
