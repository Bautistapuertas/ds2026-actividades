interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return await response.json();
}

async function iniciar() {
  // Capturamos los elementos del HTML
  const pCargando = document.getElementById('mensaje-cargando') as HTMLParagraphElement;
  const pError = document.getElementById('mensaje-error') as HTMLParagraphElement;
  const ulLista = document.getElementById('lista-usuarios') as HTMLUListElement;

  try {
    
    const listaUsuarios = await obtenerUsuarios();

    
    pCargando.style.display = 'none';

    
    listaUsuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `Nombre: ${usuario.name} | Email: ${usuario.email}`;
      ulLista.appendChild(li); 
    });

  } catch (error) {
   
    pCargando.style.display = 'none';
    
    pError.textContent = 'Hubo un error al cargar los usuarios. Por favor, intentá de nuevo.';
    pError.style.display = 'block';
  }
}

// Arrancamos el programa
iniciar();