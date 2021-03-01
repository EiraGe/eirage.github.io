function ginit() {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init or some other API */
    config = {
      client_id: '756916960051-7ajkfavuf3j9mk3s2eflg02kifa1t6ih.apps.googleusercontent.com',
      ux_mode: 'redirect',
      redirect_uri: "https://tests.eirage.com/PWA/WebID/index.html"
    }
  });
}

function onSignIn(googleUser) {
  document.logIn = 'google'
  var profile = googleUser.getBasicProfile();
  result = 
    `ID: ${profile.getId()} \n
     Name: ${profile.getName()} \n
     Image URL: ${profile.getImageUrl()} \n
     Email: ${profile.getEmail()} \n`
  showResult(result);
}

