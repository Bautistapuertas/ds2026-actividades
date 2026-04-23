// 1. Enganchamos el DOM. Le decimos a TS exactamente qué TIPO de elemento HTML es cada cosa.
const inputNum = document.querySelector('#inputNumero') as HTMLInputElement;
const btnGenerar = document.querySelector('#btnGenerar') as HTMLButtonElement;
const divError = document.querySelector('#mensajeError') as HTMLParagraphElement;
const preResultado = document.querySelector('#resultadoArbol') as HTMLPreElement;

// 2. Separamos la lógica de dibujar en una función TIPADA [cite: 772-777, 918]
// Recibe un 'number' y devuelve un 'string'
function generarAsteriscos(n: number): string {
    let arbolFinal: string = "";
    let pisoActual: string = ""; 

    for (let i = 0; i < n; i++) {
        pisoActual += "*"; 
        arbolFinal += pisoActual + "\n"; 
    }
    return arbolFinal;
}

// 3. El evento del botón
btnGenerar.addEventListener('click', () => {
    divError.textContent = "";
    preResultado.textContent = "";

    // Leemos el valor del input. Lo guardamos en una variable explícitamente numérica.
    const valor: number = parseInt(inputNum.value);

    if (isNaN(valor) || valor < 1) {
        divError.textContent = "Error: Por favor ingresá un número válido.";
        return; 
    }

    // Llamamos a la función
    preResultado.textContent = generarAsteriscos(valor);
});