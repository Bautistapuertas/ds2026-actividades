import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/sesionType';

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <div className="text-center p-8">Cargando sesión...</div>;
  
  if (!usuario) return <Navigate to="/login" replace />;
  
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;
  
  return <Outlet />;
}
