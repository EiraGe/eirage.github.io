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
        icon: 'Totoro_badge.png',
      };
      reg.showNotification('Hello Ella!', options);
    });
  } else {
    showResult('Notification permission status:' + Notification.permission)
  }
}
function showResult(text) {
    result = document.getElementById("result");
    result.innerHTML = "<li>" + text + "</li>";
    result.style.display = "block";
}