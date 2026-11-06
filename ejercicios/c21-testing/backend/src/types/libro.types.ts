import { Prisma } from "@prisma/client";

export type LibroConRelaciones = Prisma.LibroGetPayload<{
  include: { autor: true, categorias: true }
}>;
