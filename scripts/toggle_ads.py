"""Utility to toggle advertising scripts and banners on or off.

Usage:
  python scripts/toggle_ads.py disable   # Turn off ads for local testing
  python scripts/toggle_ads.py enable    # Restore ads before production push
"""
import sys
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = ROOT / 'src' / 'index.html'
SPONSORS_JS = ROOT / 'src' / 'js' / 'sponsors.js'
NETLIFY_TOML = ROOT / 'netlify.toml'
SERVER_PY = ROOT / 'backend' / 'server.py'
MOBILE_CSS = ROOT / 'src' / 'styles' / 'mobile-upgrade.css'

AD_DOMAINS = "https://quge5.com https://*.quge5.com https://*.monetag.com https://*.propellerads.com https://bauval.org https://*.bauval.org https://*.adsterra.com"

MONETAG_TAGS = '''    <meta name="monetag" content="3a5fa497959f6da564f92e240154c1e5" />
    <script>
      // Trì hoãn nạp Monetag: Cú bấm đầu tiên luôn sạch 100% để người dùng chọn món mượt mà
      (function () {
        var loaded = false;
        function loadMonetag() {
          if (loaded) return;
          loaded = true;
          var s = document.createElement('script');
          s.src = 'https://quge5.com/88/tag.min.js';
          s.setAttribute('data-zone', '303018');
          s.setAttribute('data-cfasync', 'false');
          s.async = true;
          document.head.appendChild(s);
        }
        function triggerAfterFirstAction() {
          window.removeEventListener('click', triggerAfterFirstAction, true);
          window.removeEventListener('touchstart', triggerAfterFirstAction, true);
          // Đợi 2.5 giây cho vòng quay món hoàn thành rồi mới nạp quảng cáo cho các lần bấm tiếp theo
          setTimeout(loadMonetag, 2500);
        }
        window.addEventListener('click', triggerAfterFirstAction, true);
        window.addEventListener('touchstart', triggerAfterFirstAction, true);
      })();
    </script>'''

AD_SHELF_HTML = '''        <!-- KỆ GỖ TRƯNG BÀY QUẢNG CÁO (THUẦN CSS - KHÔNG DÙNG ICON, GIF, ẢNH) -->
        <aside class="ad-shelf-section" aria-label="Gợi ý tài trợ">
          <span class="ad-shelf-label">GỢI Ý TÀI TRỢ</span>
          <div class="ad-shelf-unit">
            <div
              id="adsterra-banner-shelf"
              class="ad-shelf-display"
              data-ad-key="7844d453c58cc8a685769b6f72e0b7d2"
              data-ad-width="300"
              data-ad-height="250"
            ></div>
            <div class="ad-shelf-plank"></div>
            <div class="ad-shelf-brackets">
              <span class="ad-shelf-bracket"></span>
              <span class="ad-shelf-bracket"></span>
            </div>
          </div>
        </aside>'''

SPONSORS_JS_CONTENT = '''document.addEventListener('DOMContentLoaded', () => {
  const slots = [...document.querySelectorAll('[data-ad-key]')];
  const mounted = new Set();
  function mount(slot) {
    if (mounted.has(slot) || !slot.getClientRects().length || document.hidden) return;
    const key = slot.dataset.adKey;
    const width = Number(slot.dataset.adWidth), height = Number(slot.dataset.adHeight);
    if (!/^[a-f0-9]{32}$/.test(key) || ![160, 300].includes(width) || ![250, 300, 600].includes(height)) return;
    mounted.add(slot);
    observer?.unobserve(slot);
    const frame = document.createElement('iframe');
    frame.width = String(width);
    frame.height = String(height);
    frame.title = typeof UICopy !== 'undefined' ? UICopy.text('sponsored') : 'Quảng cáo';
    frame.dataset.sponsorFrame = key;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;padding:0;width:${width}px;min-height:${height}px}iframe{border:0;display:block}</style></head><body><script>window.atOptions=${JSON.stringify({ key, format: 'iframe', height, width, params: {} })};<\\/script><script src="https://bauval.org/22/${key}"><\\/script></body></html>`;
    slot.append(frame);
    slot.dataset.adMounted = 'true';
  }
  const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) mount(entry.target);
  }, { rootMargin: '200px 0px' }) : null;
  for (const slot of slots) observer ? observer.observe(slot) : mount(slot);
});
'''

def enable_ads():
    # 1. Update index.html
    html = INDEX_HTML.read_text(encoding='utf-8')
    if 'loadMonetag' not in html:
        html = html.replace('</head>', MONETAG_TAGS + '\n  </head>', 1)
    if 'ad-shelf-section' not in html:
        target = '</section>\n        </section>'
        if target in html:
            html = html.replace(target, target + '\n' + AD_SHELF_HTML, 1)
    if 'src="sponsors.js"' not in html:
        target = '<script defer src="audio.js"></script>'
        if target in html:
            html = html.replace(target, '<script defer src="sponsors.js"></script>\n    ' + target, 1)
    INDEX_HTML.write_text(html, encoding='utf-8')

    # 2. Update sponsors.js
    SPONSORS_JS.write_text(SPONSORS_JS_CONTENT, encoding='utf-8')

    # 3. Update netlify.toml CSP
    toml = NETLIFY_TOML.read_text(encoding='utf-8')
    if AD_DOMAINS not in toml:
        toml = toml.replace("https://accounts.google.com/gsi/client;", f"https://accounts.google.com/gsi/client {AD_DOMAINS};")
        toml = toml.replace("https://accounts.google.com/gsi/ https:;", f"https://accounts.google.com/gsi/ {AD_DOMAINS} https:;")
        NETLIFY_TOML.write_text(toml, encoding='utf-8')

    # 4. Update backend/server.py CSP
    server = SERVER_PY.read_text(encoding='utf-8')
    if AD_DOMAINS not in server:
        server = server.replace("https://accounts.google.com/gsi/client;", f"https://accounts.google.com/gsi/client {AD_DOMAINS};")
        server = server.replace("https://accounts.google.com/gsi/ https:;", f"https://accounts.google.com/gsi/ {AD_DOMAINS} https:;")
        SERVER_PY.write_text(server, encoding='utf-8')

    # 5. Mobile CSS
    css = MOBILE_CSS.read_text(encoding='utf-8')
    css = css.replace('.ad-shelf-section, .ad-shelf-unit, .ad-shelf-display { display: none !important; }\n', '')
    MOBILE_CSS.write_text(css, encoding='utf-8')

    print("STATUS: Ads ENABLED successfully.")

def disable_ads():
    # 1. Update index.html
    html = INDEX_HTML.read_text(encoding='utf-8')
    html = re.sub(r'\s*<script defer src="sponsors\.js"></script>', '', html)
    html = re.sub(r'\s*<meta name="monetag" content="[^"]*" />', '', html)
    html = re.sub(r'\s*<script>\s*// Trì hoãn nạp Monetag.*?</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'\s*<!-- KỆ GỖ TRƯNG BÀY QUẢNG CÁO.*?-->\s*<aside class="ad-shelf-section".*?</aside>', '', html, flags=re.DOTALL)
    INDEX_HTML.write_text(html, encoding='utf-8')

    # 2. Update sponsors.js
    SPONSORS_JS.write_text('/* Advertising disabled */\n', encoding='utf-8')

    # 3. Clean netlify.toml CSP
    toml = NETLIFY_TOML.read_text(encoding='utf-8')
    for d in AD_DOMAINS.split():
        toml = toml.replace(f' {d}', '')
    NETLIFY_TOML.write_text(toml, encoding='utf-8')

    # 4. Clean backend/server.py CSP
    server = SERVER_PY.read_text(encoding='utf-8')
    for d in AD_DOMAINS.split():
        server = server.replace(f' {d}', '')
    SERVER_PY.write_text(server, encoding='utf-8')

    # 5. Mobile CSS
    css = MOBILE_CSS.read_text(encoding='utf-8')
    if 'display: none !important;' not in css:
        css = '.ad-shelf-section, .ad-shelf-unit, .ad-shelf-display { display: none !important; }\n' + css
        MOBILE_CSS.write_text(css, encoding='utf-8')

    print("STATUS: Ads DISABLED successfully.")

if __name__ == '__main__':
    action = sys.argv[1].lower() if len(sys.argv) > 1 else 'disable'
    if action == 'enable':
        enable_ads()
    else:
        disable_ads()
