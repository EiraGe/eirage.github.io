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

function installPrompt() {
  if (promptEvent) {
    promptEvent.prompt;
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  showResult("beforeinstallprompt")
  promptEvent = e;
  showInstallButton()
});