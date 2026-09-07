import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Libro } from '../types/libro';

export function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

  if (loading) return <div className="text-center p-8">Cargando libro...</div>;
  if (error || !libro) return <div className="text-center p-8 text-red-500">Libro no encontrado: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/catalogo" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Volver al catálogo</Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <img src={libro.imagen} alt={libro.titulo} className="w-full md:w-1/2 object-cover" />
        <div className="p-6 md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{libro.titulo}</h1>
          <p className="text-xl text-gray-600 mb-4">{libro.autor.nombre}</p>
          <p className="text-2xl font-semibold mb-4">${libro.precio}</p>
          <p className="mb-4">
            <span className="font-bold">Estado: </span> 
            <span className={libro.disponible ? "text-green-600" : "text-red-600"}>
              {libro.disponible ? "Disponible" : "Agotado"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
