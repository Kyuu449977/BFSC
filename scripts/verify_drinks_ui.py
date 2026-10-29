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
ARTIFACT_DIR = r"C:\Users\phamp\Downloads\New folder\BFSC\scripts"
OUT_IMG = r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\verify_clean_drinks_gallery.png"
PORT = 9385

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
            await send("Runtime.enable")
            await send("Emulation.setDeviceMetricsOverride", {
                "width": 1400,
                "height": 1100,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            print("Navigating to http://localhost:8080...")
            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(2)

            # Test AudioSystem
            audio_test = await send("Runtime.evaluate", {
                "expression": """(() => {
                    const btn = document.getElementById('bgmBtn');
                    btn.click();
                    return {
                        playing: window.audioSystem.isBgmPlaying,
                        muted: window.audioSystem.isMuted,
                        ctxState: window.audioSystem.ctx ? window.audioSystem.ctx.state : null,
                        gain: window.audioSystem.bgmGain ? window.audioSystem.bgmGain.gain.value : null
                    };
                })()""",
                "returnByValue": True
            })
            print("AudioSystem live state:", audio_test.get("result", {}).get("result", {}).get("value"))

            # Switch filter to drinks
            print("Filtering to drinks...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const btn = document.querySelector('button[data-filter="drinks"]');
                    if (btn) btn.click();
                })()"""
            })
            await asyncio.sleep(1)

            # Scroll to make the test drinks visible
            print("Scrolling to drink cards...")
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const target = document.getElementById('dish-nuoc_ep_oi') || document.getElementById('dish-nuoc_revive') || document.querySelector('.dish-card');
                    if (target) {
                        target.scrollIntoView({ behavior: 'instant', block: 'center' });
                    }
                })()"""
            })
            await asyncio.sleep(1.5)

            # Capture screenshot of drinks
            shot = await send("Page.captureScreenshot", {"format": "png"})
            shot_data = base64.b64decode(shot["result"]["data"])
            with open(OUT_IMG, "wb") as f:
                f.write(shot_data)
            print(f"Drinks gallery screenshot saved to {OUT_IMG}")

    finally:
        proc.kill()

if __name__ == "__main__":
    asyncio.run(run())
