let objetos = [];
let ordenBusqueda = [];
let indiceActual = 0;
let estadoJuego = "JUGANDO";
let angulo = 0;

// --- VARIABLES DE BATERÍA ---
let bateria = 100;
let velocidadConsumo = 0.35; // Qué tan rápido baja (ajusta según dificultad)

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    objetos = [
        { nombre: "ESFERA", tipo: "esfera", x: -300, y: -150, z: 0, encontrado: false },
        { nombre: "CUBO", tipo: "cubo", x: 250, y: 200, z: -100, encontrado: false },
        { nombre: "TOROIDE", tipo: "toro", x: 0, y: -250, z: 50, encontrado: false },
        { nombre: "CONO", tipo: "cono", x: -200, y: 250, z: -50, encontrado: false },
        { nombre: "CILINDRO", tipo: "cilindro", x: 300, y: -200, z: 0, encontrado: false }
    ];

    ordenBusqueda = shuffle([...objetos]);
    actualizarUI();
}

function draw() {
    if (estadoJuego !== "JUGANDO") {
        background(estadoJuego === "PERDISTE" ? 50 : 10, 0, 0);
        return;
    }

    background(2);

    // --- LÓGICA DE BATERÍA ---
    bateria -= velocidadConsumo;
    if (bateria <= 0) {
        bateria = 0;
        estadoJuego = "PERDISTE";
        actualizarUI("¡TE QUEDASTE SIN BATERÍA!");
    }
    actualizarBarra();

    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;

    ambientLight(5);

    // --- LINTERNA DINÁMICA ---
    // El brillo depende de la batería + un pequeño parpadeo aleatorio
    let brillo = map(bateria, 0, 100, 0, 255);
    let parpadeo = (bateria < 30) ? random(-40, 10) : 0; // Parpadea cuando queda poco

    lightFalloff(0.8, 0.005, 0.0001);
    pointLight(brillo + parpadeo, brillo + parpadeo, brillo + parpadeo, locX, locY, 150);

    noStroke();
    angulo += 0.015;

    for (let i = 0; i < objetos.length; i++) {
        let obj = objetos[i];
        push();
        translate(obj.x, obj.y, obj.z);
        rotateX(angulo);
        rotateY(angulo);

        if (obj.encontrado) {
            specularMaterial(0, 255, 0);
        } else {
            // Solo brilla si la luz le da
            specularMaterial(20);
            shininess(100);
        }

        dibujarForma(obj.tipo);
        pop();
    }
}

function dibujarForma(tipo) {
    if (tipo === "esfera") sphere(50);
    else if (tipo === "cubo") box(80);
    else if (tipo === "toro") torus(50, 20);
    else if (tipo === "cono") cone(50, 80);
    else if (tipo === "cilindro") cylinder(40, 90);
}

function mousePressed() {
    if (estadoJuego !== "JUGANDO") return;

    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    let objetoClickeado = null;

    for (let obj of objetos) {
        if (dist(locX, locY, obj.x, obj.y) < 70) {
            objetoClickeado = obj;
            break;
        }
    }

    if (objetoClickeado) {
        if (objetoClickeado.nombre === ordenBusqueda[indiceActual].nombre) {
            if (!objetoClickeado.encontrado) {
                objetoClickeado.encontrado = true;
                indiceActual++;

                // RECARGA DE BATERÍA al encontrar el correcto
                bateria = min(bateria + 40, 100);

                if (indiceActual >= ordenBusqueda.length) {
                    estadoJuego = "GANASTE";
                }
                actualizarUI();
            }
        } else {
            estadoJuego = "PERDISTE";
            actualizarUI("Hiciste clic en el objeto equivocado.");
        }
    }
}

function actualizarBarra() {
    let barra = document.getElementById('barra-bateria');
    barra.style.width = bateria + "%";
    // Cambiar color a rojo si es crítica
    barra.style.backgroundColor = bateria < 30 ? "#ff4444" : "#0f0";
}

function actualizarUI(mensajeError) {
    let elInstruccion = document.getElementById('instruccion');
    let elObjetivo = document.getElementById('objetivo');
    let elProgreso = document.getElementById('progreso');

    if (estadoJuego === "JUGANDO") {
        elInstruccion.innerText = "BUSCA EL SIGUIENTE OBJETO EN ORDEN:";
        elObjetivo.innerText = "OBJETIVO ACTUAL: " + ordenBusqueda[indiceActual].nombre;
        elProgreso.innerText = "ENCONTRADOS: " + indiceActual + " / 5";
    } else if (estadoJuego === "PERDISTE") {
        document.getElementById('titulo').innerText = "MISIÓN FALLIDA";
        document.getElementById('titulo').className = "error";
        elInstruccion.innerText = mensajeError || "Error en la operación.";
        elObjetivo.innerText = "SISTEMA APAGADO.";
        elProgreso.innerText = "PRESIONA F5 PARA RECARGAR";
    } else if (estadoJuego === "GANASTE") {
        document.getElementById('titulo').innerText = "MISIÓN CUMPLIDA";
        elInstruccion.innerText = "Has recuperado todos los objetos.";
        elObjetivo.innerText = "¡ERES UN MAESTRO DE LA LUZ!";
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}