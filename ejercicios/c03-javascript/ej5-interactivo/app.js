// 1. Seleccionamos los elementos del HTML (DOM) [cite: 483-485]
const inputNum = document.querySelector('#inputNumero');
const btnGenerar = document.querySelector('#btnGenerar');
const divError = document.querySelector('#mensajeError');
const preResultado = document.querySelector('#resultadoArbol');


btnGenerar.addEventListener('click', () => {
    

    divError.textContent = "";
    preResultado.textContent = "";

    
    const valor = parseInt(inputNum.value);

  
    if (isNaN(valor) || valor < 1) {
        divError.textContent = "Error: Por favor ingresá un número válido (mayor o igual a 1).";
        return; 
    }

    
    let arbolFinal = "";
    let pisoActual = ""; 

    for (let i = 0; i < valor; i++) {
        pisoActual += "*"; // Le sumamos un asterisco al piso en cada vuelta
        arbolFinal += pisoActual + "\n"; // Guardamos el piso en el árbol general y metemos un salto de línea (\n)
    }

    preResultado.textContent = arbolFinal;
});