import { prisma } from "../config/prisma";
import { LibroConRelaciones } from "../types/libro.types";

export async function findAll(disponible?: boolean): Promise<LibroConRelaciones[]> {
  const where = disponible !== undefined ? { disponible } : {};
  return prisma.libro.findMany({
    where,
    include: { autor: true, categorias: true }
  });
}

export async function findById(id: number): Promise<LibroConRelaciones | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: any): Promise<LibroConRelaciones> {
  const { categoriasIds, ...resto } = datos;
  const data: any = { ...resto };
  if (categoriasIds && categoriasIds.length > 0) {
    data.categorias = { connect: categoriasIds.map((id: number) => ({ id })) };
  }
  return prisma.libro.create({
    data,
    include: { autor: true, categorias: true }
  });
}

export async function update(id: number, datos: any): Promise<LibroConRelaciones | null> {
  const { categoriasIds, ...resto } = datos;
  const data: any = { ...resto };
  if (categoriasIds) {
    data.categorias = { set: categoriasIds.map((cid: number) => ({ id: cid })) };
  }
  return prisma.libro.update({
    where: { id },
    data,
    include: { autor: true, categorias: true }
  });
}

export async function remove(id: number): Promise<boolean> {
  const exists = await prisma.libro.findUnique({ where: { id } });
  if (!exists) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}
