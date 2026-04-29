// 2. Función que SOLO se encarga de buscar los datos
async function obtenerUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        // Si falla, tiramos el error para que lo atrape la función iniciar()
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
}
// 3. Función que controla la pantalla (El DOM)
async function iniciar() {
    // Capturamos los elementos del HTML
    const pCargando = document.getElementById('mensaje-cargando');
    const pError = document.getElementById('mensaje-error');
    const ulLista = document.getElementById('lista-usuarios');
    try {
        // El texto "Cargando..." ya está visible por el HTML. 
        // Vamos a buscar los datos.
        const listaUsuarios = await obtenerUsuarios();
        // Si llegamos a esta línea, es porque los datos llegaron bien.
        // 1ro: Ocultamos el mensaje de carga
        pCargando.style.display = 'none';
        // 2do: Recorremos los usuarios y creamos los <li>
        listaUsuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${usuario.name} | Email: ${usuario.email}`;
            ulLista.appendChild(li); // Lo inyectamos adentro del <ul>
        });
    }
    catch (error) {
        // Si la promesa falló (ej. no hay internet), caemos acá
        // Ocultamos el "Cargando..."
        pCargando.style.display = 'none';
        // Mostramos el mensaje de error en rojo
        pError.textContent = 'Hubo un error al cargar los usuarios. Por favor, intentá de nuevo.';
        pError.style.display = 'block';
    }
}
// Arrancamos el programa
iniciar();
