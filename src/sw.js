const CACHE_PREFIX = 'hom-nay-an-gi-';
const CACHE_NAME = `${CACHE_PREFIX}v50`;
importScripts('./sw-assets.js');
const ASSET_GROUPS = self.__BFSC_ASSETS__ || { essential: [], optional: [] };
const ESSENTIAL = ASSET_GROUPS.essential;
const OPTIONAL = ASSET_GROUPS.optional;
const ASSET_URLS = new Set(
  [...ESSENTIAL, ...OPTIONAL].map((asset) => new URL(asset, self.registration.scope).href)
);

async function offlineStatus() {
  const cache = await caches.open(CACHE_NAME);
  const ready = (
    await Promise.all(
      ESSENTIAL.map((asset) => cache.match(new URL(asset, self.registration.scope).href))
    )
  ).every(Boolean);
  const missing = (
    await Promise.all(
      OPTIONAL.map((asset) => cache.match(new URL(asset, self.registration.scope).href))
    )
  ).filter((item) => !item).length;
  return { type: 'OFFLINE_STATUS', ready, missing };
}
async function notifyStatus() {
  const state = await offlineStatus();
  for (const client of await self.clients.matchAll({ includeUncontrolled: true }))
    client.postMessage(state);
}
function validType(url, response) {
  const type = response.headers.get('Content-Type') || '';
  const extension = url.pathname.split('.').pop().toLowerCase();
  if (url.pathname === new URL('./', self.registration.scope).pathname)
    return type.startsWith('text/html');
  if (extension === 'js') return /^(text|application)\/(javascript|ecmascript)/i.test(type);
  if (extension === 'css') return type.startsWith('text/css');
  if (extension === 'json') return type.startsWith('application/json');
  if (['webp', 'png', 'svg'].includes(extension)) return type.startsWith('image/');
  if (extension === 'woff2')
    return type.startsWith('font/') || type.startsWith('application/octet-stream');
  return extension === 'html' && type.startsWith('text/html');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        ESSENTIAL.map(async (asset) => {
          const url = new URL(asset, self.registration.scope);
          const response = await fetch(url, { cache: 'reload' });
          if (!response.ok || response.type !== 'basic' || !validType(url, response))
            throw new Error(`Essential asset failed: ${asset}`);
          await cache.put(url.href, response);
        })
      );

    })()
  );
});

// Optional photos are cached only while a visible client is idle. Installation
// needs only the shell; two concurrent downloads cannot flood a slow device.
const clientActivity = new Map();
let optionalJob = null;
async function cacheOptionalWhileIdle() {
  if (optionalJob) return optionalJob;
  optionalJob = (async () => {
    const cache = await caches.open(CACHE_NAME);
    for (let i = 0; i < OPTIONAL.length; i += 2) {
      const clients = await self.clients.matchAll({ type: 'window' });
      if (!clients.some(client => client.visibilityState === 'visible') ||
          clients.some(client => clientActivity.get(client.id) === true)) break;
      await Promise.all(OPTIONAL.slice(i, i + 2).map(async asset => {
        const url = new URL(asset, self.registration.scope);
        if (await cache.match(url.href)) return;
        try {
          const response = await fetch(url, { cache: 'reload' });
          if (response.ok && response.type === 'basic' && validType(url, response))
            await cache.put(url.href, response);
        } catch (_) {}
      }));
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    await notifyStatus();
  })();
  try { await optionalJob; } finally { optionalJob = null; }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await Promise.all(
        (await caches.keys())
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
      await notifyStatus();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'CACHE_ACTIVITY' && event.source?.id) {
    clientActivity.set(event.source.id, event.data.busy === true);
    if (!event.data.busy) event.waitUntil(cacheOptionalWhileIdle());
  } else if (event.data?.type === 'OFFLINE_STATUS') {
    event.waitUntil(offlineStatus().then((state) => event.source?.postMessage(state)));
  } else if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting());
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    /\/api(?:\/|$)/i.test(url.pathname)
  )
    return;
  const cacheKey = new URL(url.pathname, url.origin).href;
  const known = ASSET_URLS.has(cacheKey);
  if (!known && request.mode !== 'navigate') return;
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (known && response.ok && response.type === 'basic' && validType(url, response)) {
          try {
            await (await caches.open(CACHE_NAME)).put(cacheKey, response.clone());
          } catch (_) {}
        }
        if (request.mode === 'navigate') notifyStatus().catch(() => {});
        return response;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        const cached = known ? await cache.match(cacheKey) : null;
        if (cached) return cached;
        if (request.mode === 'navigate')
          return (
            (await cache.match(new URL('./index.html', self.registration.scope).href)) ||
            Response.error()
          );
        return Response.error();
      }
    })()
  );
});
