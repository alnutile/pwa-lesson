var cacheName = 'weatherPWA-step-6-2';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

self.addEventListener('fetch', function (e) {
  console.log("fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  )
});

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('active', (e) => {
  console.log('[ServiceWorker activate');
  e.waitUntil(
    caches.keys().then((keylist) => {
      return Promise.all(keylist.map((key) => {
        if (key !== cacheName) {
          console.log("removing old cache", key);
          return caches.delete(key);
        }
      }))
    })
  );
  return self.clients.claim();
})