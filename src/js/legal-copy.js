/* Supplemental content localization only; clock, timezone and appearance are untouched. */
(() => {
  const page = location.pathname.split('/').pop();
  const main = document.querySelector('.legal-page');
  if (!main) return;
  const paragraphs = [...main.querySelectorAll(':scope > p')];
  const original = paragraphs.map((node) => node.innerHTML);
  const headings = [...main.querySelectorAll(':scope > h2')];
  const originalHeadings = headings.map((node) => node.textContent);
  const copy = {
    en: {
      terms: 'Terms of use →',
      privacy: 'Privacy →',
      language: 'Change language',
      motion: 'Native animation',
      photos: 'Food and drink photos',
      paragraphs: [
        'Open-source resources help make this website clear and easy to use.',
        'SVG icons from <a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener">Lucide</a>, under the <a href="assets/licenses/lucide-LICENSE.txt">ISC license</a>. The app stores its selected icons locally.',
        'The Vietnamese-capable font is distributed through <a href="https://fontsource.org/fonts/be-vietnam-pro" target="_blank" rel="noopener">Fontsource</a> under the <a href="assets/licenses/be-vietnam-pro-LICENSE.txt">SIL Open Font License 1.1</a>.',
        'The logo follows official branding. Restaurant search opens Google Maps directly; this website does not use a paid places API.',
        'Fonts and icons are stored locally for offline use.',
        'This version uses CSS and the browser Web Animations API. Motion is no longer loaded; its earlier license is retained for historical reference.',
        'Each photo has a source record generated from audited metadata. Photos with missing or unclear source or license information are replaced by a placeholder in the app and marked below. This checks metadata completeness and consistency; it is not independent verification of the source claims.',
      ],
    },
    ja: {
      terms: '利用規約 →',
      privacy: 'プライバシー →',
      language: '言語を変更',
      motion: 'ブラウザ標準のアニメーション',
      photos: '料理・飲み物の写真',
      paragraphs: [
        'オープンソースの素材が、わかりやすく使いやすいサイト作りを支えています。',
        'SVGアイコンは<a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener">Lucide</a>製で、<a href="assets/licenses/lucide-LICENSE.txt">ISCライセンス</a>に従います。使用するアイコンをアプリ内に保存しています。',
        'ベトナム語対応フォントを<a href="https://fontsource.org/fonts/be-vietnam-pro" target="_blank" rel="noopener">Fontsource</a>から配布し、<a href="assets/licenses/be-vietnam-pro-LICENSE.txt">SIL Open Font License 1.1</a>に従います。',
        'ロゴは公式ブランドの規定に従います。お店の検索はGoogleマップを直接開き、有料の場所検索APIは使用しません。',
        'オフラインでも使えるよう、フォントとアイコンを端末内に保存します。',
        '現在の版はCSSとブラウザ標準のWeb Animations APIを使用します。Motionは読み込まず、旧版のライセンスを履歴資料として保存しています。',
        '各写真の出典記録は点検済みメタデータから生成します。出典やライセンスが不明確な写真はアプリ内で仮画像に置き換え、下に表示します。この点検は記録の完全性と整合性を確認するもので、出典の主張を独立に検証するものではありません。',
      ],
    },
    ko: {
      terms: '이용약관 →',
      privacy: '개인정보 보호 →',
      language: '언어 변경',
      motion: '브라우저 기본 애니메이션',
      photos: '음식과 음료 사진',
      paragraphs: [
        '오픈 소스 자료는 이해하기 쉽고 편리한 웹사이트를 만드는 데 도움을 줍니다.',
        'SVG 아이콘은 <a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener">Lucide</a>에서 제공하며 <a href="assets/licenses/lucide-LICENSE.txt">ISC 라이선스</a>를 따릅니다. 필요한 아이콘을 앱에 직접 저장합니다.',
        '베트남어를 지원하는 글꼴은 <a href="https://fontsource.org/fonts/be-vietnam-pro" target="_blank" rel="noopener">Fontsource</a>를 통해 배포되며 <a href="assets/licenses/be-vietnam-pro-LICENSE.txt">SIL Open Font License 1.1</a>을 따릅니다.',
        '로고는 공식 브랜드 지침을 따릅니다. 식당 검색은 Google 지도를 직접 열며 유료 장소 API를 사용하지 않습니다.',
        '오프라인 사용을 위해 글꼴과 아이콘을 로컬에 저장합니다.',
        '현재 버전은 CSS와 브라우저의 Web Animations API를 사용합니다. Motion은 로드하지 않으며 이전 라이선스는 기록용으로 보관합니다.',
        '각 사진의 출처 기록은 점검한 메타데이터에서 생성합니다. 출처나 라이선스가 불명확한 사진은 앱에서 대체 이미지로 표시하고 아래에 표시합니다. 이 점검은 메타데이터의 완전성과 일관성을 확인하며, 출처 주장을 독립적으로 검증한 것은 아닙니다.',
      ],
    },
    zh: {
      terms: '使用条款 →',
      privacy: '隐私政策 →',
      language: '更改语言',
      motion: '浏览器原生动画',
      photos: '菜品与饮品照片',
      paragraphs: [
        '开源资源帮助本网站保持清晰易用。',
        'SVG图标来自<a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener">Lucide</a>，遵循<a href="assets/licenses/lucide-LICENSE.txt">ISC许可</a>。应用仅选用部分图标并存储在本地。',
        '支持越南语的字体通过<a href="https://fontsource.org/fonts/be-vietnam-pro" target="_blank" rel="noopener">Fontsource</a>分发，遵循<a href="assets/licenses/be-vietnam-pro-LICENSE.txt">SIL Open Font License 1.1</a>。',
        '标志遵循官方品牌规范。餐馆搜索直接打开Google地图，本网站不使用付费地点API。',
        '字体和图标均存储在本地，以支持离线使用。',
        '当前版本使用CSS及浏览器Web Animations API，不再加载Motion；旧版许可保留作为历史记录。',
        '每张照片的来源记录均根据审查的元数据生成。来源或许可不明确的照片在应用中使用占位图，并在下方标注。此项审查仅检查元数据的完整性与一致性，并非对来源声明的独立核实。',
      ],
    },
  };
  function render() {
    const lang = document.documentElement.lang || 'vi',
      dict = copy[lang];
    main
      .querySelector('.legal-lang-select')
      ?.setAttribute('aria-label', dict?.language || 'Đổi ngôn ngữ');
    if (page === 'privacy.html' || page === 'terms.html') {
      const link = main.querySelector(':scope > a:last-child');
      if (link && dict) link.textContent = page === 'privacy.html' ? dict.terms : dict.privacy;
      return;
    }
    if (page !== 'credits.html') return;
    paragraphs.forEach((node, index) => {
      node.innerHTML = dict?.paragraphs[index] || original[index];
    });
    headings.forEach((node, index) => {
      node.textContent =
        index === 3 && dict
          ? dict.motion
          : index === 4 && dict
            ? dict.photos
            : originalHeadings[index];
    });
    for (const row of main.querySelectorAll('[data-dish-id]')) {
      const dish = Catalog.getDish(row.dataset.dishId);
      if (dish) row.querySelector('strong').textContent = getDishName(dish, lang);
    }
  }
  document.addEventListener('DOMContentLoaded', render);
  document.addEventListener('change', (event) => {
    if (event.target.matches('.legal-lang-select')) render();
  });
  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();
