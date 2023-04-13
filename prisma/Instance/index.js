const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient()

// export default prisma

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma