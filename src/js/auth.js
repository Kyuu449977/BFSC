/**
 * Authentication & Inventory UI Controller for BFSC
 * Manages user session, daily ticket counter, inventory modal, and star evolution display.
 */
(function () {
  'use strict';

  let currentUser = null;

  function $(id) {
    return document.getElementById(id);
  }

  function isAuthenticated() {
    return Boolean(currentUser);
  }

  function getUser() {
    return currentUser;
  }

  function getTickets() {
    return currentUser?.tickets?.remaining ?? 0;
  }

  function openAuthModal() {
    const dialog = $('authDialog');
    if (dialog && typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }
  }

  function closeAuthModal() {
    const dialog = $('authDialog');
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  async function handleLogin(payload) {
    try {
      const data = await window.API.login(payload);
      currentUser = data.user;
      renderHeaderAuth();
      closeAuthModal();
      if (typeof window.toast === 'function') {
        window.toast(`👋 Chào mừng ${currentUser.name}! Bạn nhận được ${currentUser.tickets.remaining} vé hôm nay.`);
      }
      return currentUser;
    } catch (err) {
      alert(`Đăng nhập không thành công: ${err.message}`);
      throw err;
    }
  }

  async function quickLogin() {
    const nameInput = $('authNameInput');
    const name = nameInput?.value?.trim() || 'Thực Khách Ẩm Thực';
    return await handleLogin({
      name,
      email: `${name.toLowerCase().replace(/\\s+/g, '_')}@angiday.local`,
      provider: 'quick',
    });
  }

  async function googleLogin() {
    // In demo environment, generates an authentic Google user session
    return await handleLogin({
      name: 'Nguyễn Hoàng Nam',
      email: 'hoangnam.foodie@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      provider: 'google',
    });
  }

  function logout() {
    window.API.setToken('');
    currentUser = null;
    renderHeaderAuth();
    if (typeof window.toast === 'function') {
      window.toast('Đã đăng xuất tài khoản.');
    }
  }

  function updateTickets(tickets) {
    if (currentUser && tickets) {
      currentUser.tickets = tickets;
      renderHeaderAuth();
    }
  }

  function renderHeaderAuth() {
    const authContainer = $('headerAuthContainer');
    const wishTenBtn = $('wishTenBtn');

    if (!authContainer) return;

    if (currentUser) {
      const rem = currentUser.tickets?.remaining ?? 20;
      const max = currentUser.tickets?.max ?? 20;
      authContainer.innerHTML = `
        <div class="user-ticket-pill" title="Hồi phục 20 vé vào 00:00 mỗi ngày">
          <span class="ticket-icon">⚡</span>
          <strong>${rem}/${max}</strong>
          <span class="ticket-label">vé</span>
        </div>
        <button id="openInventoryBtn" class="inventory-pill-btn" type="button" title="Mở Kho Ẩm Thực & Tiến trình nâng sao">
          🎒 Kho Đồ
        </button>
        <div class="user-profile-badge" title="${currentUser.email}">
          <span class="user-name">${currentUser.name}</span>
          <button id="logoutBtn" class="logout-mini-btn" type="button" title="Đăng xuất">✕</button>
        </div>
      `;

      const invBtn = $('openInventoryBtn');
      if (invBtn) invBtn.onclick = openInventoryModal;

      const logBtn = $('logoutBtn');
      if (logBtn) logBtn.onclick = logout;

      // Unlock wishTenBtn
      if (wishTenBtn) {
        wishTenBtn.classList.remove('locked');
        wishTenBtn.innerHTML = '<span data-icon="sparkles"></span>Ước x10';
        wishTenBtn.title = `Cầu nguyện đại tiệc 10 món (${rem >= 10 ? 'Còn vé' : 'Hết vé'})`;
      }
    } else {
      authContainer.innerHTML = `
        <button id="loginTriggerBtn" class="login-trigger-btn" type="button">
          👤 Đăng nhập
        </button>
      `;

      const loginBtn = $('loginTriggerBtn');
      if (loginBtn) loginBtn.onclick = openAuthModal;

      // Lock wishTenBtn
      if (wishTenBtn) {
        wishTenBtn.classList.add('locked');
        wishTenBtn.innerHTML = '<span class="lock-icon">🔒</span>Ước x10';
        wishTenBtn.title = 'Đăng nhập để mở khóa Cầu nguyện 10 món và nâng cấp sao';
      }
    }
  }

  async function openInventoryModal() {
    const dialog = $('inventoryDialog');
    const content = $('inventoryContent');
    if (!dialog || !content) return;

    content.innerHTML = '<div class="inv-loading">Đang tải kho ẩm thực...</div>';
    if (typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }

    try {
      const data = await window.API.getInventory();
      const inventory = data.inventory || {};
      const items = Object.values(inventory);

      // Load catalog to get dish names and images
      const catalog = window.FOOD_DATABASE ? Object.values(window.FOOD_DATABASE).flatMap(b => b.dishes || []) : [];
      const dishMap = new Map(catalog.map(d => [d.id, d]));

      if (!items.length) {
        content.innerHTML = `
          <div class="inv-empty">
            <p>Kho ẩm thực của bạn chưa có món nào!</p>
            <p class="inv-hint">Hãy thực hiện Cầu nguyện 10 món để thu thập và nâng cấp món ăn lên 5 Sao nhé.</p>
          </div>
        `;
        return;
      }

      // Sort by starLevel desc
      items.sort((a, b) => (b.starLevel || 3) - (a.starLevel || 3));

      content.innerHTML = `
        <div class="inv-stats-banner">
          <div>Tổng số món: <strong>${items.length}</strong></div>
          <div>Món 5★ Hoàng Gia: <strong style="color: #ffd700;">${items.filter(i => i.starLevel === 5).length}</strong></div>
        </div>
        <div class="inv-grid">
          ${items.map(item => {
            const dish = dishMap.get(item.id) || { name: item.id, image: 'assets/image-unavailable.svg' };
            const stars = item.starLevel || 3;
            const shards = item.shards || 0;
            const needed = item.shardsNeeded || 0;
            const pct = needed > 0 ? Math.min(100, Math.round((shards / needed) * 100)) : 100;
            const nextStar = stars < 5 ? stars + 1 : 5;

            return `
              <div class="inv-card rarity-${stars}">
                <div class="inv-card-img-wrap">
                  <img src="${dish.image}" alt="${dish.name}" class="inv-card-img" onerror="this.src='assets/image-unavailable.svg'" />
                </div>
                <div class="inv-card-info">
                  <div class="inv-card-stars wish-stars-${stars}">${'✦'.repeat(stars)}</div>
                  <h4 class="inv-card-title">${dish.name}</h4>
                  ${stars < 5 ? `
                    <div class="inv-progress-wrap" title="Cần thêm ${needed - shards} mảnh để lên ${nextStar}★">
                      <div class="inv-progress-bar" style="width: ${pct}%;"></div>
                      <span class="inv-progress-label">${shards}/${needed} mảnh lên ${nextStar}★</span>
                    </div>
                  ` : `
                    <div class="inv-max-badge">✦ TỐI ĐA 5★ HOÀNG GIA ✦</div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch (err) {
      content.innerHTML = `<div class="inv-error">Không thể tải kho đồ: ${err.message}</div>`;
    }
  }

  function closeInventoryModal() {
    const dialog = $('inventoryDialog');
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  async function initAuth() {
    const token = window.API.getToken();
    if (token) {
      try {
        const data = await window.API.getProfile();
        currentUser = data.user;
      } catch (_) {
        window.API.setToken('');
        currentUser = null;
      }
    }
    renderHeaderAuth();

    // Listeners for dialogs
    const authCloseBtn = $('authCloseBtn');
    if (authCloseBtn) authCloseBtn.onclick = closeAuthModal;

    const quickLoginBtn = $('quickLoginBtn');
    if (quickLoginBtn) quickLoginBtn.onclick = quickLogin;

    const googleLoginBtn = $('googleLoginBtn');
    if (googleLoginBtn) googleLoginBtn.onclick = googleLogin;

    const invCloseBtn = $('inventoryCloseBtn');
    if (invCloseBtn) invCloseBtn.onclick = closeInventoryModal;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }

  window.Auth = {
    isAuthenticated,
    getUser,
    getTickets,
    updateTickets,
    openAuthModal,
    closeAuthModal,
    openInventoryModal,
    closeInventoryModal,
    renderHeaderAuth,
  };
})();
