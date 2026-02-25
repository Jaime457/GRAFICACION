function setup() {
 createCanvas(400, 200);
}
function draw() {
 background(240);
 // Con suavizado
 smooth();
 strokeWeight(8);
 line(50, 150, 150, 50);
 // Sin suavizado
 noSmooth();
 line(250, 150, 350, 50);
}