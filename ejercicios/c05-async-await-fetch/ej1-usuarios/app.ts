// 1. Definimos la interface para tipar la respuesta
interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// 2. Función asincrónica para ir a buscar los datos
async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    // Le pegamos a la API que pide el ejercicio
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // fetch no tira error si la página no existe (ej. error 404), así que lo chequeamos a mano
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Transformamos la respuesta a JSON y le decimos a TS que esto es un array de Usuarios
    const usuarios: Usuario[] = await response.json();
    
    return usuarios;

  } catch (error) {
    // Si se corta internet o falla algo, cae acá
    console.error('Error al obtener usuarios:', error);
    return []; // Devolvemos un array vacío para que no explote el resto del programa
  }
}
// 3. Ejecutamos la función y mostramos los resultados
async function iniciar() {
  console.log('Buscando usuarios...');
  
  // Esperamos a que la función traiga los datos
  const listaUsuarios = await obtenerUsuarios();

  // Recorremos la lista y mostramos lo que pide el ejercicio
  listaUsuarios.forEach(usuario => {
    console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
  });
}

// Arrancamos el programa
iniciar();