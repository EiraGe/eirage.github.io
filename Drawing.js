var points = [];
var startTime;
var canvas;
var activeFingerCount = 0;
var maxActiveFinger = 0;
var colorCounter = 0;
const colors = ["rgba(255, 128, 0, ", "rgba(255, 255, 0, ", "rgba(128, 255, 0, ",
                "rgba(0, 255, 0, ", "rgba(0, 255, 128, ", "rgba(0, 255, 255, ", " rgba(0, 128, 255, ",
                "rgba(0, 0, 255, ", "rgba(128, 0, 255, ", "rgba(255, 0, 255, ", "rgba(255, 0, 128, ", "rgba(255, 0, 0, ", ]

const TypeEnum = {
  DispatchEvents:     0,
  CoalescedEvents:    1,
  PredictedEvents:    2,
  RawUpdateEvents:    3,
};

function GetContext() {
  return document.getElementById("canvas").getContext("2d"); 
}   

window.addEventListener('resize', function(e) {
    InitializeCanvas();
});

function drawPoints(points) {
  if (!points.length)
    return;

  colorCounter = (colorCounter + 2)  % 12;

  var context = canvas.getContext('2d');
  for (var i = 0; i < points.length; ++i) {
    var radius;
    switch (points[i].type) {
      case TypeEnum.PredictedEvents:
        radius= 5.0
        context.strokeStyle = colors[colorCounter] + "0.3)";
        break;
      case TypeEnum.CoalescedEvents:
        radius = 2.0;
        context.fillStyle = colors[colorCounter] + "0.9)";
        break;
      case TypeEnum.RawUpdateEvents:
        radius = 2.0
        context.fillStyle = colors[colorCounter] + "0.3)";
        if (coalescedCheckbox.checked) {
          points[i].x += 10;
          points[i].y += 10;
        }
        break;
      case TypeEnum.DispatchEvents:
        radius = 3.0
        context.strokeStyle = colors[colorCounter] + "0.6)";
        break;
    }

    context.lineWidth = 2
    context.beginPath();

    context.arc(points[i].x * scale, points[i].y * scale, radius * scale, 0, 2 * 3.14159, false);
    if (radius <= 2)
      context.fill();
    else
      context.stroke();
    context.closePath();
  }
}

function onFrame() {
  if (startTime) {
    drawPoints(points);
    points = [];

    window.requestAnimationFrame(onFrame);
  }
}

function startDraw() {
  startTime = performance.now();
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(onFrame);
}

function endDraw() {
  startTime = undefined;
}

function addPoint(x, y, type = TypeEnum.DispatchEvents) {
  points.push({x:x, y:y, type: type});
}

function handlePointerMoves(e) {
  if (predictedCheckbox.checked && e.getPredictedEvents) {
    e.getPredictedEvents().forEach(function(ce) {
      addPoint(ce.pageX, ce.pageY, TypeEnum.PredictedEvents);
    });
  }
  if (coalescedCheckbox.checked && e.getCoalescedEvents) {
    e.getCoalescedEvents().forEach(function(ce) {
      addPoint(ce.pageX, ce.pageY, TypeEnum.CoalescedEvents);
    });
  }
  if (dispatchEventCheckbox.checked)
    addPoint(e.pageX, e.pageY);
  e.preventDefault();
}
function handleRawUpdates(e) {
  if (rawUpdatesCheckbox.checked)
    addPoint(e.pageX, e.pageY, TypeEnum.RawUpdateEvents);
}

function updateConfig() {
  var config = {}
  var cbs = checkboxes.querySelectorAll('input[type=checkbox]');
  cbs.forEach(function(checkbox) {
    config[checkbox.id] = checkbox.checked;
  })
  localStorage.eventConfig = JSON.stringify(config);
  configEvents();
}

function configEvents() {
  var eventConfig = (localStorage.eventConfig) ? JSON.parse(localStorage.eventConfig) : {};
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  for(var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].id in eventConfig)
      checkboxes[i].checked = eventConfig[checkboxes[i].id];
  }

  canvas.removeEventListener("pointermove", handlePointerMoves);
  canvas.removeEventListener("pointerrawupdate", handleRawUpdates);
  if (dispatchEventCheckbox.checked || coalescedCheckbox.checked || predictedCheckbox.checked)
    canvas.addEventListener("pointermove", handlePointerMoves);
  if (rawUpdatesCheckbox.checked)
    canvas.addEventListener("pointerrawupdate", handleRawUpdates);
}

function addEventHandlers() {
  canvas = document.getElementById('canvas');
  if (window.PointerEvent) {
    startDraw();
    canvas.addEventListener('pointerdown', function(e) {
      addPoint(e.pageX, e.pageY);
      if (activeFingerCount == 0)
        first_finger_down_time = e.timeStamp;
      activeFingerCount++;
      maxActiveFinger = Math.max(activeFingerCount, maxActiveFinger);
      e.preventDefault();
    });
    canvas.addEventListener('pointerup', function(e) {
      activeFingerCount --;
      // Two finger tap to clear the page.
      if (activeFingerCount == 0) {
        if (maxActiveFinger > 1 && e.timeStamp - first_finger_down_time <= 300)
          Clear();
        maxActiveFinger = 0;
      }
      e.preventDefault();
    });
    canvas.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      Clear();
    })
  }
}

var scale = 1;

function InitializeCanvas() {
  var elem = document.getElementById('canvas');
  var container = document.getElementById('container');
  
  scale = window.devicePixelRatio ? window.devicePixelRatio : 1;
  elem.width = container.clientWidth * scale;
  elem.height = container.clientHeight * scale;

  addEventHandlers();
  configEvents();
  Clear();
}

function Clear() {
  endDraw();
  startDraw();
  colorCounter = 0
}


window.onload = InitializeCanvas;