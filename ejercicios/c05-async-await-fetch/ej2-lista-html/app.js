// 2. Función que SOLO se encarga de buscar los datos
async function obtenerUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        // Si falla, tiramos el error para que lo atrape la función iniciar()
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
}
async function iniciar() {
    const pCargando = document.getElementById('mensaje-cargando');
    const pError = document.getElementById('mensaje-error');
    const ulLista = document.getElementById('lista-usuarios');
    try {
        // 
        const listaUsuarios = await obtenerUsuarios();
        
        pCargando.style.display = 'none';
        listaUsuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${usuario.name} | Email: ${usuario.email}`;
            ulLista.appendChild(li); // Lo inyectamos adentro del <ul>
        });
    }
    catch (error) {
        pCargando.style.display = 'none';
        pError.textContent = 'Hubo un error al cargar los usuarios. Por favor, intentá de nuevo.';
        pError.style.display = 'block';
    }
}
iniciar();
