var points = [];
var predictedPoints = [];
var coalescedPoints = [];
var startTime;
var canvas;
var colorCounter = {};
var activeFingerCount = 0;
var maxActiveFinger = 0;
const colors = ["rgba(255, 128, 0, ", "rgba(255, 255, 0, ", "rgba(128, 255, 0, ",
                "rgba(0, 255, 0, ", "rgba(0, 255, 128, ", "rgba(0, 255, 255, ", " rgba(0, 128, 255, ",
                "rgba(0, 0, 255, ", "rgba(128, 0, 255, ", "rgba(255, 0, 255, ", "rgba(255, 0, 128, ", "rgba(255, 0, 0, ", ]

function GetContext() {
  return document.getElementById("canvas").getContext("2d"); 
}   

window.addEventListener('resize', function(e) {
    InitializeCanvas();
});

function drawPoints(points, isCoalesced, isPredicted) {
  var context = canvas.getContext('2d');
  for (var i = 0; i < points.length; ++i) {
    var radius;
    if (isPredicted) {
      radius= 5.0
      context.strokeStyle = colors[colorCounter[points[i].id]] + "0.3)";
    } else if (isCoalesced) {
      radius = 2.0;
      context.fillStyle = colors[colorCounter[points[i].id]] + "0.9)";
    } else {
      if (!(points[i].id in colorCounter))
        colorCounter[points[i].id] = 0;
      radius = 3.0
      context.strokeStyle = colors[colorCounter[points[i].id] = (colorCounter[points[i].id] + 2)  % 12] + "0.6)";
    }

    context.lineWidth = 2
    context.beginPath();

    context.arc(points[i].x * scale, points[i].y * scale, radius * scale, 0, 2 * 3.14159, false);
    if (isCoalesced)
      context.fill();
    else
      context.stroke();
    context.closePath();
  }
}

function onFrame()
{ 
  if (startTime) {
    drawPoints(points, false, false);
    drawPoints(predictedPoints, false, true);
    drawPoints(coalescedPoints, true, false);
    points = [];
    predictedPoints = [];
    coalescedPoints = [];

    window.requestAnimationFrame(onFrame);
  }
}

function startDraw()
{
  startTime = performance.now();
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(onFrame);
}

function endDraw()
{
  startTime = undefined;
}

function addPredictedPoint(x, y, id)
{
  predictedPoints.push({x:x, y:y, id:id});
}

function addCoalescedPoint(x, y, id)
{
  coalescedPoints.push({x:x, y:y, id:id});
}

function addPoint(x, y, id)
{
  points.push({x:x, y:y, id:id});
}

function handlePointerMoves

window.onload = function() {
  canvas = document.getElementById('canvas');
  if (window.PointerEvent) {
    startDraw();
    canvas.addEventListener('pointerdown', function(e) {
      addPoint(e.pageX, e.pageY, e.pointerId);
      if (activeFingerCount == 0) 
        first_finger_down_time = e.timeStamp;
      activeFingerCount++;
      maxActiveFinger = Math.max(activeFingerCount, maxActiveFinger);
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function(e) {
      if (e.getPredictedEvents) {
        e.getPredictedEvents().forEach(function(ce) {
          addPredictedPoint(ce.pageX, ce.pageY, e.pointerId);
        });
      }
      if (e.getCoalescedEvents) {
        e.getCoalescedEvents().forEach(function(ce) {
          addCoalescedPoint(ce.pageX, ce.pageY, e.pointerId);
        });
      }
      addPoint(e.pageX, e.pageY, e.pointerId);
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
  InitializeCanvas();
}

var scale = 1;

function InitializeCanvas() {
  var elem = document.getElementById('canvas');
  var container = document.getElementById('container');
  
  scale = window.devicePixelRatio ? window.devicePixelRatio : 1;
  elem.width = container.clientWidth * scale;
  elem.height = container.clientHeight * scale;

  Clear();
}

function Clear() {
  endDraw();
  startDraw();
  colorCounter = {}
}