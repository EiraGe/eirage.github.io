var points = [];
var predictedPoints = [];
var coalescedPoints = [];
var startTime;
var canvas;
var colorCounter = {};
const colors = ["rgba(255, 128, 0, ", "rgba(255, 255, 0, ", "rgba(128, 255, 0, ",
                "rgba(0, 255, 0, ", "rgba(0, 255, 128, ", "rgba(0, 255, 255, ", " rgba(0, 128, 255, ",
                "rgba(0, 0, 255, ", "rgba(128, 0, 255, ", "rgba(255, 0, 255, ", "rgba(255, 0, 128, ", "rgba(255, 0, 0, ", ]

function GetContext() {
  return document.getElementById("canvas").getContext("2d"); 
}   

window.addEventListener('resize', function(e) {
    InitializeCanvas();
});

function drawPoint(x, y) {
    let radius = 4.0;
    var context = canvas.getContext('2d');

    context.lineWidth = 2;
    context.fillStyle = 'rgba(0,0,100,0.5)';
    context.beginPath();

    context.arc(x * scale, y * scale, radius * scale, 0, 2 * 3.14159, false);

    context.fill();
    context.closePath();
}

function clearPoint(x, y) {
    let radius = 4.2;
    var context = canvas.getContext('2d');

    context.lineWidth = 2;
    context.fillStyle = 'rgba(255,255,255)';
    context.beginPath();

    context.arc(x * scale, y * scale, radius * scale, 0, 2 * 3.14159, false);

    context.fill();
    context.closePath();
}

function onFrame()
{ 
  if (startTime) {
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


var predicted_points = [];
window.onload = function() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('pointermove', function(event) {
    for (let e of predicted_points.reverse())
      clearPoint(e.pageX, e.pageY);
    for (let e of event.getCoalescedEvents())
      drawPoint(e.pageX, e.pageY);
    predicted_points = event.getPredictedEvents();
    for (let e of predicted_points)
      drawPoint(e.pageX, e.pageY);
  });
  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    Clear();
  })
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