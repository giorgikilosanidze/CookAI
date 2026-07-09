import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Reuse one client across dev hot-reloads so we don't exhaust DB connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local.",
    );
  }

  const client = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });
  globalForPrisma.prisma = client;
  return client;
}

// Lazy proxy so importing this module never throws: pages that don't touch
// the database keep working even before DATABASE_URL is configured.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const value = Reflect.get(client, prop);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});
