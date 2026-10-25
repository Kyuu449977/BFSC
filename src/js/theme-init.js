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

const AppearancePreferences = (() => {
  const defaults = { theme: 'system', appearance: 'light', timezone: 'auto', language: 'vi' };
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

    const timeInfo = getTimeOfDayInfo(timezone);
    const isDarkTime = Boolean(timeInfo.isLateNight || timeInfo.period === 'dinner' || (timeInfo.hour >= 18 || timeInfo.hour < 6));
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
        '--ink',
        '--muted',
        '--ambient',
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
        docEl.style.setProperty('--orange-soft', `rgba(${r}, ${g}, ${b}, ${dark ? 0.25 : 0.12})`);
        docEl.style.setProperty('--ambient', `rgba(${r}, ${g}, ${b}, ${dark ? 0.35 : 0.45})`);
      }

      // Smooth color transitions for default theme (orange)
      if (theme === 'system' || theme === 'orange') {
        if (timeInfo.period === 'morning') {
          // 4h - 11h: vàng nhạt chuyển dần sang vàng đậm #FCC75D [252, 199, 93]
          const startAccent = [254, 240, 138];
          const endAccent = [252, 199, 93];
          const accent = lerpColor(startAccent, endAccent, timeInfo.progress);
          docEl.style.setProperty('--orange', accent);
          docEl.style.setProperty('--accent-hover', '#e5b24c');
          docEl.style.setProperty('--orange-soft', '#fef5dc');
          docEl.style.setProperty('--border', '#eedaa4');
        } else if (timeInfo.period === 'lunch' || timeInfo.period === 'afternoon') {
          // 11h - 17h: cam nhạt chuyển dần sang cam đậm #FFA600 [255, 166, 0]
          const startAccent = [254, 215, 170];
          const endAccent = [255, 166, 0];
          const accent = lerpColor(startAccent, endAccent, timeInfo.progress);
          docEl.style.setProperty('--orange', accent);
          docEl.style.setProperty('--accent-hover', '#e69500');
          docEl.style.setProperty('--orange-soft', '#fff1db');
          docEl.style.setProperty('--border', '#f8d39f');
        } else if (timeInfo.period === 'dinner') {
          // 17h - 22h: xanh đen nhạt chuyển dần sang đậm, không đen tuyền
          const startBg = [26, 44, 70]; // slate navy
          const endBg = [12, 24, 43]; // deep midnight navy
          const bg = lerpColor(startBg, endBg, timeInfo.progress);
          docEl.style.setProperty('--cream', bg);
          docEl.style.setProperty('--ink', '#f0f6fc');
          docEl.style.setProperty('--muted', '#94a9c4');
          docEl.style.setProperty('--orange', '#38bdf8');
          docEl.style.setProperty('--accent-hover', '#60a5fa');
          docEl.style.setProperty('--border', '#223a5c');
        } else if (timeInfo.period === 'latenight') {
          // sau 22h: màu đậm của buổi tối, chuyển dần sang bình minh lúc 4h
          const nightBg = [12, 24, 43];
          const dawnBg = [255, 253, 245];
          const morningTransition =
            timeInfo.progress > 0.85 ? (timeInfo.progress - 0.85) / 0.15 : 0;
          const bg = lerpColor(nightBg, dawnBg, morningTransition);
          docEl.style.setProperty('--cream', bg);
          docEl.style.setProperty('--ink', morningTransition > 0.5 ? '#1a1f2c' : '#f0f6fc');
          docEl.style.setProperty('--muted', morningTransition > 0.5 ? '#64748b' : '#90a5c2');
          docEl.style.setProperty('--orange', morningTransition > 0.5 ? '#fcc75d' : '#38bdf8');
          docEl.style.setProperty('--border', morningTransition > 0.5 ? '#eedaa4' : '#1e3555');
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
  return { read, apply, getTimeOfDayInfo, defaults, allowed };
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
        date: 'Updated on October 24, 2026.',
        h2_1: 'Finding Eateries & Location Data',
        p1: 'This website does not require GPS permissions, nor does it collect, store, or transmit your geographic coordinates. The Find Places button only opens Google Maps with the dish name and "nearby" query. Google Maps handles location according to permissions you grant directly to that service.',
        p2: 'When opening Google Maps or eatery websites, you transition to external services subject to their respective policies, including the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>. This website does not invoke paid Google Places APIs and does not download or store reviews or menus.',
        h2_2: 'On-Device Data Storage',
        p3: 'Discovered dishes count is saved in browser IndexedDB so multiple tabs update without overwriting each other. Theme color, sound, duplicate prevention, and budget settings are saved in localStorage under isolated keys. Session selection history to reduce repetition is held in tab sessionStorage and never sent to any server. Favorites, hidden dishes, eaten timestamps, and taste filters are saved locally under food_case_personal_ keys in localStorage. Website assets are cached for full offline support. You can clear browsing data at any time in browser settings to wipe IndexedDB, localStorage, and caches. If storage is disabled, the app still works but cannot persist your progress across sessions.',
        p4: 'Sharing features utilize your device\'s native share sheet or clipboard. This website does not transmit page URLs to external QR generation or third-party font services.',
        bottom_link: 'Terms of Use →',
        bottom_href: 'terms.html'
      },
      ja: {
        title: 'プライバシーポリシー · 何食べる？',
        back: '← メニュー選択に戻る',
        h1: 'プライバシーポリシー',
        date: '更新日：2026年10月24日',
        h2_1: '店舗検索と位置情報',
        p1: '当サイトはGPS権限を要求せず、お客様の位置情報を収集・保存・送信することはありません。「お店を探す」ボタンは、料理名と「近く」のキーワードでGoogleマップを開くだけです。Googleマップは、お客様がそのサービス上で直接許可した権限に従って位置情報を処理します。',
        p2: 'Googleマップまたは飲食店サイトを開くと、外部サービスに移動し、<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Googleプライバシーポリシー</a>を含む各サービスのポリシーが適用されます。当サイトは有料のGoogle Places APIを呼び出さず、レビューやメニューを保存しません。',
        h2_2: '端末内のデータ保存',
        p3: '料理の発見回数はブラウザのIndexedDBに保存され、複数タブでも競合なく同期されます。テーマカラー、音効、重複防止、予算設定はlocalStorageの独立キーに保存されます。重複を減らすセッション履歴はsessionStorageに保持され、サーバーに送信されることはありません。お気に入り、非表示、実食日時、味の好みはlocalStorageのfood_case_personal_キーにローカル保存されます。サイトリソースはオフライン利用のためキャッシュされます。',
        p4: '共有機能は端末標準の共有シートまたはクリップボードを利用します。当サイトは外部のQR生成サービスやサードパーティのフォントサービスにURLを送信しません。',
        bottom_link: '利用規約 →',
        bottom_href: 'terms.html'
      },
      ko: {
        title: '개인정보처리방침 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '개인정보처리방침',
        date: '업데이트: 2026년 10월 24일',
        h2_1: '식당 검색 및 위치 정보',
        p1: '본 웹사이트는 GPS 권한을 요구하지 않으며, 사용자의 위치 좌표를 수집, 저장 또는 전송하지 않습니다. 식당 찾기 버튼은 음식 이름과 \'근처\' 검색어로 Google 지도를 열 뿐입니다. Google 지도는 해당 서비스에서 사용자가 직접 허용한 권한에 따라 위치를 처리합니다.',
        p2: 'Google 지도 또는 식당 웹사이트를 열면 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 개인정보처리방침</a>을 포함한 해당 외부 서비스의 방침이 적용됩니다. 본 웹사이트는 유료 Google Places API를 호출하지 않으며 리뷰나 메뉴를 저장하지 않습니다.',
        h2_2: '기기 내 데이터 보관',
        p3: '발견한 메뉴 횟수는 브라우저의 IndexedDB에 저장되어 여러 탭 간에 충돌 없이 동기화됩니다. 테마 색상, 음향, 중복 방지, 예산 설정은 localStorage의 독립된 키에 저장됩니다. 중복을 줄이기 위한 세션 선택 기록은 sessionStorage에 보관되며 서버로 전송되지 않습니다. 즐겨찾기, 숨긴 메뉴, 먹어본 기록 및 취향 필터는 localStorage의 food_case_personal_ 키에 로컬 저장됩니다. 오프라인 지원을 위해 리소스가 캐시됩니다.',
        p4: '공유 기능은 기기의 기본 공유 시트 또는 클립보드를 사용합니다. 본 웹사이트는 외부 QR 생성 서비스나 서드파티 폰트 서비스로 URL을 전송하지 않습니다.',
        bottom_link: '이용약관 →',
        bottom_href: 'terms.html'
      },
      zh: {
        title: '隐私政策 · 今天吃什么？',
        back: '← 返回点餐页面',
        h1: '隐私政策',
        date: '更新日期：2026年10月24日',
        h2_1: '寻找餐馆与位置信息',
        p1: '本网站不需要GPS权限，不收集、存储或发送您的地理坐标。“寻找餐馆”按钮仅使用菜品名称和“附近”关键词在Google地图中搜索。Google地图将根据您在其服务中直接授予的权限处理位置。',
        p2: '当打开Google地图或餐馆网站时，您将跳转至外部服务并受其各自政策约束，包括<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google隐私权政策</a>。本网站不调用付费Google Places API，也不下载或保存餐馆评价与菜单。',
        h2_2: '设备端数据存储',
        p3: '已探索菜品次数保存在浏览器的IndexedDB中，以便多标签页同步更新而不会互相覆盖。主题颜色、音效、去重和预算设置保存在localStorage的独立键中。用于减少重复的挑选历史保存在tab的sessionStorage中，绝不发送到服务器。收藏、已隐藏、食用记录和口味偏好保存在localStorage的food_case_personal_本地键中。全站资源已缓存以支持离线使用。',
        p4: '分享功能使用设备的系统分享面板或复制链接。本网站不会将页面地址发送给外部二维码生成或第三方字体服务。',
        bottom_link: '使用条款 →',
        bottom_href: 'terms.html'
      }
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
        bottom_href: 'privacy.html'
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
        bottom_href: 'privacy.html'
      },
      ko: {
        title: '이용약관 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '이용약관',
        date: '업데이트: 2026년 10월 23일',
        h2_1: '메뉴 추천 안내',
        p1: '본 웹사이트는 식사 선택에 도움을 드리고자 메뉴를 무작위로 추천합니다. 카드에 표시된 가격은 참고용 추정 가격이며, 특정 식당에서 확인된 실제 가격이 아닙니다.',
        h2_2: 'Google 지도로 식당 찾기',
        p2: '식당 찾기 버튼은 요리 이름과 \'근처\' 검색어로 Google 지도를 엽니다. 본 웹사이트는 식당 목록을 직접 제공하지 않으며, 메뉴 판매 여부, 영업시간, 정확한 가격을 보증하지 않습니다. 방문 전 Google 지도의 정보를 확인하고 식당에 직접 문의하시기 바랍니다.',
        p3: 'Google 지도를 이용하면 <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener">Google 지도/Google 어스 추가 서비스 약관</a> 및 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 개인정보처리방침</a>이 적용됩니다. 위치 권한은 Google 지도에서 직접 관리하며, 본 웹사이트는 GPS 권한을 요구하지 않습니다.',
        p4: '본 웹사이트에서 지도 링크를 여는 데 API 키나 결제 수단이 필요하지 않습니다. 메뉴 선택과 컬렉션은 캐시 후 오프라인에서도 작동하지만, 지도 검색에는 인터넷 연결이 필요합니다.',
        bottom_link: '개인정보처리방침 →',
        bottom_href: 'privacy.html'
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
        bottom_href: 'privacy.html'
      }
    },
    credits: {
      en: {
        title: 'Open Source Credits · What To Eat',
        back: '← Back to dish picker',
        h1: 'Built with the Community',
        p1: 'Several open source resources help What To Eat stay clear, responsive, and easy to use.',
        bottom_link: 'Terms of Use →',
        bottom_href: 'terms.html'
      },
      ja: {
        title: 'オープンソース謝辞 · 何食べる？',
        back: '← メニュー選択に戻る',
        h1: 'オープンソースコミュニティと共に',
        p1: 'オープンソースのリソースにより、より快適で使いやすい体験を提供しています。',
        bottom_link: '利用規約 →',
        bottom_href: 'terms.html'
      },
      ko: {
        title: '오픈소스 크레딧 · 오늘 뭐 먹지?',
        back: '← 메뉴 선택으로 돌아가기',
        h1: '오픈소스 커뮤니티와 함께 만듭니다',
        p1: '오픈소스 리소스를 통해 더 깔끔하고 편리한 사용 경험을 제공합니다.',
        bottom_link: '이용약관 →',
        bottom_href: 'terms.html'
      },
      zh: {
        title: '开源致谢 · 今天吃什么？',
        back: '← 返回点餐页面',
        h1: '与开源社区共同构建',
        p1: '多项开源资源帮助本项目保持清晰、流畅和易用。',
        bottom_link: '使用条款 →',
        bottom_href: 'terms.html'
      }
    }
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
      document.documentElement.lang = 'vi';
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

  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.legal-page')) {
      const savedLang = AppearancePreferences.read().language;
      renderLegalPage(savedLang);
    }
  });
})();
