const CACHE_NAME = 'nfd-cache-v2';
const ASSETS = [
  '/noble-flair-design-site/',
  '/noble-flair-design-site/index.html',
  '/noble-flair-design-site/favicon.svg',
  '/noble-flair-design-site/manifest.json',
];

// Install: precache static assets (don't skip waiting — let the old SW control
// the page until the user consents to update)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // Don't call self.skipWaiting() — we wait for a SKIP_WAITING message
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Don't cache firebase / api calls
  const url = new URL(event.request.url);
  if (url.hostname !== 'marybelch.github.io' && url.hostname !== location.hostname) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Listen for skip-waiting message from the page
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
