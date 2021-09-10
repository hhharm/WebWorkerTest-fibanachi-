function fromPolarToDecart(a) {
  const point = (a * 180) / Math.PI;
  const x = (point * Math.cos(point)) / 100;
  const y = (point * Math.sin(point)) / 100;
  return [x, y];
}

onmessage = function(e) {
  console.log('Message received from main script', e.n);
  let fibonachi = { decart: [1], polar: [fromPolarToDecart(1)] };
  for (let i = 1; i < e.data.n; i++) {
    fibonachi.decart.push(fibonachi.decart[i - 1] + i);
    fibonachi.polar.push(fromPolarToDecart(fibonachi.decart[i]));
  }
  postMessage(fibonachi);
};
