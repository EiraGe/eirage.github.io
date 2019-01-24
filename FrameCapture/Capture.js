let PEList = ["pointerenter", "pointerleave", "pointerover", "pointerout", "pointermove", "pointerdown",
      "pointerup", "gotpointercapture", "lostpointercapture"];
PEList.forEach(function(eventName) {
  document.addEventListener(eventName, function(e) {
    console.log(document.title + " " + e.type + " " + e.target.nodeName);
  });
});

function SetCapture(event) {
  event.target.setPointerCapture(event.pointerId);
}

function PreventDefault(event) {
    console.log("hello")
    event.preventDefault();
}

capturecheckbox.onchange = () => {
  if (capturecheckbox.checked)
    document.addEventListener("pointerdown", SetCapture);
  else
    document.removeEventListener("pointerdown", SetCapture);
}

preventdefaultcheckbox.onchange = () => {
  if (preventdefaultcheckbox.checked)
    document.addEventListener("pointerdown", PreventDefault);
  else
    document.removeEventListener("pointerdown", PreventDefault);
}
