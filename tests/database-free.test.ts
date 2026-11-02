import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("public data works without a database even if Prisma cannot initialize", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "-e",
      `
        const assert = require("node:assert/strict");
        const Module = require("node:module");
        const originalLoad = Module._load;
        Module._load = function (name, ...args) {
          if (name === "@prisma/client") {
            return {
              PrismaClient: class {
                constructor() {
                  throw new Error("Prisma must not initialize in database-free mode");
                }
              },
            };
          }
          return originalLoad.call(this, name, ...args);
        };
        const { databaseConfigured, getPrisma } = require("./lib/prisma.ts");
        const { getPublicProjects, getPublicProject } = require("./lib/project-service.ts");
        const { getPublicSiteSettings } = require("./lib/site-settings.ts");
        const { isRateLimited } = require("./lib/rate-limit.ts");
        (async () => {
          assert.equal(databaseConfigured, false);
          assert.equal((await getPublicProjects()).length, 4);
          assert.equal((await getPublicProject("saiway")).slug, "saiway");
          assert.equal((await getPublicSiteSettings())["site.locale"], "en");
          assert.equal(await isRateLimited("database-free-test", 2, 60000), false);
          assert.throws(() => getPrisma(), /DATABASE_URL must be configured/);
        })().catch(error => {
          console.error(error);
          process.exitCode = 1;
        });
      `,
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATABASE_URL: "",
        DATABASE_URL_POOLED: "",
        POSTGRES_URL: "",
        PRISMA_DATABASE_URL: "",
        NEXT_PUBLIC_SITE_URL: "https://portfolio.example",
        NODE_ENV: "production",
      },
      encoding: "utf8",
      timeout: 30_000,
    },
  );
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("the Prisma client receives the integration URL without DATABASE_URL", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "-e",
      `
        const assert = require("node:assert/strict");
        const Module = require("node:module");
        const originalLoad = Module._load;
        Module._load = function (name, ...args) {
          if (name === "@prisma/client") {
            return { PrismaClient: class {
              constructor(options) {
                assert.equal(options.datasourceUrl, process.env.DATABASE_URL_POOLED);
              }
            }};
          }
          return originalLoad.call(this, name, ...args);
        };
        const { databaseConfigured, getPrisma } = require("./lib/prisma.ts");
        assert.equal(databaseConfigured, true);
        assert.equal(getPrisma(), getPrisma());
      `,
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATABASE_URL: "",
        DATABASE_URL_POOLED: "postgresql://user:password@pool.example:5432/portfolio",
        POSTGRES_URL: "postgresql://user:password@db.example:5432/portfolio",
        PRISMA_DATABASE_URL: "prisma+postgres://proxy.example/?api_key=test",
        NEXT_PUBLIC_SITE_URL: "https://portfolio.example",
        NODE_ENV: "production",
      },
      encoding: "utf8",
      timeout: 30_000,
    },
  );
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
