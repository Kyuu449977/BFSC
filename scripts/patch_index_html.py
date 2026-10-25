import re

path = 'src/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize to \n
content = content.replace('\r\n', '\n')

# 1. Update resultModalEyebrow
old_eyebrow = '<span class="eyebrow">BỮA NGON ĐANG CHỜ</span>'
new_eyebrow = '<span class="eyebrow" id="resultModalEyebrow">BỮA NGON ĐANG CHỜ</span>'
assert old_eyebrow in content, 'old_eyebrow not found'
content = content.replace(old_eyebrow, new_eyebrow, 1)

# 2. Update result-actions
old_actions = """      <div class="actions result-actions">
        <button id="rerollBtn" class="primary"><span data-icon="rotate-ccw"></span>Chọn lại</button
        ><button data-close>Xong<span data-icon="check"></span></button>
      </div>"""
new_actions = """      <div class="actions result-actions">
        <button id="rerollBtn" type="button" class="result-action-btn result-reroll-btn">
          <span data-icon="rotate-ccw"></span>
          <span>Chọn lại</span>
        </button>
        <button id="resultDoneBtn" type="button" class="primary-button result-action-btn result-done-btn" data-close>
          <span>Xong</span>
          <span data-icon="check"></span>
        </button>
      </div>"""
assert old_actions in content, 'old_actions not found'
content = content.replace(old_actions, new_actions, 1)

# 3. Remove timezone block from themeDialog
old_tz_block = """      <div class="theme-settings">
        <h3 id="timezoneTitle">Múi giờ khu vực</h3>
        <div class="timezone-select-wrap">
          <select id="timezoneSelect" class="timezone-select" aria-labelledby="timezoneTitle">
            <option value="auto">🌐 Tự động (Theo thiết bị)</option>
            <option value="Asia/Ho_Chi_Minh">🇻🇳 Việt Nam (Hà Nội, TP.HCM · GMT+7)</option>
            <option value="Asia/Tokyo">🇯🇵 Nhật Bản / Hàn Quốc (Tokyo, Seoul · GMT+9)</option>
            <option value="Asia/Bangkok">🇹🇭 Thái Lan (Bangkok · GMT+7)</option>
            <option value="Asia/Singapore">🇸🇬 Singapore / Malaysia (GMT+8)</option>
            <option value="Europe/London">🇬🇧 Anh / Tây Âu (London · GMT+0/+1)</option>
            <option value="Europe/Paris">🇫🇷 Pháp / Trung Âu (Paris, Berlin · GMT+1/+2)</option>
            <option value="America/New_York">🇺🇸 Mỹ - Bờ Đông (New York · GMT-5/-4)</option>
            <option value="America/Los_Angeles">🇺🇸 Mỹ - Bờ Tây (California · GMT-8/-7)</option>
            <option value="Australia/Sydney">🇦🇺 Úc (Sydney · GMT+10/+11)</option>
          </select>
        </div>
        <div id="timezoneClock" class="timezone-clock" aria-live="polite"></div>
      </div>\n"""
assert old_tz_block in content, 'old_tz_block not found'
content = content.replace(old_tz_block, '', 1)

with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("Successfully updated src/index.html")
