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
                            autor: 'George Orwell', 
                            imagen: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
                            precio: 15000
                        }} 
                    />
                </Col>
                <Col md={4}>
                    <LibroCard 
                        libro={{
                            id: 2, 
                            titulo: 'Cien Años de Soledad', 
                            autor: 'Gabriel García Márquez', 
                            imagen: 'https://covers.openlibrary.org/b/id/10432722-L.jpg',
                            precio: 18000
                        }} 
                    />
                </Col>
            </Row>
        </div>
    );
}
