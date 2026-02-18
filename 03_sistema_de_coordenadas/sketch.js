function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(240);
  //Linea vertical central
  line(width/2,0,width/2,height);
  //Linea horizontal central
  line(0, height/2, width, height/2);
}