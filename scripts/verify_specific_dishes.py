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
PORT = 9362

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
            async def eval_js(expr):
                nonlocal msg_id
                msg_id += 1
                await ws.send(json.dumps({"id": msg_id, "method": "Runtime.evaluate", "params": {"expression": expr, "returnByValue": True}}))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == msg_id:
                        return resp.get("result", {}).get("result", {}).get("value")
            
            # Navigate
            msg_id += 1
            await ws.send(json.dumps({"id": msg_id, "method": "Page.navigate", "params": {"url": "http://localhost:8080/"}}))
            await asyncio.sleep(2.5)
            
            # Test Korea Afternoon (Bossam & Sundae)
            ko_res = await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="Asia/Seoul"]')?.click();
                document.querySelector('[data-filter="afternoon"]')?.click();
                const dishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                return {
                    category: 'afternoon',
                    dishes,
                    hasBossam: dishes.some(d => d.includes('Bossam') || d.includes('보쌈')),
                    hasSundae: dishes.some(d => d.includes('Sundae') || d.includes('순대'))
                };
            })()""")
            print("Korea Afternoon:", json.dumps(ko_res, indent=2, ensure_ascii=False))
            
            # Test China Afternoon & Drinks
            zh_res = await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="Asia/Shanghai"]')?.click();
                document.querySelector('[data-filter="afternoon"]')?.click();
                const afternoonDishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                document.querySelector('[data-filter="drinks"]')?.click();
                const drinksDishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                return {
                    afternoonDishes,
                    drinksDishes,
                    hasZhaJiang: afternoonDishes.some(d => d.includes('Bắc Kinh') || d.includes('炸酱面')),
                    hasPomeloTea: drinksDishes.some(d => d.includes('bưởi hồng') || d.includes('蜂蜜柚子茶'))
                };
            })()""")
            print("China Afternoon & Drinks:", json.dumps(zh_res, indent=2, ensure_ascii=False))

            # Test Western / US Lunch
            us_res = await eval_js("""(() => {
                document.querySelector('[data-timezone-choice="America/New_York"]')?.click();
                document.querySelector('[data-filter="lunch"]')?.click();
                const lunchDishes = Array.from(document.querySelectorAll('.dish-card .dish-name')).map(el => el.textContent.trim());
                return {
                    lunchDishes,
                    hasBolognese: lunchDishes.some(d => d.includes('Bolognese') || d.includes('bò băm')),
                    hasSalmon: lunchDishes.some(d => d.includes('Salmon') || d.includes('Cá hồi áp chảo')),
                    hasFrenchOnion: lunchDishes.some(d => d.includes('French Onion') || d.includes('hành tây'))
                };
            })()""")
            print("US Lunch:", json.dumps(us_res, indent=2, ensure_ascii=False))

    finally:
        proc.terminate()

asyncio.run(test())
