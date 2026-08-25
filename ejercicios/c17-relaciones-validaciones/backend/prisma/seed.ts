import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ciencia Ficción" },
  { nombre: "Fantasía" },
  { nombre: "Literatura Infantil" }
];

const libros = [
  { titulo: "El principito", autorNombre: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/1", disponible: true, cats: ["Novela", "Literatura Infantil"] },
  { titulo: "Rayuela", autorNombre: "Julio Cortázar", precio: 5000, imagen: "https://example.com/2", disponible: false, cats: ["Novela"] },
  { titulo: "1984", autorNombre: "George Orwell", precio: 4000, imagen: "https://example.com/3", disponible: true, cats: ["Novela", "Ciencia Ficción"] }
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autorNombre, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autorNombre } },
        categorias: { connect: cats.map(nombre => ({ nombre })) }
      }
    });
  }
  console.log("Seed completado");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
