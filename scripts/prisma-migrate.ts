import { loadEnvConfig } from "@next/env";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { resolveDatabaseUrl } from "../lib/database-url";

loadEnvConfig(process.cwd());

try {
  const [command, ...args] = process.argv.slice(2);
  if (command !== "dev" && command !== "deploy") {
    throw new Error("Expected migration command: dev or deploy.");
  }
  const datasourceUrl = resolveDatabaseUrl(process.env, "migration");
  if (!datasourceUrl) {
    throw new Error("Configure POSTGRES_URL or another PostgreSQL connection before migrating.");
  }
  const require = createRequire(import.meta.url);
  const result = spawnSync(
    process.execPath,
    [require.resolve("prisma/build/index.js"), "migrate", command, ...args],
    {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: datasourceUrl },
    },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : "Prisma migration failed.");
  process.exitCode = 1;
}
