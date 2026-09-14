export type Rol = 'CLIENTE' | 'ADMIN';
export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}
export interface Sesion {
  token: string;
  usuario: Usuario;
}
