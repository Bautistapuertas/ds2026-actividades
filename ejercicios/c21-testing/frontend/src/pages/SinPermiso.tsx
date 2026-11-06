import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

export function SinPermiso() {
  return (
    <div className="text-center py-5">
      <Alert variant="warning" className="d-inline-block p-4">
        <h2 className="alert-heading">Acceso Restringido (403)</h2>
        <p className="mb-3">No tenés los permisos necesarios para acceder a esta sección. Esta función es exclusiva para administradores.</p>
        <Button as={Link as any} to="/" variant="primary">Volver al Inicio</Button>
      </Alert>
    </div>
  );
}
