import asyncio
import json
import os
import shutil
import subprocess
import sys
import tempfile
import traceback
import urllib.request
import websockets

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORT = 9222
URL = "http://localhost:8080/"

async def cdp_call(ws, method, params=None, msg_id=[1]):
    mid = msg_id[0]
    msg_id[0] += 1
    req = {"id": mid, "method": method, "params": params or {}}
    await ws.send(json.dumps(req))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == mid:
            if "error" in data:
                raise RuntimeError(f"CDP error: {data['error']}")
            return data.get("result", {})

async def evaluate(ws, expr):
    if "return " in expr:
        script = f"(() => {{\n{expr}\n}})()"
    else:
        script = expr
    res = await cdp_call(ws, "Runtime.evaluate", {
        "expression": script,
        "returnByValue": True,
        "awaitPromise": True
    })
    if "exceptionDetails" in res:
        print(f"EVAL EXCEPTION for [{script}]:", res["exceptionDetails"], flush=True)
    return res.get("result", {}).get("value")

async def screenshot(ws, filepath):
    res = await cdp_call(ws, "Page.captureScreenshot", {"format": "png"})
    import base64
    data = base64.b64decode(res["data"])
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "wb") as f:
        f.write(data)
    print(f"Captured screenshot: {filepath}", flush=True)

async def run_test():
    user_data_dir = tempfile.mkdtemp(prefix="chrome_headless_")
    chrome_proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data_dir}",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1280,950"
    ])
    try:
        ws_url = None
        for _ in range(20):
            try:
                resp = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json", timeout=1)
                all_tabs = json.loads(resp.read().decode())
                page_tabs = [t for t in all_tabs if t.get("type") == "page"]
                if page_tabs:
                    ws_url = page_tabs[0]["webSocketDebuggerUrl"]
                    break
            except Exception:
                await asyncio.sleep(0.5)
        if not ws_url:
            raise RuntimeError("Failed to connect to Chrome debugging port")

        async with websockets.connect(ws_url, max_size=50_000_000) as ws:
            await cdp_call(ws, "Page.enable")
            await cdp_call(ws, "Runtime.enable")
            
            await cdp_call(ws, "Page.navigate", {"url": URL})
            await asyncio.sleep(2)

            print("=== 1. VERIFYING ENGLISH FILTER PILLS & COLLECTION NOTE ===", flush=True)
            # Switch to English
            await evaluate(ws, "document.getElementById('langBtn').click(); return true;")
            await asyncio.sleep(0.4)
            await evaluate(ws, "document.querySelector('[data-lang-choice=\"en\"]').click(); return true;")
            await asyncio.sleep(0.8)

            # Scroll down to menu section
            await evaluate(ws, "document.getElementById('menu').scrollIntoView(); return true;")
            await asyncio.sleep(0.5)

            en_filters = await evaluate(ws, """
                return Array.from(document.querySelectorAll('#filters button')).map(b => b.textContent.trim());
            """)
            en_note = await evaluate(ws, "return document.getElementById('collectionNote').textContent.trim();")
            en_card_badges = await evaluate(ws, """
                return Array.from(document.querySelectorAll('.dish-card .dish-source')).slice(0, 4).map(s => s.textContent.trim());
            """)

            print(f"EN Filter Buttons: {en_filters}", flush=True)
            print(f"EN Collection Note: '{en_note}'", flush=True)
            print(f"EN Dish Card Badges: {en_card_badges}", flush=True)

            # Verify no Vietnamese in filter buttons
            for viet_word in ['Tất cả', 'Buổi Sáng', 'Buổi Trưa', 'Buổi Chiều', 'Buổi Tối', 'Món Ăn Vặt', 'Đồ Uống']:
                assert viet_word not in en_filters, f"Vietnamese filter '{viet_word}' still found in English filters: {en_filters}"
            assert 'Discovered' in en_note, f"Collection note not translated: {en_note}"
            assert 'All' in en_filters, f"Expected 'All' in filters: {en_filters}"

            await screenshot(ws, "outputs/check_en_menu_filters_fixed.png")

            print("\n=== 2. VERIFYING RELOAD PERSISTENCE (LANGUAGE EN PRESERVED ON RELOAD) ===", flush=True)
            # Reload page with English active in localStorage
            await cdp_call(ws, "Page.reload")
            await asyncio.sleep(2)
            await evaluate(ws, "document.getElementById('menu').scrollIntoView(); return true;")
            await asyncio.sleep(0.5)

            reloaded_filters = await evaluate(ws, """
                return Array.from(document.querySelectorAll('#filters button')).map(b => b.textContent.trim());
            """)
            print(f"Reloaded EN Filter Buttons: {reloaded_filters}", flush=True)
            assert 'All' in reloaded_filters and 'Breakfast' in reloaded_filters, f"Reloaded filters not English: {reloaded_filters}"

            print("\n=== 3. VERIFYING JAPANESE MENU FILTERS ===", flush=True)
            await evaluate(ws, "document.getElementById('langBtn').click(); return true;")
            await asyncio.sleep(0.3)
            await evaluate(ws, "document.querySelector('[data-lang-choice=\"ja\"]').click(); return true;")
            await asyncio.sleep(0.8)
            ja_filters = await evaluate(ws, """
                return Array.from(document.querySelectorAll('#filters button')).map(b => b.textContent.trim());
            """)
            print(f"JA Filter Buttons: {ja_filters}", flush=True)
            assert 'すべて' in ja_filters and '朝食' in ja_filters, f"JA filters unexpected: {ja_filters}"
            await screenshot(ws, "outputs/check_ja_menu_filters_fixed.png")

            print("\n=== 4. VERIFYING KOREAN MENU FILTERS ===", flush=True)
            await evaluate(ws, "document.getElementById('langBtn').click(); return true;")
            await asyncio.sleep(0.3)
            await evaluate(ws, "document.querySelector('[data-lang-choice=\"ko\"]').click(); return true;")
            await asyncio.sleep(0.8)
            ko_filters = await evaluate(ws, """
                return Array.from(document.querySelectorAll('#filters button')).map(b => b.textContent.trim());
            """)
            print(f"KO Filter Buttons: {ko_filters}", flush=True)
            assert '전체' in ko_filters and '아침' in ko_filters, f"KO filters unexpected: {ko_filters}"
            await screenshot(ws, "outputs/check_ko_menu_filters_fixed.png")

            print("\n=== 5. VERIFYING CHINESE MENU FILTERS ===", flush=True)
            await evaluate(ws, "document.getElementById('langBtn').click(); return true;")
            await asyncio.sleep(0.3)
            await evaluate(ws, "document.querySelector('[data-lang-choice=\"zh\"]').click(); return true;")
            await asyncio.sleep(0.8)
            zh_filters = await evaluate(ws, """
                return Array.from(document.querySelectorAll('#filters button')).map(b => b.textContent.trim());
            """)
            print(f"ZH Filter Buttons: {zh_filters}", flush=True)
            assert '全部' in zh_filters and '早餐' in zh_filters, f"ZH filters unexpected: {zh_filters}"
            await screenshot(ws, "outputs/check_zh_menu_filters_fixed.png")

            print("\nALL MENU FILTER & COLLECTION NOTE CHECKS PASSED WITH 100% SUCCESS!", flush=True)

    except Exception as e:
        traceback.print_exc()
        raise e
    finally:
        chrome_proc.terminate()
        try:
            chrome_proc.wait(timeout=3)
        except Exception:
            chrome_proc.kill()
        try:
            shutil.rmtree(user_data_dir, ignore_errors=True)
        except Exception:
            pass

if __name__ == '__main__':
    asyncio.run(run_test())
