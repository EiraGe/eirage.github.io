const FILES_TO_CACHE = [
  './index.html',
  './p2.html',
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

self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;

  if (!notification.data.hasOwnProperty('options'))
    return;

  var options = notification.data.options;

  if (options.close)
    event.notification.close();

  var promise = Promise.resolve();

  promise =
      promise.then(function() { return firstWindowClient(); })
             .then(function(client) { return client.focus(); });
  promise = promise.catch(function() { clients.openWindow(options.url); });

  event.waitUntil(promise);
});


function firstWindowClient() {
  return clients.matchAll({ type: 'window' }).then(function(windowClients) {
    return windowClients.length ? windowClients[0] : Promise.reject("No clients");
  });
}
