import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

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
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Librería</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo" className="text-success fw-bold">Nuevo Libro</Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center">
            {usuario && <span className="text-light me-3">Hola, <strong>{usuario.nombre}</strong> ({usuario.rol})</span>}
            <Button variant={usuario ? 'outline-light' : 'primary'} size="sm" onClick={manejarSesion}>
              {usuario ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
