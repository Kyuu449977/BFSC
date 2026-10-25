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
PORT = 9370

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
            await send("Emulation.setDeviceMetricsOverride", {
                "width": 1280,
                "height": 960,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            async def eval_js(expr):
                r = await send("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
                val = r.get("result", {}).get("result", {}).get("value")
                if val is not None:
                    return val
                if "exceptionDetails" in r.get("result", {}):
                    return f"ERROR: {r['result']['exceptionDetails']}"
                return r

            async def screenshot(filename):
                r = await send("Page.captureScreenshot", {"format": "png"})
                if "result" in r and "data" in r["result"]:
                    path = os.path.join(ARTIFACT_DIR, filename)
                    with open(path, "wb") as f:
                        f.write(base64.b64decode(r["result"]["data"]))
                    print(f"Captured: {filename}")

            await send("Page.navigate", {"url": "http://localhost:8080/"})
            await asyncio.sleep(2.5)

            # 1. Check Vietnam Snacks (Bánh lọt & Chè bưởi)
            print("\n=== 1. CHECK VIETNAM SNACKS IMAGES ===")
            vn_info = await eval_js("""(async () => {
                document.querySelector('[data-filter="snacks"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 600));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("Vietnam Snacks Cards:", json.dumps(vn_info[:8], indent=2, ensure_ascii=False))
            await screenshot("verify_images_vn_snacks.png")

            # 2. Check Japan Morning (Tamago Sando, Natto, Grilled Salmon...)
            print("\n=== 2. CHECK JAPAN MORNING IMAGES (USER COMPLAINT FIXED) ===")
            ja_m_info = await eval_js("""(async () => {
                document.querySelector('[data-timezone-choice="Asia/Tokyo"]')?.click();
                document.querySelector('[data-filter="morning"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 800));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("Japan Morning Cards:", json.dumps(ja_m_info[:9], indent=2, ensure_ascii=False))
            await screenshot("verify_images_ja_morning.png")

            # 3. Check Japan Lunch (Nigiri Sushi, Chirashizushi, Ramen...)
            print("\n=== 3. CHECK JAPAN LUNCH IMAGES ===")
            ja_info = await eval_js("""(async () => {
                document.querySelector('[data-timezone-choice="Asia/Tokyo"]')?.click();
                document.querySelector('[data-filter="lunch"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 600));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("Japan Lunch Cards:", json.dumps(ja_info[:8], indent=2, ensure_ascii=False))
            await screenshot("verify_images_ja_lunch.png")

            # 3. Check Korea Afternoon & Dinner (Bossam, Sundae, Samgyeopsal...)
            print("\n=== 3. CHECK KOREA AFTERNOON IMAGES ===")
            ko_info = await eval_js("""(async () => {
                document.querySelector('[data-timezone-choice="Asia/Seoul"]')?.click();
                document.querySelector('[data-filter="afternoon"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 600));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("Korea Afternoon Cards:", json.dumps(ko_info[:8], indent=2, ensure_ascii=False))
            await screenshot("verify_images_ko_afternoon.png")

            # 4. Check China Morning & Lunch (Xiao Long Bao, Peking Duck, Zha Jiang Mian...)
            print("\n=== 4. CHECK CHINA MORNING IMAGES ===")
            zh_info = await eval_js("""(async () => {
                document.querySelector('[data-timezone-choice="Asia/Shanghai"]')?.click();
                document.querySelector('[data-filter="morning"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 600));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("China Morning Cards:", json.dumps(zh_info[:8], indent=2, ensure_ascii=False))
            await screenshot("verify_images_zh_morning.png")

            # 5. Check Western / US Lunch (Cheeseburger, Bolognese, Salmon, French Onion...)
            print("\n=== 5. CHECK WESTERN LUNCH IMAGES ===")
            en_info = await eval_js("""(async () => {
                document.querySelector('[data-timezone-choice="America/New_York"]')?.click();
                document.querySelector('[data-filter="lunch"]')?.click();
                document.getElementById('menuGrid')?.scrollIntoView();
                await new Promise(r => setTimeout(r, 600));
                const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card'));
                return cards.map(c => {
                    const name = c.querySelector('.dish-name, h3, h4')?.textContent?.trim();
                    const img = c.querySelector('img');
                    return {
                        name,
                        src: img?.getAttribute('src'),
                        naturalWidth: img?.naturalWidth,
                        complete: img?.complete
                    };
                });
            })()""")
            print("Western Lunch Cards:", json.dumps(en_info[:8], indent=2, ensure_ascii=False))
            await screenshot("verify_images_en_lunch.png")

    finally:
        proc.terminate()

asyncio.run(run())
