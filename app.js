// ============================================================
// BỘ ĐIỀU KHIỂN CHÍNH (MAIN APP CONTROLLER)
// - Băng chuyền CS:GO ngẫu nhiên 100% không có tỷ lệ
// - Chế độ quay x1 và quay x3 (3 món lần lượt có hiệu ứng pháo hoa)
// - Tách biệt 3 mục: MÓN CHÍNH • ĐỒ ĂN VẶT • CÁC LOẠI ĐỒ UỐNG (KÈM NƯỚC NGỌT)
// - Tên món ngắn gọn, đúng trọng tâm, bỏ đánh giá sao
// - Màn hình tải trang (Preloader / Splash)
// - Hỗ trợ Mã QR & Public Domain Internet
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const roulette = new CSGOCaseRoulette('reelTrack', 'reelViewport');
  const fireworks = new CelebrationFireworks('fireworksCanvas');
  gachaEngine.animator = roulette;

  // DOM Elements - Preloader
  const preloader = document.getElementById('preloader');

  // DOM Elements - Header
  const periodBadge = document.getElementById('periodBadge');
  const dynamicTitle = document.getElementById('dynamicTitle');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');
  const mainMealModeBtn = document.getElementById('mainMealModeBtn');
  const mainMealBtnText = document.getElementById('mainMealBtnText');
  const snackModeBtn = document.getElementById('snackModeBtn');
  const drinkModeBtn = document.getElementById('drinkModeBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const qrToggleBtn = document.getElementById('qrToggleBtn');
  const collectionBadgeBtn = document.getElementById('collectionBadgeBtn');
  const collectionCount = document.getElementById('collectionCount');

  // DOM Elements - Banner
  const bannerShowcase = document.getElementById('bannerShowcase');
  const bannerBgArt = document.getElementById('bannerBgArt');
  const bannerTag = document.getElementById('bannerTag');
  const bannerTitleText = document.getElementById('bannerTitleText');
  const bannerSubtitleText = document.getElementById('bannerSubtitleText');
  const featuredDishName = document.getElementById('featuredDishName');
  const artCardImage = document.getElementById('artCardImage');
  const artCardDishName = document.getElementById('artCardDishName');
  const artCardElement = document.getElementById('artCardElement');

  // Nút Quay Món
  const wishSingleBtn = document.getElementById('wishSingleBtn');
  const wishBtnLabel = document.getElementById('wishBtnLabel');
  const wishTripleBtn = document.getElementById('wishTripleBtn');

  // CS:GO Roulette Modal Elements
  const csgoRouletteOverlay = document.getElementById('csgoRouletteOverlay');
  const csgoCaseTitle = document.getElementById('csgoCaseTitle');
  const rouletteStepBadge = document.getElementById('rouletteStepBadge');
  const skipBtn = document.getElementById('skipBtn');

  // Reveal Overlay
  const revealOverlay = document.getElementById('revealOverlay');
  const singleRevealContainer = document.getElementById('singleRevealContainer');
  const revealCard = document.getElementById('revealCard');
  const newCollectedBadge = document.getElementById('newCollectedBadge');
  const revealStepBadge = document.getElementById('revealStepBadge');
  const revealFoodImage = document.getElementById('revealFoodImage');
  const revealTitle = document.getElementById('revealTitle');
  const revealElementBadge = document.getElementById('revealElementBadge');
  const revealPrice = document.getElementById('revealPrice');
  const collectedTimesText = document.getElementById('collectedTimesText');
  const revealDesc = document.getElementById('revealDesc');
  const revealQuote = document.getElementById('revealQuote');
  const rerollBtn = document.getElementById('rerollBtn');
  const nextTripleBtn = document.getElementById('nextTripleBtn');
  const closeRevealBtn = document.getElementById('closeRevealBtn');

  // Triple Summary Container
  const tripleSummaryContainer = document.getElementById('tripleSummaryContainer');
  const tripleSummaryCards = document.getElementById('tripleSummaryCards');
  const tripleSummaryOkBtn = document.getElementById('tripleSummaryOkBtn');

  // Modal Tất Cả Các Món
  const allDishesModal = document.getElementById('allDishesModal');
  const closeAllDishesBtn = document.getElementById('closeAllDishesBtn');
  const allDishesGrid = document.getElementById('allDishesGrid');
  const modalCollectionCount = document.getElementById('modalCollectionCount');
  const modalTotalDishes = document.getElementById('modalTotalDishes');
  const modalCollectionPercent = document.getElementById('modalCollectionPercent');
  const modalCollectionProgressBar = document.getElementById('modalCollectionProgressBar');
  const filterBtns = document.querySelectorAll('.all-dishes-filters .filter-btn');

  // Modal Mã QR Cho Điện Thoại
  const qrModal = document.getElementById('qrModal');
  const closeQrBtn = document.getElementById('closeQrBtn');
  const qrImage = document.getElementById('qrImage');
  const qrUrlInput = document.getElementById('qrUrlInput');
  const copyQrUrlBtn = document.getElementById('copyQrUrlBtn');
  const lanUrlInput = document.getElementById('lanUrlInput');
  const copyLanUrlBtn = document.getElementById('copyLanUrlBtn');

  // Toast
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  let lastDetectedMealKey = getCurrentMealPeriod();
  let bannerSlideTimer = null;
  let currentSlideIndex = 0;
  let currentFilter = 'all';

  // Biến quản lý chế độ quay x3
  let isTripleMode = false;
  let tripleResults = [];
  let currentTripleIndex = 0;

  // Cấu hình URL Public Internet & Wi-Fi LAN động
  function applyActiveUrl(url, isLan = false) {
    if (!url) return;
    if (!isLan) {
      qrUrlInput.value = url;
      if (qrImage) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(url)}`;
        qrImage.onerror = () => { qrImage.src = 'images/qr_mobile.png'; };
      }
    } else if (lanUrlInput) {
      lanUrlInput.value = url;
    }
  }

  // Tự động nhận diện URL từ Server hoặc Domain Cloud đang chạy
  if (window.location.protocol.startsWith('http') && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
    applyActiveUrl(window.location.origin);
  } else {
    // Nếu mở từ localhost hoặc file, truy vấn backend server info
    fetch('/api/server-info')
      .then(r => r.json())
      .then(info => {
        if (info.public_url) applyActiveUrl(info.public_url);
        if (info.lan_url) applyActiveUrl(info.lan_url, true);
      })
      .catch(() => {
        applyActiveUrl('http://192.168.1.3:8080', true);
      });
  }

  // TẮT MÀN HÌNH TẢI TRANG (PRELOADER)
  function hidePreloader() {
    if (preloader) {
      preloader.classList.add('hide-preloader');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 700);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 850);
  });
  // Dự phòng trường hợp load đã xong trước đó
  setTimeout(hidePreloader, 1400);

  // 1. HIỂN THỊ THÔNG BÁO TOAST
  function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  // 2. CẬP NHẬT TIẾN ĐỘ BỘ SƯU TẬP
  function updateCollectionStatsUI() {
    const stats = gachaEngine.getCollectionStats();
    collectionCount.textContent = `${stats.unlocked}/${stats.total}`;
    modalCollectionCount.textContent = stats.unlocked;
    modalTotalDishes.textContent = stats.total;
    modalCollectionPercent.textContent = `${stats.percentage}%`;
    modalCollectionProgressBar.style.width = `${stats.percentage}%`;
  }

  // 3. ÁP DỤNG THEME MÀU THEO TỪNG BUỔI HOẶC MỤC
  function applyBannerTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-bright', theme.accentBright);
    root.style.setProperty('--theme-accent-glow', theme.accentGlow);
    root.style.setProperty('--theme-page-gradient', theme.pageGradient);
    root.style.setProperty('--theme-banner-gradient', theme.bannerGradient);
    root.style.setProperty('--theme-btn-gradient', theme.btnGradient);
    root.style.setProperty('--theme-btn-border', theme.btnBorder);
    root.style.setProperty('--theme-btn-text', theme.btnText);
    document.body.style.backgroundColor = theme.bgSecondary || '#0b0f1d';
  }

  // 4. TRÌNH CHIẾU ẢNH MÓN TRÊN BANNER TỰ ĐỘNG THAY ĐỔI SAU MỖI 2 GIÂY
  function startBannerSlideshow() {
    if (bannerSlideTimer) clearInterval(bannerSlideTimer);

    bannerSlideTimer = setInterval(() => {
      const banner = gachaEngine.getCurrentBannerData();
      const dishes = banner.dishes;
      if (!dishes || dishes.length === 0) return;

      currentSlideIndex = (currentSlideIndex + 1) % dishes.length;
      const dish = dishes[currentSlideIndex];

      artCardImage.style.opacity = '0.3';
      setTimeout(() => {
        artCardDishName.textContent = dish.name;
        artCardElement.textContent = dish.type;
        artCardImage.src = dish.image;
        bannerBgArt.style.backgroundImage = `url('${dish.image}')`;
        featuredDishName.textContent = dish.name;
        artCardImage.style.opacity = '1';
      }, 150);
    }, 2000);
  }

  // 5. CẬP NHẬT GIAO DIỆN THEO 3 MỤC: MÓN CHÍNH • ĂN VẶT • ĐỒ UỐNG
  function renderBanner() {
    const currentMealKey = getCurrentMealPeriod();
    const currentMealData = FOOD_DATABASE[currentMealKey];
    const banner = gachaEngine.getCurrentBannerData();

    applyBannerTheme(banner.theme);

    mainMealBtnText.textContent = `Món Chính (${currentMealData.name})`;

    // Reset trạng thái 3 nút
    mainMealModeBtn.classList.remove('active');
    snackModeBtn.classList.remove('active');
    drinkModeBtn.classList.remove('active');

    if (gachaEngine.currentMode === 'snacks') {
      snackModeBtn.classList.add('active');
      periodBadge.textContent = 'MÓN ĂN VẶT';
      wishBtnLabel.textContent = 'Quay Đồ Ăn Vặt';
    } else if (gachaEngine.currentMode === 'drinks') {
      drinkModeBtn.classList.add('active');
      periodBadge.textContent = 'ĐỒ UỐNG';
      wishBtnLabel.textContent = 'Quay Đồ Uống';
    } else {
      mainMealModeBtn.classList.add('active');
      periodBadge.textContent = currentMealData.name.toUpperCase();
      wishBtnLabel.textContent = `Quay ${currentMealData.name}`;
    }

    document.title = `${banner.title} - Vòng Quay Ẩm Thực`;
    dynamicTitle.textContent = banner.title;

    bannerTag.textContent = gachaEngine.currentMode === 'drinks'
      ? 'THỨC UỐNG & NƯỚC GIẢI KHÁT'
      : (gachaEngine.currentMode === 'snacks'
          ? 'ĐỒ ĂN VẶT VỈA HÈ QUÁN XÁ'
          : `ẨM THỰC ${banner.name.toUpperCase()}`);

    bannerTitleText.textContent = banner.bannerName;
    bannerSubtitleText.textContent = banner.subtitle;

    currentSlideIndex = 0;
    const firstDish = banner.dishes[0];
    if (firstDish) {
      artCardDishName.textContent = firstDish.name;
      artCardElement.textContent = firstDish.type;
      artCardImage.src = firstDish.image;
      bannerBgArt.style.backgroundImage = `url('${firstDish.image}')`;
      featuredDishName.textContent = firstDish.name;
    }

    startBannerSlideshow();
    updateCollectionStatsUI();
  }

  // 6. ĐỒNG HỒ THỜI GIAN THỰC & TỰ ĐỘNG CHUYỂN BUỔI
  function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');

    const mealKey = getCurrentMealPeriod();
    const mealName = FOOD_DATABASE[mealKey].name;
    currentTimeDisplay.textContent = `${h}:${m}:${s} • ${mealName}`;

    if (mealKey !== lastDetectedMealKey && gachaEngine.currentMode === 'main') {
      lastDetectedMealKey = mealKey;
      renderBanner();
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // 7. CHUYỂN ĐỔI 3 CHẾ ĐỘ: MÓN CHÍNH • ĂN VẶT • ĐỒ UỐNG
  mainMealModeBtn.addEventListener('click', () => {
    if (gachaEngine.currentMode === 'main') return;
    audioSystem.playClick();
    gachaEngine.setMode('main');
    renderBanner();
  });

  snackModeBtn.addEventListener('click', () => {
    if (gachaEngine.currentMode === 'snacks') return;
    audioSystem.playClick();
    gachaEngine.setMode('snacks');
    renderBanner();
  });

  drinkModeBtn.addEventListener('click', () => {
    if (gachaEngine.currentMode === 'drinks') return;
    audioSystem.playClick();
    gachaEngine.setMode('drinks');
    renderBanner();
  });

  // Bật / Tắt âm thanh
  soundToggleBtn.addEventListener('click', () => {
    const isMuted = audioSystem.toggleMute();
    soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
    showToast(isMuted ? 'Đã tắt âm thanh' : 'Đã bật âm thanh');
  });

  // Bật / Tắt Modal Mã QR Điện Thoại
  qrToggleBtn.addEventListener('click', () => {
    audioSystem.playClick();
    qrModal.classList.add('active');
  });

  closeQrBtn.addEventListener('click', () => {
    audioSystem.playClick();
    qrModal.classList.remove('active');
  });

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
      qrModal.classList.remove('active');
    }
  });

  copyQrUrlBtn.addEventListener('click', () => {
    audioSystem.playClick();
    const url = qrUrlInput.value;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`Đã sao chép link Public: ${url}`);
      });
    } else {
      qrUrlInput.select();
      document.execCommand('copy');
      showToast(`Đã sao chép link!`);
    }
  });

  if (copyLanUrlBtn) {
    copyLanUrlBtn.addEventListener('click', () => {
      audioSystem.playClick();
      const url = lanUrlInput ? lanUrlInput.value : '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast(`Đã sao chép link Wi-Fi LAN: ${url}`);
        });
      } else if (lanUrlInput) {
        lanUrlInput.select();
        document.execCommand('copy');
        showToast(`Đã sao chép link LAN!`);
      }
    });
  }

  // 8. KHI NHẤP VÀO BANNER HIỆN RA TẤT CẢ CÁC MÓN
  function renderAllDishesModal() {
    updateCollectionStatsUI();
    allDishesGrid.innerHTML = '';

    const allDishes = gachaEngine.getAllDishesList();
    const filtered = currentFilter === 'all'
      ? allDishes
      : allDishes.filter(d => d.mealId === currentFilter);

    filtered.forEach(dish => {
      const times = gachaEngine.collection[dish.id] || 0;
      const isCollected = times > 0;

      const card = document.createElement('div');
      card.className = `dish-grid-card ${isCollected ? 'is-collected' : 'is-uncollected'}`;
      card.innerHTML = `
        <div class="dish-grid-thumb-wrap">
          <img class="dish-grid-thumb" src="${dish.image}" alt="${dish.name}" loading="lazy" />
          <span class="dish-grid-meal-badge">${dish.mealName}</span>
          <span class="dish-grid-status-badge ${isCollected ? 'collected' : 'uncollected'}">
            ${isCollected ? `✓ Thu thập (x${times})` : '🔒 Chưa mở'}
          </span>
        </div>
        <div class="dish-grid-body">
          <div class="dish-grid-name">${dish.name}</div>
          <div class="dish-grid-type">${dish.type}</div>
          <div class="dish-grid-price">💵 ${dish.price}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        allDishesModal.classList.remove('active');
        isTripleMode = false;
        showDishReveal(dish, false, times);
      });

      allDishesGrid.appendChild(card);
    });

    allDishesModal.classList.add('active');
  }

  bannerShowcase.addEventListener('click', () => {
    audioSystem.playClick();
    renderAllDishesModal();
  });

  collectionBadgeBtn.addEventListener('click', () => {
    audioSystem.playClick();
    renderAllDishesModal();
  });

  closeAllDishesBtn.addEventListener('click', () => {
    audioSystem.playClick();
    allDishesModal.classList.remove('active');
  });

  allDishesModal.addEventListener('click', (e) => {
    if (e.target === allDishesModal) {
      allDishesModal.classList.remove('active');
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      audioSystem.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAllDishesModal();
    });
  });

  // 9. QUAY RANDOM 100% NGẪU NHIÊN ĐỒNG ĐỀU (KHÔNG TỶ LỆ)
  function triggerCSGOCaseOpening(singleDishResult = null, stepText = '') {
    if (roulette.isSpinning) return;

    const banner = gachaEngine.getCurrentBannerData();
    const rollResult = singleDishResult || gachaEngine.rollSingleDish();

    revealOverlay.classList.remove('active');

    csgoCaseTitle.textContent = gachaEngine.currentMode === 'drinks'
      ? 'VÒNG QUAY ĐỒ UỐNG'
      : (gachaEngine.currentMode === 'snacks'
          ? 'VÒNG QUAY ĂN VẶT'
          : `VÒNG QUAY ${banner.name.toUpperCase()}`);

    if (stepText) {
      rouletteStepBadge.style.display = 'inline-block';
      rouletteStepBadge.textContent = stepText;
    } else {
      rouletteStepBadge.style.display = 'none';
    }

    csgoRouletteOverlay.classList.add('active');

    roulette.start(rollResult.dish, banner.dishes, (winner) => {
      csgoRouletteOverlay.classList.remove('active');
      showDishReveal(winner, rollResult.isNew, rollResult.count);
      updateCollectionStatsUI();
    });
  }

  // Bắt đầu quy trình quay x3 món lần lượt
  function startTripleRollSequence() {
    if (roulette.isSpinning) return;
    isTripleMode = true;
    currentTripleIndex = 0;
    tripleResults = [
      gachaEngine.rollSingleDish(),
      gachaEngine.rollSingleDish(),
      gachaEngine.rollSingleDish()
    ];

    triggerCSGOCaseOpening(tripleResults[0], 'Món 1 / 3');
  }

  // Xử lý chuyển bước trong quay x3
  function proceedNextTripleStep() {
    audioSystem.playClick();
    currentTripleIndex++;

    if (currentTripleIndex < 3) {
      triggerCSGOCaseOpening(tripleResults[currentTripleIndex], `Món ${currentTripleIndex + 1} / 3`);
    } else {
      // Đã hoàn thành 3 món -> hiển thị bảng tổng kết Combo
      showTripleSummary();
    }
  }

  // Hiển thị bảng tổng kết Combo 3 món
  function showTripleSummary() {
    singleRevealContainer.style.display = 'none';
    tripleSummaryContainer.style.display = 'flex';
    tripleSummaryCards.innerHTML = '';

    tripleResults.forEach((res, idx) => {
      const item = res.dish;
      const card = document.createElement('div');
      card.className = 'triple-card-item';
      card.innerHTML = `
        <img class="triple-card-thumb" src="${item.image}" alt="${item.name}" />
        <div class="triple-card-info">
          <div class="triple-card-name">#${idx + 1}. ${item.name}</div>
          <div class="triple-card-type">${item.type}</div>
          <div class="dish-grid-price">💵 ${item.price}</div>
        </div>
      `;
      tripleSummaryCards.appendChild(card);
    });

    fireworks.launch(3500);
    revealOverlay.classList.add('active');
  }

  tripleSummaryOkBtn.addEventListener('click', () => {
    audioSystem.playClick();
    revealOverlay.classList.remove('active');
    singleRevealContainer.style.display = 'block';
    tripleSummaryContainer.style.display = 'none';
    isTripleMode = false;
    showToast('🎉 Chúc bạn có một bữa ăn ngon miệng cùng combo đã chọn!');
  });

  // Sự kiện nút Quay 1 Món và Quay x3 Món
  wishSingleBtn.addEventListener('click', () => {
    audioSystem.playClick();
    isTripleMode = false;
    triggerCSGOCaseOpening();
  });

  wishTripleBtn.addEventListener('click', () => {
    audioSystem.playClick();
    startTripleRollSequence();
  });

  rerollBtn.addEventListener('click', () => {
    audioSystem.playClick();
    isTripleMode = false;
    triggerCSGOCaseOpening();
  });

  nextTripleBtn.addEventListener('click', () => {
    proceedNextTripleStep();
  });

  skipBtn.addEventListener('click', () => {
    audioSystem.playClick();
    roulette.skip();
  });

  // 10. HIỂN THỊ KẾT QUẢ KHI DỪNG KIM KÈM PHÁO HOA CHÚC MỪNG
  function showDishReveal(dish, isNew = false, count = 1) {
    singleRevealContainer.style.display = 'block';
    tripleSummaryContainer.style.display = 'none';

    revealCard.className = `reveal-card tier-${dish.rarity}`;

    if (isNew) {
      newCollectedBadge.style.display = 'inline-block';
      showToast(`🎉 Bạn vừa thu thập món mới: "${dish.name}"!`);
    } else {
      newCollectedBadge.style.display = 'none';
    }

    if (isTripleMode) {
      revealStepBadge.style.display = 'inline-block';
      revealStepBadge.textContent = `🎲 Món ${currentTripleIndex + 1} / 3`;
      rerollBtn.style.display = 'none';
      closeRevealBtn.style.display = 'none';
      nextTripleBtn.style.display = 'inline-block';
      nextTripleBtn.textContent = currentTripleIndex < 2 
        ? `Tiếp Tục Món ${currentTripleIndex + 2} ⏩`
        : `Xem Tổng Kết Combo 3 Món 🎉`;
    } else {
      revealStepBadge.style.display = 'none';
      rerollBtn.style.display = 'inline-block';
      closeRevealBtn.style.display = 'inline-block';
      nextTripleBtn.style.display = 'none';
    }

    collectedTimesText.textContent = `✓ Đã thu thập: x${count || 1}`;
    revealFoodImage.src = dish.image;
    revealTitle.textContent = dish.name;
    revealElementBadge.textContent = dish.type;
    revealPrice.innerHTML = `💵 Tham khảo: <strong>${dish.price}</strong>`;
    revealDesc.textContent = dish.desc;
    revealQuote.textContent = dish.quote;

    artCardDishName.textContent = dish.name;
    artCardElement.textContent = dish.type;
    artCardImage.src = dish.image;

    revealOverlay.classList.add('active');

    // BẮN PHÁO HOA CHÚC MỪNG!
    fireworks.launch(3000);
  }

  closeRevealBtn.addEventListener('click', () => {
    audioSystem.playClick();
    fireworks.stop();
    revealOverlay.classList.remove('active');
    if (gachaEngine.currentDish) {
      showToast(`Đã chọn: "${gachaEngine.currentDish.name}" cho hôm nay!`);
    }
  });

  renderBanner();
});
