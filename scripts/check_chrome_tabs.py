import urllib.request, json, time, os, base64

# Connect to Chrome on port 9222
try:
    resp = urllib.request.urlopen('http://localhost:9222/json')
    tabs = json.loads(resp.read().decode('utf-8'))
    print(f"Found {len(tabs)} Chrome tabs.")
except Exception as e:
    print("Cannot connect to Chrome on 9222:", e)
