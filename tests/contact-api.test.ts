import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("contact saves before notification, reports pending accurately and preserves request protections", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let rows = [], mode = "accepted", sends = 0, limited = false;
    Module._load = function(name, ...args) {
      if (name === "@/lib/prisma") return {
        databaseConfigured: true, getPrisma: () => ({ contactMessage: { create: async ({ data }) => {
          if (mode === "database-failure") throw new Error("Test persistence failure");
          const row = { ...data, id: String(rows.length + 1) }; rows.push(row); return row;
        }}}),
      };
      if (name === "@/lib/rate-limit") return {
        hasSameOrigin: request => request.headers.get("origin") === "https://example.test",
        isRateLimited: async () => limited, requestAddress: () => "fixture",
      };
      if (name === "@/lib/contact-notification") return { notifyContactMessage: async id => {
        assert.ok(rows.find(row => row.id === id));
        sends++;
        if (mode === "failure") throw new Error("Test notification failure");
        return mode;
      }};
      return original.call(this, name, ...args);
    };
    const { POST } = require("./app/api/v1/contact/route.ts");
    const payload = { name: "Test Visitor", email: "visitor@example.test", subject: "Project quote", message: "A sufficiently long project description.", website: "" };
    const request = (data = payload, origin = "https://example.test") => new Request("https://example.test/api/v1/contact", {
      method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(data),
    });
    (async () => {
      const accepted = await POST(request());
      assert.equal(accepted.status, 201);
      assert.equal((await accepted.json()).notification, "accepted");
      assert.equal(rows.length, 1);
      assert.equal(rows[0].notificationPending, true);
      for (mode of ["pending", "failure"]) {
        const response = await POST(request());
        assert.equal(response.status, 201);
        assert.equal((await response.json()).notification, "pending");
      }
      assert.equal(rows.length, 3);
      assert.equal((await POST(request(payload, "https://attacker.test"))).status, 403);
      limited = true;
      assert.equal((await POST(request())).status, 429);
      limited = false;
      assert.equal((await POST(request({ ...payload, email: "bad" }))).status, 422);
      assert.equal((await POST(request({ ...payload, website: "bot" }))).status, 422);
      mode = "database-failure";
      assert.equal((await POST(request())).status, 500);
      assert.equal(sends, 3);
      assert.equal(rows.length, 3);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], { encoding: "utf8", timeout: 30_000 });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
