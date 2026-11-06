import { Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';

export function Home() {
    return (
        <div>
            <h1 className="mb-4">Libros Destacados</h1>
            <Row>
                <Col md={4}>
                    <LibroCard 
                        libro={{
                            id: 1, 
                            titulo: '1984', 
                            autorId: 1,
                            autor: { id: 1, nombre: 'George Orwell', nacionalidad: 'Británica' }, 
                            imagen: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
                            precio: 15000,
                            disponible: true
                        }} 
                    />
                </Col>
                <Col md={4}>
                    <LibroCard 
                        libro={{
                            id: 2, 
                            titulo: 'Cien Años de Soledad', 
                            autorId: 2,
                            autor: { id: 2, nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana' }, 
                            imagen: 'https://covers.openlibrary.org/b/id/10432722-L.jpg',
                            precio: 18000,
                            disponible: true
                        }} 
                    />
                </Col>
            </Row>
        </div>
    );
}
