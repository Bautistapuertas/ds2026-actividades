// 3. Capturamos los elementos del HTML
const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const divResultados = document.getElementById('resultados');
const pError = document.getElementById('mensaje-error');
const pCargando = document.getElementById('mensaje-cargando');
// 4. Escuchamos el evento "click" en el botón de buscar
btnBuscar.addEventListener('click', async () => {
    // Limpiamos errores y resultados anteriores
    pError.style.display = 'none';
    divResultados.innerHTML = '';
    // Obtenemos lo que escribió el usuario
    const textoBusqueda = inputBusqueda.value.trim();
    // VALIDACIÓN: Si está vacío, mostramos error y frenamos acá (no hacemos fetch)[cite: 2]
    if (textoBusqueda === '') {
        pError.textContent = 'Por favor, escribí un título para buscar.';
        pError.style.display = 'block';
        return;
    }
    // Si pasamos la validación, mostramos el "Cargando..." y vamos a buscar a la API
    pCargando.style.display = 'block';
    try {
        // Hacemos el fetch agregando el texto de búsqueda a la URL[cite: 2]
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(textoBusqueda)}`);
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }
        // Parseamos la respuesta
        const data = await response.json();
        // El ejercicio pide mostrar solo los primeros 10 resultados[cite: 2]
        const primeros10Libros = data.docs.slice(0, 10);
        // Ocultamos el mensaje de carga
        pCargando.style.display = 'none';
        // Si no encontró nada
        if (primeros10Libros.length === 0) {
            divResultados.innerHTML = '<p>No se encontraron libros con ese nombre.</p>';
            return;
        }
        // Recorremos los 10 libros y creamos una tarjeta para cada uno[cite: 2]
        primeros10Libros.forEach(libro => {
            const divTarjeta = document.createElement('div');
            divTarjeta.className = 'tarjeta'; // Le damos la clase CSS para que se vea lindo
            // Como autor y año son opcionales, validamos si existen para no mostrar "undefined"[cite: 2]
            const autor = libro.author_name ? libro.author_name[0] : 'Autor desconocido';
            const anio = libro.first_publish_year ? libro.first_publish_year : 'Año desconocido';
            divTarjeta.innerHTML = `
                <h3>${libro.title}</h3>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Año de publicación:</strong> ${anio}</p>
            `;
            divResultados.appendChild(divTarjeta);
        });
    }
    catch (error) {
        pCargando.style.display = 'none';
        pError.textContent = 'Hubo un error al buscar los libros. Intentá de nuevo.';
        pError.style.display = 'block';
    }
});
