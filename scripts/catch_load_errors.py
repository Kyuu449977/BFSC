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
PORT = 9361

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

            await send("Page.enable")
            await send("Runtime.enable")
            await send("Log.enable")
            
            # Navigate now
            await send("Page.navigate", {"url": "http://localhost:8080/"})
            
            # Collect all messages for 3 seconds
            errors = []
            console_msgs = []
            start = asyncio.get_event_loop().time()
            while asyncio.get_event_loop().time() - start < 3.0:
                try:
                    raw = await asyncio.wait_for(ws.recv(), timeout=0.5)
                    msg = json.loads(raw)
                    if msg.get("method") == "Runtime.exceptionThrown":
                        errors.append(msg["params"]["exceptionDetails"])
                    elif msg.get("method") == "Log.entryAdded":
                        console_msgs.append(msg["params"]["entry"])
                    elif msg.get("method") == "Runtime.consoleAPICalled":
                        console_msgs.append(msg["params"])
                except asyncio.TimeoutError:
                    pass
            
            print("ERRORS CAUGHT:")
            print(json.dumps(errors, indent=2, ensure_ascii=False))
            print("LOG ENTRIES:")
            print(json.dumps(console_msgs, indent=2, ensure_ascii=False))
            
    finally:
        proc.terminate()

asyncio.run(test())
