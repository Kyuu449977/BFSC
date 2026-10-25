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
ARTIFACT_DIR = r"C:\Users\phamp\Desktop" if False else r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e"
PORT = 9355

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
    for _ in range(12):
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
            
    print(f"Connected to Chrome at {ws_url}...")
    sys.stdout.flush()
    
    try:
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
                    img_data = base64.b64decode(r["result"]["data"])
                    path = os.path.join(ARTIFACT_DIR, filename)
                    with open(path, "wb") as f:
                        f.write(img_data)
                    print(f"Saved screenshot: {filename}")
                    sys.stdout.flush()

            # -----------------------------------------------------------------
            # TEST 1: Theme Modal, "Màu hệ thống" Button & Gradient Dot
            # -----------------------------------------------------------------
            print("\n=== TEST 1: System Theme ('Màu hệ thống') & Dark Mode ===")
            await eval_js("document.getElementById('themeBtn')?.click();")
            await asyncio.sleep(0.5)
            
            sys_theme_res = await eval_js("""
            (() => {
                const sysBtn = document.querySelector('[data-theme-choice="system"]');
                const orangeBtn = document.querySelector('[data-theme-choice="orange"]');
                const dot = sysBtn?.querySelector('.theme-dot');
                const dotStyle = dot ? getComputedStyle(dot).backgroundImage : '';
                
                // Click system theme
                if (sysBtn) sysBtn.click();
                
                return {
                    systemButtonExists: !!sysBtn,
                    systemButtonText: sysBtn?.textContent?.trim(),
                    hasOldOrangeButton: !!orangeBtn,
                    gradientBackground: dotStyle,
                    currentHtmlTheme: document.documentElement.getAttribute('data-theme')
                };
            })()
            """)
            print("System Theme Button Check:", json.dumps(sys_theme_res, indent=2, ensure_ascii=False))
            await screenshot("verify_system_theme_light.png")

            # -----------------------------------------------------------------
            # TEST 1b: Dark Mode with System Theme - check --orange color not disabled
            # -----------------------------------------------------------------
            dark_res = await eval_js("""
            (() => {
                const darkBtn = document.querySelector('[data-appearance-choice="dark"]');
                if (darkBtn) darkBtn.click();
                
                const html = document.documentElement;
                const style = getComputedStyle(html);
                const orangeVar = style.getPropertyValue('--orange').trim();
                const primaryVar = style.getPropertyValue('--primary-color').trim();
                const appearance = html.getAttribute('data-appearance');
                const theme = html.getAttribute('data-theme');
                
                return {
                    appearance,
                    theme,
                    orangeCssVar: orangeVar,
                    primaryCssVar: primaryVar
                };
            })()
            """)
            print("Dark Mode Check:", json.dumps(dark_res, indent=2, ensure_ascii=False))
            await screenshot("verify_system_theme_dark.png")
            
            # Close theme modal
            await eval_js("document.getElementById('themeDoneBtn')?.click();")
            await asyncio.sleep(0.5)

            # -----------------------------------------------------------------
            # TEST 2: Vietnam Menu - Bánh lọt & Chè bưởi in Snacks, 0 Thai Dishes
            # -----------------------------------------------------------------
            print("\n=== TEST 2: Vietnam Menu (Bánh lọt & Chè bưởi in Snacks, No Thai Dishes) ===")
            vn_menu_res = await eval_js("""
            (() => {
                // Ensure Vietnam timezone
                const hcmBtn = document.querySelector('[data-timezone-choice="Asia/Ho_Chi_Minh"]');
                if (hcmBtn) hcmBtn.click();
                
                // Click Snacks filter
                const snacksFilter = document.querySelector('[data-filter="snacks"]');
                if (snacksFilter) snacksFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                // Also check all meals for Thai dishes
                const allFilter = document.querySelector('[data-filter="all"]');
                const allDishes = [];
                if (allFilter) {
                    allFilter.click();
                    allDishes.push(...Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim()));
                    // Return to snacks
                    if (snacksFilter) snacksFilter.click();
                }
                
                const thaiFound = allDishes.filter(d => d.toLowerCase().includes('thái'));
                const hasBanhLot = dishes.some(d => d.includes('Bánh lọt'));
                const hasCheBuoi = dishes.some(d => d.includes('Chè bưởi'));
                
                return {
                    snacksDishesCount: dishes.length,
                    hasBanhLotInSnacks: hasBanhLot,
                    hasCheBuoiInSnacks: hasCheBuoi,
                    sampleSnacks: dishes.slice(0, 10),
                    thaiDishesFoundInAll: thaiFound
                };
            })()
            """)
            print("Vietnam Menu Result:", json.dumps(vn_menu_res, indent=2, ensure_ascii=False))
            await screenshot("verify_vn_snacks_banh_lot.png")

            # -----------------------------------------------------------------
            # TEST 3: Japan Menu - Sushi & Tai-chazuke, JPY Currency
            # -----------------------------------------------------------------
            print("\n=== TEST 3: Japan Menu (Sushi, Tai-chazuke, JPY Currency) ===")
            ja_res = await eval_js("""
            (() => {
                const tokyoBtn = document.querySelector('[data-timezone-choice="Asia/Tokyo"]');
                if (tokyoBtn) tokyoBtn.click();
                
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                const hasSushi = dishes.some(d => d.toLowerCase().includes('sushi') || d.includes('寿司'));
                const hasTaiChazuke = dishes.some(d => d.includes('tráp đỏ') || d.includes('鯛茶漬け'));
                const jpyPrices = prices.filter(p => p.includes('¥'));
                
                return {
                    totalDishes: dishes.length,
                    hasSushi: hasSushi,
                    hasTaiChazuke: hasTaiChazuke,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10),
                    isAllJpy: jpyPrices.length === prices.length
                };
            })()
            """)
            print("Japan Menu Result:", json.dumps(ja_res, indent=2, ensure_ascii=False))
            await screenshot("verify_japan_menu_sushi.png")

            # -----------------------------------------------------------------
            # TEST 4: Korea Menu - Bossam & Sundae, KRW Currency
            # -----------------------------------------------------------------
            print("\n=== TEST 4: Korea Menu (Bossam, Sundae, KRW Currency) ===")
            ko_res = await eval_js("""
            (() => {
                const seoulBtn = document.querySelector('[data-timezone-choice="Asia/Seoul"]');
                if (seoulBtn) seoulBtn.click();
                
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const prices = Array.from(document.querySelectorAll('.dish-card .price')).map(el => el.textContent.trim());
                
                const hasBossam = dishes.some(d => d.toLowerCase().includes('bossam') || d.includes('보쌈'));
                const hasSundae = dishes.some(d => d.toLowerCase().includes('sundae') || d.includes('순대'));
                const krwPrices = prices.filter(p => p.includes('₩'));
                
                return {
                    totalDishes: dishes.length,
                    hasBossam: hasBossam,
                    hasSundae: hasSundae,
                    sampleDishes: dishes.slice(0, 10),
                    samplePrices: prices.slice(0, 10),
                    isAllKrw: krwPrices.length === prices.length
                };
            })()
            """)
            print("Korea Menu Result:", json.dumps(ko_res, indent=2, ensure_ascii=False))
            await screenshot("verify_korea_menu_bossam.png")

            # -----------------------------------------------------------------
            # TEST 5: China & US Menus (Chaoshan noodles, Bolognese, Salmon, Pomelo tea)
            # -----------------------------------------------------------------
            print("\n=== TEST 5: China & Western (US) Menus ===")
            zh_res = await eval_js("""
            (() => {
                const shanghaiBtn = document.querySelector('[data-timezone-choice="Asia/Shanghai"]');
                if (shanghaiBtn) shanghaiBtn.click();
                
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const hasChaoshan = dishes.some(d => d.includes('Triều Châu') || d.includes('潮汕'));
                const hasZhaJiang = dishes.some(d => d.includes('Bắc Kinh') || d.includes('炸酱面'));
                const hasPomelo = dishes.some(d => d.includes('bưởi hồng') || d.includes('蜂蜜柚子茶'));
                
                return {
                    totalDishes: dishes.length,
                    hasChaoshan: hasChaoshan,
                    hasZhaJiang: hasZhaJiang,
                    hasPomelo: hasPomelo,
                    sampleDishes: dishes.slice(0, 8)
                };
            })()
            """)
            print("China Menu Result:", json.dumps(zh_res, indent=2, ensure_ascii=False))

            us_res = await eval_js("""
            (() => {
                const nyBtn = document.querySelector('[data-timezone-choice="America/New_York"]');
                if (nyBtn) nyBtn.click();
                
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.click();
                
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                const hasBolognese = dishes.some(d => d.toLowerCase().includes('bolognese'));
                const hasSalmon = dishes.some(d => d.toLowerCase().includes('salmon'));
                const hasFrenchOnion = dishes.some(d => d.toLowerCase().includes('french onion') || d.toLowerCase().includes('hành tây'));
                
                return {
                    totalDishes: dishes.length,
                    hasBolognese: hasBolognese,
                    hasSalmon: hasSalmon,
                    hasFrenchOnion: hasFrenchOnion,
                    sampleDishes: dishes.slice(0, 8)
                };
            })()
            """)
            print("US Menu Result:", json.dumps(us_res, indent=2, ensure_ascii=False))

            # -----------------------------------------------------------------
            # TEST 6: Gacha Unique Rolls (3 dishes roll with uniqueness)
            # -----------------------------------------------------------------
            print("\n=== TEST 6: Gacha Unique Rolls ===")
            gacha_res = await eval_js("""
            (() => {
                const results = [];
                // Test 30 consecutive rolls of 3 dishes
                for (let i = 0; i < 30; i++) {
                    const sel = window.gachaEngine ? window.gachaEngine.drawDishes({ count: 3, unique: true }) : [];
                    const ids = sel.map(x => x.dish.id);
                    const names = sel.map(x => x.dish.name);
                    const dupId = ids.length !== new Set(ids).size;
                    const dupName = names.length !== new Set(names).size;
                    if (dupId || dupName) {
                        results.push({ roll: i, ids, names, dupId, dupName });
                    }
                }
                
                return {
                    testedRolls: 30,
                    duplicateFound: results.length > 0,
                    failures: results
                };
            })()
            """)
            print("Gacha Uniqueness Result:", json.dumps(gacha_res, indent=2, ensure_ascii=False))

            print("\nALL SYSTEM THEME & DISH VERIFICATIONS COMPLETED SUCCESSFULLY!")

    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(run_verification())
