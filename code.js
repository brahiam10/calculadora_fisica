function calcularCarga() {
    // Peso de la carga
    var trabajo = parseFloat(document.getElementById('trabajo').value);
    // Ángulos de inclinación de los vectores
    var angulo1 = parseFloat(document.getElementById('angulo1').value);
    var angulo2 = parseFloat(document.getElementById('angulo2').value);

    // Validar que los campos no estén vacíos
    if (isNaN(trabajo) || isNaN(angulo1) || isNaN(angulo2)) {
        mostrarModal("Por favor ingrese valores en todos los campos.");
        return;
    }


    // Llamar a resolverSistema y guardar el resultado   
    const resultado = resolverSistema(angulo1, angulo2, trabajo);

    // Construir un mensaje acorde al problema
    const mensaje = `Considerando que el sistema mostrado está en equilibrio estático, ` +
        `se calculan las tensiones en las cuerdas como sigue: ` +
        `Tensión en A: ${resultado.A} N, ` +
        `Tensión en B: ${resultado.B} N, ` +
        `y el peso (Tensión en C) es de ${trabajo} N.`;

    // Mostrar el mensaje usando mostrarModal
    mostrarModal(mensaje);
}

function resolverSistema(angulo1, angulo2, peso) {
    // Convertir ángulos a radianes
    const angulo1Rad = angulo1 * Math.PI / 180;
    const angulo2Rad = angulo2 * Math.PI / 180;

    // Coeficientes de la matriz aumentada
    //-Acos(angulo1) + Bcos(angulo2) = 0
    const a1 = -Math.cos(angulo1Rad);
    const b1 = Math.cos(angulo2Rad);
    const c1 = 0; // Resultado de la primera ecuación
    //-Asen(angulo1) - Bsen(angulo2) = peso
    const a2 = Math.sin(angulo1Rad);
    const b2 = Math.sin(angulo2Rad);
    const c2 = peso; // Resultado de la segunda ecuación

    // Matriz aumentada
    let matriz = [
        [a1, b1, c1],
        [a2, b2, c2]
    ];

    // Aplicar Gauss-Jordan
    // Paso 1: Hacer el elemento a11 = 1
    let factor = 1 / matriz[0][0];
    for (let i = 0; i < 3; i++) {
        matriz[0][i] *= factor;
    }

    // Paso 2: Hacer cero los elementos debajo de a11
    factor = -matriz[1][0];
    for (let i = 0; i < 3; i++) {
        matriz[1][i] += factor * matriz[0][i];
    }

    // Paso 3: Hacer el elemento a22 = 1
    factor = 1 / matriz[1][1];
    for (let i = 0; i < 3; i++) {
        matriz[1][i] *= factor;
    }

    // Paso 4: Hacer cero los elementos arriba de a22
    factor = -matriz[0][1];
    for (let i = 0; i < 3; i++) {
        matriz[0][i] += factor * matriz[1][i];
    }

    // Los valores de A y B están en la última columna de la matriz transformada
    const A = matriz[0][2];
    const B = matriz[1][2];

    return { A: A.toFixed(4), B: B.toFixed(4) }; // Devuelve un objeto con A y B
}

function mostrarModal(mensaje) {
    document.getElementById('modalMessage').textContent = mensaje;
    document.getElementById('modalAlerta').style.display = "block";
}

function cerrarModal() {
    document.getElementById('modalAlerta').style.display = "none";
}
//recibo los valores de los angulos y el peso de la carga
//hago un sistema de ecuaciones con las tensiones en las cuerdas en los componentes x y y
//tomo el sistema de ecucaciones y lo resuelvo con el metodo de gauss jordan
//luego devuelvo los valores de las tensiones en las cuerdas
//y el peso de la carga
