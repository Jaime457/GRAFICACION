let tx = 0;
function setup() {
 createCanvas(600, 300);
 rectMode(CENTER);
}
function draw() {
 background(240);
 tx += 2;
 push();
 translate(tx, 0); // mueve TODO lo que dibujes dentro del push/pop
 fill(200, 80, 80);
 rect(150, 150, 120, 60);
 fill(80, 120, 200);
 circle(150, 110, 40);
 pop();
}