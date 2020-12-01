function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  showResult(response.status)
  if (response.status === 'connected') {
    document.logIn = 'FB'
    FB.api('/me', function(response) {
      showResult('Successful login for: ' + response.name);
    });
  }
}