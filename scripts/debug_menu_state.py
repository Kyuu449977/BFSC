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
PORT = 9360

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
            await asyncio.sleep(2.5)
            
            info = await eval_js("""(() => {
                const list = window.gachaEngine ? window.gachaEngine.getAllDishesList() : 'NO ENGINE';
                const actDb = window.gachaEngine ? window.gachaEngine.getActiveDatabase() : 'NO ENGINE';
                return {
                    listLength: Array.isArray(list) ? list.length : list,
                    actDbKeys: typeof actDb === 'object' && actDb ? Object.keys(actDb) : actDb,
                    hasFoodDatabase: typeof FOOD_DATABASE !== 'undefined',
                    hasRegionalDb: typeof REGIONAL_DATABASES !== 'undefined'
                };
            })()""")
            print("Page info:\n", json.dumps(info, indent=2, ensure_ascii=False))
    finally:
        proc.terminate()

asyncio.run(test())
