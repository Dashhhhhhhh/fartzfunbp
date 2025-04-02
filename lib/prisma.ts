import { PrismaClient } from '@prisma/client';
import { createPGClient } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pgClient = createPGClient({
  url: process.env.POSTGRES_PRISMA_URL!,
  connectionString: process.env.POSTGRES_URL_NON_POOLING!,
  pool: {
    min: 0,
    max: 1,
  },
  ssl: true,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: pgClient,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;