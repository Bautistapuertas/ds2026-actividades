import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { AuthContext } from '../../context/AuthContext';

function renderHeader(usuario: any) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: string) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn()
  };
  
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth as any}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('CLIENTE: no ve el link "Nuevo libro"', () => {
    renderHeader({ id: 2, email: 'cliente@test', nombre: 'Cliente', rol: 'CLIENTE' });
    expect(screen.queryByText(/nuevo libro/i)).not.toBeInTheDocument();
  });
  
  it('ADMIN: sí ve el link "Nuevo libro"', () => {
    renderHeader({ id: 1, email: 'admin@test', nombre: 'Admin', rol: 'ADMIN' });
    expect(screen.getByText(/nuevo libro/i)).toBeInTheDocument();
  });
});
