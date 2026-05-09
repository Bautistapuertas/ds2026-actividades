document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    const inputBusqueda = document.getElementById('inputBusqueda');
    const contenedorResultados = document.getElementById('resultados');
    const mensajeError = document.getElementById('mensajeError');

    // Escuchar el clic del botón
    btnBuscar.addEventListener('click', async () => {
        const query = inputBusqueda.value.trim();

        // Validar que el input no esté vacío
        if (!query) {
            mensajeError.classList.remove('d-none');
            return;
        }
        
        mensajeError.classList.add('d-none');
        contenedorResultados.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div><p>Buscando libros...</p></div>';

        try {
            // Llamada a la API
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            // Tomar solo los primeros 10 resultados
            const libros = data.docs.slice(0, 10);
            
            // Limpiar el contenedor
            contenedorResultados.innerHTML = '';

            if (libros.length === 0) {
                contenedorResultados.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No se encontraron resultados.</p></div>';
                return;
            }

            // Crear las cards dinámicamente
            libros.forEach(libro => {
                const titulo = libro.title || 'Título desconocido';
                const autor = libro.author_name ? libro.author_name[0] : 'Autor desconocido';
                const anio = libro.first_publish_year || 'Año desconocido';
                
                // Usamos una imagen genérica porque la API no siempre trae portada
                const cardHTML = `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <img src="https://via.placeholder.com/300x400?text=Portada" class="card-img-top" alt="Portada">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <p class="card-text text-muted mb-1">Autor: ${autor}</p>
                                <p class="card-text text-muted"><small>Publicado: ${anio}</small></p>
                                <a href="libro.html" class="btn btn-outline-primary mt-auto">Ver detalle</a>
                            </div>
                        </div>
                    </div>
                `;
                contenedorResultados.innerHTML += cardHTML;
            });

        } catch (error) {
            console.error("Error al buscar libros:", error);
            contenedorResultados.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Hubo un error al conectar con el servidor.</p></div>';
        }
    });
});