function setup() {
 createCanvas(600, 400);
}
function draw() {
 background(240);
 let theta = frameCount * 0.03;
  let x = 100;
 let y = 0;
 let xr = x * cos(theta) - y * sin(theta);
 let yr = x * sin(theta) + y * cos(theta);
 translate(width/2, height/2);
 circle(xr, yr, 20);
}
