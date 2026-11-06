import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-gray-300">Librería C20</Link>
      <nav className="space-x-4 flex items-center">
        <Link to="/catalogo" className="hover:text-gray-300">Catálogo</Link>
        {tieneRol('ADMIN') && (
          <Link to="/libros/nuevo" className="hover:text-gray-300 text-green-400 font-semibold">Nuevo Libro</Link>
        )}
        {usuario && <span className="ml-4 font-semibold">Hola, {usuario.nombre}</span>}
        <button onClick={manejarSesion} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 ml-4">
          {usuario ? 'Salir' : 'Ingresar'}
        </button>
      </nav>
    </header>
  );
}
