import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Home() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

    return (
        <div>
            <div className="p-4 mb-4 bg-light rounded-3 text-center border">
                <h1 className="display-6 fw-bold">Bienvenido a la Librería</h1>
                <p className="lead mb-0 text-muted">Gestión de catálogo, autenticación y persistencia en producción.</p>
            </div>

            <h2 className="mb-4">Libros Destacados</h2>

            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Cargando libros desde la API...</p>
                </div>
            )}

            {error && <Alert variant="danger">Error al conectar con el backend: {error}</Alert>}

            {libros && (
                <Row>
                    {libros.map(libro => (
                        <Col md={4} key={libro.id} className="mb-4">
                            <LibroCard libro={libro} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
