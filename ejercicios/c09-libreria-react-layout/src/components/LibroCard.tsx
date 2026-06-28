import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

interface LibroCardProps {
    libro: Libro;
}

export function LibroCard({ libro }: LibroCardProps) {
    return (
        <Card style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Img variant="top" src={libro.imagen} style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{libro.titulo}</Card.Title>
                <Card.Text>{libro.autor}</Card.Text>
                {libro.precio && <Card.Text>${libro.precio}</Card.Text>}
                <Button variant="primary" as={Link} to={`/libros/${libro.id}`}>
                    Ver más
                </Button>
            </Card.Body>
        </Card>
    );
}
