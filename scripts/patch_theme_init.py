with open('src/js/theme-init.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update allowed.appearance and allowed.theme
target_allowed = """  const allowed = {
    theme: ['orange', 'green', 'blue', 'rose'],
    appearance: ['light', 'dark', 'system'],"""

replacement_allowed = """  const allowed = {
    theme: ['orange', 'green', 'blue', 'rose', 'custom'],
    appearance: ['light', 'dark', 'system', 'auto'],"""

assert target_allowed in content, "target_allowed not found"
content = content.replace(target_allowed, replacement_allowed, 1)

# 2. Update dark calculation in apply()
target_dark = """    const dark =
      appearance === 'dark' ||
      (appearance === 'system' &&
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)').matches);

    const timeInfo = getTimeOfDayInfo(timezone);"""

replacement_dark = """    const timeInfo = getTimeOfDayInfo(timezone);
    const isDarkTime = Boolean(timeInfo.isLateNight || timeInfo.period === 'dinner' || (timeInfo.hour >= 18 || timeInfo.hour < 6));
    const dark =
      appearance === 'dark' ||
      (appearance === 'auto' && isDarkTime) ||
      (appearance === 'system' &&
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)').matches);"""

assert target_dark in content, "target_dark not found"
content = content.replace(target_dark, replacement_dark, 1)

# 3. Add custom color application in apply()
target_custom = """      for (const v of dynamicVars) {
        docEl.style.removeProperty(v);
      }"""

replacement_custom = """      for (const v of dynamicVars) {
        docEl.style.removeProperty(v);
      }

      if (theme === 'custom' && preferences?.customColor && /^#[0-9a-fA-F]{6}$/.test(preferences.customColor)) {
        const hex = preferences.customColor;
        const num = parseInt(hex.slice(1), 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        const hoverHex = '#' + [r, g, b].map(c => Math.max(0, Math.min(255, dark ? c + 30 : c - 35)).toString(16).padStart(2, '0')).join('');
        docEl.style.setProperty('--orange', hex);
        docEl.style.setProperty('--accent-hover', hoverHex);
        docEl.style.setProperty('--orange-soft', `rgba(${r}, ${g}, ${b}, ${dark ? 0.25 : 0.12})`);
        docEl.style.setProperty('--ambient', `rgba(${r}, ${g}, ${b}, ${dark ? 0.35 : 0.45})`);
      }"""

assert target_custom in content, "target_custom not found"
content = content.replace(target_custom, replacement_custom, 1)

with open('src/js/theme-init.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated src/js/theme-init.js successfully!")
