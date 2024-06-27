function calcularCarga() {
    // Peso de la carga
    var peso = parseFloat(document.getElementById('peso').value);
    // Ángulo de inclinación
    var anguloGrados = parseFloat(document.getElementById('angulo').value);
    // Distancia de la polea
    var distancia = parseFloat(document.getElementById('distancia').value);

    // Capacidad máxima de carga de la grúa en Newtons
    var capacidadGrua = 1000;

    // Calcular la fuerza vertical y la fuerza horizontal
    var fuerzaVertical = peso * Math.sin(anguloGrados * Math.PI / 180);
    var fuerzaHorizontal = peso * Math.cos(anguloGrados * Math.PI / 180);

    // Verificar si se puede equilibrar y cargar
    if (fuerzaVertical <= capacidadGrua) {
        mostrarModal("La grúa puede cargar la fuerza vertical de " + fuerzaVertical.toFixed(2) + " Newtons.\nSe necesita una fuerza de " + fuerzaHorizontal.toFixed(2) + " Newtons para equilibrar la carga.");
    } else {
        mostrarModal("La grúa no puede soportar la carga debido a la fuerza vertical de " + fuerzaVertical.toFixed(2) + " Newtons.");
    }

    // Validar que los campos no estén vacíos
    if (isNaN(peso) || isNaN(anguloGrados) || isNaN(distancia)) {
        mostrarModal("Por favor ingrese valores numéricos en todos los campos.");
    }
}
function mostrarModal(mensaje) {
    document.getElementById('modalMessage').textContent = mensaje;
    document.getElementById('modalAlerta').style.display = "block";
}

function cerrarModal() {
    document.getElementById('modalAlerta').style.display = "none";
}

