import asyncio, json, os, sys, tempfile, urllib.request, websockets, subprocess, base64

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e"
PORT = 9372

async def run():
    user_data = tempfile.mkdtemp(prefix="chrome-fixed-test-")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={user_data}",
        "--window-size=1920,1080",
        "about:blank"
    ])
    try:
        await asyncio.sleep(2)
        req = urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")
        tabs = json.loads(req.read().decode('utf-8'))
        ws_url = tabs[0]["webSocketDebuggerUrl"]
        
        async with websockets.connect(ws_url, max_size=25_000_000) as ws:
            async def send(method, params=None):
                mid = int(asyncio.get_event_loop().time() * 1000) % 1000000
                await ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
                while True:
                    raw = await ws.recv()
                    data = json.loads(raw)
                    if data.get("id") == mid:
                        return data.get("result", {})

            await send("Page.enable")
            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(3)

            # 1. Switch to Japan region
            await send("Runtime.evaluate", {
                "expression": """
                    localStorage.setItem('bfsc_selected_region', 'ja');
                    location.reload();
                """
            })
            await asyncio.sleep(3)

            # Scroll down to load lazy images in menuGrid
            await send("Runtime.evaluate", {
                "expression": """
                    const el = document.getElementById('menuGrid');
                    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
                    window.scrollBy(0, 300);
                """
            })
            await asyncio.sleep(2)

            # Check image naturalWidths for the first 8 cards
            card_info = await send("Runtime.evaluate", {
                "expression": """
                    Array.from(document.querySelectorAll('.dish-card')).slice(0, 8).map(card => {
                        const name = card.querySelector('h3, .dish-title, .dish-name')?.textContent?.trim();
                        const img = card.querySelector('img');
                        return {
                            name,
                            src: img?.src,
                            complete: img?.complete,
                            naturalWidth: img?.naturalWidth,
                            naturalHeight: img?.naturalHeight
                        };
                    });
                """,
                "returnByValue": True
            })
            print("\nJapan First 8 Dishes in live DOM:")
            for item in card_info.get("result", {}).get("value", []):
                print(f"  {item['name']} -> {item['src']} ({item['naturalWidth']}x{item['naturalHeight']}, complete={item['complete']})")

            # Capture Japan Screen
            shot = await send("Page.captureScreenshot", {"format": "png"})
            shot_path = os.path.join(ARTIFACT_DIR, "verify_fixed_japan_food_images.png")
            with open(shot_path, "wb") as f:
                f.write(base64.b64decode(shot["data"]))
            print(f"Saved: {shot_path}")

            # 2. Switch to Vietnam Snacks
            await send("Runtime.evaluate", {
                "expression": """
                    localStorage.setItem('bfsc_selected_region', 'vi');
                    location.reload();
                """
            })
            await asyncio.sleep(3)
            
            await send("Runtime.evaluate", {
                "expression": """
                    const el = document.getElementById('menuGrid');
                    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
                    // Click snacks button
                    const btns = Array.from(document.querySelectorAll('button, .filter-chip, .meal-tab'));
                    const snackBtn = btns.find(b => b.textContent.includes('Ăn Vặt'));
                    if (snackBtn) snackBtn.click();
                """
            })
            await asyncio.sleep(2)

            shot2 = await send("Page.captureScreenshot", {"format": "png"})
            shot_path2 = os.path.join(ARTIFACT_DIR, "verify_fixed_vietnam_food_images.png")
            with open(shot_path2, "wb") as f:
                f.write(base64.b64decode(shot2["data"]))
            print(f"Saved: {shot_path2}")

    finally:
        proc.terminate()
        print("Done!")

if __name__ == '__main__':
    asyncio.run(run())
