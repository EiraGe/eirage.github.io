var points = [];
var prediction = [];
var startTime;
var canvas;

function GetContext() {
  return document.getElementById("canvas").getContext("2d");
}   

window.addEventListener('resize', function(e) {
    InitializeCanvas();
});

function drawSquare() {
  var ctx = canvas.getContext("2d");
  x = container.clientWidth * scale / 5
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,100,0,0.5)';
  ctx.rect(x, 0, 200, container.clientHeight * scale);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'rgba(100,0,0,0.5)';
  ctx.rect(2*x, 0, 200, container.clientHeight * scale);
  ctx.fill();
}

function drawPoints(points, predictions) {
  var context = canvas.getContext('2d');
  if (points.length > 0) {
    context.lineWidth = 3 * scale;
    context.strokeStyle = 'rgba(0,0,100,0.5)';

    context.beginPath();
    context.moveTo(points[0].x * scale, points[0].y * scale);
    for (var i = 1; i < points.length; ++i) {
      context.lineTo(points[i].x * scale, points[i].y * scale);
    }
    context.stroke();
  }
  if (predictions.length > 0) {
    if (drawingtype.options[drawingtype.selectedIndex].value == "Compare")
      context.strokeStyle = 'rgba(150,0,0,0.5)';
    context.beginPath();
    context.moveTo(points[points.length - 1].x * scale, points[points.length - 1].y * scale);
    for (var i = 1; i < predictions.length; ++i) {
      context.lineTo(predictions[i].x * scale, predictions[i].y * scale);
    }
    context.stroke();
  }
}

function onFrame() {
  if (startTime) {
    ClearCanvas();
    drawPoints(points, prediction);
    window.requestAnimationFrame(onFrame);
  }
}

function startDraw(event) {
  if (!event.isPrimary)
      return;

  startTime = performance.now();
  points = [{x:event.pageX, y:event.pageY}];
  prediction = [];
  window.requestAnimationFrame(onFrame);
}

function endDraw(event) {
  if (!event.isPrimary)
      return;

  prediction = [];
  points.push({x:event.pageX, y:event.pageY});
  onFrame();
  startTime = undefined;
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('pointerdown', startDraw);
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointermove', function(event) {
    if (!event.isPrimary)
      return;

    if (startTime) {
      if (drawingtype.options[drawingtype.selectedIndex].value == "AggregateOnly") {
        points.push({x: event.pageX, y:event.pageY});
      } else {
        for (let e of event.getCoalescedEvents())
          points.push({x:e.pageX, y:e.pageY});
        if (["Compare", "WithPrediction"].indexOf(drawingtype.options[drawingtype.selectedIndex].value) >= 0) {
          prediction = [];
          for (let e of event.getPredictedEvents())
            prediction.push({x:e.pageX, y:e.pageY});
        }
      }
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
  points = [];
  prediction = [];
  drawSquare();
}

function ClearCanvas() {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  drawSquare();
}