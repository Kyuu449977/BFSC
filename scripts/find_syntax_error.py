import asyncio, json, tempfile, subprocess, urllib.request, websockets

async def check():
    user_data = tempfile.mkdtemp(prefix='chrome-syntax-')
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--remote-debugging-port=9231',
        f'--user-data-dir={user_data}',
        '--no-first-run',
        'about:blank'
    ])
    await asyncio.sleep(2)
    try:
        tabs_resp = urllib.request.urlopen('http://127.0.0.1:9231/json/list', timeout=5)
        tabs = json.loads(tabs_resp.read().decode('utf-8'))
        page_tab = next(t for t in tabs if t.get('type') == 'page')
        async with websockets.connect(page_tab['webSocketDebuggerUrl']) as ws:
            files = [
                'theme-init.js',
                'data.js',
                'experience.js',
                'ui.js',
                'controls.js',
                'audio.js',
                'collection.js',
                'dish-preferences.js',
                'gacha.js',
                'animation.js',
                'nearby.js',
                'app.js'
            ]
            msg_id = 0
            for fname in files:
                with open('src/js/' + fname, 'r', encoding='utf-8') as f:
                    code = f.read()
                msg_id += 1
                await ws.send(json.dumps({
                    'id': msg_id,
                    'method': 'Runtime.evaluate',
                    'params': {'expression': code}
                }))
                r = json.loads(await ws.recv())
                if 'exceptionDetails' in r.get('result', {}):
                    err = r['result']['exceptionDetails']
                    print(f"[SYNTAX ERROR in {fname}]: line {err.get('lineNumber')}, col {err.get('columnNumber')}: {err.get('text')} - {err.get('exception', {}).get('description')}")
                else:
                    print(f"[OK] {fname}")
    finally:
        proc.terminate()
        proc.wait()

asyncio.run(check())
