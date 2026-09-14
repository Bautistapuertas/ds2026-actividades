import { z } from "zod";

export const bookSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio").max(100),
  precio: z.number().positive("El precio debe ser positivo"),
  imagen: z.string().url("Debe ser una URL válida"),
  autorId: z.number().int().positive("El autorId es obligatorio")
});

export type BookFormData = z.infer<typeof bookSchema>;
