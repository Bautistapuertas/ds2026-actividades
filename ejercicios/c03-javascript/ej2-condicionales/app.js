function clasificarNota(nota){
    if(nota<4){
        return "Desaprobado";
    }
    else if (nota>=4 && nota<7){
        return "Aprobado";

    }
    else if (nota>=8){
        return"Promocionado";
    }
    else{
        return "Nota no válida";
    }

}

console.log(`Nota 2: ${clasificarNota(2)}`);
console.log(`Nota 6: ${clasificarNota(6)}`);
console.log(`Nota 9: ${clasificarNota(9)}`);



function diaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado (fin de semana)";
        case 7:
            return "Domingo (fin de semana)";
        default:
            return "Día inválido";
    }
}

 
console.log(`Día 3: ${diaDeLaSemana(3)}`);
console.log(`Día 7: ${diaDeLaSemana(7)}`);
console.log(`Día 10: ${diaDeLaSemana(10)}`);