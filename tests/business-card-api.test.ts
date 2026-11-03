import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("private card CRUD enforces authentication, origins and ownership", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let admin = { id: "owner" };
    let rows = [];
    let sequence = 0;
    const matches = (row, where) => Object.entries(where).every(([key, value]) => row[key] === value);
    const businessCard = {
      findMany: async ({ where, select }) => {
        assert.deepEqual(select, { id: true, label: true, updatedAt: true });
        return rows.filter(row => matches(row, where)).map(({ id, label, updatedAt }) => ({ id, label, updatedAt }));
      },
      create: async ({ data }) => {
        const row = { ...data, id: String(++sequence), updatedAt: new Date() };
        rows.push(row);
        return { id: row.id, label: row.label, updatedAt: row.updatedAt };
      },
      findFirst: async ({ where }) => rows.find(row => matches(row, where)),
      updateMany: async ({ where, data }) => {
        const found = rows.filter(row => matches(row, where));
        found.forEach(row => Object.assign(row, data));
        return { count: found.length };
      },
      deleteMany: async ({ where }) => {
        const found = rows.filter(row => matches(row, where));
        rows = rows.filter(row => !matches(row, where));
        return { count: found.length };
      },
    };
    Module._load = function(name, ...args) {
      if (name === "@/lib/admin-session") return { getAdminUser: async () => admin };
      if (name === "@/lib/prisma") return { getPrisma: () => ({ businessCard }), databaseConfigured: false };
      return original.call(this, name, ...args);
    };
    const collection = require("./app/api/v1/admin/business-cards/route.ts");
    const item = require("./app/api/v1/admin/business-cards/[id]/route.ts");
    const data = {
      label: "Test", details: { name: "Test", title: "", address: "", whatsapp: "", telegram: "", website: "" },
      images: { portrait: "", whatsappQr: "", telegramQr: "" }, showPortrait: false, cropMarks: true,
    };
    const request = (method, origin = "https://example.test") => new Request("https://example.test/api/v1/admin/business-cards", {
      method, headers: { origin }, ...(method === "POST" || method === "PATCH" ? { body: JSON.stringify(data) } : {}),
    });
    (async () => {
      admin = null;
      assert.equal((await collection.GET()).status, 401);
      assert.equal((await collection.POST(request("POST"))).status, 401);
      admin = { id: "owner" };
      assert.equal((await collection.POST(request("POST", "https://other.test"))).status, 403);
      const created = await collection.POST(request("POST"));
      assert.equal(created.status, 201);
      const id = (await created.json()).data.id;
      const context = { params: Promise.resolve({ id }) };
      assert.deepEqual((await (await item.GET(request("GET"), context)).json()).data.data, data);
      assert.equal((await item.PATCH(request("PATCH"), context)).status, 200);
      const listed = (await (await collection.GET()).json()).data;
      assert.equal(listed.length, 1);
      assert.equal(listed[0].data, undefined);
      admin = { id: "other-owner" };
      assert.equal((await (await collection.GET()).json()).data.length, 0);
      for (const method of ["GET", "PATCH", "DELETE"]) {
        assert.equal((await item[method](request(method), context)).status, 404);
      }
      admin = { id: "owner" };
      assert.equal((await item.DELETE(request("DELETE", "https://other.test"), context)).status, 403);
      assert.equal((await item.DELETE(request("DELETE"), context)).status, 200);
      assert.equal(rows.length, 0);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], {
    cwd: process.cwd(), encoding: "utf8", timeout: 30_000,
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://example.test", NODE_ENV: "production" },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
