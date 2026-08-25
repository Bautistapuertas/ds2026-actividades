import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Catalogo() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
    
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h1 className="mb-4">Catálogo Completo</h1>
            <Row>
                {(libros ?? []).map(libro => (
                    <Col md={4} key={libro.id}>
                        <LibroCard libro={libro} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
