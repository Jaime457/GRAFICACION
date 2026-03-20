let pos, esc, ang, shr, depth;
let puntosCurva = [];
let isNight = false;
let btnModo;
let estrellas = [];
let nubes = [];

function setup() {
  createCanvas(800, 600);
  
  // Estados iniciales de transformación
  pos = createVector(width / 2, height - 120);
  esc = 1.0;
  ang = 0;
  shr = 0;
  depth = 5; // Nivel del fractal

  // Inicializar Carretera
  puntosCurva = [
    createVector(0, 450), 
    createVector(400, 300), // Control interactivo
    createVector(400, 550), 
    createVector(800, 450)
  ];

  // Generar Estrellas Interactivas
  for (let i = 0; i < 100; i++) {
    estrellas.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      t: random(100) // Para el brillo (twinkle)
    });
  }

  // Generar Nubes
  for (let i = 0; i < 5; i++) {
    nubes.push({ x: random(width), y: random(50, 150), v: random(0.2, 0.8) });
  }

  // Botón para cambiar Modo (Día/Noche)
  btnModo = createButton('Cambiar Día/Noche');
  btnModo.position(20, height - 40);
  btnModo.mousePressed(() => isNight = !isNight);
}

function draw() {
  dibujarCielo();
  
  // Paisaje: Pasto y Carretera
  fill(isNight ? 10 : 34, isNight ? 50 : 139, 34);
  noStroke();
  rect(0, 400, width, 200);

  dibujarCurva();
  
  // Elementos de fondo (Fractales)
  push();
    dibujarArbolesFractales();
  pop();

  // Procesar Interacción y Transformaciones del Carro
  interaccion();
  
  push();
    aplicarTransformaciones();
    dibujarObjeto(); // El Carro
  pop();

  dibujarTexto();
}

//Funciones para el ambiente
function dibujarCielo() {
  if (isNight) {
    background(10, 15, 45);
    dibujarEstrellas();
    dibujarLuna();
  } else {
    background(135, 206, 235);
    dibujarSol();
    dibujarNubes();
  }
}

function dibujarSol() {
  fill(255, 255, 0);
  noStroke();
  ellipse(width - 100, 80, 80, 80);
}

function dibujarLuna() {
  fill(240);
  noStroke();
  ellipse(width - 100, 80, 70, 70);
  fill(10, 15, 45); // Sombra para hacer la creciente
  ellipse(width - 80, 80, 70, 70);
}

function dibujarNubes() {
  fill(255, 255, 255, 200);
  nubes.forEach(n => {
    ellipse(n.x, n.y, 60, 40);
    ellipse(n.x + 20, n.y + 10, 50, 30);
    n.x = (n.x + n.v) % width; // Movimiento lento
  });
}

function dibujarEstrellas() {
  noStroke();
  estrellas.forEach(e => {
    // Las estrellas reaccionan a la distancia del mouse
    let d = dist(mouseX, mouseY, e.x, e.y);
    let brillo = map(sin(frameCount * 0.1 + e.t), -1, 1, 150, 255);
    
    if (d < 100) fill(255, 255, 0); // Brilla más si el mouse está cerca
    else fill(brillo);
    
    ellipse(e.x, e.y, e.size);
  });
}

function aplicarTransformaciones() {
  translate(pos.x, pos.y);
  rotate(ang);
  scale(esc);
  shearX(shr);
}

function dibujarObjeto() {
  rectMode(CENTER);
  // Cuerpo
  fill(isNight ? 100 : 200, 0, 0);
  rect(0, 0, 100, 40, 5);
  rect(0, -25, 60, 30, 10);
  // Ventanas y luces
  fill(isNight ? 150 : 200, 230, 255);
  rect(15, -25, 25, 15);
  fill(isNight ? [255, 255, 0] : 30); // Faros encendidos de noche
  ellipse(45, 0, 10, 15);
  // Ruedas
  fill(20);
  ellipse(-30, 20, 25, 25);
  ellipse(30, 20, 25, 25);
}

function dibujarCurva() {
  noFill();
  stroke(isNight ? 30 : 50);
  strokeWeight(50);
  puntosCurva[1].x = mouseX; // Curva interactiva
  puntosCurva[1].y = mouseY;
  
  bezier(puntosCurva[0].x, puntosCurva[0].y, puntosCurva[1].x, puntosCurva[1].y, 
         puntosCurva[2].x, puntosCurva[2].y, puntosCurva[3].x, puntosCurva[3].y);
  
  stroke(255, 255, 255, 100);
  strokeWeight(2);
  drawingContext.setLineDash([15, 15]);
  bezier(puntosCurva[0].x, puntosCurva[0].y, puntosCurva[1].x, puntosCurva[1].y, 
         puntosCurva[2].x, puntosCurva[2].y, puntosCurva[3].x, puntosCurva[3].y);
  drawingContext.setLineDash([]);
}

function dibujarArbolesFractales() {
  stroke(isNight ? 20 : 60, 40, 20);
  push(); translate(80, 450); dibujarFractal(50, depth); pop();
  push(); translate(720, 450); dibujarFractal(50, depth); pop();
}

function dibujarFractal(tam, d) {
  if (d <= 0) return;
  line(0, 0, 0, -tam);
  translate(0, -tam);
  push(); rotate(PI/6); dibujarFractal(tam * 0.75, d - 1); pop();
  push(); rotate(-PI/6); dibujarFractal(tam * 0.75, d - 1); pop();
}

function dibujarTexto() {
  fill(isNight ? 255 : 0);
  noStroke();
  textSize(22);
  text("Proyecto Unidad 2", 20, 40);
  textSize(14);
  text("Loya Chaidez Jaime Eduardo", 20, 65);
  text("CONTROLES:\n- Flechas: Conducir\n- R / E / Q: Rotar y Escalar\n- S / D: Shear (Velocidad)\n- + / -: Nivel Fractal\n- Mouse: Cambia la curva", 20, 100);
}

function interaccion() {
  if (keyIsDown(LEFT_ARROW))  pos.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) pos.x += 5;
  if (keyIsDown(UP_ARROW))    pos.y -= 5;
  if (keyIsDown(DOWN_ARROW))  pos.y += 5;
  if (keyIsDown(82)) ang += 0.05; // R
  if (keyIsDown(69)) esc += 0.01; // E
  if (keyIsDown(81)) esc -= 0.01; // Q
  if (keyIsDown(83)) shr += 0.01; // S
  if (keyIsDown(68)) shr -= 0.01; // D
}

function keyPressed() {
  if (key === '+') depth = min(depth + 1, 8);
  if (key === '-') depth = max(depth - 1, 0);
}