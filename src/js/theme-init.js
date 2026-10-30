/* Load synchronously before CSS to restore appearance and time-of-day colors before first paint. */
function getTimeOfDayInfo(tz) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();

  if (tz && tz !== 'auto') {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      for (const p of parts) {
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
      }
      if (hour === 24) hour = 0;
    } catch (_) {
      hour = now.getHours();
      minute = now.getMinutes();
    }
  }

  const time = hour + minute / 60;

  // 1. Sáng (4h - 11h): Vàng nhạt chuyển dần sang vàng đậm (#FCC75D)
  if (time >= 4 && time < 11) {
    const progress = (time - 4) / 7;
    return { period: 'morning', progress, isLateNight: false, hour, minute };
  }
  // 2. Trưa (11h - 14h): Cam nhạt chuyển dần sang cam đậm (#FFA600)
  if (time >= 11 && time < 14) {
    const progress = (time - 11) / 3;
    return { period: 'lunch', progress, isLateNight: false, hour, minute };
  }
  // 3. Chiều (14h - 17h): Màu như buổi trưa
  if (time >= 14 && time < 17) {
    const progress = (time - 14) / 3;
    return { period: 'afternoon', progress, isLateNight: false, hour, minute };
  }
  // 4. Tối (17h - 22h): Xanh đen nhạt chuyển dần sang đậm, không chuyển thành đen
  if (time >= 17 && time < 22) {
    const progress = (time - 17) / 5;
    return { period: 'dinner', progress, isLateNight: false, hour, minute };
  }
  // 5. Khuya (sau 22h đến 4h): Màu giao diện là màu đậm của buổi tối, chuyển sang màu buổi sáng khi đến giờ đã quy định
  const nightTime = hour >= 22 ? time - 22 : time + 2;
  const progress = Math.max(0, Math.min(1, nightTime / 6));
  return { period: 'latenight', progress, isLateNight: true, hour, minute };
}

function lerpColor(c1, c2, t) {
  const factor = Math.max(0, Math.min(1, t));
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * factor);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * factor);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function contrastRatio(first, second) {
  const luminance = (hex) => {
    const parts = hex
      .slice(1)
      .match(/../g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return parts[0] * 0.2126 + parts[1] * 0.7152 + parts[2] * 0.0722;
  };
  const a = luminance(first),
    b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function accessibleAccent(hex, dark) {
  const original = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16));
  const backgrounds = dark ? ['#141922', '#1e2532', '#293344'] : ['#ffffff', '#f8fafc', '#fffdf5'];
  for (let step = 0; step <= 20; step++) {
    const mix = step / 20,
      target = dark ? 255 : 0;
    const candidate =
      '#' +
      original
        .map((v) =>
          Math.round(v + (target - v) * mix)
            .toString(16)
            .padStart(2, '0')
        )
        .join('');
    if (backgrounds.every((bg) => contrastRatio(candidate, bg) >= 4.5)) return candidate;
  }
  return dark ? '#ffffff' : '#000000';
}

const AppearancePreferences = (() => {
  let currentPreferences = null;
  const defaults = {
    theme: 'system',
    appearance: 'auto',
    timezone: 'auto',
    language: 'vi',
    customColor: '#ff5722',
  };
  const allowed = {
    theme: ['system', 'orange', 'green', 'blue', 'rose', 'custom'],
    appearance: ['light', 'dark', 'system', 'auto'],
    timezone: [
      'auto',
      'Asia/Ho_Chi_Minh',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Shanghai',
      'Asia/Bangkok',
      'Asia/Singapore',
      'Europe/London',
      'Europe/Paris',
      'America/New_York',
      'America/Los_Angeles',
      'Australia/Sydney',
    ],
    language: ['vi', 'en', 'ja', 'ko', 'zh'],
  };

  function read() {
    const result = { ...defaults };
    let legacy = {};
    try {
      legacy = JSON.parse(localStorage.getItem('food_case_settings') || '{}') || {};
    } catch (_) {}
    for (const key of Object.keys(defaults)) {
      if (key === 'customColor' && /^#[0-9a-fA-F]{6}$/.test(legacy.customColor || '')) {
        result.customColor = legacy.customColor;
      }
      if (key === 'customColor') {
        try {
          const savedColor = JSON.parse(localStorage.getItem('food_case_setting_customColor'));
          if (/^#[0-9a-fA-F]{6}$/.test(savedColor || '')) result.customColor = savedColor;
        } catch (_) {}
        continue;
      }
      if (allowed[key] && allowed[key].includes(legacy[key])) result[key] = legacy[key];
      try {
        const saved = JSON.parse(localStorage.getItem('food_case_setting_' + key));
        if (allowed[key] && allowed[key].includes(saved)) result[key] = saved;
      } catch (_) {}
    }
    return result;
  }

  function apply(preferences) {
    const theme = allowed.theme.includes(preferences?.theme) ? preferences.theme : defaults.theme;
    const appearance = allowed.appearance.includes(preferences?.appearance)
      ? preferences.appearance
      : defaults.appearance;
    const timezone = allowed.timezone.includes(preferences?.timezone)
      ? preferences.timezone
      : defaults.timezone;
    const language = allowed.language.includes(preferences?.language)
      ? preferences.language
      : defaults.language;

    currentPreferences = { ...preferences, theme, appearance, timezone, language };
    const timeInfo = getTimeOfDayInfo(timezone);
    const isDarkTime = timeInfo.isLateNight || timeInfo.period === 'dinner';
    const dark =
      appearance === 'dark' ||
      (appearance === 'auto' && isDarkTime) ||
      (appearance === 'system' &&
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)').matches);
    const docEl = document.documentElement;

    docEl.dataset.theme = theme;
    docEl.dataset.appearance = dark ? 'dark' : 'light';
    docEl.dataset.timePeriod = timeInfo.period;
    docEl.dataset.isLateNight = String(timeInfo.isLateNight);
    docEl.dataset.timezone = timezone;
    docEl.lang = language;

    // Reset any previously set inline styles to let CSS rules cascade cleanly
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

      if (
        theme === 'custom' &&
        preferences?.customColor &&
        /^#[0-9a-fA-F]{6}$/.test(preferences.customColor)
      ) {
        const selectedHex = preferences.customColor;
        const hex = accessibleAccent(selectedHex, dark);
        docEl.style.setProperty('--custom-accent', selectedHex);
        const num = parseInt(hex.slice(1), 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        const hoverHex =
          '#' +
          [r, g, b]
            .map((c) =>
              Math.max(0, Math.min(255, dark ? c + 30 : c - 35))
                .toString(16)
                .padStart(2, '0')
            )
            .join('');
        docEl.style.setProperty('--orange', hex);
        docEl.style.setProperty('--accent-hover', hoverHex);
        docEl.style.setProperty('--orange-soft', `rgba(${r}, ${g}, ${b}, ${dark ? 0.25 : 0.14})`);
        docEl.style.setProperty('--ambient', `rgba(${r}, ${g}, ${b}, ${dark ? 0.35 : 0.45})`);
        docEl.style.setProperty(
          '--primary-ink',
          contrastRatio(hex, '#ffffff') >= contrastRatio(hex, '#0f172a') ? '#ffffff' : '#0f172a'
        );
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

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      if (dark) {
        meta.content = '#181c21';
      } else if (theme === 'system' || theme === 'orange') {
        meta.content =
          timeInfo.period === 'morning'
            ? '#fef5dc'
            : timeInfo.period === 'lunch' || timeInfo.period === 'afternoon'
              ? '#ffe9cc'
              : '#101c2e';
      } else {
        meta.content = { green: '#f5faf6', blue: '#f5f9fc', rose: '#fcf6f8' }[theme] || '#fcf9f5';
      }
    }
  }

  apply(read());
  return {
    read,
    apply,
    current: () => ({ ...currentPreferences }),
    getTimeOfDayInfo,
    defaults,
    allowed,
  };
})();

// Re-evaluate auto appearance at minute boundaries and after the page returns to view.
(() => {
  const refresh = () => AppearancePreferences.apply(AppearancePreferences.current());
  if (typeof document !== 'undefined') {
    document.addEventListener?.('visibilitychange', () => {
      if (!document.hidden) refresh();
    });
  }
  if (typeof window !== 'undefined') {
    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', refresh);
    window.setInterval?.(() => {
      if (!document.hidden) refresh();
    }, 60000);
  }
})();

// Automatic legal page translation for privacy.html, terms.html, credits.html
(function initLegalTranslations() {
  if (typeof document === 'undefined') return;

  const LEGAL_I18N = {
    privacy: {
      en: {
        title: 'Privacy Policy · What To Eat',
        back: '← Back to dish picker',
        h1: 'Privacy Policy',
        date: 'Updated on October 29, 2026.',
        h2_1: 'Finding Eateries & Location Data',
        p1: 'This website does not require GPS permissions, nor does it collect, store, or transmit your geographic coordinates. The Find Places button only opens Google Maps with the dish name and "nearby" query. Google Maps handles location according to permissions you grant directly to that service.',
        p2: 'When opening Google Maps or eatery websites, you transition to external services subject to their respective policies, including the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>. This website does not invoke paid Google Places APIs and does not download or store reviews or menus.',
        h2_2: 'On-Device Data Storage',
        p3: 'Discovered dishes count is saved in browser IndexedDB so multiple tabs update without overwriting each other. Theme color, sound, duplicate prevention, and budget settings are saved in localStorage under isolated keys. Session selection history to reduce repetition is held in tab sessionStorage and never sent to any server. Favorites, hidden dishes, eaten timestamps, and taste filters are saved locally under food_case_personal_ keys in localStorage. Website assets are cached for full offline support. You can clear browsing data at any time in browser settings to wipe IndexedDB, localStorage, and caches. If storage is disabled, the app still works but cannot persist your progress across sessions.',
        p4: "Sharing features utilize your device's native share sheet or clipboard. This website does not transmit page URLs to external QR generation or third-party font services.",
        bottom_link: 'Terms of Use →',
        bottom_href: 'terms.html',
      },
      ja: {
        title: 'プライバシーポリシー · 何食べる？',
        back: '← メニュー選択に戻る',
        h1: 'プライバシーポリシー',
        date: '更新日：2026年10月29日',
        h2_1: '店舗検索と位置情報',
        p1: '当サイトはGPS権限を要求せず、お客様の位置情報を収集・保存・送信することはありません。「お店を探す」ボタンは、料理名と「近く」のキーワードでGoogleマップを開くだけです。Googleマップは、お客様がそのサービス上で直接許可した権限に従って位置情報を処理します。',
        p2: 'Googleマップまたは飲食店サイトを開くと、外部サービスに移動し、<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Googleプライバシーポリシー</a>を含む各サービスのポリシーが適用されます。当サイトは有料のGoogle Places APIを呼び出さず、レビューやメニューを保存しません。',
        h2_2: '端末内のデータ保存',
        p3: '料理の発見回数はブラウザのIndexedDBに保存され、複数タブでも競合なく同期されます。テーマカラー、音効、重複防止、予算設定はlocalStorageの独立キーに保存されます。重複を減らすセッション履歴はsessionStorageに保持され、サーバーに送信されることはありません。お気に入り、非表示、実食日時、味の好みはlocalStorageのfood_case_personal_キーにローカル保存されます。サイトリソースはオフライン利用のためキャッシュされます。',
        p4: '共有機能は端末標準の共有シートまたはクリップボードを利用します。当サイトは外部のQR生成サービスやサードパーティのフォントサービスにURLを送信しません。',
        bottom_link: '利用規約 →',
        bottom_href: 'terms.html',
      },
      ko: {
        title: '개인정보처리방침 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '개인정보처리방침',
        date: '업데이트: 2026년 10월 29일',
        h2_1: '식당 검색 및 위치 정보',
        p1: "본 웹사이트는 GPS 권한을 요구하지 않으며, 사용자의 위치 좌표를 수집, 저장 또는 전송하지 않습니다. 식당 찾기 버튼은 음식 이름과 '근처' 검색어로 Google 지도를 열 뿐입니다. Google 지도는 해당 서비스에서 사용자가 직접 허용한 권한에 따라 위치를 처리합니다.",
        p2: 'Google 지도 또는 식당 웹사이트를 열면 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 개인정보처리방침</a>을 포함한 해당 외부 서비스의 방침이 적용됩니다. 본 웹사이트는 유료 Google Places API를 호출하지 않으며 리뷰나 메뉴를 저장하지 않습니다.',
        h2_2: '기기 내 데이터 보관',
        p3: '발견한 메뉴 횟수는 브라우저의 IndexedDB에 저장되어 여러 탭 간에 충돌 없이 동기화됩니다. 테마 색상, 음향, 중복 방지, 예산 설정은 localStorage의 독립된 키에 저장됩니다. 중복을 줄이기 위한 세션 선택 기록은 sessionStorage에 보관되며 서버로 전송되지 않습니다. 즐겨찾기, 숨긴 메뉴, 먹어본 기록 및 취향 필터는 localStorage의 food_case_personal_ 키에 로컬 저장됩니다. 오프라인 지원을 위해 리소스가 캐시됩니다.',
        p4: '공유 기능은 기기의 기본 공유 시트 또는 클립보드를 사용합니다. 본 웹사이트는 외부 QR 생성 서비스나 서드파티 폰트 서비스로 URL을 전송하지 않습니다.',
        bottom_link: '이용약관 →',
        bottom_href: 'terms.html',
      },
      zh: {
        title: '隐私政策 · 今天吃什么？',
        back: '← 返回点餐页面',
        h1: '隐私政策',
        date: '更新日期：2026年10月29日',
        h2_1: '寻找餐馆与位置信息',
        p1: '本网站不需要GPS权限，不收集、存储或发送您的地理坐标。“寻找餐馆”按钮仅使用菜品名称和“附近”关键词在Google地图中搜索。Google地图将根据您在其服务中直接授予的权限处理位置。',
        p2: '当打开Google地图或餐馆网站时，您将跳转至外部服务并受其各自政策约束，包括<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google隐私权政策</a>。本网站不调用付费Google Places API，也不下载或保存餐馆评价与菜单。',
        h2_2: '设备端数据存储',
        p3: '已探索菜品次数保存在浏览器的IndexedDB中，以便多标签页同步更新而不会互相覆盖。主题颜色、音效、去重和预算设置保存在localStorage的独立键中。用于减少重复的挑选历史保存在tab的sessionStorage中，绝不发送到服务器。收藏、已隐藏、食用记录和口味偏好保存在localStorage的food_case_personal_本地键中。全站资源已缓存以支持离线使用。',
        p4: '分享功能使用设备的系统分享面板或复制链接。本网站不会将页面地址发送给外部二维码生成或第三方字体服务。',
        bottom_link: '使用条款 →',
        bottom_href: 'terms.html',
      },
    },
    terms: {
      en: {
        title: 'Terms of Use · What To Eat',
        back: '← Back to dish picker',
        h1: 'Terms of Use',
        date: 'Updated on October 23, 2026.',
        h2_1: 'Dish Recommendations',
        p1: 'This website provides randomized dish recommendations for inspiration and convenience. Prices shown on dish cards are reference ranges only and do not constitute confirmed prices at any specific eatery.',
        h2_2: 'Finding Eateries on Google Maps',
        p2: 'The eatery search button opens Google Maps using the dish name and "nearby". This website does not provide direct eatery listings and cannot guarantee dish availability, opening hours, or pricing. Please check information on Google Maps and verify directly with eateries prior to visiting.',
        p3: 'Use of Google Maps is subject to the <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener">Google Maps/Google Earth Additional Terms of Service</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>. You control your location permissions directly in Google Maps; this website never requests GPS access.',
        p4: 'No API key or payment method is required to open Maps links from this website. The dish picker and collection work offline once cached; searching on Maps requires an active Internet connection.',
        bottom_link: 'Privacy Policy →',
        bottom_href: 'privacy.html',
      },
      ja: {
        title: '利用規約 · 何食べる？',
        back: '← メニュー選択に戻る',
        h1: '利用規約',
        date: '更新日：2026年10月23日',
        h2_1: '料理の提案について',
        p1: '当サイトは毎日の食事選びのインスピレーションとして料理をランダムに提案します。カードに表示される価格は参考目安であり、特定の店舗で確認された確定価格ではありません。',
        h2_2: 'Googleマップでの店舗検索',
        p2: '店舗検索ボタンは、料理名と「近く」のキーワードでGoogleマップを開きます。当サイトは店舗リストを直接管理しておらず、提供可否、営業時間、正確な価格を保証するものではありません。訪問前にGoogleマップの情報をご確認の上、店舗に直接お問い合わせください。',
        p3: 'Googleマップの利用には<a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener">Googleマップ/Google Earth追加利用規約</a>および<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Googleプライバシーポリシー</a>が適用されます。位置情報の権限はGoogleマップ上で直接管理され、当サイトはGPS権限を要求しません。',
        p4: '当サイトからマップリンクを開くのにAPIキーや支払い方法は不要です。メニュー選択とコレクションはキャッシュ後にオフラインで利用できますが、マップ検索にはインターネット接続が必要です。',
        bottom_link: 'プライバシーポリシー →',
        bottom_href: 'privacy.html',
      },
      ko: {
        title: '이용약관 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '이용약관',
        date: '업데이트: 2026년 10월 23일',
        h2_1: '메뉴 추천 안내',
        p1: '본 웹사이트는 식사 선택에 도움을 드리고자 메뉴를 무작위로 추천합니다. 카드에 표시된 가격은 참고용 추정 가격이며, 특정 식당에서 확인된 실제 가격이 아닙니다.',
        h2_2: 'Google 지도로 식당 찾기',
        p2: "식당 찾기 버튼은 요리 이름과 '근처' 검색어로 Google 지도를 엽니다. 본 웹사이트는 식당 목록을 직접 제공하지 않으며, 메뉴 판매 여부, 영업시간, 정확한 가격을 보증하지 않습니다. 방문 전 Google 지도의 정보를 확인하고 식당에 직접 문의하시기 바랍니다.",
        p3: 'Google 지도를 이용하면 <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener">Google 지도/Google 어스 추가 서비스 약관</a> 및 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 개인정보처리방침</a>이 적용됩니다. 위치 권한은 Google 지도에서 직접 관리하며, 본 웹사이트는 GPS 권한을 요구하지 않습니다.',
        p4: '본 웹사이트에서 지도 링크를 여는 데 API 키나 결제 수단이 필요하지 않습니다. 메뉴 선택과 컬렉션은 캐시 후 오프라인에서도 작동하지만, 지도 검색에는 인터넷 연결이 필요합니다.',
        bottom_link: '개인정보처리방침 →',
        bottom_href: 'privacy.html',
      },
      zh: {
        title: '使用条款 · 今天吃什么？',
        back: '← 返回点餐页面',
        h1: '使用条款',
        date: '更新日期：2026年10月23日',
        h2_1: '菜品推荐说明',
        p1: '本网站提供随机菜品推荐以供用餐灵感与参考。卡片上显示的价格仅为参考估价，并非特定餐馆确认的价格。',
        h2_2: '在Google地图上寻找餐馆',
        p2: '寻找餐馆按钮使用菜品名称和“附近”关键词打开Google地图。本网站不直接提供餐馆列表，无法保证菜品供应、营业时间或确切价格。到店前请查看Google地图上的信息并直接向餐馆确认。',
        p3: '使用Google地图受<a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener">Google地图/Google地球附加服务条款</a>和<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google隐私权政策</a>约束。位置权限由您在Google地图上直接授权；本网站绝不请求GPS权限。',
        p4: '从本网站打开地图链接不需要API密钥或付款方式。点餐和收藏功能在缓存后可离线使用；但在地图上搜索餐馆需要网络连接。',
        bottom_link: '隐私政策 →',
        bottom_href: 'privacy.html',
      },
    },
    credits: {
      en: {
        title: 'Open Source Credits · What To Eat',
        back: '← Back to dish picker',
        h1: 'Built with the Community',
        p1: 'Several open source resources help What To Eat stay clear, responsive, and easy to use.',
        bottom_link: 'Terms of Use →',
        bottom_href: 'terms.html',
      },
      ja: {
        title: 'オープンソース謝辞 · 何食べる？',
        back: '← メニュー選択に戻る',
        h1: 'オープンソースコミュニティと共に',
        p1: 'オープンソースのリソースにより、より快適で使いやすい体験を提供しています。',
        bottom_link: '利用規約 →',
        bottom_href: 'terms.html',
      },
      ko: {
        title: '오픈소스 크레딧 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '오픈소스 커뮤니티와 함께 만듭니다',
        p1: '오픈소스 리소스를 통해 더 깔끔하고 편리한 사용 경험을 제공합니다.',
        bottom_link: '이용약관 →',
        bottom_href: 'terms.html',
      },
      zh: {
        title: '开源致谢 · 今天吃什么？',
        back: '← 返回点餐页面',
        h1: '与开源社区共同构建',
        p1: '多项开源资源帮助本项目保持清晰、流畅和易用。',
        bottom_link: '使用条款 →',
        bottom_href: 'terms.html',
      },
    },
  };

  function renderLegalPage(lang) {
    const pageKey = location.pathname.includes('privacy')
      ? 'privacy'
      : location.pathname.includes('terms')
        ? 'terms'
        : location.pathname.includes('credits')
          ? 'credits'
          : null;

    if (!pageKey) return;

    const main = document.querySelector('.legal-page');
    if (!main) return;
    const original =
      legalPageSnapshots.get(main) ||
      (() => {
        const snapshot = {
          title: document.title,
          h1: main.querySelector('h1')?.innerHTML,
          back: main.querySelector('a:first-child')?.textContent,
          date: main.querySelector('h1 + p')?.textContent,
          h2: [...main.querySelectorAll('h2')].map((el) => el.innerHTML),
          paras: [...main.querySelectorAll('h2 ~ p')].map((el) => el.innerHTML),
          bottom: main.querySelector('a:last-child')?.textContent,
        };
        legalPageSnapshots.set(main, snapshot);
        return snapshot;
      })();

    const externalData = main.querySelector('#externalDataNote');
    if (externalData)
      externalData.textContent =
        {
          vi: 'Nếu bạn gửi món mới khi có máy chủ hỗ trợ, tên, nội dung, giá và ảnh bạn chọn sẽ được lưu vào danh mục dùng chung trên máy chủ. Trên hosting tĩnh hoặc khi lưu local, món nằm trong trình duyệt này. Trang chính có script quảng cáo bên ngoài; các nhà cung cấp có thể xử lý dữ liệu kết nối và dùng công nghệ lưu trữ theo chính sách riêng của họ.',
          en: 'When you submit a dish to a supporting server, its name, details, price and selected photo are stored in the shared server catalog. Static-hosting or local fallback dishes stay in this browser. The main page includes third-party advertising scripts; providers may process connection data and use storage under their own policies.',
          ja: '対応サーバーに料理を送信すると、名前、説明、価格、選択した写真が共有メニューに保存されます。静的ホスティングやローカル保存時は、このブラウザ内に保存されます。メインページには外部広告スクリプトが含まれ、提供者は独自の方針に従い接続データや保存技術を利用する場合があります。',
          ko: '지원 서버에 음식을 제출하면 이름, 설명, 가격과 선택한 사진이 서버 공유 메뉴에 저장됩니다. 정적 호스팅이나 로컬 저장 시에는 이 브라우저에 저장됩니다. 메인 페이지에는 외부 광고 스크립트가 있으며, 제공업체는 자체 정책에 따라 연결 데이터와 저장 기술을 사용할 수 있습니다.',
          zh: '向配套服务器提交菜品时，名称、描述、价格及所选照片会保存到服务器共享菜单。静态托管或本地备用保存时，菜品仅存于此浏览器。主页包含第三方广告脚本，提供商可能按其政策处理连接数据及使用存储技术。',
        }[lang] || '';

    const creditReviewNote = {
      vi: 'Nguồn hoặc giấy phép còn thiếu hoặc mâu thuẫn; ứng dụng dùng ảnh giữ chỗ trong khi chờ rà soát.',
      en: 'Source or license details need review; the app shows a placeholder meanwhile.',
      ja: '出典またはライセンスを確認中のため、アプリでは仮画像を表示しています。',
      ko: '출처 또는 라이선스를 확인 중이므로 앱에서 대체 이미지를 표시합니다.',
      zh: '来源或许可仍待核实，应用暂时显示占位图。',
    };
    main.querySelectorAll('.credit-review-note').forEach((node) => {
      node.textContent = creditReviewNote[lang] || creditReviewNote.vi;
    });
    let nav = main.querySelector('.legal-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'legal-nav';
      const backLink = main.querySelector('a:first-child');
      if (backLink) backLink.before(nav);
      else main.prepend(nav);

      if (backLink) nav.append(backLink);

      const select = document.createElement('select');
      select.className = 'legal-lang-select';
      select.setAttribute('aria-label', 'Change language');
      const langs = [
        ['vi', '🇻🇳 Tiếng Việt'],
        ['en', '🇬🇧 English'],
        ['ja', '🇯🇵 日本語'],
        ['ko', '🇰🇷 한국어'],
        ['zh', '🇨🇳 中文'],
      ];
      for (const [code, label] of langs) {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = label;
        select.append(opt);
      }
      select.value = lang;
      select.onchange = (e) => {
        const newLang = e.target.value;
        try {
          localStorage.setItem('food_case_setting_language', JSON.stringify(newLang));
        } catch (_) {}
        AppearancePreferences.apply({ ...AppearancePreferences.current(), language: newLang });
        document.documentElement.lang = newLang;
        renderLegalPage(newLang);
      };
      nav.append(select);
    } else {
      const select = nav.querySelector('.legal-lang-select');
      if (select) select.value = lang;
    }

    const dict = LEGAL_I18N[pageKey]?.[lang];
    if (!dict) {
      document.documentElement.lang = lang;
      document.title = original.title;
      const originalBack = nav.querySelector('a');
      if (originalBack && original.back) originalBack.textContent = original.back;
      const h1 = main.querySelector('h1');
      if (h1 && original.h1) h1.innerHTML = original.h1;
      const date = main.querySelector('h1 + p');
      if (date && original.date) date.textContent = original.date;
      main.querySelectorAll('h2').forEach((el, index) => {
        if (original.h2[index] !== undefined) el.innerHTML = original.h2[index];
      });
      main.querySelectorAll('h2 ~ p').forEach((el, index) => {
        if (original.paras[index] !== undefined) el.innerHTML = original.paras[index];
      });
      const bottom = main.querySelector('a:last-child');
      if (bottom && original.bottom) bottom.textContent = original.bottom;
      return;
    }

    document.documentElement.lang = lang;
    document.title = dict.title;

    const backLink = nav.querySelector('a');
    if (backLink) backLink.textContent = dict.back;

    const h1 = main.querySelector('h1');
    if (h1) h1.textContent = dict.h1;

    const dateP = main.querySelector('h1 + p');
    if (dateP && dict.date) dateP.textContent = dict.date;

    const h2s = main.querySelectorAll('h2');
    if (h2s[0] && dict.h2_1) h2s[0].textContent = dict.h2_1;
    if (h2s[1] && dict.h2_2) h2s[1].textContent = dict.h2_2;

    const paras = main.querySelectorAll('h2 ~ p');
    if (paras[0] && dict.p1) paras[0].innerHTML = dict.p1;
    if (paras[1] && dict.p2) paras[1].innerHTML = dict.p2;
    if (paras[2] && dict.p3) paras[2].innerHTML = dict.p3;
    if (paras[3] && dict.p4) paras[3].innerHTML = dict.p4;

    const bottomLink = main.querySelector('a:last-child');
    if (bottomLink && dict.bottom_link) {
      bottomLink.textContent = dict.bottom_link;
      bottomLink.href = dict.bottom_href;
    }
  }

  const legalPageSnapshots = new WeakMap();
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.legal-page')) {
      const savedLang = AppearancePreferences.read().language;
      renderLegalPage(savedLang);
    }
  });
})();
