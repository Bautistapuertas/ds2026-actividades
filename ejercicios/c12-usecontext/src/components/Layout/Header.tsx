import { Navbar, Container, Nav, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useBusqueda } from '../../context/BusquedaContext';

export function Header() {
    const { filtro, setFiltro } = useBusqueda();
    const navigate = useNavigate();

    const buscar = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/catalogo');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Librería React</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                        <Nav.Link as={Link} to="/alta">Alta de Libro</Nav.Link>
                    </Nav>
                    <Form onSubmit={buscar} className="d-flex">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Buscar por título o autor..."
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            />
                            <Button type="submit" variant="outline-light">🔍</Button>
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
