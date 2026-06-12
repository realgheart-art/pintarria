/* Pintar Ria — Service Worker
   Naikkan VERSI setiap kali index.html dikemas kini supaya peranti ambil versi baru. */
const VERSI = 'pintar-ria-v1';
const ASET = [
  './', './index.html', './permainan.json', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(ASET)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(x => x !== VERSI).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Senarai permainan: network-first (sentiasa cuba terkini), fallback cache
  if (url.pathname.endsWith('permainan.json')) {
    e.respondWith(
      fetch(e.request).then(r => { const cp = r.clone(); caches.open(VERSI).then(c => c.put(e.request, cp)); return r; })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Navigasi: cuba rangkaian, fallback ke shell offline
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('./index.html')));
    return;
  }

  // Aset lain: cache-first; simpan respons same-origin yang berjaya
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request).then(r => {
      if (r.ok && url.origin === location.origin) { const cp = r.clone(); caches.open(VERSI).then(ca => ca.put(e.request, cp)); }
      return r;
    }).catch(() => c))
  );
});
