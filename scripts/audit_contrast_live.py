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
PORT = 9410

async def run():
    user_data = tempfile.mkdtemp(prefix="chrome-audit-")
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
        ws_url = tabs[0]["webSocketDebuggerUrl"]
        
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
            await send("Runtime.enable")
            await send("Page.navigate", {"url": "http://localhost:8080"})
            await asyncio.sleep(2)

            audit_code = """
            (() => {
                function parseColor(str) {
                    if (!str) return [255, 255, 255, 1];
                    const m = str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
                    if (m) {
                        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1];
                    }
                    return [255, 255, 255, 1];
                }

                function luminance(r, g, b) {
                    const a = [r, g, b].map(v => {
                        v /= 255;
                        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                    });
                    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
                }

                function contrast(rgb1, rgb2) {
                    const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
                    const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
                    const brightest = Math.max(lum1, lum2);
                    const darkest = Math.min(lum1, lum2);
                    return (brightest + 0.05) / (darkest + 0.05);
                }

                function getEffectiveBg(el) {
                    let cur = el;
                    while (cur && cur !== document.documentElement) {
                        const style = window.getComputedStyle(cur);
                        const c = parseColor(style.backgroundColor);
                        if (c[3] > 0.05) return c;
                        cur = cur.parentElement;
                    }
                    const docStyle = window.getComputedStyle(document.body);
                    const c = parseColor(docStyle.backgroundColor);
                    if (c[3] > 0.05) return c;
                    return [255, 255, 255, 1];
                }

                const themes = ['system', 'orange', 'green', 'blue', 'rose'];
                const appearances = ['light', 'dark'];
                const periods = ['morning', 'lunch', 'dinner', 'latenight'];
                const results = [];

                const elementsToAudit = [
                    { name: 'Hero Title', sel: '.hero h2' },
                    { name: 'Hero Desc', sel: '.hero-copy p' },
                    { name: 'Hero Price', sel: '.hero-price .price' },
                    { name: 'Primary Button', sel: '#singleBtn' },
                    { name: 'Secondary Button', sel: '#tripleBtn' },
                    { name: 'Active Mode Tab', sel: '.modes button[aria-pressed="true"]' },
                    { name: 'Inactive Mode Tab', sel: '.modes button[aria-pressed="false"]' },
                    { name: 'Active Filter', sel: '.filters button[aria-pressed="true"]' },
                    { name: 'Inactive Filter', sel: '.filters button[aria-pressed="false"]' },
                    { name: 'Dish Name', sel: '.dish-card .dish-name' },
                    { name: 'Dish Price', sel: '.dish-card .price' },
                    { name: 'Active Subfilter', sel: '.drink-sub-btn[aria-pressed="true"]' },
                    { name: 'Inactive Subfilter', sel: '.drink-sub-btn' }
                ];

                for (const app of appearances) {
                    for (const th of themes) {
                        for (const per of periods) {
                            document.documentElement.dataset.appearance = app;
                            document.documentElement.dataset.theme = th;
                            document.documentElement.dataset.timePeriod = per;

                            // Check each element
                            for (const item of elementsToAudit) {
                                const el = document.querySelector(item.sel);
                                if (!el) continue;
                                const style = window.getComputedStyle(el);
                                const fg = parseColor(style.color);
                                const bg = getEffectiveBg(el);
                                const ratio = contrast(fg, bg);
                                if (ratio < 4.0) {
                                    results.push({
                                        appearance: app,
                                        theme: th,
                                        period: per,
                                        element: item.name,
                                        fg: style.color,
                                        bg: `rgba(${bg[0]},${bg[1]},${bg[2]},${bg[3]})`,
                                        ratio: Math.round(ratio * 100) / 100
                                    });
                                }
                            }
                        }
                    }
                }
                return results;
            })()
            """

            res = await send("Runtime.evaluate", {
                "expression": audit_code,
                "returnByValue": True
            })
            violations = res.get("result", {}).get("result", {}).get("value") or []
            print(f"Total Low-Contrast Violations Found: {len(violations)}")
            
            # Group violations by element and appearance
            summary = {}
            for v in violations:
                key = f"{v['element']} (Appearance: {v['appearance']})"
                if key not in summary:
                    summary[key] = []
                summary[key].append(f"theme={v['theme']}, period={v['period']}, ratio={v['ratio']}:1, fg={v['fg']}, bg={v['bg']}")
            
            for k, items in summary.items():
                print(f"\n[!] {k} ({len(items)} cases):")
                for it in items[:3]:
                    print(f"    - {it}")
                if len(items) > 3:
                    print(f"    - ... and {len(items)-3} more cases")

    finally:
        proc.kill()

if __name__ == "__main__":
    asyncio.run(run())
