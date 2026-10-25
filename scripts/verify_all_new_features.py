import asyncio
import json
import os
import sys
import tempfile
import urllib.request
import websockets
import subprocess
import time
import base64

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e"
PORT = 9339

async def run_verification():
    user_data = tempfile.mkdtemp(prefix="chrome-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "about:blank"
    ])
    
    ws_url = None
    for _ in range(10):
        await asyncio.sleep(0.5)
        try:
            req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")
            tabs = json.loads(req.read().decode())
            page_tabs = [t for t in tabs if t.get("type") == "page"]
            if page_tabs:
                ws_url = page_tabs[0]["webSocketDebuggerUrl"]
                break
        except Exception:
            pass
            
    print(f"Connecting to Chrome page tab at {ws_url}...")
    sys.stdout.flush()
    
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
            
            await send("Page.enable")
            await send("DOM.enable")
            
            # Navigate to preview server
            print("Navigating to http://localhost:8080/ ...")
            sys.stdout.flush()
            await send("Page.navigate", {"url": "http://localhost:8080/"})
            await asyncio.sleep(2)
            
            async def eval_js(expr):
                r = await send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
                val = r.get("result", {}).get("result", {}).get("value")
                if val is not None:
                    return val
                if "exceptionDetails" in r.get("result", {}):
                    return f"ERROR: {r['result']['exceptionDetails']}"
                return r

            async def screenshot(filename):
                r = await send("Page.captureScreenshot", {"format": "png"})
                if "result" in r and "data" in r["result"]:
                    out_path = os.path.join(ARTIFACT_DIR, filename)
                    with open(out_path, "wb") as f:
                        f.write(base64.b64decode(r["result"]["data"]))
                    print(f"Saved screenshot: {filename}")
                    sys.stdout.flush()

            print("\n--- TEST 1: Auto Appearance & Custom Theme Color ---")
            res1 = await eval_js("""
            (() => {
                const autoBtn = document.querySelector('[data-appearance-choice="auto"]');
                if (!autoBtn) return "Missing auto button!";
                autoBtn.click();
                const appState = document.documentElement.getAttribute('data-appearance');
                
                const colorInput = document.getElementById('customThemeColor');
                if (!colorInput) return "Missing custom color input!";
                colorInput.value = '#8a2be2';
                colorInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                const themeAttr = document.documentElement.getAttribute('data-theme');
                const orangeVar = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim();
                
                return {
                    autoButtonExists: true,
                    autoButtonText: autoBtn.textContent.trim(),
                    appearanceAttr: appState,
                    themeAttr: themeAttr,
                    orangeCssVar: orangeVar
                };
            })()
            """)
            print("Test 1 Result:", res1)
            sys.stdout.flush()

            await eval_js("document.getElementById('themeBtn').click();")
            await asyncio.sleep(0.5)
            await screenshot("verify_appearance_custom_color.png")
            await eval_js("document.getElementById('themeDoneBtn').click();")
            await asyncio.sleep(0.5)

            print("\n--- TEST 2: No Vietnamese () when Language is English ---")
            res2 = await eval_js("""
            (() => {
                const enBtn = document.querySelector('[data-lang-choice="en"]');
                if (enBtn) enBtn.click();
                
                const titles = Array.from(document.querySelectorAll('.dish-card .dish-name, .featured-name')).map(el => el.textContent.trim());
                const parensFound = titles.filter(t => /\\([^)]+\\)$/.test(t));
                return {
                    totalDishes: titles.length,
                    sampleTitles: titles.slice(0, 10),
                    parensFound: parensFound
                };
            })()
            """)
            print("Test 2 Result:", res2)
            sys.stdout.flush()
            await screenshot("verify_en_no_parens.png")

            print("\n--- TEST 3: Japan Region with Vietnamese Language (Sushi check!) ---")
            res3 = await eval_js("""
            (() => {
                const viBtn = document.querySelector('[data-lang-choice="vi"]');
                if (viBtn) viBtn.click();
                
                const tokyoBtn = document.querySelector('[data-timezone-choice="Asia/Tokyo"]');
                if (tokyoBtn) tokyoBtn.click();
                
                // Show all meals filter
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                const hasSushi = dishes.some(d => d.toLowerCase().includes('sushi'));
                const hasRamen = dishes.some(d => d.toLowerCase().includes('ramen'));
                
                return {
                    totalDishesVisible: dishes.length,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10),
                    hasSushi: hasSushi,
                    hasRamen: hasRamen
                };
            })()
            """)
            print("Test 3 (Japan in Vietnamese):", res3)
            sys.stdout.flush()
            await screenshot("verify_japan_in_vietnamese_sushi.png")

            print("\n--- TEST 4: Korea Region in Vietnamese Language ---")
            res4 = await eval_js("""
            (() => {
                const seoulBtn = document.querySelector('[data-timezone-choice="Asia/Seoul"]');
                if (seoulBtn) seoulBtn.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                return {
                    totalDishesVisible: dishes.length,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10)
                };
            })()
            """)
            print("Test 4 (Korea in Vietnamese):", res4)
            sys.stdout.flush()
            await screenshot("verify_korea_in_vietnamese.png")

            print("\n--- TEST 5: China Region in Vietnamese Language ---")
            res5 = await eval_js("""
            (() => {
                const shanghaiBtn = document.querySelector('[data-timezone-choice="Asia/Shanghai"]');
                if (shanghaiBtn) shanghaiBtn.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                return {
                    totalDishesVisible: dishes.length,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10)
                };
            })()
            """)
            print("Test 5 (China in Vietnamese):", res5)
            sys.stdout.flush()
            await screenshot("verify_china_in_vietnamese.png")

            print("\n--- TEST 6: Western (US) Region in Vietnamese Language ---")
            res6 = await eval_js("""
            (() => {
                const nyBtn = document.querySelector('[data-timezone-choice="America/New_York"]');
                if (nyBtn) nyBtn.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                return {
                    totalDishesVisible: dishes.length,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10)
                };
            })()
            """)
            print("Test 6 (US in Vietnamese):", res6)
            sys.stdout.flush()
            await screenshot("verify_us_in_vietnamese.png")

            print("\n--- TEST 7: Total count of dishes across all 5 databases ---")
            res7 = await eval_js("""
            (() => {
                return {
                    vi: Object.values(FOOD_DATABASE).reduce((acc, p) => acc + (p.dishes ? p.dishes.length : 0), 0),
                    ja: Object.values(REGIONAL_DATABASES.ja).reduce((acc, p) => acc + (p.dishes ? p.dishes.length : 0), 0),
                    ko: Object.values(REGIONAL_DATABASES.ko).reduce((acc, p) => acc + (p.dishes ? p.dishes.length : 0), 0),
                    zh: Object.values(REGIONAL_DATABASES.zh).reduce((acc, p) => acc + (p.dishes ? p.dishes.length : 0), 0),
                    en: Object.values(REGIONAL_DATABASES.en).reduce((acc, p) => acc + (p.dishes ? p.dishes.length : 0), 0),
                };
            })()
            """)
            print("Test 7 (Total Dishes per country):", res7)
            sys.stdout.flush()

    finally:
        proc.terminate()
        print("Chrome test finished successfully!")
        sys.stdout.flush()

asyncio.run(run_verification())
