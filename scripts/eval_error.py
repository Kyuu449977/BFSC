import asyncio, json, tempfile, subprocess, urllib.request, websockets

async def check():
    user_data = tempfile.mkdtemp(prefix='chrome-err-')
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--remote-debugging-port=9230',
        f'--user-data-dir={user_data}',
        '--no-first-run',
        'http://localhost:8080/'
    ])
    await asyncio.sleep(2)
    try:
        tabs_resp = urllib.request.urlopen('http://127.0.0.1:9230/json/list', timeout=5)
        tabs = json.loads(tabs_resp.read().decode('utf-8'))
        page_tab = next(t for t in tabs if t.get('type') == 'page')
        async with websockets.connect(page_tab['webSocketDebuggerUrl']) as ws:
            async def eval_js(expr):
                await ws.send(json.dumps({'id': 1, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True}}))
                r = json.loads(await ws.recv())
                return r
            
            res = await eval_js("""(() => {
                const results = {
                    cardsCount: document.querySelectorAll('#menuGrid .dish-card').length,
                    hasApplyLang: typeof window.applyLanguage === 'function',
                    hasEngine: typeof window.engine !== 'undefined',
                    allDishesLen: window.engine ? window.engine.getAllDishesList().length : 0,
                    activeBannerKey: window.engine ? window.engine.getActiveBannerKey() : null,
                    featuredDish: document.getElementById('featuredName')?.textContent,
                    featuredPrice: document.getElementById('featuredPrice')?.textContent,
                    menuStatus: document.getElementById('menuStatus')?.textContent
                };
                return results;
            })()""")
            print(json.dumps(res, indent=2, ensure_ascii=False))
    finally:
        proc.terminate()
        proc.wait()

asyncio.run(check())
