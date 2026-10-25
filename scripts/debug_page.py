import asyncio, json, tempfile, subprocess, urllib.request, websockets

async def debug():
    user_data = tempfile.mkdtemp(prefix='chrome-debug-')
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--remote-debugging-port=9229',
        f'--user-data-dir={user_data}',
        '--no-first-run',
        'http://localhost:8080/'
    ])
    await asyncio.sleep(2)
    try:
        tabs_resp = urllib.request.urlopen('http://127.0.0.1:9229/json/list', timeout=5)
        tabs = json.loads(tabs_resp.read().decode('utf-8'))
        page_tab = next(t for t in tabs if t.get('type') == 'page')
        async with websockets.connect(page_tab['webSocketDebuggerUrl']) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Runtime.enable'}))
            await ws.recv()
            await ws.send(json.dumps({'id': 2, 'method': 'Log.enable'}))
            await ws.recv()
            await ws.send(json.dumps({'id': 3, 'method': 'Page.reload'}))
            
            # Read messages for 2 seconds
            for _ in range(25):
                msg = json.loads(await ws.recv())
                m = msg.get('method')
                if m in ['Runtime.exceptionThrown', 'Log.entryAdded', 'Runtime.consoleAPICalled']:
                    print(m, ':', json.dumps(msg.get('params'), ensure_ascii=False))
    finally:
        proc.terminate()
        proc.wait()

asyncio.run(debug())
