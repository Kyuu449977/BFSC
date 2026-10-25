import urllib.request
import json

req = urllib.request.urlopen("http://127.0.0.1:9337/json")
tabs = json.loads(req.read().decode())
for t in tabs:
    print(t.get("type"), t.get("url"))
