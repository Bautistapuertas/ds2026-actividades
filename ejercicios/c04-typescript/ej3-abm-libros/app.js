// 2. EL ESTADO (Nuestra "Base de datos" en memoria) [cite: 961-962]
let catalogo = [
    { isbn: "111", titulo: "El Señor de los Anillos", autor: "Tolkien", precio: 25000, disponible: true },
    { isbn: "222", titulo: "1984", autor: "Orwell", precio: 18000, disponible: false }
];
// 3. ENGANCHAR EL DOM
const inputTitulo = document.querySelector('#inputTitulo');
const inputAutor = document.querySelector('#inputAutor');
const inputPrecio = document.querySelector('#inputPrecio');
const checkDisponible = document.querySelector('#checkDisponible');
const btnAgregar = document.querySelector('#btnAgregar');
const divError = document.querySelector('#errorForm');
const ulListado = document.querySelector('#listado');
const pStats = document.querySelector('#stats');
// 4. FUNCIONES DEL ABM
// Renderiza la lista completa
function renderizar() {
    ulListado.innerHTML = '';
    for (const libro of catalogo) {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio}) `;
        if (!libro.disponible)
            li.style.color = "red";
        // Botón Eliminar para cada libro [cite: 958]
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.addEventListener('click', () => {
            eliminarLibro(libro.isbn);
        });
        li.appendChild(btnEliminar);
        ulListado.appendChild(li);
    }
    pStats.textContent = `Total de libros en catálogo: ${catalogo.length}`;
}
// Elimina un libro del array y vuelve a dibujar [cite: 967-970]
function eliminarLibro(isbn) {
    // Filtramos dejando pasar a todos los que NO tengan ese isbn
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar();
}
// Agrega un libro al array y vuelve a dibujar [cite: 964-966]
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar();
}
// Valida el formulario. Si está todo OK devuelve un Libro, sino devuelve null [cite: 973-974]
function validarFormulario() {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = parseFloat(inputPrecio.value);
    const disponible = checkDisponible.checked;
    // Validación estricta
    if (titulo === "" || autor === "") {
        divError.textContent = "Error: El título y el autor no pueden estar vacíos.";
        return null;
    }
    if (isNaN(precio) || precio <= 0) {
        divError.textContent = "Error: El precio debe ser un número mayor a 0.";
        return null;
    }
    // Si pasamos las validaciones, construimos y devolvemos el objeto Libro [cite: 974]
    return {
        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible
    };
}
// 5. EVENTO PRINCIPAL [cite: 975-978]
btnAgregar.addEventListener('click', () => {
    divError.textContent = ""; // Limpiamos errores previos
    const nuevoLibro = validarFormulario();
    if (nuevoLibro !== null) {
        agregarLibro(nuevoLibro);
        // Limpiamos los inputs
        inputTitulo.value = "";
        inputAutor.value = "";
        inputPrecio.value = "";
        checkDisponible.checked = true;
    }
});
// 6. ARRANQUE
renderizar();
