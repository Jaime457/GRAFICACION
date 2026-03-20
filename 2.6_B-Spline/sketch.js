let pts = [];
function setup(){
 createCanvas(600,400);
 pts = [
 createVector(50,200),
 createVector(150,100),
 createVector(300,300),
 createVector(450,150),
 createVector(550,250)
 ];
}
let t = 0;
function draw(){
    background(245);
 let x = curvePoint(50,100,300,500,t);
 let y = curvePoint(200,300,80,260,t);
 circle(x,y,20);
 t += 0.01;
 if(t>1) t=0;
}

