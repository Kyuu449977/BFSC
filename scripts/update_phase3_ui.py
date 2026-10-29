import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update CSS in src/styles/interactions.css
with open('src/styles/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

add_dish_css = """
/* ==========================================================================
   Add Custom Dish Form & UI
   ========================================================================== */
.menu-top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.add-dish-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 6px 16px;
  border-radius: 10px;
  background: var(--surface-card, #232830);
  border: 1px solid var(--accent, #f26419);
  color: var(--accent, #f26419);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.add-dish-btn:hover {
  background: var(--accent, #f26419);
  color: #fff;
  transform: translateY(-1px);
}

.add-dish-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 0 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink, #fff);
}

.form-group .required {
  color: #e55353;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--surface, #14171c);
  border: 1px solid var(--border, #333a44);
  color: var(--ink, #fff);
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input[type='file'] {
  font-size: 13px;
  color: var(--muted, #9aa5b1);
}

.image-preview-box {
  position: relative;
  width: 100%;
  max-width: 240px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border, #333a44);
  margin-top: 6px;
}

.image-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-img {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
"""

if ".add-dish-btn" not in css:
    with open('src/styles/interactions.css', 'a', encoding='utf-8') as f:
        f.write(add_dish_css)
    print("Added Add Custom Dish CSS to src/styles/interactions.css")

# 2. Update src/index.html to include addDishBtn and addDishDialog
with open('src/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add addDishBtn right above search-wrap
search_wrap = """          <div class="search-wrap">"""
new_search_wrap = """          <div class="menu-top-bar">
            <button id="addDishBtn" class="add-dish-btn" type="button" title="Đóng góp món ăn mới vào thực đơn">
              <span data-icon="plus-circle"></span><span>Thêm món mới</span>
            </button>
          </div>
          <div class="search-wrap">"""

if "id=\"addDishBtn\"" not in html:
    assert search_wrap in html, "search_wrap not found in html"
    html = html.replace(search_wrap, new_search_wrap, 1)

# Add addDishDialog right after customWheelDialog
dialog_target = """    <dialog id="shareDialog" class="compact-dialog" aria-labelledby="shareTitle">"""
add_dish_dialog = """    <dialog id="addDishDialog" class="compact-dialog" aria-labelledby="addDishTitle">
      <div class="dialog-heading">
        <div>
          <span class="eyebrow">ĐÓNG GÓP THỰC ĐƠN</span>
          <h2 id="addDishTitle">Thêm món mới của bạn</h2>
        </div>
        <button class="icon-button" data-close aria-label="Đóng thêm món">
          <span data-icon="x"></span>
        </button>
      </div>
      <form id="addDishForm" class="add-dish-form">
        <div class="form-group">
          <label for="customDishName">Tên món ăn / thức uống <span class="required">*</span></label>
          <input id="customDishName" type="text" required placeholder="Ví dụ: Bánh mì chảo xíu mại, Trà đào cam sả..." />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="customDishMeal">Bữa ăn / Danh mục</label>
            <select id="customDishMeal">
              <option value="morning">Buổi Sáng</option>
              <option value="lunch">Buổi Trưa</option>
              <option value="afternoon">Buổi Chiều</option>
              <option value="dinner">Buổi Tối</option>
              <option value="snacks">Món Ăn Vặt</option>
              <option value="drinks">Đồ Uống & Nước Ngọt</option>
            </select>
          </div>
          <div class="form-group">
            <label for="customDishPrice">Giá tiền tham khảo (đ)</label>
            <input id="customDishPrice" type="number" min="0" step="1000" placeholder="Ví dụ: 35000" />
          </div>
        </div>
        <div class="form-group">
          <label for="customDishDesc">Mô tả hương vị / Ghi chú</label>
          <textarea id="customDishDesc" rows="2" placeholder="Ví dụ: Nước dùng thanh ngọt, thịt bò xào lăn dậy mùi tỏi..."></textarea>
        </div>
        <div class="form-group">
          <label for="customDishImageInput">Hình ảnh món ăn (Tải từ máy hoặc chụp)</label>
          <input id="customDishImageInput" type="file" accept="image/*" />
          <div id="customDishImagePreview" class="image-preview-box" hidden>
            <img id="customDishPreviewImg" src="" alt="Xem trước ảnh món ăn" />
            <button id="customDishRemoveImgBtn" type="button" class="btn-remove-img">&times; Xóa ảnh</button>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-subtle" data-close>Hủy</button>
          <button id="submitCustomDishBtn" type="submit" class="primary-button">
            <span data-icon="check"></span>Lưu món vào thực đơn
          </button>
        </div>
      </form>
    </dialog>
    <dialog id="shareDialog" class="compact-dialog" aria-labelledby="shareTitle">"""

if "id=\"addDishDialog\"" not in html:
    assert dialog_target in html, "dialog_target not found in html"
    html = html.replace(dialog_target, add_dish_dialog, 1)

with open('src/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated src/index.html with addDishBtn & addDishDialog successfully!")
