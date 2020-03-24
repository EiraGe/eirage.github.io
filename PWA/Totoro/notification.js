function sendNotification(argument) {
    Notification.requestPermission(function(status) {
        showResult('Notification permission status:', status);
        displayNotification();
    });
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'Totoro_badge.png',
      };
      reg.showNotification('Hello world!', options);
    });
  } else {

  }
}
function showResult(res) {
    resultDiv.innerHtml = res;
}