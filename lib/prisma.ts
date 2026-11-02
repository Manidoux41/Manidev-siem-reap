import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const databaseConfigured = Boolean(env.DATABASE_URL);

let client: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!databaseConfigured) {
    throw new Error("DATABASE_URL must be configured before accessing PostgreSQL.");
  }
  if (client) return client;

  client = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
