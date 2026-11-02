type DatabaseEnvironment = {
  [key: string]: string | undefined;
  DATABASE_URL?: string;
  DATABASE_URL_POOLED?: string;
  POSTGRES_URL?: string;
  PRISMA_DATABASE_URL?: string;
};

export function resolveDatabaseUrl(
  environment: DatabaseEnvironment,
  purpose: "runtime" | "migration" = "runtime",
): string | undefined {
  const keys: (keyof DatabaseEnvironment)[] =
    purpose === "migration"
      ? ["POSTGRES_URL", "DATABASE_URL", "DATABASE_URL_POOLED", "PRISMA_DATABASE_URL"]
      : ["DATABASE_URL", "DATABASE_URL_POOLED", "POSTGRES_URL", "PRISMA_DATABASE_URL"];

  for (const key of keys) {
    const value = environment[key]?.trim();
    if (!value) continue;

    let protocol: string;
    try {
      protocol = new URL(value).protocol;
    } catch {
      throw new Error(`${key}: invalid database URL.`);
    }
    if (protocol === "postgres:" || protocol === "postgresql:") return value;

    if (
      key === "PRISMA_DATABASE_URL" &&
      ["prisma:", "prisma+postgres:"].includes(protocol)
    ) {
      throw new Error(
        "PRISMA_DATABASE_URL uses a Prisma proxy URL. Configure a PostgreSQL connection in POSTGRES_URL or DATABASE_URL_POOLED for this client and migrations.",
      );
    }
    throw new Error(`${key}: a postgres:// or postgresql:// URL is required.`);
  }
  return undefined;
}
