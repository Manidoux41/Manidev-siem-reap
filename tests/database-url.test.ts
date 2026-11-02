import assert from "node:assert/strict";
import test from "node:test";
import { resolveDatabaseUrl } from "../lib/database-url";

const direct = "postgresql://user:password@db.example:5432/portfolio";
const pooled = "postgresql://user:password@pool.example:5432/portfolio";

test("database resolution recognizes all PostgreSQL aliases", () => {
  for (const key of [
    "DATABASE_URL",
    "DATABASE_URL_POOLED",
    "POSTGRES_URL",
    "PRISMA_DATABASE_URL",
  ]) {
    assert.equal(resolveDatabaseUrl({ [key]: direct }), direct);
  }
  assert.equal(resolveDatabaseUrl({ DATABASE_URL: " " }), undefined);
});

test("runtime prefers the pool while migrations prefer POSTGRES_URL", () => {
  const environment = {
    DATABASE_URL: "",
    POSTGRES_URL: direct,
    DATABASE_URL_POOLED: pooled,
    PRISMA_DATABASE_URL: "prisma+postgres://accelerate.example/?api_key=test",
  };
  assert.equal(resolveDatabaseUrl(environment), pooled);
  assert.equal(resolveDatabaseUrl(environment, "migration"), direct);
  assert.equal(
    resolveDatabaseUrl({ ...environment, DATABASE_URL: direct }),
    direct,
  );
});

test("unsupported proxy URLs fail explicitly without exposing credentials", () => {
  assert.throws(
    () => resolveDatabaseUrl({ PRISMA_DATABASE_URL: "prisma://proxy.example/?api_key=secret" }),
    /Configure a PostgreSQL connection/,
  );
  for (const value of ["invalid-secret", "https://user:secret@example.com"]) {
    try {
      resolveDatabaseUrl({ POSTGRES_URL: value });
      assert.fail("invalid database URL was accepted");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.ok(!error.message.includes("secret"));
    }
  }
});
