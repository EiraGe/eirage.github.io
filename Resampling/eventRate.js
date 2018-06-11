var points = [];
var coalescedPoints = [];
var eventCount = 0;
var startTime;
var canvas;
var frameCounter;
var colorCounter = {};
const colors = ["rgba(255, 0, 0, 0.5)", "rgba(255, 128, 0, 0.5)", "rgba(255, 255, 0, 0.5)", "rgba(128, 255, 0, 0.5)",
                "rgba(0, 255, 0, 0.5)", "rgba(0, 255, 128, 0.5)", "rgba(0, 255, 255, 0.5)", " rgba(0, 128, 255, 0.5)",
                "rgba(0, 0, 255, 0.5)", "rgba(128, 0, 255, 0.5)", "rgba(255, 0, 255, 0.5)", "rgba(255, 0, 128, 0.5)"]

function GetContext() {
  return document.getElementById("canvas").getContext("2d"); 
}   

window.addEventListener('resize', function(e) {
    InitializeCanvas();
});

function drawPoints(points, isCoalesced) {
  var context = canvas.getContext('2d');
  for (var i = 0; i < points.length; ++i) {
    var radius = isCoalesced ? 2.0 : 4.0;

    context.beginPath();

    context.arc(points[i].x * scale, points[i].y * scale, radius * scale, 0, 2 * 3.14159, false);
    context.closePath();
    if (!(points[i].id in colorCounter))
      colorCounter[points[i].id] = 0;
    if (isCoalesced)
      context.fillStyle = colors[colorCounter[points[i].id]];
    else {
      context.fillStyle = colors[colorCounter[points[i].id] = (colorCounter[points[i].id] + 2)  % 12];
    }
    context.fill();
  }
}

function onFrame()
{
  frameCounter++;
  if (!startTime || frameCounter % parseInt(document.getElementById('throttle').value) == 0) {
    drawPoints(points, false);
    drawPoints(coalescedPoints, true);
    points = [];
    coalescedPoints = [];

    var extraWork = parseInt(document.getElementById('work').value);
    if (extraWork > 0) {
      var start = Date.now();
      while(Date.now() - start < extraWork) {
        ;
      }
    }
  }

  if (startTime)
    window.requestAnimationFrame(onFrame);
}

function startDraw()
{
  startTime = performance.now();
  eventCount = 0;
  frameCounter = 0;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(onFrame);
}

function endDraw()
{
  var duration = performance.now() - startTime;
  var rate = Math.round(eventCount / duration * 1000);
  document.getElementById('rate').textContent = rate;
  startTime = undefined;
}

function addCoalescedPoint(x, y, id)
{
  coalescedPoints.push({x:x, y:y, id:id});
}

function addPoint(x, y, id)
{
  eventCount++;
  points.push({x:x, y:y, id:id});
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  if (window.PointerEvent) {    
    startDraw();
    canvas.addEventListener('pointerdown', function(e) {
      addPoint(e.pageX, e.pageY, e.pointerId);
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function(e) {
      if (e.getCoalescedEvents) {
        e.getCoalescedEvents().forEach(function(ce) {
          addCoalescedPoint(ce.pageX, ce.pageY, e.pointerId);
        });
      }
      addPoint(e.pageX, e.pageY, e.pointerId);
      e.preventDefault();
    });
    canvas.addEventListener('pointerup', function(e) {
      e.preventDefault();
    });
    canvas.addEventListener('touchstart', function(e) {
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
}

function Clear() {
  endDraw();
  startDraw();
  colorCounter = {}
}