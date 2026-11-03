import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("message deletion requires admin and origin, deletes only the requested row and reports failures", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let admin = null, configured = true, fail = false, calls = 0;
    let rows = [{ id: "delete-me", notificationPending: true }, { id: "keep-me", notificationPending: false }];
    Module._load = function(name, ...args) {
      if (name === "@/lib/admin-session") return { getAdminUser: async () => admin };
      if (name === "@/lib/prisma") return {
        get databaseConfigured() { return configured; },
        getPrisma: () => ({ contactMessage: { deleteMany: async ({ where }) => {
          calls++;
          if (fail) throw new Error("Test database failure");
          assert.deepEqual(Object.keys(where), ["id"]);
          const count = rows.filter(row => row.id === where.id).length;
          rows = rows.filter(row => row.id !== where.id);
          return { count };
        }}}),
      };
      return original.call(this, name, ...args);
    };
    const { DELETE } = require("./app/api/v1/admin/messages/[id]/route.ts");
    const request = origin => new Request("https://example.test/api/v1/admin/messages/delete-me", {
      method: "DELETE", headers: origin ? { origin } : {},
    });
    const context = id => ({ params: Promise.resolve({ id }) });
    (async () => {
      assert.equal((await DELETE(request("https://example.test"), context("delete-me"))).status, 401);
      admin = { id: "owner" };
      for (const origin of [undefined, "https://attacker.test"]) {
        assert.equal((await DELETE(request(origin), context("delete-me"))).status, 403);
      }
      configured = false;
      assert.equal((await DELETE(request("https://example.test"), context("delete-me"))).status, 503);
      assert.equal(calls, 0);
      configured = true;
      const response = await DELETE(request("https://example.test"), context("delete-me"));
      assert.equal(response.status, 200);
      assert.match((await response.json()).message, /définitivement supprimé/);
      assert.deepEqual(rows, [{ id: "keep-me", notificationPending: false }]);
      assert.equal((await DELETE(request("https://example.test"), context("delete-me"))).status, 404);
      fail = true;
      assert.equal((await DELETE(request("https://example.test"), context("keep-me"))).status, 500);
      assert.equal(rows.length, 1);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], {
    encoding: "utf8", timeout: 30_000,
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://example.test", NODE_ENV: "production" },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
