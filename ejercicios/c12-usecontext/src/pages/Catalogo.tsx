import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import { useBusqueda } from '../context/BusquedaContext';
import type { Libro } from '../types/libro';

export function Catalogo() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');
    const { filtro } = useBusqueda();

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
    
    if (error) return <Alert variant="danger">{error}</Alert>;

    const todos = libros ?? [];
    const visibles = todos.filter(l =>
        l.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        l.autor.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <h1 className="mb-4">Catálogo Completo</h1>
            <p className="text-muted">Mostrando {visibles.length} de {todos.length} libros</p>
            {visibles.length === 0 ? (
                <Alert variant="secondary">Sin resultados para "{filtro}"</Alert>
            ) : (
                <Row>
                    {visibles.map(libro => (
                        <Col md={4} key={libro.id}>
                            <LibroCard libro={libro} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
