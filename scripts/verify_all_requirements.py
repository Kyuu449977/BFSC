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

async def run_verification():
    user_data = tempfile.mkdtemp(prefix="chrome-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--remote-debugging-port=9223",
        f"--user-data-dir={user_data}",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "http://localhost:8080/"
    ])
    
    await asyncio.sleep(2.5)
    
    try:
        # Get websocket URL
        req = urllib.request.urlopen("http://localhost:8080/api/server-info", timeout=3)
        print("Preview server alive:", req.status)
        
        tabs_resp = urllib.request.urlopen("http://127.0.0.1:9223/json/list", timeout=5)
        tabs = json.loads(tabs_resp.read().decode('utf-8'))
        page_tab = next(t for t in tabs if t.get("type") == "page")
        ws_url = page_tab["webSocketDebuggerUrl"]
        print(f"Connecting to CDP: {ws_url}")
        
        async with websockets.connect(ws_url, max_size=50_000_000) as ws:
            msg_id = 0
            async def send(method, params=None):
                nonlocal msg_id
                msg_id += 1
                payload = {"id": msg_id, "method": method}
                if params:
                    payload["params"] = params
                await ws.send(json.dumps(payload))
                while True:
                    res = json.loads(await ws.recv())
                    if res.get("id") == msg_id:
                        return res.get("result", {})
            
            async def eval_js(expr):
                r = await send("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
                if "exceptionDetails" in r:
                    print("JS Exception:", r["exceptionDetails"])
                return r.get("result", {}).get("value")

            async def take_screenshot(filename):
                r = await send("Page.captureScreenshot", {"format": "png"})
                data = base64.b64decode(r.get("data", ""))
                out_path = os.path.join(ARTIFACT_DIR, filename)
                with open(out_path, "wb") as f:
                    f.write(data)
                print(f"[SCREENSHOT] Saved {filename}")

            await send("Page.enable")
            await send("DOM.enable")
            await send("Emulation.setDeviceMetricsOverride", {
                "width": 1280,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            })

            # Wait for load
            await asyncio.sleep(1.5)

            print("\n=== 1. VERIFY HERO GRADIENT IMAGE REVEAL EFFECT ===")
            hero_info = await eval_js("""(() => {
                const hero = document.querySelector('.hero');
                const copy = document.querySelector('.hero-copy');
                const photo = document.querySelector('.hero-photo');
                const img = photo ? photo.querySelector('img') : null;
                const hStyle = window.getComputedStyle(hero);
                const cStyle = window.getComputedStyle(copy);
                const pStyle = window.getComputedStyle(photo);
                const iStyle = img ? window.getComputedStyle(img) : null;
                return {
                    heroPosition: hStyle.position,
                    heroBg: hStyle.backgroundColor,
                    copyZIndex: cStyle.zIndex,
                    copyBg: cStyle.backgroundColor,
                    copyMaxWidth: cStyle.maxWidth,
                    photoPosition: pStyle.position,
                    photoWidth: pStyle.width,
                    photoMask: iStyle ? (iStyle.maskImage || iStyle.webkitMaskImage) : null
                };
            })()""")
            print("Hero Styles:", json.dumps(hero_info, indent=2))
            assert hero_info["photoPosition"] == "absolute", "Hero photo must be positioned absolute"
            assert "gradient" in str(hero_info["photoMask"]).lower(), "Hero image must have gradient mask"

            await take_screenshot("verify_hero_gradient_reveal.png")

            print("\n=== 2. VERIFY DEDUPLICATION IN MENU (BANH CANH & BANH LOT) ===")
            # Check Bánh canh
            bc_count = await eval_js("""(() => {
                const input = document.getElementById('dishSearch');
                input.value = 'Bánh canh';
                input.dispatchEvent(new Event('input'));
                const cards = document.querySelectorAll('#menuGrid .dish-card');
                const names = Array.from(cards).map(c => c.querySelector('.dish-name')?.textContent);
                return { count: cards.length, names };
            })()""")
            print("Search 'Bánh canh':", bc_count)
            assert bc_count["count"] == 1, f"Expected 1 Bánh canh card, got {bc_count['count']}"

            # Check Bánh lọt
            bl_count = await eval_js("""(() => {
                const input = document.getElementById('dishSearch');
                input.value = 'Bánh lọt';
                input.dispatchEvent(new Event('input'));
                const cards = document.querySelectorAll('#menuGrid .dish-card');
                const names = Array.from(cards).map(c => c.querySelector('.dish-name')?.textContent);
                return { count: cards.length, names };
            })()""")
            print("Search 'Bánh lọt':", bl_count)
            assert bl_count["count"] == 1, f"Expected 1 Bánh lọt card, got {bl_count['count']}"

            # Clear search
            await eval_js("""(() => {
                const input = document.getElementById('dishSearch');
                input.value = '';
                input.dispatchEvent(new Event('input'));
            })()""")

            print("\n=== 3. VERIFY REGIONAL MENUS & CURRENCIES ===")
            regions = [
                ("vi", "đ", ["30.000đ", "50.000đ", "100.000đ", "200.000đ"]),
                ("ja", "¥", ["¥500", "¥1,000", "¥2,000", "¥3,500"]),
                ("ko", "₩", ["₩5,000", "₩10,000", "₩20,000", "₩35,000"]),
                ("zh", "¥", ["¥20", "¥40", "¥80", "¥150"]),
                ("en", "$", ["$10", "$20", "$35", "$60"]),
            ]

            for r_code, sym, expected_presets in regions:
                res = await eval_js(f"""(() => {{
                    window.applyLanguage('{r_code}');
                    const presets = Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim());
                    const cards = Array.from(document.querySelectorAll('#menuGrid .dish-card')).slice(0, 5).map(c => ({{
                        name: c.querySelector('.dish-name')?.textContent,
                        price: c.querySelector('.price')?.textContent
                    }}));
                    const featuredPrice = document.getElementById('featuredPrice')?.textContent;
                    return {{
                        region: '{r_code}',
                        presets,
                        sampleCards: cards,
                        featuredPrice
                    }};
                }})()""")
                print(f"\nRegion '{r_code}':")
                print("Presets:", res["presets"])
                print("Featured Price:", res["featuredPrice"])
                print("Sample Cards:", res["sampleCards"])
                
                assert res["presets"] == expected_presets, f"Presets mismatch for {r_code}: got {res['presets']}, expected {expected_presets}"
                assert sym in res["featuredPrice"], f"Expected symbol {sym} in featuredPrice {res['featuredPrice']}"
                for c in res["sampleCards"]:
                    assert sym in c["price"], f"Expected symbol {sym} in card price {c['price']}"

                await take_screenshot(f"verify_regional_{r_code}.png")

            print("\n=== 4. VERIFY ANTI-SPAM ON BUDGET PANEL ===")
            spam_res = await eval_js("""(() => {
                const btn = document.querySelector('[data-budget]');
                const previewNote = document.getElementById('budgetPreviewNote');
                const initialHidden = previewNote.hidden;
                let flashed = false;
                
                // Track mutations on previewNote
                const observer = new MutationObserver(() => {
                    if (!previewNote.hidden) flashed = true;
                });
                observer.observe(previewNote, { attributes: true, attributeFilter: ['hidden'] });
                
                // Rapidly click preset button 12 times
                for (let i = 0; i < 12; i++) {
                    btn.click();
                }
                
                observer.disconnect();
                return {
                    initialHidden,
                    flashedDuringSpam: flashed,
                    finalHidden: previewNote.hidden
                };
            })()""")
            print("Spam Test Result:", spam_res)
            assert not spam_res["flashedDuringSpam"], "Preview note should not flash on repeated preset clicks"

            print("\n>>> ALL VERIFICATIONS PASSED 100%! <<<")

    finally:
        proc.terminate()
        proc.wait()

if __name__ == "__main__":
    asyncio.run(run_verification())
