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
PORT = 9336

async def run():
    user_data = tempfile.mkdtemp(prefix="chrome-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "about:blank"
    ])
    
    for _ in range(10):
        await asyncio.sleep(0.5)
        try:
            req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")
            tabs = json.loads(req.read().decode())
            ws_url = tabs[0]["webSocketDebuggerUrl"]
            break
        except Exception:
            pass
            
    try:
        async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
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
            
            await send("Page.navigate", {"url": "http://localhost:8080/"})
            await asyncio.sleep(2)
            
            # Check HTML of appearance options
            r = await send("Runtime.evaluate", {
                "expression": "document.querySelector('.appearance-options')?.innerHTML || 'NOT FOUND'",
                "returnByValue": True
            })
            print("Appearance options innerHTML:", r.get("result", {}).get("result", {}).get("value"))

            r2 = await send("Runtime.evaluate", {
                "expression": "Array.from(document.querySelectorAll('[data-appearance-choice]')).map(b => b.outerHTML)",
                "returnByValue": True
            })
            print("Buttons found:", r2.get("result", {}).get("result", {}).get("value"))
    finally:
        proc.terminate()

asyncio.run(run())
