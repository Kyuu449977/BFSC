/**
 * Authentication Module - Gating removed.
 * All features are fully accessible to every user without requiring login.
 */
(function () {
  'use strict';

  const guestUser = {
    id: 'guest',
    name: 'Thực Khách',
    email: 'guest@angiday.vn',
    provider: 'guest',
    tickets: {
      remaining: 999,
      total: 999,
    },
  };

  window.Auth = {
    isAuthenticated: () => true,
    getUser: () => guestUser,
    getTickets: () => 999,
    openAuthModal: () => {},
    closeAuthModal: () => {},
    updateTickets: () => {},
    logout: () => {},
  };
})();
