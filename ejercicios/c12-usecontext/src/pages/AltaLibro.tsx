import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { bookSchema, type BookFormValues } from '../validations/bookSchema';
import { useState } from 'react';

export function AltaLibro() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema as any),
        defaultValues: {
            titulo: '',
            autor: '',
            imagen: '',
            precio: '' as any
        }
    });

    const onSubmit = (data: BookFormValues) => {
        console.log("Datos válidos recibidos: ", data);
        setSuccessMessage(`¡El libro "${data.titulo}" se dio de alta correctamente!`);
        reset(); // Limpia el formulario
        
        // Quita el mensaje de éxito después de 5 segundos
        setTimeout(() => setSuccessMessage(null), 5000);
    };

    return (
        <Row className="justify-content-md-center">
            <Col md={8}>
                <h1 className="mb-4">Alta de Nuevo Libro</h1>
                
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Form onSubmit={handleSubmit(onSubmit as any)}>
                    <Form.Group className="mb-3" controlId="titulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ej: El Señor de los Anillos"
                            isInvalid={!!errors.titulo}
                            {...register("titulo")} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.titulo?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="autor">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ej: J.R.R. Tolkien"
                            isInvalid={!!errors.autor}
                            {...register("autor")} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.autor?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="imagen">
                        <Form.Label>URL de Imagen</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ej: https://.../imagen.jpg"
                            isInvalid={!!errors.imagen}
                            {...register("imagen")} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.imagen?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="precio">
                        <Form.Label>Precio (Opcional)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ej: 15000"
                            isInvalid={!!errors.precio}
                            {...register("precio")} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.precio?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Dar de Alta
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}
