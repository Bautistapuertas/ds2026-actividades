import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";
import { describe, it, expect } from "vitest";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });

describe("POST /api/libros", () => {
  it("con token de CLIENTE -> 403", async () => {
    const res = await request(app).post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({ titulo: "Nuevo", precio: 1000, autorId: 1 });
    expect(res.status).toBe(403);
  });
});
