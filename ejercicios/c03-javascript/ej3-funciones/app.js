function calcularPrecioFinal(monto, medioPago) {
    
    if (monto < 200) {
        return monto;
    } 
   
    else if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") {
            return monto * 0.70; // 30% off
        } else if (medioPago === "D") {
            return monto * 0.80; // 20% off
        } else if (medioPago === "C") {
            return monto * 0.90; // 10% off
        } else {
            return monto; 
        }
    } 
    
    else if (monto > 400) {
        return monto * 0.60;
    }
}

console.log(" Resuemen de Precios con y sin  Descuentos");


console.log(`Monto: $150 | Pago: E Final: $${calcularPrecioFinal(150, "E")}`);


console.log(`Monto: $300 | Pago: E Final: $${calcularPrecioFinal(300, "E")}`);
console.log(`Monto: $300 | Pago: D Final: $${calcularPrecioFinal(300, "D")}`);
console.log(`Monto: $300 | Pago: C Final: $${calcularPrecioFinal(300, "C")}`);


console.log(`Monto: $500 | Pago: D Final: $${calcularPrecioFinal(500, "D")}`);