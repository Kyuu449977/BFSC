/**
 * BFSC Backend API Client
 * Connects securely with Python backend for Authentication, Tickets, and Authoritative Gacha Rolls.
 */
(function () {
  'use strict';

  const TOKEN_KEY = 'food_auth_token';

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
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(data.message || data.error || `Lỗi máy chủ (${res.status})`);
      err.code = data.error;
      err.status = res.status;
      throw err;
    }
    return data;
  }

  const API = {
    getToken,
    setToken,

    async login(payload) {
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: payload,
      });
      if (data.token) {
        setToken(data.token);
      }
      return data;
    },

    async getProfile() {
      return await request('/api/user/profile');
    },

    async rollWish(count = 1) {
      return await request('/api/wish/roll', {
        method: 'POST',
        body: { count },
      });
    },

    async getInventory() {
      return await request('/api/user/inventory');
    },
  };

  window.API = API;
})();
