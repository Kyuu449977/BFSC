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
    user_data = tempfile.mkdtemp(prefix="chrome-test-tz-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--remote-debugging-port=9227",
        f"--user-data-dir={user_data}",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "http://localhost:8080/"
    ])
    
    await asyncio.sleep(2.5)
    
    try:
        tabs_resp = urllib.request.urlopen("http://127.0.0.1:9227/json/list", timeout=5)
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

            await asyncio.sleep(1.5)

            print("\n=== TEST 1: IN VIETNAM TIMEZONE, SWITCHING LANGUAGES DOES NOT CHANGE MENU OR CURRENCY ===")
            # Ensure VN timezone
            await eval_js("""(() => {
                const btn = document.querySelector('[data-timezone-choice="Asia/Ho_Chi_Minh"]');
                if (btn) btn.click();
            })()""")
            await asyncio.sleep(0.5)

            # Test in vi
            vn_state = await eval_js("""(() => {
                return {
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("VN timezone in 'vi':", vn_state)
            assert vn_state["region"] == "vi"
            assert "đ" in vn_state["firstPrice"]
            assert vn_state["presets"] == ["30.000đ", "50.000đ", "100.000đ", "200.000đ"]

            # Switch language to English ('en')
            await eval_js("window.applyLanguage('en')")
            await asyncio.sleep(0.5)
            en_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("VN timezone in 'en':", en_state)
            assert en_state["lang"] == "en", "Language must be 'en'"
            assert en_state["region"] == "vi", "Region must still be 'vi'!"
            assert "đ" in en_state["firstPrice"], "Price must STILL be in VND 'đ'!"
            assert en_state["presets"] == ["30.000đ", "50.000đ", "100.000đ", "200.000đ"], "Presets must STILL be VND!"
            await take_screenshot("verify_decoupled_vn_in_english.png")

            # Switch language to Japanese ('ja')
            await eval_js("window.applyLanguage('ja')")
            await asyncio.sleep(0.5)
            ja_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("VN timezone in 'ja':", ja_state)
            assert ja_state["lang"] == "ja", "Language must be 'ja'"
            assert ja_state["region"] == "vi", "Region must still be 'vi'!"
            assert "đ" in ja_state["firstPrice"], "Price must STILL be in VND 'đ'!"
            assert ja_state["presets"] == ["30.000đ", "50.000đ", "100.000đ", "200.000đ"], "Presets must STILL be VND!"

            print("\n=== TEST 2: SWITCHING TIMEZONE TO JAPAN SWITCHES MENU & CURRENCY TO JPY ===")
            await eval_js("""(() => {
                const btn = document.querySelector('[data-timezone-choice="Asia/Tokyo"]');
                if (btn) btn.click();
            })()""")
            await asyncio.sleep(0.5)

            jp_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("Tokyo timezone (lang ja):", jp_state)
            assert jp_state["region"] == "ja", "Region must now be 'ja'"
            assert "¥" in jp_state["firstPrice"], "Price must now be in JPY '¥'!"
            assert jp_state["presets"] == ["¥500", "¥1,000", "¥2,000", "¥3,500"], "Presets must be JPY!"

            # While in Tokyo timezone, switch language back to Vietnamese ('vi')
            await eval_js("window.applyLanguage('vi')")
            await asyncio.sleep(0.5)
            jp_in_vi_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("Tokyo timezone (lang vi):", jp_in_vi_state)
            assert jp_in_vi_state["lang"] == "vi"
            assert jp_in_vi_state["region"] == "ja", "Region must STILL be 'ja'!"
            assert "¥" in jp_in_vi_state["firstPrice"], "Price must STILL be in JPY '¥'!"
            assert jp_in_vi_state["presets"] == ["¥500", "¥1,000", "¥2,000", "¥3,500"], "Presets must STILL be JPY!"
            await take_screenshot("verify_decoupled_japan_in_vietnamese.png")

            print("\n=== TEST 3: SWITCHING TIMEZONE TO KOREA SWITCHES MENU & CURRENCY TO KRW ===")
            await eval_js("""(() => {
                const btn = document.querySelector('[data-timezone-choice="Asia/Seoul"]');
                if (btn) btn.click();
            })()""")
            await asyncio.sleep(0.5)
            kr_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("Seoul timezone:", kr_state)
            assert kr_state["region"] == "ko", "Region must be 'ko'"
            assert "₩" in kr_state["firstPrice"], "Price must be in KRW '₩'"
            assert kr_state["presets"] == ["₩5,000", "₩10,000", "₩20,000", "₩35,000"]
            await take_screenshot("verify_decoupled_korea_in_vietnamese.png")

            print("\n=== TEST 4: SWITCHING TIMEZONE TO NEW YORK SWITCHES MENU & CURRENCY TO USD ===")
            await eval_js("""(() => {
                const btn = document.querySelector('[data-timezone-choice="America/New_York"]');
                if (btn) btn.click();
            })()""")
            await asyncio.sleep(0.5)
            us_state = await eval_js("""(() => {
                return {
                    lang: document.documentElement.lang,
                    firstDish: document.querySelector('#menuGrid .dish-card .dish-name')?.textContent,
                    firstPrice: document.querySelector('#menuGrid .dish-card .price')?.textContent,
                    presets: Array.from(document.querySelectorAll('[data-budget]')).map(b => b.textContent.trim()),
                    region: window.getCurrentRegion()
                };
            })()""")
            print("New York timezone:", us_state)
            assert us_state["region"] == "en", "Region must be 'en'"
            assert "$" in us_state["firstPrice"], "Price must be in USD '$'"
            assert us_state["presets"] == ["$10", "$20", "$35", "$60"]
            await take_screenshot("verify_decoupled_us_in_vietnamese.png")

            print("\n>>> ALL DECOUPLING TESTS PASSED 100%! <<<")

    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(run_verification())
