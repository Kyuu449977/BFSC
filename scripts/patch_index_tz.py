import os

# 1. Update src/index.html
with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_html = """        <button type="button" data-timezone-choice="Asia/Tokyo" class="tz-card" aria-pressed="false">
          <span class="tz-flag">🇯🇵</span>
          <div class="tz-info">
            <strong class="tz-city" data-tz-name="Asia/Tokyo">Nhật Bản / Hàn Quốc</strong>
            <span class="tz-desc" data-tz-sub="Asia/Tokyo">Tokyo, Seoul · GMT+9</span>
          </div>
          <span class="tz-time" data-tz-time="Asia/Tokyo">--:--</span>
        </button>"""

replacement_html = """        <button type="button" data-timezone-choice="Asia/Tokyo" class="tz-card" aria-pressed="false">
          <span class="tz-flag">🇯🇵</span>
          <div class="tz-info">
            <strong class="tz-city" data-tz-name="Asia/Tokyo">Nhật Bản</strong>
            <span class="tz-desc" data-tz-sub="Asia/Tokyo">Tokyo · GMT+9</span>
          </div>
          <span class="tz-time" data-tz-time="Asia/Tokyo">--:--</span>
        </button>
        <button type="button" data-timezone-choice="Asia/Seoul" class="tz-card" aria-pressed="false">
          <span class="tz-flag">🇰🇷</span>
          <div class="tz-info">
            <strong class="tz-city" data-tz-name="Asia/Seoul">Hàn Quốc</strong>
            <span class="tz-desc" data-tz-sub="Asia/Seoul">Seoul · GMT+9</span>
          </div>
          <span class="tz-time" data-tz-time="Asia/Seoul">--:--</span>
        </button>
        <button type="button" data-timezone-choice="Asia/Shanghai" class="tz-card" aria-pressed="false">
          <span class="tz-flag">🇨🇳</span>
          <div class="tz-info">
            <strong class="tz-city" data-tz-name="Asia/Shanghai">Trung Quốc</strong>
            <span class="tz-desc" data-tz-sub="Asia/Shanghai">Bắc Kinh, Thượng Hải · GMT+8</span>
          </div>
          <span class="tz-time" data-tz-time="Asia/Shanghai">--:--</span>
        </button>"""

if target_html in html:
    html = html.replace(target_html, replacement_html, 1)
    with open('src/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated src/index.html")
else:
    print("Target HTML not found (maybe already replaced)")
