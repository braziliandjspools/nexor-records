import { PrismaClient } from '@prisma/client'

// Este padrão evita que múltiplas instâncias do Prisma Client sejam criadas,
// o que é uma prática recomendada para ambientes serverless como o Netlify.

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
