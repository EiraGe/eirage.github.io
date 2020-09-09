const FILES_TO_CACHE = [
  './index.html',
];

CACHE_NAME = 'v1';

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );
})

self.addEventListener('fetch', (evt) => {
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('./index.html');
                });
          })
  );
})

self.addEventListener('notificationclick', function(e) {
  console.log(e)
  var notification = e.notification;
  var options = notification.data.options;

  var promise = Promise.resolve();
  if (options.action === 'close') {
    notification.close();
  } else {
    promise =
        promise.then(function() { return firstWindowClient(); })
               .then(function(client) { return client.focus(); });
      promise = promise.catch(function() { clients.openWindow(options.url); });
  }

  e.waitUntil(promise);
});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;

  console.log('Closed notification: ' + notification);
});

