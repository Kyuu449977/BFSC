// ============================================================
// SERVICE WORKER (PWA OFFLINE & STANDALONE MOBILE SUPPORT)
// Giúp trang web hoạt động độc lập 100% trên điện thoại (cả khi Offline)
// ============================================================

const CACHE_NAME = 'hom-nay-an-gi-v2';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './audio.js',
  './animation.js',
  './gacha.js',
  './app.js',
  './manifest.json',
  './images/qr_mobile.png',
  // Buổi sáng (8 món)
  './images/buoi_sang/pho_bo.jpg',
  './images/buoi_sang/bun_bo_hue.jpg',
  './images/buoi_sang/banh_mi_chao.jpg',
  './images/buoi_sang/banh_cuon.jpg',
  './images/buoi_sang/hu_tieu.jpg',
  './images/buoi_sang/xoi_xeo.jpg',
  './images/buoi_sang/banh_mi_pate.jpg',
  './images/buoi_sang/bun_rieu.jpg',
  // Buổi trưa (7 món)
  './images/buoi_trua/com_tam.jpg',
  './images/buoi_trua/bun_cha.jpg',
  './images/buoi_trua/com_ga.jpg',
  './images/buoi_trua/mi_quang.jpg',
  './images/buoi_trua/bun_thit_nuong.jpg',
  './images/buoi_trua/com_rang.jpg',
  './images/buoi_trua/pho_tron.jpg',
  // Buổi chiều (6 món)
  './images/buoi_chieu/banh_xeo.jpg',
  './images/buoi_chieu/goi_cuon.jpg',
  './images/buoi_chieu/banh_khot.jpg',
  './images/buoi_chieu/bot_chien.jpg',
  './images/buoi_chieu/banh_bot_loc.jpg',
  './images/buoi_chieu/sup_cua.jpg',
  // Buổi tối (7 món)
  './images/buoi_toi/lau_thai.jpg',
  './images/buoi_toi/bun_dau.jpg',
  './images/buoi_toi/bbq_nuong.jpg',
  './images/buoi_toi/quan_oc.jpg',
  './images/buoi_toi/bo_ne.jpg',
  './images/buoi_toi/chao_suon.jpg',
  './images/buoi_toi/mien_ga.jpg',
  // Đồ ăn vặt (5 món)
  './images/do_an_vat/banh_trang_tron.jpg',
  './images/do_an_vat/che_thai.jpg',
  './images/do_an_vat/nem_chua_ran.jpg',
  './images/do_an_vat/banh_trang_nuong.jpg',
  './images/do_an_vat/ca_vien_chien.jpg',
  // Đồ uống & Nước ngọt (15 loại)
  './images/do_uong/tra_dao.jpg',
  './images/do_uong/tra_sua.jpg',
  './images/do_uong/nuoc_dua.jpg',
  './images/do_uong/ca_phe_muoi.jpg',
  './images/do_uong/sinh_to_bo.jpg',
  './images/do_uong/tra_trai_cay.jpg',
  './images/do_uong/ca_phe_sua_da.jpg',
  './images/do_uong/nuoc_mia.jpg',
  './images/do_uong/rau_ma.jpg',
  './images/do_uong/coca_cola.jpg',
  './images/do_uong/pepsi.jpg',
  './images/do_uong/7up.jpg',
  './images/do_uong/sting_dau.jpg',
  './images/do_uong/mirinda.jpg',
  './images/do_uong/bo_huc.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});
