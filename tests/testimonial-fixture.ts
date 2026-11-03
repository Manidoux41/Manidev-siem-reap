import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

export function runTestimonialFixture(scenario: string) {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let configured = true, admin = null, fail = false, rateFail = false;
    let rows = [], rateRows = new Map(), writes = 0;
    const projects = [{ id: "published-project", title: "Published project", published: true },
      { id: "draft-project", title: "Private project", published: false }];
    const match = (row, where) => {
      const project = projects.find(p => p.id === row.projectId);
      return (!where.id || row.id === where.id) &&
        (!where.projectId || row.projectId === where.projectId) &&
        (!where.status || row.status === where.status) &&
        (where.publicationConsent === undefined || row.publicationConsent === where.publicationConsent) &&
        (!where.project || project?.published === where.project.published);
    };
    const prisma = {
      project: { findFirst: async ({ where }) => projects.find(p => p.id === where.id && p.published === where.published) ?? null },
      testimonial: {
        create: async ({ data }) => {
          if (fail) throw new Error("Isolated persistence failure");
          writes++;
          const row = { ...data, id: "row-" + (rows.length + 1), createdAt: new Date(), updatedAt: new Date() };
          rows.push(row); return row;
        },
        findMany: async ({ where, select }) => {
          if (fail) throw new Error("Isolated read failure");
          const found = where ? rows.filter(row => match(row, where)) : rows;
          if (select) {
            assert.deepEqual(select, { displayName: true, testimony: true, project: { select: { title: true } } });
            assert.equal(where.status, "APPROVED");
            assert.equal(where.publicationConsent, true);
            assert.deepEqual(where.project, { published: true });
            return found.map(row => ({ displayName: row.displayName, testimony: row.testimony,
              project: { title: projects.find(p => p.id === row.projectId).title } }));
          }
          return found.map(row => ({ ...row, project: projects.find(p => p.id === row.projectId) }));
        },
        updateMany: async ({ where, data }) => {
          if (fail) throw new Error("Isolated update failure");
          assert.deepEqual(Object.keys(data), ["status"]);
          const found = rows.filter(row => match(row, where));
          found.forEach(row => Object.assign(row, data)); writes += found.length;
          return { count: found.length };
        },
        deleteMany: async ({ where }) => {
          if (fail) throw new Error("Isolated delete failure");
          assert.deepEqual(Object.keys(where), ["id"]);
          const count = rows.filter(row => match(row, where)).length;
          rows = rows.filter(row => !match(row, where)); writes += count;
          return { count };
        },
      },
      rateLimitEntry: {
        findUnique: async ({ where }) => {
          if (rateFail) throw new Error("Isolated rate limit failure");
          return rateRows.get(where.key);
        },
        create: async ({ data }) => { rateRows.set(data.key, { ...data }); return data; },
        updateMany: async ({ where, data }) => {
          const row = rateRows.get(where.key);
          if (!row || (where.resetAt?.lte && row.resetAt > where.resetAt.lte) ||
            (where.resetAt?.gt && row.resetAt <= where.resetAt.gt) ||
            (where.count?.lt && row.count >= where.count.lt)) return { count: 0 };
          if (typeof data.count === "number") Object.assign(row, data);
          else row.count += data.count.increment;
          return { count: 1 };
        },
      },
    };
    Module._load = function(name, ...args) {
      if (name === "@/lib/prisma") return {
        get databaseConfigured() { return configured; },
        getPrisma: () => { assert.ok(configured); return prisma; },
      };
      if (name === "@/lib/admin-session") return { getAdminUser: async () => admin };
      if (name === "next/server") return { connection: async () => {} };
      return original.call(this, name, ...args);
    };
    const { POST, GET } = require("./app/api/v1/testimonials/route.ts");
    const { PATCH, DELETE } = require("./app/api/v1/admin/testimonials/[id]/route.ts");
    const { GET: adminGET } = require("./app/api/v1/admin/testimonials/route.ts");
    const { isRateLimited } = require("./lib/rate-limit.ts");
    const payload = { projectId: "published-project", displayName: "Pseudonym",
      testimony: "A genuine example of a sufficiently long project experience.", publicationConsent: true, website: "" };
    const request = (data = payload, method = "POST", origin = "https://example.test", ip = "fixture") =>
      new Request("https://example.test/api/v1/testimonials", {
        method, headers: { ...(origin ? { origin } : {}), "content-type": "application/json", "x-real-ip": ip },
        ...(method === "GET" ? {} : { body: JSON.stringify(data) }),
      });
    const context = id => ({ params: Promise.resolve({ id }) });
    const publicData = async () => (await (await GET(request(undefined, "GET"))).json()).data;
    (async () => { ${scenario} })().catch(error => { console.error(error); process.exitCode = 1; });
  `], {
    encoding: "utf8", timeout: 30_000,
    env: { ...process.env, DATABASE_URL: "", DATABASE_URL_POOLED: "", POSTGRES_URL: "", PRISMA_DATABASE_URL: "", NODE_ENV: "production" },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
}
