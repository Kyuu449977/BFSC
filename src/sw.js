const CACHE_NAME = 'hom-nay-an-gi-v25';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './audio.js',
  './animation.js',
  './gacha.js',
  './dish-preferences.js',
  './collection.js',
  './assets/image-unavailable.svg',
  './app.js',
  './theme-init.js',
  './nearby.js',
  './ui.js',
  './experience.js',
  './controls.js',
  './assets/vendor/motion.js',
  './assets/icons.svg',
  './assets/brand.svg',
  './assets/fonts/fonts.css',
  './assets/fonts/be-vietnam-pro-latin-400-normal.woff2',
  './assets/fonts/be-vietnam-pro-latin-600-normal.woff2',
  './assets/fonts/be-vietnam-pro-latin-700-normal.woff2',
  './assets/fonts/be-vietnam-pro-latin-ext-400-normal.woff2',
  './assets/fonts/be-vietnam-pro-latin-ext-600-normal.woff2',
  './assets/fonts/be-vietnam-pro-latin-ext-700-normal.woff2',
  './assets/fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
  './assets/fonts/be-vietnam-pro-vietnamese-600-normal.woff2',
  './assets/fonts/be-vietnam-pro-vietnamese-700-normal.woff2',
  './privacy.html',
  './credits.html',
  './images/sources.json',
  './terms.html',
  './images/google-maps-attribution.svg',
  './images/do_uong/ca_phe_trung.webp',
  './images/do_uong/bac_xiu.webp',
  './images/do_uong/ca_phe_den_da.webp',
  './images/do_uong/tra_sen_vang.webp',
  './images/do_uong/tra_lai_kem_cheese.webp',
  './images/do_uong/sinh_to_sau_rieng.webp',
  './images/do_uong/nuoc_ep_oi_hong.webp',
  './images/do_uong/sua_chua_danh_da.webp',
  './images/do_uong/milo_dam.webp',
  './images/do_uong/sua_tuoi_tran_chau.webp',
  './images/do_uong/tra_tac.webp',
  './images/do_uong/tra_hoa_dau_biec.webp',
  './images/do_uong/sinh_to_dau.webp',
  './images/do_uong/nuoc_ep_thom.webp',
  './images/do_uong/tra_vai.webp',
  './images/do_uong/nuoc_sam_bi_dao.webp',
  './images/do_uong/sua_bap.webp',
  './images/do_uong/sinh_to_mang_cau.webp',
  './images/do_uong/chanh_muoi.webp',
  './images/do_uong/soda_viet_quat.webp',
  './manifest.json',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  // Buổi sáng (8 món)
  './images/buoi_sang/pho_bo.webp',
  './images/buoi_sang/bun_bo_hue.webp',
  './images/buoi_sang/banh_mi_chao.webp',
  './images/buoi_sang/banh_cuon.webp',
  './images/buoi_sang/hu_tieu.webp',
  './images/buoi_sang/xoi_xeo.webp',
  './images/buoi_sang/banh_mi_pate.webp',
  './images/buoi_sang/bun_rieu.webp',
  // Buổi trưa (7 món)
  './images/buoi_trua/com_tam.webp',
  './images/buoi_trua/bun_cha.webp',
  './images/buoi_trua/com_ga.webp',
  './images/buoi_trua/mi_quang.webp',
  './images/buoi_trua/bun_thit_nuong.webp',
  './images/buoi_trua/com_rang.webp',
  './images/buoi_trua/pho_tron.webp',
  // Buổi chiều (6 món)
  './images/buoi_chieu/banh_xeo.webp',
  './images/buoi_chieu/goi_cuon.webp',
  './images/buoi_chieu/banh_khot.webp',
  './images/buoi_chieu/bot_chien.webp',
  './images/buoi_chieu/banh_bot_loc.webp',
  './images/buoi_chieu/sup_cua.webp',
  // Buổi tối (7 món)
  './images/buoi_toi/lau_thai.webp',
  './images/buoi_toi/bun_dau.webp',
  './images/buoi_toi/bbq_nuong.webp',
  './images/buoi_toi/quan_oc.webp',
  './images/buoi_toi/bo_ne.webp',
  './images/buoi_toi/chao_suon.webp',
  './images/buoi_toi/mien_ga.webp',
  // Đồ ăn vặt (5 món)
  './images/do_an_vat/banh_trang_tron.webp',
  './images/do_an_vat/che_thai.webp',
  './images/do_an_vat/nem_chua_ran.webp',
  './images/do_an_vat/banh_trang_nuong.webp',
  './images/do_an_vat/ca_vien_chien.webp',
  // Đồ uống & Nước ngọt (15 loại)
  './images/do_uong/tra_dao.webp',
  './images/do_uong/tra_sua.webp',
  './images/do_uong/nuoc_dua.webp',
  './images/do_uong/ca_phe_muoi.webp',
  './images/do_uong/sinh_to_bo.webp',
  './images/do_uong/tra_trai_cay.webp',
  './images/do_uong/ca_phe_sua_da.webp',
  './images/do_uong/nuoc_mia.webp',
  './images/do_uong/rau_ma.webp',
  './images/do_uong/coca_cola.webp',
  './images/do_uong/pepsi.webp',
  './images/do_uong/7up.webp',
  './images/do_uong/sting_dau.webp',
  './images/do_uong/mirinda.webp',
  './images/do_uong/bo_huc.webp',
  './images/sinh_vien/banh_bao.webp',
  './images/sinh_vien/banh_gio.webp',
  './images/sinh_vien/banh_canh.webp',
  './images/sinh_vien/bun_mam.webp',
  './images/sinh_vien/pha_lau.webp',
  './images/sinh_vien/banh_flan.webp',
  './images/sinh_vien/che_dau_trang.webp',
  './images/sinh_vien/che_dau_den.webp',
  './images/sinh_vien/che_dau_xanh.webp',
  './images/sinh_vien/banh_bo.webp',
  './images/binh_dan/sua_dau_nanh.webp',
  './images/binh_dan/nuoc_cam.webp',
  './images/binh_dan/tra_da.webp',
  './images/binh_dan/chanh_day.webp',
  './images/binh_dan/dua_hau.webp',
  './images/binh_dan/ca_cao.webp',
  './images/binh_dan/sinh_to_xoai.webp',
  './images/binh_dan/nuoc_sam.webp',
  './images/binh_dan/com_chien.webp',
  './images/binh_dan/com_ca_man.webp',
  './images/binh_dan/banh_uot.webp',
  './images/binh_dan/banh_mi_xiu_mai.webp',
  './images/binh_dan/bun_thai.webp',
  './images/binh_dan/bun_hen.webp',
];

const ASSET_URLS = new Set(CORE_ASSETS.map((asset) => new URL(asset, self.location.href).href));
const ESSENTIAL = CORE_ASSETS.filter(
  (asset) =>
    asset === './' ||
    asset === './index.html' ||
    /\.(js|css)$/.test(asset) ||
    asset === './assets/image-unavailable.svg' ||
    asset === './assets/icons.svg' ||
    asset === './assets/brand.svg'
);
const OPTIONAL = CORE_ASSETS.filter((asset) => !ESSENTIAL.includes(asset));

async function offlineStatus() {
  const cache = await caches.open(CACHE_NAME);
  const ready = (await Promise.all(ESSENTIAL.map((asset) => cache.match(asset)))).every(Boolean);
  const missing = (await Promise.all(OPTIONAL.map((asset) => cache.match(asset)))).filter(
    (response) => !response
  ).length;
  return { type: 'OFFLINE_STATUS', ready, missing };
}
async function notifyStatus() {
  const data = await offlineStatus();
  for (const client of await self.clients.matchAll({ includeUncontrolled: true }))
    client.postMessage(data);
}
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ESSENTIAL);
      // Optional photos/fonts cannot prevent the app shell from working offline.
      let next = 0;
      await Promise.all(
        Array.from({ length: 4 }, async () => {
          while (next < OPTIONAL.length) {
            const asset = OPTIONAL[next++  './images/regional/banh_cam.webp',
  './images/regional/banh_can.webp',
  './images/regional/banh_cong.webp',
  './images/regional/banh_dap.webp',
  './images/regional/banh_duc.webp',
  './images/regional/banh_lot.webp',
  './images/regional/banh_tam_bi.webp',
  './images/regional/banh_uot_long_ga.webp',
  './images/regional/bun_ca.webp',
  './images/regional/cao_lau.webp',
  './images/regional/chao_long.webp',
  './images/regional/che_ba_ba.webp',
  './images/regional/che_buoi.webp',
  './images/regional/com_hen.webp',
  './images/regional/lau_bo.webp',
  './images/regional/mi_vit_tiem.webp',
  './images/regional/nem_nuong.webp',
  './images/regional/vi/nuoc_ngot_4.webp',
  './images/regional/vi/nuoc_sting_vang.webp',
  './images/regional/vi/nuoc_revive.webp',
  './images/regional/vi/hl_freeze_tra_xanh.webp',
  './images/regional/vi/nuoc_mirinda_xa_xi.webp',
  './images/regional/vi/toi_5_3.webp',
  './images/regional/vi/toi_mi_vit_tiem.webp',
  './images/regional/vi/vat_5_2.webp',
  './images/regional/vi/nuoc_pepsi_chanh.webp',
  './images/regional/vi/pl_tra_mang_cau.webp',
  './images/regional/vi/hl_phin_sua_da.webp',
  './images/regional/vi/nuoc_sprite.webp',
  './images/regional/vi/toi_5_1.webp',
  './images/regional/vi/toi_4_1.webp',
  './images/regional/vi/nuoc_coca_zero.webp',
  './images/regional/vi/more_dinner_bun_hen.webp',
  './images/regional/vi/nuoc_ngot_1.webp',
  './images/regional/vi/nuoc_ngot_5.webp',
  './images/regional/vi/nuoc_ngot_3.webp',
];
            try {
              await cache.add(asset);
            } catch (_) {}
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await Promise.all(
        (await caches.keys())
          .filter((key) => key.startsWith('hom-nay-an-gi-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
      await notifyStatus();
    })()
  );
});
self.addEventListener('message', (event) => {
  if (event.data?.type === 'OFFLINE_STATUS')
    event.waitUntil(offlineStatus().then((data) => event.source?.postMessage(data)));
});
function validType(url, response) {
  const type = response.headers.get('Content-Type') || '';
  const extension = url.pathname.split('.').pop();
  if (extension === 'js') return /^(text|application)\/javascript/.test(type);
  if (extension === 'css') return type.startsWith('text/css');
  if (extension === 'json') return type.startsWith('application/json');
  if (['webp', 'png', 'svg'].includes(extension)) return type.startsWith('image/');
  if (extension === 'woff2')
    return type.startsWith('font/') || type.startsWith('application/octet-stream');
  return type.startsWith('text/html');
}
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.toLowerCase().includes('/api/')
  )
    return;
  const canonical = new URL(url.pathname, url.origin).href;
  const known = ASSET_URLS.has(canonical);
  if (!known && event.request.mode !== 'navigate') return;
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        if (known && response.ok && response.type === 'basic' && validType(url, response)) {
          try {
            await (await caches.open(CACHE_NAME)).put(canonical, response.clone());
          } catch (_) {}
        }
        return response;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        const cached = known ? await cache.match(canonical) : null;
        if (cached) return cached;
        if (event.request.mode === 'navigate')
          return (await cache.match('./index.html')) || Response.error();
        return Response.error();
      }
    })()
  );
});
