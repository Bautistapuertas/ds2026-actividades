const numeros=[10,20,30,40,50];
let suma=0;
let numeroMayor=numeros[0];
let numeroMenor=numeros[0];
for(const numero of numeros){
    suma=suma+numero;
    if (numero>numeroMayor){
        numeroMayor=numero;
    }
    if (numero<numeroMenor){
        numeroMenor=numero;
    }
}

const promedio=suma/numeros.length;
console.log(`Array original: [${numeros}]`);
console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${numeroMayor}`);
console.log(`Número menor: ${numeroMenor}`);
function generarAsteriscos(n) {
    let resultado = "";
    
   
    for (let i = 0; i < n; i++) {
        resultado += "*"; 
    }
    
    return resultado;
}

console.log("\n");
console.log(`5 asteriscos: ${generarAsteriscos(5)}`);
console.log(`10 asteriscos: ${generarAsteriscos(10)}`);