import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Libro } from '../types/libro';
import { LibroCard } from '../components/LibroCard';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <div className="text-center p-8">Cargando catálogo...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  const filtrados = libros?.filter(l => 
    l.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
    l.autor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Libros</h1>
      <input 
        type="text" 
        placeholder="Buscar por título o autor..." 
        className="w-full p-2 border rounded mb-6"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtrados?.map(libro => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>
      {filtrados?.length === 0 && <p className="text-center text-gray-500">No se encontraron libros.</p>}
    </div>
  );
}
