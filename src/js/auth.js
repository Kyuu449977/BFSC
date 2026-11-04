/**
 * Authentication & Inventory UI Controller for BFSC
 * Supports Real Google Identity Services (GIS), Local Guest,
 * daily ticket counter (20/day), inventory modal, and star evolution display with standardized Lucide SVG icons.
 */
(function () {
  'use strict';

  let currentUser = null;

  // Stored or custom Google OAuth Client ID
  function getGoogleClientId() {
    return (
      window.GOOGLE_CLIENT_ID ||
      localStorage.getItem('bfsc_google_client_id') ||
      ''
    );
  }

  function setGoogleClientId(clientId) {
    if (clientId) {
      localStorage.setItem('bfsc_google_client_id', clientId.trim());
      window.GOOGLE_CLIENT_ID = clientId.trim();
    }
  }

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
      initGoogleIdentity();
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
        const remaining = currentUser.tickets?.remaining ?? 20;
        window.toast(`👋 Chào mừng ${currentUser.name}! Bạn nhận được ${remaining} vé hôm nay.`);
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
      email: `${name.toLowerCase().replace(/\s+/g, '_')}@angiday.vn`,
      provider: 'quick',
    });
  }

  // --- Real Google Identity Services (GIS) ---
  function initGoogleIdentity() {
    if (typeof window.google === 'undefined' || !window.google.accounts || !window.google.accounts.id) {
      return;
    }

    const clientId = getGoogleClientId();
    if (!clientId) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const renderEl = $('g_id_signin_render');
      const googleBtn = $('googleLoginBtn');
      if (renderEl) {
        renderEl.innerHTML = '';
        window.google.accounts.id.renderButton(renderEl, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: 280,
          locale: 'vi',
        });
        renderEl.style.display = 'block';
        if (googleBtn) googleBtn.style.display = 'none';
      }
    } catch (err) {
      console.warn('Google Identity initialization error:', err);
    }
  }

  function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;

    try {
      // Decode JWT Token payload without external dependency
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const googleUser = JSON.parse(jsonPayload);

      // Real user details from Google
      handleLogin({
        id: googleUser.sub,
        name: googleUser.name || 'Người dùng Google',
        email: googleUser.email,
        avatar: googleUser.picture || '',
        provider: 'google',
        credential: response.credential,
      });
    } catch (err) {
      console.error('Error decoding Google credential:', err);
      alert('Không thể xác thực tài khoản Google: ' + err.message);
    }
  }

  async function triggerGoogleLogin() {
    const clientId = getGoogleClientId();
    if (!clientId) {
      // User hasn't configured Client ID yet -> show prompt modal
      const userKey = prompt(
        'ĐĂNG NHẬP GOOGLE THẬT:\n\nVui lòng dán Google Client ID của bạn vào đây (tạo miễn phí tại console.cloud.google.com):\nVí dụ: 123456789-xxxx.apps.googleusercontent.com\n\n(Nếu bạn chưa có mã, bấm OK để dùng tài khoản Google xác thực mẫu):',
        ''
      );

      if (userKey && userKey.trim().includes('.apps.googleusercontent.com')) {
        setGoogleClientId(userKey.trim());
        initGoogleIdentity();
        alert('Đã lưu Google Client ID thành công! Bạn hãy bấm lại nút Google để đăng nhập.');
        return;
      } else {
        // Fallback authentic user simulation
        return await handleLogin({
          name: 'Người Dùng Google',
          email: 'user.google@angiday.vn',
          avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
          provider: 'google',
        });
      }
    }

    if (typeof window.google !== 'undefined' && window.google.accounts && window.google.accounts.id) {
      initGoogleIdentity();
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          const renderEl = $('g_id_signin_render');
          const googleBtn = $('googleLoginBtn');
          if (renderEl) renderEl.style.display = 'block';
          if (googleBtn) googleBtn.style.display = 'none';
        }
      });
    } else {
      alert('Đang kết nối dịch vụ Google... Vui lòng thử lại sau 2 giây.');
    }
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
          <svg class="icon icon-zap" aria-hidden="true"><use href="assets/icons.svg#zap"></use></svg>
          <strong id="userTicketNumber">${rem}/${max}</strong>
          <span class="ticket-label">vé</span>
        </div>
        <button id="openInventoryBtn" class="inventory-pill-btn" type="button" title="Mở Túi Đồ Ẩm Thực & Tiến trình nâng sao">
          <svg class="icon icon-package" aria-hidden="true"><use href="assets/icons.svg#package"></use></svg>
          <span>Túi Đồ</span>
        </button>
        <div class="user-profile-badge" title="${currentUser.email}">
          ${currentUser.avatar ? `<img src="${currentUser.avatar}" alt="" class="user-avatar-img" onerror="this.style.display='none'"/>` : `<svg class="icon icon-user" aria-hidden="true"><use href="assets/icons.svg#user"></use></svg>`}
          <span class="user-name">${currentUser.name}</span>
          <button id="logoutBtn" class="logout-mini-btn" type="button" title="Đăng xuất">
            <svg class="icon icon-logout" aria-hidden="true"><use href="assets/icons.svg#log-out"></use></svg>
          </button>
        </div>
      `;

      const invBtn = $('openInventoryBtn');
      if (invBtn) invBtn.onclick = openInventoryModal;

      const logBtn = $('logoutBtn');
      if (logBtn) logBtn.onclick = logout;

      // Unlock wishTenBtn
      if (wishTenBtn) {
        wishTenBtn.classList.remove('locked');
        wishTenBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#sparkles"></use></svg><span>Ước x10</span>';
        wishTenBtn.title = `Cầu nguyện đại tiệc 10 món (${rem >= 10 ? 'Còn vé' : 'Hết vé'})`;
      }
    } else {
      authContainer.innerHTML = `
        <button id="loginTriggerBtn" class="login-trigger-btn" type="button">
          <svg class="icon icon-user" aria-hidden="true"><use href="assets/icons.svg#user"></use></svg>
          <span>Đăng nhập</span>
        </button>
      `;

      const loginBtn = $('loginTriggerBtn');
      if (loginBtn) loginBtn.onclick = openAuthModal;

      // Lock wishTenBtn
      if (wishTenBtn) {
        wishTenBtn.classList.add('locked');
        wishTenBtn.innerHTML = '<svg class="icon icon-lock" aria-hidden="true"><use href="assets/icons.svg#bookmark"></use></svg><span>Ước x10</span>';
        wishTenBtn.title = 'Đăng nhập để mở khóa Cầu nguyện 10 món và nâng cấp sao';
      }
    }
  }

  async function openInventoryModal() {
    const dialog = $('inventoryDialog');
    const content = $('inventoryContent');
    if (!dialog || !content) return;

    content.innerHTML = '<div class="inv-loading">Đang tải túi đồ ẩm thực...</div>';
    if (typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }

    try {
      const data = await window.API.getInventory();
      const inventory = data.inventory || {};
      const items = Object.values(inventory);

      // Load catalog to get dish names and images
      const catalog = Array.isArray(window.DISHES) ? window.DISHES : [];
      const dishMap = new Map(catalog.map((d) => [d.id, d]));

      if (!items.length) {
        content.innerHTML = `
          <div class="inv-empty">
            <svg class="icon inv-empty-icon" width="48" height="48" viewBox="0 0 24 24"><use href="assets/icons.svg#package"></use></svg>
            <p>Túi đồ ẩm thực của bạn chưa có món nào!</p>
            <p class="inv-hint">Hãy thực hiện Cầu nguyện 10 món để thu thập và nâng cấp món ăn lên 5 Sao nhé.</p>
          </div>
        `;
        return;
      }

      // Sort by starLevel desc
      items.sort((a, b) => (b.starLevel || 3) - (a.starLevel || 3));

      content.innerHTML = `
        <div class="inv-stats-banner">
          <div><svg class="icon"><use href="assets/icons.svg#package"></use></svg> Tổng số món: <strong>${items.length}</strong></div>
          <div><svg class="icon" style="color: #ffd700;"><use href="assets/icons.svg#sparkles"></use></svg> Món 5★ Hoàng Gia: <strong style="color: #ffd700;">${items.filter((i) => i.starLevel === 5).length}</strong></div>
        </div>
        <div class="inv-grid">
          ${items
            .map((item) => {
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
                  ${
                    stars < 5
                      ? `
                    <div class="inv-progress-wrap" title="Cần thêm ${needed - shards} mảnh để lên ${nextStar}★">
                      <div class="inv-progress-bar" style="width: ${pct}%;"></div>
                      <span class="inv-progress-label">${shards}/${needed} mảnh lên ${nextStar}★</span>
                    </div>
                  `
                      : `
                    <div class="inv-max-badge">✦ TỐI ĐA 5★ HOÀNG GIA ✦</div>
                  `
                  }
                </div>
              </div>
            `;
            })
            .join('')}
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
    if (googleLoginBtn) googleLoginBtn.onclick = triggerGoogleLogin;

    const invCloseBtn = $('inventoryCloseBtn');
    if (invCloseBtn) invCloseBtn.onclick = closeInventoryModal;

    // Try initializing Google SDK when ready
    if (typeof window.google !== 'undefined') {
      initGoogleIdentity();
    } else {
      window.addEventListener('load', () => setTimeout(initGoogleIdentity, 800));
    }
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
    setGoogleClientId,
    getGoogleClientId,
  };
})();
