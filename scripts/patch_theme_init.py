with open('src/js/theme-init.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_start = "    // Reset any previously set inline styles to let CSS rules cascade cleanly"
target_end = "      }\n    }\n\n    const meta = document.querySelector('meta[name=\"theme-color\"]');"
if target_end not in content:
    target_end = "      }\r\n    }\r\n\r\n    const meta = document.querySelector('meta[name=\"theme-color\"]');"

replacement = """    // Reset any previously set inline styles to let CSS rules cascade cleanly
    if (docEl.style) {
      const dynamicVars = [
        '--orange',
        '--accent-hover',
        '--orange-soft',
        '--border',
        '--cream',
        '--card-bg',
        '--surface',
        '--surface-card',
        '--surface-hover',
        '--hero-surface',
        '--ink',
        '--muted',
        '--ambient',
        '--primary-ink',
      ];
      for (const v of dynamicVars) {
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
        docEl.style.setProperty('--orange-soft', `rgba(${r}, ${g}, ${b}, ${dark ? 0.25 : 0.14})`);
        docEl.style.setProperty('--ambient', `rgba(${r}, ${g}, ${b}, ${dark ? 0.35 : 0.45})`);
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        docEl.style.setProperty('--primary-ink', lum > 0.5 ? '#0f172a' : '#ffffff');
        if (!dark) {
          docEl.style.setProperty('--card-bg', '#ffffff');
          docEl.style.setProperty('--surface', '#f8fafc');
          docEl.style.setProperty('--surface-card', '#ffffff');
          docEl.style.setProperty('--surface-hover', '#f1f5f9');
          docEl.style.setProperty('--hero-surface', '#ffffff');
          docEl.style.setProperty('--ink', '#0f172a');
          docEl.style.setProperty('--muted', '#475569');
        } else {
          docEl.style.setProperty('--card-bg', '#1e2532');
          docEl.style.setProperty('--surface', '#171d28');
          docEl.style.setProperty('--surface-card', '#1e2532');
          docEl.style.setProperty('--surface-hover', '#293344');
          docEl.style.setProperty('--hero-surface', '#1e2532');
          docEl.style.setProperty('--ink', '#f8fafc');
          docEl.style.setProperty('--muted', '#94a9c4');
        }
      }

      // Smooth color transitions for default theme (system & orange)
      if (theme === 'system' || theme === 'orange') {
        if (!dark) {
          // LIGHT MODE: Text is always high-contrast dark slate, surfaces are light and clean
          docEl.style.setProperty('--card-bg', '#ffffff');
          docEl.style.setProperty('--surface', '#f8fafc');
          docEl.style.setProperty('--surface-card', '#ffffff');
          docEl.style.setProperty('--surface-hover', '#f1f5f9');
          docEl.style.setProperty('--hero-surface', '#ffffff');
          docEl.style.setProperty('--ink', '#0f172a');
          docEl.style.setProperty('--muted', '#475569');
          docEl.style.setProperty('--primary-ink', '#ffffff');

          if (timeInfo.period === 'morning') {
            docEl.style.setProperty('--cream', '#fffdf5');
            docEl.style.setProperty('--orange', '#b45309');
            docEl.style.setProperty('--accent-hover', '#92400e');
            docEl.style.setProperty('--orange-soft', '#fef3c7');
            docEl.style.setProperty('--border', '#fed7aa');
            docEl.style.setProperty('--ambient', 'rgba(217, 119, 6, 0.25)');
          } else if (timeInfo.period === 'lunch' || timeInfo.period === 'afternoon') {
            docEl.style.setProperty('--cream', '#fffaf5');
            docEl.style.setProperty('--orange', '#c2410c');
            docEl.style.setProperty('--accent-hover', '#9a3412');
            docEl.style.setProperty('--orange-soft', '#ffedd5');
            docEl.style.setProperty('--border', '#fdba74');
            docEl.style.setProperty('--ambient', 'rgba(234, 88, 12, 0.22)');
          } else if (timeInfo.period === 'dinner') {
            docEl.style.setProperty('--cream', '#f8fafc');
            docEl.style.setProperty('--orange', '#0284c7');
            docEl.style.setProperty('--accent-hover', '#0369a1');
            docEl.style.setProperty('--orange-soft', '#e0f2fe');
            docEl.style.setProperty('--border', '#bae6fd');
            docEl.style.setProperty('--ambient', 'rgba(2, 132, 199, 0.2)');
          } else {
            // latenight
            docEl.style.setProperty('--cream', '#f8fafc');
            docEl.style.setProperty('--orange', '#2563eb');
            docEl.style.setProperty('--accent-hover', '#1d4ed8');
            docEl.style.setProperty('--orange-soft', '#eff6ff');
            docEl.style.setProperty('--border', '#bfdbfe');
            docEl.style.setProperty('--ambient', 'rgba(37, 99, 235, 0.2)');
          }
        } else {
          // DARK MODE: Text is crisp light, surfaces are deep midnight navy
          docEl.style.setProperty('--ink', '#f8fafc');
          docEl.style.setProperty('--muted', '#94a9c4');
          docEl.style.setProperty('--primary-ink', '#0b1320');

          if (timeInfo.period === 'dinner' || timeInfo.period === 'latenight') {
            const startBg = [20, 35, 58];
            const endBg = [11, 20, 35];
            const bg = lerpColor(startBg, endBg, timeInfo.progress);
            docEl.style.setProperty('--cream', bg);
            docEl.style.setProperty('--card-bg', '#132238');
            docEl.style.setProperty('--surface', '#0f1c2e');
            docEl.style.setProperty('--surface-card', '#132238');
            docEl.style.setProperty('--surface-hover', '#1d3352');
            docEl.style.setProperty('--hero-surface', '#132238');
            docEl.style.setProperty('--orange', '#38bdf8');
            docEl.style.setProperty('--accent-hover', '#7dd3fc');
            docEl.style.setProperty('--orange-soft', 'rgba(56, 189, 248, 0.16)');
            docEl.style.setProperty('--border', '#1e3555');
            docEl.style.setProperty('--ambient', 'rgba(56, 189, 248, 0.2)');
          } else {
            // Day time but dark mode forced by user
            docEl.style.setProperty('--cream', '#141922');
            docEl.style.setProperty('--card-bg', '#1e2532');
            docEl.style.setProperty('--surface', '#171d28');
            docEl.style.setProperty('--surface-card', '#1e2532');
            docEl.style.setProperty('--surface-hover', '#293344');
            docEl.style.setProperty('--hero-surface', '#1e2532');
            docEl.style.setProperty('--orange', '#fb923c');
            docEl.style.setProperty('--accent-hover', '#fdba74');
            docEl.style.setProperty('--orange-soft', 'rgba(251, 146, 60, 0.18)');
            docEl.style.setProperty('--border', '#3b4554');
            docEl.style.setProperty('--ambient', 'rgba(251, 146, 60, 0.2)');
          }
        }
      } else if (theme === 'green') {
        if (!dark) {
          docEl.style.setProperty('--cream', '#f4fbf6');
          docEl.style.setProperty('--card-bg', '#ffffff');
          docEl.style.setProperty('--surface', '#f0f9f3');
          docEl.style.setProperty('--surface-card', '#ffffff');
          docEl.style.setProperty('--surface-hover', '#e7f5ec');
          docEl.style.setProperty('--hero-surface', '#ffffff');
          docEl.style.setProperty('--ink', '#0f2918');
          docEl.style.setProperty('--muted', '#37533f');
          docEl.style.setProperty('--orange', '#15803d');
          docEl.style.setProperty('--accent-hover', '#166534');
          docEl.style.setProperty('--orange-soft', '#dcfce7');
          docEl.style.setProperty('--border', '#bbf7d0');
          docEl.style.setProperty('--primary-ink', '#ffffff');
        } else {
          docEl.style.setProperty('--cream', '#0c1a12');
          docEl.style.setProperty('--card-bg', '#14291e');
          docEl.style.setProperty('--surface', '#0f2017');
          docEl.style.setProperty('--surface-card', '#14291e');
          docEl.style.setProperty('--surface-hover', '#1c3b2b');
          docEl.style.setProperty('--hero-surface', '#14291e');
          docEl.style.setProperty('--ink', '#ecfdf5');
          docEl.style.setProperty('--muted', '#9dd8b7');
          docEl.style.setProperty('--orange', '#4ade80');
          docEl.style.setProperty('--accent-hover', '#86efac');
          docEl.style.setProperty('--orange-soft', 'rgba(74, 222, 128, 0.18)');
          docEl.style.setProperty('--border', '#224231');
          docEl.style.setProperty('--primary-ink', '#052e16');
        }
      } else if (theme === 'blue') {
        if (!dark) {
          docEl.style.setProperty('--cream', '#f0f7ff');
          docEl.style.setProperty('--card-bg', '#ffffff');
          docEl.style.setProperty('--surface', '#eaf3ff');
          docEl.style.setProperty('--surface-card', '#ffffff');
          docEl.style.setProperty('--surface-hover', '#e0edff');
          docEl.style.setProperty('--hero-surface', '#ffffff');
          docEl.style.setProperty('--ink', '#0c1e3d');
          docEl.style.setProperty('--muted', '#334e68');
          docEl.style.setProperty('--orange', '#1d4ed8');
          docEl.style.setProperty('--accent-hover', '#1e40af');
          docEl.style.setProperty('--orange-soft', '#dbeafe');
          docEl.style.setProperty('--border', '#bfdbfe');
          docEl.style.setProperty('--primary-ink', '#ffffff');
        } else {
          docEl.style.setProperty('--cream', '#091526');
          docEl.style.setProperty('--card-bg', '#12233c');
          docEl.style.setProperty('--surface', '#0d1c31');
          docEl.style.setProperty('--surface-card', '#12233c');
          docEl.style.setProperty('--surface-hover', '#1a3356');
          docEl.style.setProperty('--hero-surface', '#12233c');
          docEl.style.setProperty('--ink', '#f0f9ff');
          docEl.style.setProperty('--muted', '#93c5fd');
          docEl.style.setProperty('--orange', '#38bdf8');
          docEl.style.setProperty('--accent-hover', '#7dd3fc');
          docEl.style.setProperty('--orange-soft', 'rgba(56, 189, 248, 0.18)');
          docEl.style.setProperty('--border', '#1e385c');
          docEl.style.setProperty('--primary-ink', '#082f49');
        }
      } else if (theme === 'rose') {
        if (!dark) {
          docEl.style.setProperty('--cream', '#fff1f2');
          docEl.style.setProperty('--card-bg', '#ffffff');
          docEl.style.setProperty('--surface', '#ffebee');
          docEl.style.setProperty('--surface-card', '#ffffff');
          docEl.style.setProperty('--surface-hover', '#ffe4e8');
          docEl.style.setProperty('--hero-surface', '#ffffff');
          docEl.style.setProperty('--ink', '#3b0d1a');
          docEl.style.setProperty('--muted', '#6e273a');
          docEl.style.setProperty('--orange', '#be123c');
          docEl.style.setProperty('--accent-hover', '#9f1239');
          docEl.style.setProperty('--orange-soft', '#ffe4e6');
          docEl.style.setProperty('--border', '#fecdd3');
          docEl.style.setProperty('--primary-ink', '#ffffff');
        } else {
          docEl.style.setProperty('--cream', '#1c0b14');
          docEl.style.setProperty('--card-bg', '#2b1321');
          docEl.style.setProperty('--surface', '#220e1a');
          docEl.style.setProperty('--surface-card', '#2b1321');
          docEl.style.setProperty('--surface-hover', '#3c1a2e');
          docEl.style.setProperty('--hero-surface', '#2b1321');
          docEl.style.setProperty('--ink', '#fff1f2');
          docEl.style.setProperty('--muted', '#fbcfe8');
          docEl.style.setProperty('--orange', '#f472b6');
          docEl.style.setProperty('--accent-hover', '#f9a8d4');
          docEl.style.setProperty('--orange-soft', 'rgba(244, 114, 182, 0.18)');
          docEl.style.setProperty('--border', '#441e34');
          docEl.style.setProperty('--primary-ink', '#500724');
        }
      }
    }

    const meta = document.querySelector('meta[name="theme-color"]');"""

start_pos = content.find(target_start)
end_pos = content.find("    const meta = document.querySelector('meta[name=\"theme-color\"]');")

if start_pos != -1 and end_pos != -1:
    new_content = content[:start_pos] + replacement + content[end_pos + len("    const meta = document.querySelector('meta[name=\"theme-color\"]');"):]
    with open('src/js/theme-init.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Updated src/js/theme-init.js")
else:
    print(f"FAILED: start={start_pos}, end={end_pos}")
