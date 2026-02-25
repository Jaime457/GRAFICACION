function setup() {
 createCanvas(400, 400);
}
function draw() {
 background(240);
 let cx = width / 2;
 let cy = height / 2;
 let r = 150;
 // 1) Carátula
 stroke(0);
 strokeWeight(3);
 noFill();
 circle(cx, cy, r * 2);
 // 2) Ángulo que avanza (simulación simple)
 // frameCount va aumentando 1 por frame
 let ang = frameCount * 0.02;
 // 3) Punto final de la manecilla usando cos/sin
 let x2 = cx + (r * 0.8) * cos(ang);
 let y2 = cy + (r * 0.8) * sin(ang);
 // 4) Manecilla
 strokeWeight(5);
 line(cx, cy, x2, y2);
 // 5) Arco de progreso (opcional)
 strokeWeight(8);
 arc(cx, cy, r * 2.1, r * 2.1, 0, ang);
}