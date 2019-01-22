
let PEList = ["pointerenter", "pointerleave", "pointerover", "pointerout", "pointermove", "pointerdown",
      "pointerup", "gotpointercapture", "lostpointercapture"];
PEList.forEach(function(eventName) {
  document.addEventListener(eventName, function(e) {
    console.log(document.title + " " + e.type + " " + e.target.nodeName);
  });
});

function setCapture(event) {
  event.target.setPointerCapture(event.pointerId);
}
capturecheckbox.onchange = () => {
  if (capturecheckbox.checked)
    document.addEventListener("pointerdown", setCapture);
  else 
    document.removeEventListener("pointerdown", setCapture);
}