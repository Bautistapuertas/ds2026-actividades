import { Prisma } from "../generated/prisma";

export type LibroConRelaciones = Prisma.LibroGetPayload<{
  include: { autor: true, categorias: true }
}>;
