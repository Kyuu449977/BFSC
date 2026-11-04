/**
 * BFSC Backend API Client & Resilient Offline/Static Engine
 * Connects seamlessly with Python backend when available,
 * and provides full localStorage simulation when deployed on static CDNs (Netlify/Vercel/GitHub Pages).
 */
(function () {
  'use strict';

  const TOKEN_KEY = 'food_auth_token';
  const LOCAL_USER_KEY = 'bfsc_local_user';
  const LOCAL_INV_KEY = 'bfsc_local_inventory';

  const SHARDS_MAP = {
    1: 3, // 1★ -> 3★ needs 3 shards
    2: 3, // 2★ -> 3★ needs 3 shards
    3: 5, // 3★ -> 4★ needs 5 shards
    4: 10, // 4★ -> 5★ needs 10 shards
    5: 0, // 5★ is max (Hoàng Gia)
  };

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch (_) {
      return '';
    }
  }

  function setToken(token) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}
  }

  function getTodayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function getLocalUser() {
    try {
      const raw = localStorage.getItem(LOCAL_USER_KEY);
      if (!raw) return null;
      const user = JSON.parse(raw);
      const today = getTodayStr();
      if (!user.tickets || user.tickets.date !== today) {
        user.tickets = { date: today, remaining: 20, max: 20 };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
      }
      return user;
    } catch (_) {
      return null;
    }
  }

  function saveLocalUser(user) {
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } catch (_) {}
  }

  function getLocalInventory() {
    try {
      const raw = localStorage.getItem(LOCAL_INV_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  function saveLocalInventory(inv) {
    try {
      localStorage.setItem(LOCAL_INV_KEY, JSON.stringify(inv));
    } catch (_) {}
  }

  async function request(path, options = {}) {
    const headers = options.headers || {};
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (options.body && typeof options.body === 'object') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    options.headers = headers;

    const res = await fetch(path, options);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const err = new Error(data.message || data.error || `Lỗi máy chủ (${res.status})`);
      err.code = data.error;
      err.status = res.status;
      throw err;
    }
    return await res.json().catch(() => ({}));
  }

  // --- Local Fallback Engine for Static CDNs (Netlify) ---
  const LocalEngine = {
    login(payload) {
      const today = getTodayStr();
      let user = getLocalUser();
      if (!user) {
        user = {
          id: 'user_' + Date.now().toString(36),
          name: payload.name || 'Thực Khách Ẩm Thực',
          email: payload.email || 'guest@angiday.vn',
          avatar: payload.avatar || 'https://lh3.googleusercontent.com/a/default-user=s96-c',
          tickets: { date: today, remaining: 20, max: 20 },
          created_at: new Date().toISOString(),
        };
      } else {
        if (payload.name) user.name = payload.name;
        if (payload.email) user.email = payload.email;
        if (payload.avatar) user.avatar = payload.avatar;
      }
      saveLocalUser(user);
      setToken('local_token_' + user.id);
      return {
        token: 'local_token_' + user.id,
        user: {
          ...user,
          inventoryCount: Object.keys(getLocalInventory()).length,
          fiveStarCount: Object.values(getLocalInventory()).filter((v) => v.starLevel === 5).length,
        },
      };
    },

    getProfile() {
      const user = getLocalUser();
      if (!user) throw new Error('Chưa đăng nhập');
      const inv = getLocalInventory();
      return {
        user: {
          ...user,
          inventoryCount: Object.keys(inv).length,
          fiveStarCount: Object.values(inv).filter((v) => v.starLevel === 5).length,
        },
      };
    },

    rollWish(count = 1) {
      const user = getLocalUser();
      if (!user) throw new Error('Chưa đăng nhập');
      if (user.tickets.remaining < count) {
        throw new Error('INSUFFICIENT_TICKETS');
      }

      user.tickets.remaining -= count;
      saveLocalUser(user);

      const catalog = Array.isArray(window.DISHES) ? window.DISHES : [];
      if (!catalog.length) throw new Error('Danh mục món ăn rỗng');

      const inv = getLocalInventory();
      const ownedIds = Object.keys(inv);
      const unownedDishes = catalog.filter((d) => !inv[d.id]);

      const results = [];

      for (let i = 0; i < count; i++) {
        // 5% chance of rolling an unowned dish, 95% duplicate drop
        const isNewRoll = unownedDishes.length > 0 && (ownedIds.length === 0 || Math.random() < 0.05);

        if (isNewRoll) {
          const chosenIdx = Math.floor(Math.random() * unownedDishes.length);
          const dish = unownedDishes.splice(chosenIdx, 1)[0];
          const baseRarity = dish.rarity || 3;
          inv[dish.id] = {
            id: dish.id,
            starLevel: baseRarity,
            shards: 0,
            shardsNeeded: SHARDS_MAP[baseRarity] || 5,
            unlockedAt: new Date().toISOString(),
          };
          ownedIds.push(dish.id);
          results.push({
            dish,
            isNew: true,
            starLevel: baseRarity,
            shards: 0,
            shardsNeeded: SHARDS_MAP[baseRarity] || 5,
            breakthrough: false,
          });
        } else {
          // Duplicate drop -> convert to Breakthrough Shard
          const chosenId = ownedIds.length > 0 ? ownedIds[Math.floor(Math.random() * ownedIds.length)] : catalog[Math.floor(Math.random() * catalog.length)].id;
          const dish = catalog.find((d) => d.id === chosenId) || catalog[0];

          if (!inv[chosenId]) {
            const baseRarity = dish.rarity || 3;
            inv[chosenId] = {
              id: chosenId,
              starLevel: baseRarity,
              shards: 0,
              shardsNeeded: SHARDS_MAP[baseRarity] || 5,
              unlockedAt: new Date().toISOString(),
            };
            ownedIds.push(chosenId);
          }

          const card = inv[chosenId];
          let currentStars = card.starLevel || 3;
          let currentShards = (card.shards || 0) + 1;
          let breakthrough = false;

          if (currentStars < 3 && currentShards >= 3) {
            currentStars = 3;
            currentShards -= 3;
            breakthrough = true;
          } else if (currentStars === 3 && currentShards >= 5) {
            currentStars = 4;
            currentShards -= 5;
            breakthrough = true;
          } else if (currentStars === 4 && currentShards >= 10) {
            currentStars = 5;
            currentShards = 10;
            breakthrough = true;
          }

          card.starLevel = currentStars;
          card.shards = currentShards;
          card.shardsNeeded = SHARDS_MAP[currentStars] || 0;

          results.push({
            dish,
            isNew: false,
            starLevel: currentStars,
            shards: currentShards,
            shardsNeeded: card.shardsNeeded,
            breakthrough,
          });
        }
      }

      saveLocalInventory(inv);

      return {
        success: true,
        results,
        tickets: user.tickets,
        inventoryStats: {
          totalOwned: Object.keys(inv).length,
          fiveStars: Object.values(inv).filter((item) => item.starLevel === 5).length,
        },
      };
    },

    getInventory() {
      return { inventory: getLocalInventory() };
    },
  };

  const API = {
    getToken,
    setToken,

    async login(payload) {
      try {
        const data = await request('/api/auth/login', {
          method: 'POST',
          body: payload,
        });
        if (data.token) setToken(data.token);
        return data;
      } catch (err) {
        // Fallback for static hosts (Netlify) where /api doesn't exist
        console.warn('API /api/auth/login failed or not available, using LocalEngine:', err.message);
        return LocalEngine.login(payload);
      }
    },

    async getProfile() {
      try {
        return await request('/api/user/profile');
      } catch (err) {
        return LocalEngine.getProfile();
      }
    },

    async rollWish(count = 1) {
      try {
        const data = await request('/api/wish/roll', {
          method: 'POST',
          body: { count },
        });
        return { success: true, ...data };
      } catch (err) {
        if (err.message?.includes('INSUFFICIENT_TICKETS')) throw err;
        console.warn('API /api/wish/roll failed or not available, using LocalEngine:', err.message);
        return LocalEngine.rollWish(count);
      }
    },

    async getInventory() {
      try {
        return await request('/api/user/inventory');
      } catch (err) {
        return LocalEngine.getInventory();
      }
    },
  };

  window.API = API;
})();
