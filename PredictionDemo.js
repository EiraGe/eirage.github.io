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

var points = [];
var prediction = [];

function drawPoints(points) {
  let radius = 4.0;
  var context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.fillStyle = 'rgba(0,0,100,0.5)';

  for (var i = 0; i < points.length; ++i) {
    context.beginPath();
    context.arc(points[i].x * scale, points[i].y * scale, radius * scale, 0, 2 * 3.14159, false);
    context.fill();
    context.closePath();
  }
}

function onFrame() {
  if (startTime) {
    if (prediction)
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(points);
    drawPoints(prediction);
    window.requestAnimationFrame(onFrame);
  }
}

function startDraw() {
  startTime = performance.now();
  points = [];
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(onFrame);
}

function endDraw() {
  startTime = undefined;
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('pointerdown', function(event) {
    startDraw();
  })
  canvas.addEventListener('pointerup', function(event) {
    endDraw();
  })
  canvas.addEventListener('pointermove', function(event) {
    if (startTime) {
      prediction = [];
      for (let e of event.getCoalescedEvents())
        points.push({x:e.pageX, y:e.pageY});
      predicted_points = event.getPredictedEvents();
      for (let e of predicted_points)
        prediction.push({x:e.pageX, y:e.pageY});
    }
  });
  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
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
