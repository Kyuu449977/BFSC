import asyncio, json, urllib.request, websockets, subprocess, base64
from pathlib import Path

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = Path(r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e")
PORT = 9455

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
    user_data = tempfile.mkdtemp(prefix="chrome-drinks-filter-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "--window-size=1280,1200",
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

            # Click filter button for "Đồ Uống & Nước Ngọt"
            script_filter_drinks = """
            (function() {
                const btns = Array.from(document.querySelectorAll('.filters button'));
                const drinkFilter = btns.find(b => b.textContent.includes('Đồ Uống') || b.textContent.includes('đồ uống'));
                if (drinkFilter) drinkFilter.click();
            })()
            """
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_filter_drinks}); req_id += 1
            await asyncio.sleep(1.0)

            # Scroll down to see the sub-filters and drink cards
            script_scroll = "window.scrollTo(0, 950);"
            await cdp_call(ws, req_id, "Runtime.evaluate", {"expression": script_scroll}); req_id += 1
            await asyncio.sleep(0.5)

            shot = await cdp_call(ws, req_id, "Page.captureScreenshot", {"format": "png"}); req_id += 1
            (ARTIFACT_DIR / "verify_drinks_filter_view.png").write_bytes(base64.b64decode(shot["data"]))
            print("Captured verify_drinks_filter_view.png")

    finally:
        proc.kill()
        print("Cleaned up Chrome.")

if __name__ == '__main__':
    asyncio.run(main())
