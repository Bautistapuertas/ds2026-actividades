import { describe, it, expect } from "vitest";
import { libroCreateSchema } from "./libro.validation";

describe("libroCreateSchema", () => {
  it("rechaza precio negativo", () => {
    const libroMalo = { titulo: "Rayuela", precio: -50, imagen: "https://img/r.jpg", autorId: 1 };
    const r = libroCreateSchema.safeParse(libroMalo);
    expect(r.success).toBe(false);
  });

  it("recorta espacios del título", () => {
    const libroConEspacios = { titulo: "  Rayuela  ", precio: 5000, imagen: "https://img/r.jpg", autorId: 1 };
    const r = libroCreateSchema.safeParse(libroConEspacios);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.titulo).toBe("Rayuela");
    }
  });
});
