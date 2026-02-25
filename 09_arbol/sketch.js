let xArbol = 300;
let yArbol = 300;

let desplazamiento = 0;

function setup() {
 createCanvas(600, 400);
}

function draw() {
 background(200,230,255);
 let d = dist(mouseX,mouseY,xArbol,yArbol);

 if (d < 80)
 {
    desplazamiento = sin(frameCount * 0.1)*10;
 }
 else
 {
    desplazamiento = 0;
 }
 fill(139,69,19);
 rect(xArbol - 15 + desplazamiento, yArbol,30,80);

 fill(34,139,34);
 circle(xArbol-30 + desplazamiento, yArbol-10,60);
 circle(xArbol+30 + desplazamiento, yArbol-10,60);
 circle(xArbol + desplazamiento, yArbol-20,80);
}