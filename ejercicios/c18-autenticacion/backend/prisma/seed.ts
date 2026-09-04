import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash("Admin1234", 10);
  const clientePass = await bcrypt.hash("Cliente1234", 10);

  await prisma.usuario.upsert({
    where: { email: "admin@libreria.test" },
    update: {},
    create: { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN", passwordHash: adminPass }
  });

  await prisma.usuario.upsert({
    where: { email: "cliente@libreria.test" },
    update: {},
    create: { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE", passwordHash: clientePass }
  });

  const autores = [
    { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
    { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
    { nombre: "George Orwell", nacionalidad: "Reino Unido" }
  ];

  for(const autor of autores) {
    await prisma.autor.upsert({
        where: { nombre: autor.nombre },
        update: {},
        create: autor
    });
  }

  const categorias = [
    { nombre: "Novela" },
    { nombre: "Ciencia Ficción" },
    { nombre: "Fantasía" },
    { nombre: "Literatura Infantil" }
  ];

  for(const cat of categorias) {
    await prisma.categoria.upsert({
        where: { nombre: cat.nombre },
        update: {},
        create: cat
    });
  }

  const libros = [
    { titulo: "El principito", autorNombre: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://example.com/1", disponible: true, cats: ["Novela", "Literatura Infantil"] },
    { titulo: "Rayuela", autorNombre: "Julio Cortázar", precio: 5000, imagen: "https://example.com/2", disponible: false, cats: ["Novela"] },
    { titulo: "1984", autorNombre: "George Orwell", precio: 4000, imagen: "https://example.com/3", disponible: true, cats: ["Novela", "Ciencia Ficción"] }
  ];

  for (const { autorNombre, cats, ...datos } of libros) {
    const l = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!l) {
        await prisma.libro.create({
            data: {
                ...datos,
                autor: { connect: { nombre: autorNombre } },
                categorias: { connect: cats.map(nombre => ({ nombre })) }
            }
        });
    }
  }

  console.log("Seed completado");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
