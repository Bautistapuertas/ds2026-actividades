import { useState } from "react";
import { bookSchema, type BookFormData } from "../validations/bookSchema";
import { apiFetch } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";

export function AltaLibro() {
  const [formData, setFormData] = useState<Partial<BookFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const result = bookSchema.safeParse(formData);
    if (!result.success) {
      const formErrors: any = {};
      result.error.issues.forEach(issue => {
        formErrors[issue.path[0]] = issue.message;
      });
      setErrors(formErrors);
      return;
    }

    try {
      setGuardando(true);
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(result.data)
      });
      navigate('/catalogo');
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ maxWidth: '540px', width: '100%' }} className="shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0 fw-bold">Alta de Nuevo Libro</h2>
            <Link to="/catalogo" className="btn btn-outline-secondary btn-sm">Volver</Link>
          </div>

          {serverError && <Alert variant="danger">{serverError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título del Libro</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                placeholder="Ej: Rayuela"
                onChange={handleChange}
                isInvalid={!!errors.titulo}
              />
              <Form.Control.Feedback type="invalid">{errors.titulo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Select
                name="autorId"
                onChange={handleChange}
                isInvalid={!!errors.autorId}
                defaultValue=""
              >
                <option value="" disabled>Seleccione un autor...</option>
                <option value="1">Antoine de Saint-Exupéry (ID: 1)</option>
                <option value="2">Julio Cortázar (ID: 2)</option>
                <option value="3">George Orwell (ID: 3)</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.autorId}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                placeholder="Ej: 5500"
                onChange={handleChange}
                isInvalid={!!errors.precio}
              />
              <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="url"
                name="imagen"
                placeholder="https://..."
                onChange={handleChange}
                isInvalid={!!errors.imagen}
              />
              <Form.Control.Feedback type="invalid">{errors.imagen}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar Libro'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
