import { Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import type { Libro } from '../types/libro';

export function Catalogo() {
    const libros: Libro[] = [
        {
            id: 1, 
            titulo: '1984', 
            autor: 'George Orwell', 
            imagen: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
            precio: 15000
        },
        {
            id: 2, 
            titulo: 'Cien Años de Soledad', 
            autor: 'Gabriel García Márquez', 
            imagen: 'https://covers.openlibrary.org/b/id/10432722-L.jpg',
            precio: 18000
        },
        {
            id: 3, 
            titulo: 'El Principito', 
            autor: 'Antoine de Saint-Exupéry', 
            imagen: 'https://covers.openlibrary.org/b/id/8292850-L.jpg',
            precio: 12000
        }
    ];

    return (
        <div>
            <h1 className="mb-4">Catálogo Completo</h1>
            <Row>
                {libros.map(libro => (
                    <Col md={4} key={libro.id}>
                        <LibroCard libro={libro} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
