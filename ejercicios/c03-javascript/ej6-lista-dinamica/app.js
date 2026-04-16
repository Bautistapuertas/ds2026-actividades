
const inputProducto = document.querySelector('#inputProducto');
const btnAgregar = document.querySelector('#btnAgregar');
const listaProductos = document.querySelector('#listaProductos');
const contadorText = document.querySelector('#contadorProductos');
const mensajeError = document.querySelector('#mensajeError');


let totalProductos = 0;


function actualizarContador() {
    contadorText.textContent = `${totalProductos} productos en la lista`;
}

// 2. Escuchar el click en "Agregar" 
btnAgregar.addEventListener('click', () => {
   
    mensajeError.textContent = "";

    
    const nombreProducto = inputProducto.value.trim();

    
    if (nombreProducto === "") {
        mensajeError.textContent = "Error: El nombre del producto no puede estar vacío.";
        return; 
    }

   
    const li = document.createElement('li');
    li.textContent = nombreProducto + " "; 

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";

  
    btnEliminar.addEventListener('click', () => {
        li.remove(); 
        totalProductos--;
        actualizarContador(); 
    });

    
    li.appendChild(btnEliminar);
    
   
    listaProductos.appendChild(li);

   
    totalProductos++; 
    actualizarContador();  
    
    inputProducto.value = "";
    inputProducto.focus(); 
});