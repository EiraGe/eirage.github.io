var logdiv = document.getElementById("log");
var event_received = new Set()
var continues_events = new Set(['pointermove','drag','touchmove'])

dragtargets = ["target1a", "target1b", "target1c", "target1", "target2", "target3", "target4", "target5"];
for (var i = 0; i < dragtargets.length; i++) {
  var item = document.getElementById(dragtargets[i]);
  if (item) {
    events = ["dragstart", "drag", "dragend"];
    for (var j = 0; j < events.length; j++) {
      item.addEventListener(events[j], log);
    }
  }
}
droptargets = ["droptarget1", "droptarget2"];
for (var i = 0; i < droptargets.length; i++) {
  var item = document.getElementById(droptargets[i]);
  if (item) {
    events = ["dragenter","dragover","dragleave","drop"]
    for (var j = 0; j < events.length; j++) {
      item.addEventListener(events[j], log);
    }
  }
}

events = ["contextmenu", "auxclick", "pointerenter", "pointerdown","pointercancel","pointerup","pointermove",'pointerleave', "touchstart","touchcancel", "touchend", "touchmove"];
for (var i = 0; i < events.length; i++) {
  document.addEventListener(events[i], log);
}


dragtargets = ["target1a", "target1b", "target1c"];
for (var i = 0; i < dragtargets.length; i++) {
  var item = document.getElementById(dragtargets[i]);
  item.addEventListener("dragstart", function(e){
    //e.dataTransfer.setData("text", e.target.id);
  });
}

item = document.getElementById("target1");
item.addEventListener("dragstart", function(e){
  e.dataTransfer.setData("text", e.target.id);
});

item = document.getElementById("target3");
item.addEventListener("dragstart", function(e){
  e.dataTransfer.setData("text", e.target.id);
});

item = document.getElementById("target4");
item.addEventListener("dragstart", function(e){
    e.preventDefault();
});

item = document.getElementById("target5");
item.addEventListener("dragstart", function(e){
    e.preventDefault();
});
item.addEventListener("contextmenu", function(e){
    e.preventDefault();
});

function log(event) {
  if (event.type == "pointerdown"){
    event_received.clear();
  }
  if (continues_events.has(event.type) && event_received.has(event.type))
    return;
  event_received.add(event.type);
  
  s = event.type + " " + event.target.id
  console.log(s);
  logdiv.innerHTML += s + "<br>";
}