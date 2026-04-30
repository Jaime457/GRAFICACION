  // Variables de la nave
let nX = 0, nY = 0, nZ = 500;
let naveVel = 12;

// Entorno
let asteroides = [];
let estrellas = [];
let numAsteroides = 60; // Más asteroides
let numEstrellas = 400; // Fondo estrellado
let lunaZ = -2500; // Más lejos para dar espacio al campo de asteroides

let juegoTerminado = false;
let victoria = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // 1. GENERAR ESTRELLAS (Se crean una sola vez)
  for (let i = 0; i < numEstrellas; i++) {
    estrellas.push({
      x: random(-2000, 2000),
      y: random(-2000, 2000),
      z: random(-3000, 1000)
    });
  }

  // 2. GENERAR ASTEROIDES (Más juntos y abundantes)
  for (let i = 0; i < numAsteroides; i++) {
    asteroides.push({
      x: random(-300, 300),  // Rango más estrecho para que estén juntos
      y: random(-300, 300),
      z: random(lunaZ + 200, 200),
      size: random(15, 40),
      rotV: random(0.01, 0.05) // Velocidad de rotación propia
    });
  }
}

function draw() {
  background(0);

  // Cámara que sigue a la nave
  if (!juegoTerminado) {
    camera(nX, nY - 60, nZ + 300, nX, nY, nZ, 0, 1, 0);
  } else {
    // Si pierde, la cámara se queda fija observando el desastre
    camera(nX, nY - 200, nZ + 500, nX, nY, nZ, 0, 1, 0);
  }

  // Luces
  ambientLight(80);
  pointLight(255, 255, 255, 0, 0, 1000);

  // --- DIBUJAR ESTRELLAS ---
  push();
  stroke(255);
  strokeWeight(2);
  for (let e of estrellas) {
    point(e.x, e.y, e.z);
  }
  pop();

  // --- DIBUJAR TIERRA Y LUNA ---
  dibujarCuerpoCeleste(0, 0, 1000, 300, color(0, 100, 255), "Tierra");
  dibujarCuerpoCeleste(0, 0, lunaZ, 120, color(200), "Luna");

  // --- GESTIÓN DE ASTEROIDES ---
  for (let a of asteroides) {
    push();
    translate(a.x, a.y, a.z);
    rotateX(frameCount * a.rotV);
    rotateY(frameCount * a.rotV);
    fill(120, 90, 70);
    noStroke();
    // Usamos box para asteroides, cumpliendo con las primitivas de la guía
    box(a.size); 
    pop();

    // Detección de colisión (Nave vs Asteroide)
    if (!juegoTerminado) {
      let d = dist(nX, nY, nZ, a.x, a.y, a.z);
      if (d < a.size / 2 + 15) { // Radio del asteroide + radio aproximado nave
        juegoTerminado = true;
        victoria = false;
        document.getElementById('estado').innerText = "¡NAVE DESTRUIDA!";
        document.getElementById('estado').style.color = "red";
      }
    }
  }

  // --- LÓGICA DE VUELO Y VICTORIA ---
  if (!juegoTerminado) {
    actualizarControles();
    
    let distLuna = dist(nX, nY, nZ, 0, 0, lunaZ);
    document.getElementById('distancia').innerText = Math.floor(distLuna);
    
    if (distLuna < 180) {
      juegoTerminado = true;
      victoria = true;
      document.getElementById('estado').innerText = "¡MISIÓN CUMPLIDA!";
      document.getElementById('estado').style.color = "#0f0";
    }
    
    dibujarNave(nX, nY, nZ);
  } else if (!victoria) {
    // Si chocó, mostramos una explosión simple (esferas rojas)
    dibujarExplosion(nX, nY, nZ);
  } else {
    // Si ganó, la nave se queda en la luna
    dibujarNave(nX, nY, nZ);
  }
}

function dibujarCuerpoCeleste(x, y, z, tam, col, nombre) {
  push();
  translate(x, y, z);
  rotateY(frameCount * 0.005);
  fill(col);
  stroke(255, 30);
  sphere(tam);
  pop();
}

function dibujarNave(x, y, z) {
  push();
  translate(x, y, z);
  noStroke();
  
  // Cuerpo
  fill(200);
  push();
  rotateX(HALF_PI);
  cylinder(10, 40);
  pop();

  // Alas
  fill(255, 0, 0);
  box(60, 2, 15);
  
  // Propulsor (Toroide de la guía)
  fill(0, 255, 255);
  translate(0, 0, 20);
  torus(8, 3);
  pop();
}

function dibujarExplosion(x, y, z) {
  push();
  translate(x, y, z);
  fill(255, 100, 0);
  sphere(frameCount % 50); // Efecto de expansión
  pop();
}

function actualizarControles() {
  if (keyIsDown(87)) nZ -= naveVel; // W
  if (keyIsDown(83)) nZ += naveVel; // S
  if (keyIsDown(65)) nX -= naveVel; // A
  if (keyIsDown(68)) nX += naveVel; // D
  if (keyIsDown(81)) nY -= naveVel; // Q
  if (keyIsDown(69)) nY += naveVel; // E
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}