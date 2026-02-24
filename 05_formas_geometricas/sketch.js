function setup() {
 createCanvas(600, 400);
}
function draw() {
 background(220);
 // Base
 fill(200, 150, 100);
 rect(200, 200, 200, 150);
 // Techo
 fill(150, 50, 50);
 triangle(200, 200, 300, 120, 400, 200);
 // Puerta
 fill(100, 50, 20);
 rect(280, 270, 40, 80);
 // Sol
 fill(255, 200, 0);
 circle(500, 80, 80);
}