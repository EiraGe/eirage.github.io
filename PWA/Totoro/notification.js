function sendNotification(argument) {
    Notification.requestPermission(function(status) {
        displayNotification();
    });
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'This is a notification from Long Long!',
        icon: 'totoro_icon.png',
        badge: 'totoro_badge.png',
        dir: 'auto'
      };
      reg.showNotification('Hello Ella!', options);
    });
  } else {
    showResult('Notification permission status:' + Notification.permission)
  }
}