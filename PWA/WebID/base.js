if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}

function showResult(text) {
    console.log(text)
    result = document.getElementById("result");
    result.innerHTML += "<li>" + text + "</li>";
}