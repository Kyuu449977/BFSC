import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add customWheelBtn next to comboBtn
target_actions = """              ><button id="comboBtn" aria-describedby="comboHelp">
                <span data-icon="sparkles"></span>Tạo combo
              </button>"""

new_actions = """              ><button id="comboBtn" aria-describedby="comboHelp">
                <span data-icon="sparkles"></span>Tạo combo
              </button>
              <button id="customWheelBtn" class="custom-wheel-btn" type="button" title="Tự tạo danh sách món và quay ngẫu nhiên">
                <span data-icon="sliders"></span>Vòng quay tự chọn
              </button>"""

assert target_actions in html, "target_actions not found in html"
html = html.replace(target_actions, new_actions)

# 2. Add customWheelDialog right before shareDialog
target_dialog = """    <dialog id="shareDialog" class="compact-dialog" aria-labelledby="shareTitle">"""

custom_wheel_dialog = """    <dialog id="customWheelDialog" class="compact-dialog" aria-labelledby="customWheelTitle">
      <div class="dialog-heading">
        <div>
          <span class="eyebrow">TÙY CHỈNH THEO Ý BẠN</span>
          <h2 id="customWheelTitle">Vòng quay tự chọn</h2>
        </div>
        <button class="icon-button" data-close aria-label="Đóng vòng quay tự chọn">
          <span data-icon="x"></span>
        </button>
      </div>
      <div class="custom-wheel-content">
        <p class="custom-wheel-desc">Nhập danh sách món bạn muốn random (mỗi món 1 dòng), hoặc chọn nhanh từ menu web:</p>
        <div class="custom-wheel-input-area">
          <textarea id="customWheelInput" rows="5" placeholder="Ví dụ:&#10;Cơm tấm sườn bì chả&#10;Phở bò tái lăn&#10;Bún đậu mắm tôm&#10;Trà sữa trân châu&#10;Ăn mì gói ở nhà"></textarea>
        </div>
        <div class="custom-wheel-quick-actions">
          <button id="customWheelAddRandomBtn" type="button" class="btn-subtle">
            <span data-icon="plus"></span>+3 Món từ web
          </button>
          <button id="customWheelClearBtn" type="button" class="btn-subtle">
            <span data-icon="trash-2"></span>Xóa hết
          </button>
        </div>
        <div class="custom-wheel-count-info">
          <span id="customWheelCount">5 món trong danh sách</span>
        </div>
        <button id="customWheelSpinActionBtn" type="button" class="primary-button custom-wheel-spin-action">
          <span data-icon="shuffle"></span>Bắt đầu quay ngay!
        </button>
      </div>
    </dialog>
    <dialog id="shareDialog" class="compact-dialog" aria-labelledby="shareTitle">"""

assert target_dialog in html, "target_dialog not found in html"
html = html.replace(target_dialog, custom_wheel_dialog)

with open('src/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Added customWheelBtn & customWheelDialog to src/index.html successfully!")
