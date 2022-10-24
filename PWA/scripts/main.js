promptEvent = null;

function showResult(text) {
    result = document.getElementById("result");
    result.innerHTML += "<li>" + text + "</li>";
    result.style.display = "block";
}

function showInstallButton() {
  button = document.getElementById("installButton");
  button.style.display = "block"
}

function install() {
  if (promptEvent) {
    promptEvent.prompt();
    showResult("prompt");
  } else {
    showResult("show install prompt failed")
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  showResult("beforeinstallprompt")
  promptEvent = e;
  showInstallButton()
});