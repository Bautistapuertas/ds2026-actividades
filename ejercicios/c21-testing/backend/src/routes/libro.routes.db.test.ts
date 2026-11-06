// ESTE TEST NECESITA LA BASE DE DATOS CORRIENDO
import request from "supertest";
import app from "../app";
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../config/prisma";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /api/libros (con DB)", () => {
  it("devuelve 200 y una lista de libros", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
