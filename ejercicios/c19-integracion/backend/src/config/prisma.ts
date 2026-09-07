import { PrismaClient } from '../generated/prisma';

export const prisma = new PrismaClient({
  omit: {
    usuario: { passwordHash: true }
  }
});
