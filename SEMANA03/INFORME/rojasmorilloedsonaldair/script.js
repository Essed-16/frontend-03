const pantalla = document.querySelector("#pantalla");

let numeroActual = "0";
let numeroAnterior = null;
let operador = null;
let reiniciar = false;

function mostrar() {
    pantalla.value = numeroActual;
}

function calcular(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "x": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
    }
}

document.querySelectorAll(".num").forEach((boton) => {
    boton.addEventListener("click", () => {
        if (reiniciar || numeroActual === "0" || numeroActual === "Error") {
            numeroActual = boton.textContent;
            reiniciar = false;
        } else {
            numeroActual += boton.textContent;
        }
        mostrar();
    });
});

document.querySelectorAll(".operador").forEach((boton) => {
    boton.addEventListener("click", () => {
        if (numeroActual === "Error") return;

        if (operador !== null && !reiniciar) {
            numeroActual = String(calcular(parseFloat(numeroAnterior), parseFloat(numeroActual), operador));
            mostrar();
        }
        numeroAnterior = numeroActual;
        operador = boton.textContent;
        reiniciar = true;
    });
});

document.querySelector("#igual").addEventListener("click", () => {
    if (operador === null || numeroAnterior === null) return;

    const resultado = calcular(parseFloat(numeroAnterior), parseFloat(numeroActual), operador);
    numeroActual = String(resultado);
    numeroAnterior = null;
    operador = null;
    reiniciar = true;
    mostrar();
});

document.querySelector("#limpiar").addEventListener("click", () => {
    numeroActual = "0";
    numeroAnterior = null;
    operador = null;
    reiniciar = false;
    mostrar();
});
