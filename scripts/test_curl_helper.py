import sys, os, time, json, io, urllib.request, urllib.parse, re, subprocess
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def download_with_curl(url, temp_path):
    cmd = [
        'curl.exe', '-s', '-L', '--max-time', '15',
        '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        url, '-o', temp_path
    ]
    res = subprocess.run(cmd, capture_output=True)
    return res.returncode == 0 and os.path.exists(temp_path) and os.path.getsize(temp_path) > 1000

print("download_with_curl helper ready.")
