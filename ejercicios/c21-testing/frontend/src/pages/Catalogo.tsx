import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';
import { LibroCard } from '../components/LibroCard';
import { Row, Col, Form, Spinner, Alert } from 'react-bootstrap';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
  const [busqueda, setBusqueda] = useState('');

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">Cargando catálogo...</p>
    </div>
  );

  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  const filtrados = libros?.filter(l => 
    l.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
    l.autor?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1 className="mb-4">Catálogo de Libros</h1>
      <Form.Control 
        type="search" 
        placeholder="Buscar por título o autor..." 
        className="mb-4 p-2"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Row>
        {filtrados?.map(libro => (
          <Col md={4} key={libro.id} className="mb-4">
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
      {filtrados?.length === 0 && (
        <Alert variant="secondary" className="text-center">No se encontraron libros con esa búsqueda.</Alert>
      )}
    </div>
  );
}
