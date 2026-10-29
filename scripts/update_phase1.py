import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add mapsHeaderBtn right after themeBtn
theme_btn = """          <button
            id="themeBtn"
            class="icon-button"
            aria-label="Đổi giao diện"
            title="Đổi giao diện"
            aria-haspopup="dialog"
          >
            <span data-icon="sparkles"></span>
          </button>"""

maps_btn = """          <button
            id="themeBtn"
            class="icon-button"
            aria-label="Đổi giao diện"
            title="Đổi giao diện"
            aria-haspopup="dialog"
          >
            <span data-icon="sparkles"></span>
          </button>
          <button
            id="mapsHeaderBtn"
            class="icon-button"
            aria-label="Tìm quán trên Google Maps"
            title="Tìm quán ăn gần bạn trên Google Maps"
          >
            <span data-icon="map-pin"></span>
          </button>"""

assert theme_btn in html, "theme_btn not found"
html = html.replace(theme_btn, maps_btn)

# 2. Remove maps-callout
callout = """        <a class="maps-callout" href="#home" aria-label="Về phần gợi ý để chọn món và tìm quán"
          ><span class="callout-icon"><span data-icon="map-pin"></span></span>
          <div>
            <strong>Thấy món ngon? Tìm ngay quán gần bạn.</strong>
            <p>Chọn món rồi mở Google Maps để xem địa chỉ, đánh giá và thực đơn của quán.</p>
          </div>
          <span data-icon="arrow-up-right"></span
        ></a>"""

assert callout in html, "callout not found"
html = html.replace(callout, "")

with open('src/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Phase 1: Updated src/index.html successfully!")
