// 3. Capturamos los elementos del HTML
const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const divResultados = document.getElementById('resultados');
const pError = document.getElementById('mensaje-error');
const pCargando = document.getElementById('mensaje-cargando');
btnBuscar.addEventListener('click', async () => {
    pError.style.display = 'none';
    divResultados.innerHTML = '';
    const textoBusqueda = inputBusqueda.value.trim();

    if (textoBusqueda === '') {
        pError.textContent = 'Por favor, escribí un título para buscar.';
        pError.style.display = 'block';
        return;
    }
    pCargando.style.display = 'block';
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(textoBusqueda)}`);
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }
        const data = await response.json();

        const primeros10Libros = data.docs.slice(0, 10);

        pCargando.style.display = 'none';

        if (primeros10Libros.length === 0) {
            divResultados.innerHTML = '<p>No se encontraron libros con ese nombre.</p>';
            return;
        }

        primeros10Libros.forEach(libro => {
            const divTarjeta = document.createElement('div');
            divTarjeta.className = 'tarjeta'; 
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
