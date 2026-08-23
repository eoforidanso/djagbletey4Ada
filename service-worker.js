/* Djagbletey for Ada — service worker.
   Plain, dependency-free, matches the rest of the site: no build step,
   no bundler, no Workbox. Two jobs only:

   1. Let the site be "Added to Home Screen" / installed as an app.
   2. Keep the page usable — not blank — if a supporter opens it with a
      weak or absent signal, which matters here more than most sites:
      this campaign explicitly targets rural, patchy-mobile-data Ada.

   Bump SHELL_CACHE any time this file, or the shell list below, changes —
   that is what forces old caches to be dropped on the next visit.
   ============================================================ */

const SHELL_CACHE = 'djagbletey-shell-v1';
const RUNTIME_CACHE = 'djagbletey-runtime-v1';

/* The minimum needed to render something offline: markup, styles,
   behaviour, the manifest, and the one image (the seal) that appears
   before anything else loads. Deliberately NOT the full gallery — that
   would make the first visit heavier for exactly the low-bandwidth
   visitors this matters most for. Gallery/portrait images are cached
   opportunistically instead, the first time each one is actually viewed. */
const SHELL_FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './images/seal.jpg',
  './images/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GETs. Cross-origin (Google Fonts, WhatsApp,
  // the DNS-over-HTTPS-style third parties this site never calls) pass
  // straight through untouched.
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) {
    return;
  }

  // Page navigations: try the network first so a visitor with a signal
  // always gets the current page, not a stale cached one. Only fall
  // back to the cached shell when the network genuinely fails.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else (CSS, JS, images): serve from cache instantly if we
  // have it, and refresh the cache in the background from the network.
  // First-time requests fall through to the network and get cached for
  // next time — this is how gallery photos become available offline
  // after a supporter has scrolled past them once.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
