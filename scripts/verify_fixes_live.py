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
PORT = 9382

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
                "width": 1280,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            # Navigate to local server
            print("Navigating to http://localhost:8080...")
            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(2.5)

            # 1. Test engine.prepareSelection and gacha buttons
            print("\n--- Test 1: Gacha Engine & Buttons ---")
            res = await send("Runtime.evaluate", {
                "expression": """(() => {
                    try {
                        const sel = window.engine.prepareSelection({ mode: window.engine.currentMode, unique: true, budget: null });
                        return { ok: true, singlesCount: sel.singles.length, mode: sel.mode, key: sel.key };
                    } catch (e) {
                        return { ok: false, error: e.message, stack: e.stack };
                    }
                })()""",
                "returnByValue": True
            })
            print("prepareSelection result:", json.dumps(res.get("result", {}).get("value"), ensure_ascii=False))

            # Click single button
            print("Clicking #singleBtn to test main spin...")
            click_res = await send("Runtime.evaluate", {
                "expression": """(() => {
                    const btn = document.getElementById('singleBtn');
                    if (!btn) return { ok: false, error: 'no singleBtn' };
                    btn.click();
                    return { ok: true, text: btn.textContent.trim() };
                })()""",
                "returnByValue": True
            })
            print("singleBtn click result:", click_res.get("result", {}).get("value"))
            await asyncio.sleep(2)

            # Check if animation / reel started
            check_spin = await send("Runtime.evaluate", {
                "expression": """(() => {
                    const dialog = document.getElementById('resultDialog');
                    const stage = document.getElementById('reelStage');
                    return {
                        dialogOpen: dialog ? dialog.open : false,
                        stageCards: stage ? stage.children.length : 0
                    };
                })()""",
                "returnByValue": True
            })
            print("Reel / Dialog state after spin:", check_spin.get("result", {}).get("value"))

            # 2. Test AudioSystem BGM toggle
            print("\n--- Test 2: AudioSystem & BGM ---")
            bgm_res = await send("Runtime.evaluate", {
                "expression": """(() => {
                    try {
                        const btn = document.getElementById('bgmBtn');
                        btn.click();
                        return {
                            ok: true,
                            isBgmPlaying: window.audioSystem ? window.audioSystem.isBgmPlaying : null,
                            isMuted: window.audioSystem ? window.audioSystem.isMuted : null,
                            btnPressed: btn.getAttribute('aria-pressed')
                        };
                    } catch (e) {
                        return { ok: false, error: e.message };
                    }
                })()""",
                "returnByValue": True
            })
            print("BGM toggle result:", bgm_res.get("result", {}).get("value"))

            # 3. Test Drinks Filter & Verify Drink Images
            print("\n--- Test 3: Drinks Images ---")
            # Switch to drinks category tab
            await send("Runtime.evaluate", {
                "expression": """(() => {
                    const drinksTab = document.querySelector('button[data-filter="drinks"]');
                    if (drinksTab) drinksTab.click();
                })()"""
            })
            await asyncio.sleep(1.5)

            # Check the 5 drink images on the page
            img_check = await send("Runtime.evaluate", {
                "expression": """(() => {
                    const testIds = ['nuoc_ep_oi', 'nuoc_tra_oi_hong_hat_chia', 'nuoc_sinh_to_xoai', 'nuoc_tra_vai_lai', 'nuoc_revive'];
                    const results = {};
                    testIds.forEach(id => {
                        const card = document.getElementById('dish-' + id);
                        if (card) {
                            const img = card.querySelector('img');
                            results[id] = {
                                found: true,
                                src: img ? img.src : null,
                                complete: img ? img.complete : false,
                                naturalWidth: img ? img.naturalWidth : 0
                            };
                        } else {
                            results[id] = { found: false };
                        }
                    });
                    return results;
                })()""",
                "returnByValue": True
            })
            print("Drink images live check:", json.dumps(img_check.get("result", {}).get("value"), indent=2, ensure_ascii=False))

            # Take screenshot of the drinks grid
            print("\nCapturing verification screenshot...")
            shot = await send("Page.captureScreenshot", {"format": "png"})
            shot_data = base64.b64decode(shot["result"]["data"])
            shot_file = os.path.join(ARTIFACT_DIR, "verify_drink_images_live.png")
            with open(shot_file, "wb") as f:
                f.write(shot_data)
            print(f"Screenshot saved to: {shot_file}")

    finally:
        proc.kill()

if __name__ == "__main__":
    asyncio.run(run())
