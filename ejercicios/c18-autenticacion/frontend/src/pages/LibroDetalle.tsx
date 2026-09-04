import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function LibroDetalle() {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1 className="mb-4">Detalle del libro {id}</h1>
            <p>Aquí se mostraría la información completa del libro correspondiente al ID {id}.</p>
            <Button variant="secondary" as={Link as any} to="/catalogo">
                Volver al catálogo
            </Button>
        </div>
    );
}
