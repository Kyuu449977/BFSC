import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''        <div class="custom-wheel-quick-actions">
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
    </dialog>'''

replacement = '''        <div class="custom-wheel-quick-actions">
          <button id="customWheelUniverseBtn" type="button" class="btn-subtle custom-wheel-universe-btn" title="Chọn bất kỳ món nào từ thực đơn của web để thêm vào vòng quay">
            <span data-icon="sparkles"></span>+ Món từ Vũ Trụ
          </button>
          <button id="customWheelClearBtn" type="button" class="btn-subtle">
            <span data-icon="trash-2"></span>Xóa hết
          </button>
        </div>
        <div class="custom-wheel-count-info">
          <span id="customWheelCount">0 món trong danh sách</span>
        </div>
        <div id="customWheelAlert" class="custom-wheel-alert" role="alert" hidden>
          <span data-icon="alert-circle"></span>
          <span id="customWheelAlertText">Vui lòng nhập ít nhất 2 món vào danh sách để quay nhé!</span>
        </div>
        <button id="customWheelSpinActionBtn" type="button" class="primary-button custom-wheel-spin-action">
          <span data-icon="shuffle"></span>Bắt đầu quay ngay!
        </button>
      </div>
    </dialog>
    <!-- Universe Dish Picker Dialog -->
    <dialog id="universeDishDialog" class="universe-dish-dialog" aria-labelledby="universeDishTitle">
      <div class="dialog-heading">
        <div>
          <span class="eyebrow">KHO TÀNG MÓN NGON</span>
          <h2 id="universeDishTitle">✨ Chọn Món từ Vũ Trụ</h2>
        </div>
        <button class="icon-button" data-close aria-label="Đóng chọn món vũ trụ">
          <span data-icon="x"></span>
        </button>
      </div>
      <div class="universe-dialog-body">
        <div class="universe-search-bar">
          <span data-icon="search" class="universe-search-icon"></span>
          <input type="text" id="universeDishSearch" placeholder="Tìm món ăn, đồ uống yêu thích..." />
        </div>
        <div class="universe-category-tabs" role="tablist">
          <button type="button" class="universe-tab active" data-category="all">Tất cả (<span id="universeCountAll">0</span>)</button>
          <button type="button" class="universe-tab" data-category="main">Món Chính</button>
          <button type="button" class="universe-tab" data-category="snacks">Món Ăn Vặt</button>
          <button type="button" class="universe-tab" data-category="drinks">Đồ Uống</button>
        </div>
        <div class="universe-quick-select">
          <div>
            <button type="button" id="universeSelectAllBtn" class="universe-link-btn">Chọn tất cả</button>
            <span class="universe-divider">·</span>
            <button type="button" id="universeDeselectAllBtn" class="universe-link-btn">Bỏ chọn</button>
          </div>
          <span id="universeSelectedBadge" class="universe-selected-badge">Đã chọn: 0 món</span>
        </div>
        <div id="universeDishList" class="universe-dish-list">
          <!-- Populated dynamically by app.js -->
        </div>
      </div>
      <div class="universe-dialog-footer">
        <button type="button" class="btn-subtle" data-close>Hủy</button>
        <button type="button" id="universeConfirmBtn" class="primary-button">
          <span data-icon="plus"></span>Thêm vào vòng quay (<span id="universeConfirmCount">0</span>)
        </button>
      </div>
    </dialog>'''

c_norm = content.replace('\r\n', '\n')
t_norm = target.replace('\r\n', '\n')
assert t_norm in c_norm, 'Target not found in src/index.html'
new_c = c_norm.replace(t_norm, replacement)
if '\r\n' in content:
    new_c = new_c.replace('\n', '\r\n')

with open(r'src/index.html', 'w', encoding='utf-8') as f:
    f.write(new_c)
print('Successfully updated src/index.html with Universe Dish Dialog & Alert!')
