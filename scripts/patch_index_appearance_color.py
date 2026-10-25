with open('src/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target_app = """      <div class="appearance-options" role="group" aria-labelledby="brightnessTitle">
        <button type="button" data-appearance-choice="light" aria-pressed="true">Sáng</button
        ><button type="button" data-appearance-choice="dark" aria-pressed="false">Tối</button
        ><button type="button" data-appearance-choice="system" aria-pressed="false">
          Theo thiết bị
        </button>
      </div>"""

replacement_app = """      <div class="appearance-options" role="group" aria-labelledby="brightnessTitle">
        <button type="button" data-appearance-choice="light" aria-pressed="true">Sáng</button
        ><button type="button" data-appearance-choice="dark" aria-pressed="false">Tối</button
        ><button type="button" data-appearance-choice="system" aria-pressed="false">
          Theo thiết bị
        </button
        ><button type="button" data-appearance-choice="auto" aria-pressed="false">
          Tự động (Theo giờ)
        </button>
      </div>"""

assert target_app in content, "target_app not found"
content = content.replace(target_app, replacement_app, 1)

target_color = """          ><button type="button" data-theme-choice="rose" aria-pressed="false">
            <span class="theme-dot" aria-hidden="true"></span>Hồng mận
          </button>
        </div>
      </div>"""

replacement_color = """          ><button type="button" data-theme-choice="rose" aria-pressed="false">
            <span class="theme-dot" aria-hidden="true"></span>Hồng mận
          </button>
        </div>
        <div class="custom-color-picker-wrap">
          <label for="customThemeColor" class="custom-color-label">
            <span class="custom-color-preview" id="customColorPreview"></span>
            <input type="color" id="customThemeColor" value="#ff7733" aria-label="Tự chọn màu sắc giao diện" />
            <span id="customColorText">Tự chọn màu</span>
          </label>
        </div>
      </div>"""

assert target_color in content, "target_color not found"
content = content.replace(target_color, replacement_color, 1)

with open('src/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated src/index.html with auto appearance and color picker successfully!")
