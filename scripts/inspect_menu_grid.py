import asyncio
import json
import os
import sys
import tempfile
import urllib.request
import websockets
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9346

async def test():
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
        
        async with websockets.connect(ws_url) as ws:
            msg_id = 0
            async def eval_js(expr):
                nonlocal msg_id
                msg_id += 1
                await ws.send(json.dumps({"id": msg_id, "method": "Runtime.evaluate", "params": {"expression": expr, "returnByValue": True}}))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == msg_id:
                        return resp.get("result", {}).get("result", {}).get("value")
            
            # Navigate
            msg_id += 1
            await ws.send(json.dumps({"id": msg_id, "method": "Page.navigate", "params": {"url": "http://localhost:8080/"}}))
            await asyncio.sleep(2)
            
            # Check cards
            info = await eval_js("""(() => {
                return {
                    currentRegion: window.gachaEngine?.currentRegion,
                    hasRegionalDb: typeof REGIONAL_DATABASES !== 'undefined',
                    regionalKeys: typeof REGIONAL_DATABASES !== 'undefined' ? Object.keys(REGIONAL_DATABASES) : [],
                    hasFoodDb: typeof FOOD_DATABASE !== 'undefined',
                    foodDbKeys: typeof FOOD_DATABASE !== 'undefined' ? Object.keys(FOOD_DATABASE) : [],
                    dbKeys: Object.keys(window.gachaEngine.getActiveDatabase())
                };
            })()""")
            print("Page info:", info)
    finally:
        proc.terminate()

asyncio.run(test())
