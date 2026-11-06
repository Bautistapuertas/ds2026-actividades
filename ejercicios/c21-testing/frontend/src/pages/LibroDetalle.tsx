import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';
import { Card, Spinner, Alert, Badge } from 'react-bootstrap';

export function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">Cargando libro...</p>
    </div>
  );

  if (error || !libro) return (
    <Alert variant="danger">Libro no encontrado: {error}</Alert>
  );

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ maxWidth: '640px', width: '100%' }} className="shadow-sm">
        <Card.Body className="p-4">
          <Link to="/catalogo" className="btn btn-outline-secondary btn-sm mb-3">&larr; Volver al catálogo</Link>
          <div className="row g-4 align-items-center">
            {libro.imagen && (
              <div className="col-md-5 text-center">
                <img
                  src={libro.imagen}
                  alt={libro.titulo}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: '260px', objectFit: 'cover' }}
                />
              </div>
            )}
            <div className={libro.imagen ? "col-md-7" : "col-12"}>
              <h1 className="h3 fw-bold mb-1">{libro.titulo}</h1>
              <p className="text-muted fs-5 mb-3">{libro.autor?.nombre}</p>
              <p className="fs-4 fw-bold text-primary mb-3">${libro.precio}</p>
              <p className="mb-2">
                <strong>Disponibilidad: </strong>
                <Badge bg={libro.disponible ? 'success' : 'secondary'}>
                  {libro.disponible ? 'Disponible' : 'Agotado'}
                </Badge>
              </p>
              {libro.categorias && libro.categorias.length > 0 && (
                <div className="mt-2">
                  <strong>Categorías: </strong>
                  {libro.categorias.map(c => (
                    <Badge key={c.id} bg="info" className="me-1">{c.nombre}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
