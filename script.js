var myWorker = new Worker('worker.js');
var canvasDecart;
var canvasPolar;

function callWorker() {
  myWorker.postMessage({ n: 100 });
  console.log('Message posted to worker');
}

myWorker.onmessage = function(e) {
  if (canvasPolar.getContext) {
    const points = e.data.polar;
    let ctx = canvasPolar.getContext('2d');

    ctx.beginPath();
    console.log(points, points.length);
    for (let i = 0; i < points.length; i++) {
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(...points[i], 5, 5);
      ctx.lineTo(...points[i]);
    }
    ctx.fill();
    ctx.stroke();
  }
  if (canvasDecart.getContext) {
    const points = e.data.decart;
    let ctx = canvasDecart.getContext('2d');
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fillRect(points[i], points[i], 5, 5);
      ctx.lineTo(points[i], points[i]);
    }
  }
  console.log('Message received from worker');
};

function draw() {
  canvasDecart = document.getElementById('canvas');
  canvasPolar = document.getElementById('polarCanvas');
  callWorker();
}
