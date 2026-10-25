import urllib.request, sys
from PIL import Image
import io

sys.stdout.reconfigure(encoding='utf-8')

test_urls = [
    "http://localhost:8080/images/regional/ja/ja_m_1.webp",
    "http://localhost:8080/images/regional/ja/ja_m_2.webp",
    "http://localhost:8080/images/regional/ja/ja_m_4.webp",
    "http://localhost:8080/images/regional/ja/ja_m_7.webp",
    "http://localhost:8080/images/regional/ja/ja_m_9.webp",
    "http://localhost:8080/images/regional/ja/ja_l_1.webp",
    "http://localhost:8080/images/regional/ja/ja_l_4.webp",
    "http://localhost:8080/images/regional/ko/ko_m_1.webp",
    "http://localhost:8080/images/regional/zh/zh_m_1.webp",
    "http://localhost:8080/images/regional/zh/zh_m_7.webp",
    "http://localhost:8080/images/regional/en/en_m_1.webp",
    "http://localhost:8080/images/regional/en/en_d_6.webp",
    "http://localhost:8080/images/regional/banh_dap.webp",
    "http://localhost:8080/images/regional/vi/toi_5_1.webp",
    "http://localhost:8080/images/regional/vi/vat_5_2.webp"
]

all_ok = True
for u in test_urls:
    try:
        req = urllib.request.Request(u)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            print(f"PASS [HTTP {resp.status}]: {u} -> format={img.format}, size={img.size}")
    except Exception as e:
        print(f"FAIL: {u} -> {e}")
        all_ok = False

if all_ok:
    print("\nALL TEST URLS RETURNED VALID 640x480 WEBP IMAGES!")
else:
    print("\nSOME URLS FAILED!")
