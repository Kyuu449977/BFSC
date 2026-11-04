/**
 * Genshin Impact Wish Simulator UI Integration for BFSC
 * Handles video playback, Skip button, staggered 10-item reveal, card inspector, and sharing.
 */
(function () {
  'use strict';

  let currentResults = [];
  let currentMode = 'single';
  let currentGacha = null;
  let onAcceptCallback = null;

  function getElements() {
    return {
      dialog: document.getElementById('wishDialog'),
      videoContainer: document.getElementById('wishVideoContainer'),
      video: document.getElementById('wishVideo'),
      skipBtn: document.getElementById('wishSkipBtn'),
      resultsContainer: document.getElementById('wishResultsContainer'),
      resultsContent: document.getElementById('wishResultsContent'),
      detailOverlay: document.getElementById('wishDetailOverlay'),
      closeBtn: document.getElementById('wishCloseBtn'),
      againBtn: document.getElementById('wishAgainBtn'),
      againLabel: document.getElementById('wishAgainLabel'),
      shareBtn: document.getElementById('wishShareBtn'),
      acceptBtn: document.getElementById('wishAcceptBtn'),
      pityBadge: document.getElementById('wishPityBadge'),
    };
  }

  function getFormatPrice(dish, gacha) {
    if (!dish) return '';
    if (gacha && typeof gacha.prices === 'function') {
      const p = gacha.prices(dish);
      if (p) {
        if (p.min === p.max) return `${p.min.toLocaleString('vi-VN')} đ`;
        return `${p.min.toLocaleString('vi-VN')} - ${p.max.toLocaleString('vi-VN')} đ`;
      }
    }
    if (dish.price) return `${dish.price.toLocaleString('vi-VN')} đ`;
    return '';
  }

  function openWish({ results, mode = 'single', gacha, onAccept }) {
    if (!results || !results.length) return;
    currentResults = results;
    currentMode = mode;
    currentGacha = gacha || (typeof window !== 'undefined' ? window.gachaEngine : null);
    onAcceptCallback = onAccept;

    const els = getElements();
    if (!els.dialog || !els.video) return;

    if (els.detailOverlay) {
      els.detailOverlay.hidden = true;
      els.detailOverlay.innerHTML = '';
    }

    const maxRarity = Math.max(...results.map((r) => r.rarity || r.dish?.rarity || 3));

    let videoUrl = 'assets/videos/wish/3starwish-single.mp4';
    if (results.length === 1) {
      if (maxRarity >= 5) {
        videoUrl = 'assets/videos/wish/5starwish-single.mp4';
      } else if (maxRarity === 4) {
        videoUrl = 'assets/videos/wish/4starwish-single.mp4';
      } else {
        videoUrl = 'assets/videos/wish/3starwish-single.mp4';
      }
    } else {
      if (maxRarity >= 5) {
        videoUrl = 'assets/videos/wish/5starwish.mp4';
      } else {
        videoUrl = 'assets/videos/wish/4starwish.mp4';
      }
    }

    if (els.videoContainer) els.videoContainer.hidden = false;
    if (els.resultsContainer) els.resultsContainer.hidden = true;

    if (typeof els.dialog.showModal === 'function' && !els.dialog.open) {
      els.dialog.showModal();
    }

    els.video.src = videoUrl;
    els.video.currentTime = 0;
    els.video.muted = false;

    const playPromise = els.video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback with sound; mute and retry
        els.video.muted = true;
        els.video.play().catch(() => {});
      });
    }

    const showResults = () => {
      try {
        els.video.pause();
      } catch (_) {}
      if (els.videoContainer) els.videoContainer.hidden = true;
      if (els.resultsContainer) els.resultsContainer.hidden = false;
      renderResults(currentResults, currentMode, currentGacha);
    };

    els.video.onended = showResults;
    if (els.skipBtn) {
      els.skipBtn.onclick = (e) => {
        e.preventDefault();
        showResults();
      };
    }
  }

  function showCardDetail(item, gacha) {
    const els = getElements();
    if (!els.detailOverlay || !item) return;

    const dish = item.dish;
    const rarity = item.rarity || dish.rarity || 3;
    const stars = '✦ '.repeat(rarity).trim();
    const priceStr = getFormatPrice(dish, gacha);
    const mapsQuery = encodeURIComponent(`${dish.name} quán ăn ngon gần đây`);

    els.detailOverlay.innerHTML = `
      <div class="wish-detail-card rarity-${rarity}">
        <button id="wishDetailCloseBtn" class="wish-detail-close" type="button" aria-label="Đóng chi tiết">✕</button>
        <div class="wish-detail-img-wrap">
          <img src="${dish.image || 'assets/image-unavailable.svg'}" alt="${dish.name}" class="wish-detail-img" onerror="this.src='assets/image-unavailable.svg'" />
          ${item.isNew ? '<span class="wish-new-badge">MỚI</span>' : ''}
        </div>
        <div class="wish-detail-body">
          <div class="wish-stars wish-stars-${rarity}">${stars}</div>
          <h3 class="wish-detail-title">${dish.name}</h3>
          <div class="wish-detail-meta-row">
            <span class="wish-detail-tag">${dish.type || 'Món ngon mỗi ngày'}</span>
            ${dish.calories ? `<span class="wish-detail-cal">🔥 ${dish.calories} kcal</span>` : ''}
            ${priceStr ? `<span class="wish-detail-price">${priceStr}</span>` : ''}
          </div>
          ${dish.desc ? `<p class="wish-detail-desc">${dish.desc}</p>` : ''}
          ${dish.quote ? `<blockquote class="wish-detail-quote">“${dish.quote}”</blockquote>` : ''}
          <div class="wish-detail-actions">
            <a href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer" class="wish-maps-btn">
              📍 Tìm quán trên Google Maps
            </a>
          </div>
        </div>
      </div>
    `;

    els.detailOverlay.hidden = false;

    const closeDetail = () => {
      els.detailOverlay.hidden = true;
      els.detailOverlay.innerHTML = '';
    };

    const closeBtn = document.getElementById('wishDetailCloseBtn');
    if (closeBtn) closeBtn.onclick = closeDetail;

    els.detailOverlay.onclick = (e) => {
      if (e.target === els.detailOverlay) closeDetail();
    };
  }

  function renderResults(results, mode, gacha) {
    const els = getElements();
    if (!els.resultsContent) return;

    if (els.detailOverlay) {
      els.detailOverlay.hidden = true;
      els.detailOverlay.innerHTML = '';
    }

    if (els.pityBadge && gacha && typeof gacha.getWishPity === 'function') {
      const pity = gacha.getWishPity();
      els.pityBadge.innerHTML = `✦ Đảm bảo <strong>4★</strong> trong: <strong>${pity.toNext4Star}</strong> lượt &nbsp;|&nbsp; ✦ Đảm bảo <strong>5★</strong> trong: <strong>${pity.toNext5Star}</strong> lượt`;
    }

    if (els.againLabel) {
      els.againLabel.textContent = results.length > 1 ? 'Cầu nguyện lại x10' : 'Cầu nguyện lại x1';
    }

    if (results.length === 1) {
      const item = results[0];
      const dish = item.dish;
      const rarity = item.rarity || dish.rarity || 3;
      const stars = '✦ '.repeat(rarity).trim();
      const priceStr = getFormatPrice(dish, gacha);
      const mapsQuery = encodeURIComponent(`${dish.name} quán ăn ngon gần đây`);

      els.resultsContent.innerHTML = `
        <div class="wish-single-showcase rarity-${rarity}">
          <div class="wish-single-info">
            ${item.isNew ? '<span class="wish-new-badge">MỚI</span>' : ''}
            <div class="wish-stars wish-stars-${rarity}">${stars}</div>
            <h3 class="wish-dish-name">${dish.name || 'Món ăn'}</h3>
            <div class="wish-dish-type">${dish.type || 'Món ngon mỗi ngày'}</div>
            ${priceStr ? `<div class="wish-dish-price">${priceStr}</div>` : ''}
            ${dish.desc ? `<p class="wish-dish-desc">${dish.desc}</p>` : ''}
            ${dish.quote ? `<blockquote class="wish-dish-quote">“${dish.quote}”</blockquote>` : ''}
            <div class="wish-single-actions">
              <a href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer" class="wish-maps-btn">
                📍 Tìm quán trên Google Maps
              </a>
            </div>
          </div>
          <div class="wish-single-visual">
            <div class="wish-img-frame rarity-${rarity}">
              <img src="${dish.image || 'assets/image-unavailable.svg'}" alt="${dish.name}" class="wish-dish-img" onerror="this.src='assets/image-unavailable.svg'" />
            </div>
          </div>
        </div>
      `;
    } else {
      // Sort: 5-star first, then 4-star, then 3-star
      const sorted = [...results].sort((a, b) => {
        const rA = a.rarity || a.dish?.rarity || 3;
        const rB = b.rarity || b.dish?.rarity || 3;
        return rB - rA;
      });

      els.resultsContent.innerHTML = `
        <div class="wish-cards-grid">
          ${sorted
            .map((item, index) => {
              const dish = item.dish;
              const rarity = item.rarity || dish.rarity || 3;
              const stars = '✦'.repeat(rarity);
              const badgeHtml = item.breakthrough
                ? `<span class="wish-breakthrough-badge">✦ ĐỘT PHÁ ${item.starLevel || rarity}★ ✦</span>`
                : item.isNew
                ? '<span class="wish-new-badge">MỚI</span>'
                : (item.shardsNeeded > 0)
                ? `<span class="wish-shard-badge">+1 Mảnh (${item.totalShards || item.shards || 1}/${item.shardsNeeded})</span>`
                : '';
              return `
                <div class="wish-card rarity-${rarity}" data-index="${index}" style="--card-index: ${index};" title="Nhấn để xem chi tiết ${dish.name}">
                  ${badgeHtml}
                  <div class="wish-card-img-wrap">
                    <img src="${dish.image || 'assets/image-unavailable.svg'}" alt="${dish.name}" class="wish-card-img" onerror="this.src='assets/image-unavailable.svg'" />
                  </div>
                  <div class="wish-card-meta">
                    <div class="wish-card-stars wish-stars-${rarity}">${stars}</div>
                    <div class="wish-card-name">${dish.name}</div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      `;

      // Attach click listeners to cards for inspector
      const cardEls = els.resultsContent.querySelectorAll('.wish-card');
      cardEls.forEach((cardEl) => {
        cardEl.onclick = () => {
          const idx = parseInt(cardEl.dataset.index, 10);
          if (!isNaN(idx) && sorted[idx]) {
            showCardDetail(sorted[idx], gacha);
          }
        };
      });
    }
  }

  function shareResults() {
    if (!currentResults || !currentResults.length) return;
    const names = currentResults
      .map((r) => {
        const stars = '✦'.repeat(r.rarity || r.dish?.rarity || 3);
        return `${stars} ${r.dish.name}`;
      })
      .join('\n');
    const shareText = `✨ Mình vừa cầu nguyện thực đơn trên Ăn Gì Đây (BFSC):\n\n${names}\n\n👉 Thử ngay: https://angiday.app/`;

    if (navigator.share) {
      navigator.share({ title: 'Thực Đơn Cầu Nguyện - Ăn Gì Đây', text: shareText }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert('Đã sao chép danh sách món ăn vào bộ nhớ tạm! Bạn có thể dán để gửi cho bạn bè.');
        })
        .catch(() => {
          alert(shareText);
        });
    } else {
      alert(shareText);
    }
  }

  function commitAndClose() {
    const els = getElements();
    if (els.video) {
      try {
        els.video.pause();
        els.video.removeAttribute('src');
        els.video.load();
      } catch (_) {}
    }

    // Determine the highest rarity dish for home hero spotlight
    const sorted = [...currentResults].sort((a, b) => {
      const rA = a.rarity || a.dish?.rarity || 3;
      const rB = b.rarity || b.dish?.rarity || 3;
      return rB - rA;
    });
    const bestDish = sorted[0]?.dish || null;

    if (onAcceptCallback && typeof onAcceptCallback === 'function') {
      try {
        onAcceptCallback(currentResults, bestDish);
      } catch (_) {}
    }
    if (els.dialog && els.dialog.open) {
      els.dialog.close();
    }
  }

  function initListeners() {
    const els = getElements();
    if (els.closeBtn) els.closeBtn.onclick = commitAndClose;
    if (els.acceptBtn) els.acceptBtn.onclick = commitAndClose;
    if (els.shareBtn) els.shareBtn.onclick = shareResults;

    if (els.againBtn) {
      els.againBtn.onclick = () => {
        if (!currentGacha) return;
        if (currentMode === 'multi' || currentResults.length > 1) {
          const newResults = currentGacha.rollWishMulti(10);
          openWish({
            results: newResults,
            mode: 'multi',
            gacha: currentGacha,
            onAccept: onAcceptCallback,
          });
        } else {
          const newResults = [currentGacha.rollWishOnce()];
          openWish({
            results: newResults,
            mode: 'single',
            gacha: currentGacha,
            onAccept: onAcceptCallback,
          });
        }
      };
    }

    if (els.dialog) {
      els.dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        commitAndClose();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListeners);
  } else {
    initListeners();
  }

  window.WishUI = {
    openWish,
    commitAndClose,
  };
})();
