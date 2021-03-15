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
