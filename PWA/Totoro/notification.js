function sendNotification(argument) {
    Notification.requestPermission(function(status) {
        displayNotification();
    });
}

function createNotificationOptions() {
  return {
    body: 'This is a notification from Long Long!',
    icon: 'totoro_icon.png',
    badge: 'totoro_badge.png',
    dir: 'auto',
    data: {
      options: {
        action: 'default',
        close: true,
        notificationCloseEvent: false,
        url: document.location.toString(),
      }
    }
  }
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    title = "Hello Ella"
    options = createNotificationOptions();

    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello Ella!', );
    });
  }
  showResult('Notification permission status:' + Notification.permission)
}