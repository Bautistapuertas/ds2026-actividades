import type { Libro } from "../types/libro";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export function LibroCard({ libro }: { libro: Libro }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{libro.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{libro.autor?.nombre}</Card.Subtitle>
        <p className="fs-5 fw-semibold text-primary mt-2">${libro.precio}</p>
        <div className="mt-auto pt-3">
          <Button as={Link as any} to={`/libros/${libro.id}`} variant="primary" className="w-100">
            Ver detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
