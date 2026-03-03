let s = 1;
function setup() {
 createCanvas(600, 300);
}
function draw() {
 background(240);
 s *= 1.01; // crecimiento exponencial
 push();
 translate(width/2, height/2);
 scale(s);
 rectMode(CENTER);
 rect(0, 0, 50, 30);
 pop();
}
