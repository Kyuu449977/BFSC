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
PORT = 9348

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
            await send("Runtime.enable")
            await send("Debugger.enable")

            failed_scripts = []
            async def event_listener():
                while True:
                    try:
                        raw = await ws.recv()
                        ev = json.loads(raw)
                        if ev.get("method") == "Debugger.scriptFailedToParse":
                            failed_scripts.append(ev["params"])
                    except Exception:
                        break
            
            t = asyncio.create_task(event_listener())
            await send("Page.navigate", {"url": "http://localhost:8080/"})
            await asyncio.sleep(2)
            t.cancel()
            
            print("Failed scripts:", json.dumps(failed_scripts, indent=2))
            
    finally:
        proc.terminate()

asyncio.run(test())
