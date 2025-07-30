// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // para evitar múltiplas instâncias em dev
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['info', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
