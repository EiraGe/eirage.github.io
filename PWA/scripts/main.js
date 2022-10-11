
function showResult(text) {
    result = document.getElementById("result");
    result.innerHTML += "<li>" + text + "</li>";
    result.style.display = "block";
}


window.addEventListener("beforeinstallprompt", (e) => {
  showResult("beforeinstallprompt")
});