import asyncio
import json
import os
import sys
import tempfile
import urllib.request
import websockets
import subprocess
import time

sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
port = 9333
user_data = tempfile.mkdtemp(prefix="chrome-test-")

print(f"Launching Chrome on port {port}...")
proc = subprocess.Popen([
    CHROME_PATH,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data}",
    "about:blank"
])

for i in range(10):
    time.sleep(0.5)
    try:
        req = urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version")
        data = json.loads(req.read().decode())
        print("Connected to Chrome:", data.get("Browser"))
        break
    except Exception as e:
        print(f"Attempt {i+1} failed: {e}")

proc.terminate()
