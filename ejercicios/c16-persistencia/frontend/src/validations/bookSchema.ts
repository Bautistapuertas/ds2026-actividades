import { z } from 'zod';

export const bookSchema = z.object({
    titulo: z.string().min(1, "El título es obligatorio").max(100, "El título no puede superar los 100 caracteres"),
    autor: z.string().min(1, "El autor es obligatorio").max(50, "El autor no puede superar los 50 caracteres"),
    imagen: z.string().url("Debe ser una URL válida").min(1, "La imagen es obligatoria"),
    precio: z.coerce.number().positive("El precio debe ser un número positivo").optional()
});

export type BookFormValues = z.infer<typeof bookSchema>;
