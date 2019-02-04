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


function drawPoints(points, predict) {
  if (points.length > 0) {
    var context = canvas.getContext('2d');
    context.lineWidth = 3;
    context.strokeStyle = 'rgba(0,0,100,0.5)';

    context.beginPath();
    context.moveTo(points[0].x * scale, points[0].y * scale);
    for (var i = 1; i < points.length; ++i) {
      context.lineTo(points[i].x * scale, points[i].y * scale);
    }
    context.stroke();


    context.strokeStyle = 'rgba(150,0,0,0.5)';
    context.beginPath();
    context.moveTo(points[points.length - 1].x * scale, points[points.length - 1].y * scale);
    for (var i = 1; i < predict.length; ++i) {
      context.lineTo(predict[i].x * scale, predict[i].y * scale);
    }
    context.stroke();
  }
}

function onFrame() {
  if (startTime) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(points, prediction);
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
    prediction = [];
    window.requestAnimationFrame(onFrame);
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
