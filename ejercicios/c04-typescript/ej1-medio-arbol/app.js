// 1. Enganchamos el DOM. Le decimos a TS exactamente qué TIPO de elemento HTML es cada cosa.
var inputNum = document.querySelector('#inputNumero');
var btnGenerar = document.querySelector('#btnGenerar');
var divError = document.querySelector('#mensajeError');
var preResultado = document.querySelector('#resultadoArbol');
// 2. Separamos la lógica de dibujar en una función TIPADA [cite: 772-777, 918]
// Recibe un 'number' y devuelve un 'string'
function generarAsteriscos(n) {
    var arbolFinal = "";
    var pisoActual = "";
    for (var i = 0; i < n; i++) {
        pisoActual += "*";
        arbolFinal += pisoActual + "\n";
    }
    return arbolFinal;
}
// 3. El evento del botón
btnGenerar.addEventListener('click', function () {
    divError.textContent = "";
    preResultado.textContent = "";
    // Leemos el valor del input. Lo guardamos en una variable explícitamente numérica.
    var valor = parseInt(inputNum.value);
    if (isNaN(valor) || valor < 1) {
        divError.textContent = "Error: Por favor ingresá un número válido.";
        return;
    }
    // Llamamos a la función
    preResultado.textContent = generarAsteriscos(valor);
});
