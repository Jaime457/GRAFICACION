function setup(){
 createCanvas(600,200);
 textSize(32);
}
function draw(){
 background(240);
 let t = (frameCount % 200)/200;
 let x = bezierPoint(80,180,420,520,t);
 let y = bezierPoint(300,80,80,300,t);
 textSize(20);
 text("•", x, y);
}