with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Scope morning and lunch to data-appearance='light'
target_morning = ":root[data-theme='orange'][data-time-period='morning']"
replacement_morning = ":root:not([data-appearance='dark'])[data-theme='orange'][data-time-period='morning']"
css = css.replace(target_morning, replacement_morning)

target_lunch = ":root[data-theme='orange'][data-time-period='lunch']"
replacement_lunch = ":root:not([data-appearance='dark'])[data-theme='orange'][data-time-period='lunch']"
css = css.replace(target_lunch, replacement_lunch)

target_afternoon = ":root[data-theme='orange'][data-time-period='afternoon']"
replacement_afternoon = ":root:not([data-appearance='dark'])[data-theme='orange'][data-time-period='afternoon']"
css = css.replace(target_afternoon, replacement_afternoon)

# 2. Scope dinner and latenight to data-appearance='dark'
target_dinner = ":root[data-theme='orange'][data-time-period='dinner']"
replacement_dinner = ":root[data-appearance='dark'][data-theme='orange'][data-time-period='dinner']"
css = css.replace(target_dinner, replacement_dinner)

target_latenight = ":root[data-theme='orange'][data-time-period='latenight']"
replacement_latenight = ":root[data-appearance='dark'][data-theme='orange'][data-time-period='latenight']"
css = css.replace(target_latenight, replacement_latenight)

# 3. Add custom color picker styles
custom_picker_css = """
/* Custom Color Picker in Theme Dialog */
.custom-color-picker-wrap {
  margin-top: 12px;
  padding: 8px 14px;
  background: var(--orange-soft, rgba(0, 0, 0, 0.04));
  border: 1px dashed var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.custom-color-picker-wrap:hover {
  border-color: var(--orange);
}
.custom-color-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  width: 100%;
  color: var(--ink);
}
.custom-color-preview {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1.5px var(--border), 0 2px 6px rgba(0, 0, 0, 0.15);
  background-color: var(--orange);
  flex-shrink: 0;
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.custom-color-label:hover .custom-color-preview {
  transform: scale(1.12);
}
#customThemeColor {
  cursor: pointer;
  border: none;
  background: none;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
}
"""
css += custom_picker_css

with open('src/styles/themes.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated src/styles/themes.css successfully!")
