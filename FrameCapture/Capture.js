let PEList = ["pointerenter", "pointerleave", "pointerover", "pointerout", "pointermove", "pointerdown",
      "pointerup", "gotpointercapture", "lostpointercapture"];
PEList.forEach(function(eventName) {
  document.addEventListener(eventName, function(e) {
    console.log(document.title + " " + e.type + " " + (e.target.id ? e.target.id : e.target.nodeName));
  });
});
function SetCapture(event) {
  event.target.setPointerCapture(event.pointerId);
}

function PreventDefault(event) {
    event.preventDefault();
}

window.addEventListener("load", ApplyConfig);
checkboxes.addEventListener("change", StoreConfig);

capturecheckbox.addEventListener("change", SetCapture);
preventdefaultcheckbox.addEventListener("change", SetPreventDefault);
scrollbarcheckbox.addEventListener("change", CreateScrollbar)

function ApplyConfig() {
  var configs = (localStorage.configs) ? JSON.parse(localStorage.configs) : {};
  var config = configs[document.title];
  if (config) {
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].id in config)
        checkboxes[i].checked = config[checkboxes[i].id];
    }
    SetCapture();
    SetPreventDefault();
    CreateScrollbar();
  }
}

function StoreConfig() {
  var config = {}
  var items = checkboxes.querySelectorAll('input[type=checkbox]');
  items.forEach(function(item) {
    config[item.id] = item.checked;
  })
  var configs = (localStorage.configs) ? JSON.parse(localStorage.configs) : {};
  configs[document.title] = config;
  localStorage.configs = JSON.stringify(configs);
}


function SetCapture() {
  if (capturecheckbox.checked)
    document.addEventListener("pointerdown", SetCapture);
  else
    document.removeEventListener("pointerdown", SetCapture);
}


function SetPreventDefault() {
  if (preventdefaultcheckbox.checked)
    document.addEventListener("pointerdown", PreventDefault);
  else
    document.removeEventListener("pointerdown", PreventDefault);
}

function CreateScrollbar() {
  if (scrollbarcheckbox.checked) {
    container.style.width = "200%";
    container.style.height = "200vh";
  } else {
    container.style.width = ""
    container.style.height = "";
  }
}