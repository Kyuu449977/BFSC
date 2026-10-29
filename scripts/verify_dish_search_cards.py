import asyncio, json, urllib.request, websockets, subprocess, base64
from pathlib import Path

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = Path(r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e")
PORT = 9460

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
    user_data = tempfile.mkdtemp(prefix="chrome-dish-search-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "--window-size=1280,1000",
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

            # Search "Ổi"
            script = """
            (function() {
                const search = document.getElementById('dishSearch');
                if (search) {
                    search.value = 'Ổi';
                    search.dispatchEvent(new Event('input', { bubbles: true }));
                }
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script}); req_id += 1
            await asyncio.sleep(0.8)

            script_scroll = "window.scrollTo(0, 800);"
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_scroll}); req_id += 1
            await asyncio.sleep(0.5)

            shot = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_search_oi_cards.png").write_bytes(base64.b64decode(shot["data"]))
            print("Captured verify_search_oi_cards.png")

            # Search "Revive"
            script2 = """
            (function() {
                const search = document.getElementById('dishSearch');
                if (search) {
                    search.value = 'Revive';
                    search.dispatchEvent(new Event('input', { bubbles: true }));
                }
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script2}); req_id += 1
            await asyncio.sleep(0.8)

            shot2 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_search_revive_cards.png").write_bytes(base64.b64decode(shot2["data"]))
            print("Captured verify_search_revive_cards.png")

            # Search "Vải"
            script3 = """
            (function() {
                const search = document.getElementById('dishSearch');
                if (search) {
                    search.value = 'Vải';
                    search.dispatchEvent(new Event('input', { bubbles: true }));
                }
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script3}); req_id += 1
            await asyncio.sleep(0.8)

            shot3 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_search_vai_cards.png").write_bytes(base64.b64decode(shot3["data"]))
            print("Captured verify_search_vai_cards.png")

            # Search "Xoài"
            script4 = """
            (function() {
                const search = document.getElementById('dishSearch');
                if (search) {
                    search.value = 'Sinh tố xoài';
                    search.dispatchEvent(new Event('input', { bubbles: true }));
                }
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script4}); req_id += 1
            await asyncio.sleep(0.8)

            shot4 = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_search_xoai_cards.png").write_bytes(base64.b64decode(shot4["data"]))
            print("Captured verify_search_xoai_cards.png")

    finally:
        proc.kill()
        print("Cleaned up Chrome.")

if __name__ == '__main__':
    asyncio.run(main())
