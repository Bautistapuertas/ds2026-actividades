import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria")
});

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setError(validacion.error.issues[0].message);
      return;
    }

    try {
      setCargando(true);
      await login(validacion.data);
      navigate('/catalogo');
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ maxWidth: '420px', width: '100%' }} className="shadow-sm mt-3">
        <Card.Body className="p-4">
          <h2 className="h4 fw-bold text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@libreria.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </Button>
            <div className="small text-muted p-2 bg-light rounded border">
              <strong>Usuarios de prueba:</strong>
              <div className="mt-1">Admin: <code>admin@libreria.com</code> / <code>admin123</code></div>
              <div>Cliente: <code>cliente@libreria.com</code> / <code>cliente123</code></div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
