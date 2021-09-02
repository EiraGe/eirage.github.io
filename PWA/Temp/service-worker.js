
var cacheName = 'PWA-v16';

var filesToCache = [
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(caches.open(cacheName).then(cache => {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => {
    if (key !== cacheName) {
      console.log('[ServiceWorker] Removing old cache', key);
      return caches.delete(key);
    }
  }))));
  return self.clients.claim();
});

// Open the cache, fetch then cache, if that fails, just return from cache.
self.addEventListener('fetch', event => {
  event.respondWith(caches.open(cacheName).then(function(cache) {
    let url = event.request.url;
    let fetchRequest = event.request.clone();
    return fetch(fetchRequest)
        .then(function(networkResponse) {
          if (url.startsWith('chrome-extension:')) {
            console.log('[ServiceWorker] Not caching: ' + url);
          } else {
            console.log('[ServiceWorker] Storing in cache:' + url);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(function() {
          return cache.match(event.request).then(function(response) {
            console.log('[ServiceWorker] Retrieving from cache: ' + url);
            return response;
          });
        });
  }));
});
