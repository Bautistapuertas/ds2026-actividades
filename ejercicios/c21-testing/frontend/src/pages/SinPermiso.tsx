import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <div className="text-center p-10 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded my-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
      <p className="mb-6">No tenés permisos para ver esta página.</p>
      <Link to="/catalogo" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Volver al catálogo</Link>
    </div>
  );
}
