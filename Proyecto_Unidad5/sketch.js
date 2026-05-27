// --- Variables Globales ---
let targets = [];
let score = 0;
let misses = 0;
const maxMisses = 5;
let gameState = 'playing'; // 'playing' o 'gameOver'

// --- Carga de Sonidos ---
let shotSound, hitSound;

function preload() {
    // Si no tienes los archivos, comenta estas líneas para evitar errores
    // shotSound = loadSound('assets/disparo.mp3'); 
    // hitSound = loadSound('assets/explosion.mp3');
}

function setup() {
    createCanvas(800, 600);
    // Spawnea un blanco nuevo cada 1.5 segundos
    setInterval(spawnTarget, 1500);
}

function draw() {
    background(30);

    if (gameState === 'playing') {
        // Actualizar y mostrar blancos
        for (let i = targets.length - 1; i >= 0; i--) {
            targets[i].update();
            targets[i].show();
        }

        // HUD de Juego
        fill(255);
        textSize(24);
        textAlign(LEFT, TOP);
        text("Score: " + score, 20, 20);
        text("Fallos: " + misses + "/" + maxMisses, 20, 50);
        
        // Mira (Cursor)
        stroke(255, 255, 0);
        noFill();
        ellipse(mouseX, mouseY, 30);
        line(mouseX-15, mouseY, mouseX+15, mouseY);
        line(mouseX, mouseY-15, mouseX, mouseY+15);

    } else if (gameState === 'gameOver') {
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(60);
        text("GAME OVER", width / 2, height / 2 - 40);
        textSize(30);
        fill(255);
        text("Score Final: " + score, width / 2, height / 2 + 20);
        text("Click para reiniciar", width / 2, height / 2 + 60);
    }
}

// --- Lógica de Interacción ---
function mousePressed() {
    if (gameState === 'gameOver') {
        resetGame();
        return;
    }

    if (gameState === 'playing') {
        if (shotSound) shotSound.play();
        
        let hitDetected = false;
        for (let i = targets.length - 1; i >= 0; i--) {
            if (targets[i].isHit(mouseX, mouseY)) {
                hitDetected = true;
                if (hitSound) hitSound.play();
                score += 10;
                targets[i].hit = true;
                
                // Efecto visual antes de eliminar
                setTimeout(() => { targets.splice(i, 1); }, 100);
                break;
            }
        }

        if (!hitDetected) {
            misses++;
            if (misses >= maxMisses) gameState = 'gameOver';
        }
    }
}

function spawnTarget() {
    if (gameState === 'playing') {
        // Creamos targets con comportamientos aleatorios (requisito de variedad)
        let type = random(['linear', 'lerp', 'sin']);
        targets.push(new Target(random(50, width-50), -50, type));
    }
}

function resetGame() {
    score = 0;
    misses = 0;
    targets = [];
    gameState = 'playing';
}

// --- Clase Target ---
class Target {
    constructor(x, y, type) {
        this.pos = createVector(x, y);
        this.targetPos = createVector(x, random(height));
        this.type = type;
        this.r = 30;
        this.hit = false;
        this.angle = 0;
    }

    isHit(mx, my) {
        return dist(mx, my, this.pos.x, this.pos.y) < this.r;
    }

    update() {
        if (this.type === 'linear') {
            this.pos.y += 3;
        } else if (this.type === 'lerp') {
            // Requisito de interpolación
            this.pos.y = lerp(this.pos.y, this.targetPos.y, 0.02);
        } else if (this.type === 'sin') {
            this.pos.y += 2;
            this.pos.x += sin(frameCount * 0.1) * 5;
        }

        // Eliminar si sale de pantalla
        if (this.pos.y > height + this.r) {
            this.hit = true; // Se marca como "perdido"
            targets.splice(targets.indexOf(this), 1);
            misses++; // Penalización por dejarlo pasar
            if (misses >= maxMisses) gameState = 'gameOver';
        }
    }

    show() {
        if (this.hit) fill(0, 255, 0); // Verde si diste
        else fill(255, 0, 0); // Rojo si está activo
        
        stroke(255);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}