let P0, P1, P2, P3;
function setup() {
 createCanvas(600, 400);
 P0 = createVector(80,300);
 P1 = createVector(180,80);
 P2 = createVector(420,80);
 P3 = createVector(520,300);
}
function draw() {
 background(245);
 bezier(80,300, 180,80, 420,80, 520,300);
 let t = (frameCount % 200) / 200;
 let x = bezierPoint(80,180,420,520,t);
 let y = bezierPoint(300,80,80,300,t);
 fill(255,0,0);
 circle(x,y,15);
}
