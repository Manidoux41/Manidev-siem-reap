import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("persisted notifications support success, safe retries, concurrent claims and stale owners", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let row, sends = 0, mode = "success", unblock;
    const reset = () => row = { id: "fixture", notificationPending: true, notificationClaimedAt: null, notifiedAt: null };
    const contactMessage = {
      updateMany: async ({ where, data }) => {
        if (where.notificationPending !== undefined && row.notificationPending !== where.notificationPending) return { count: 0 };
        if (where.OR && row.notificationClaimedAt && row.notificationClaimedAt >= where.OR[1].notificationClaimedAt.lt) return { count: 0 };
        if (where.notificationClaimedAt && row.notificationClaimedAt?.getTime() !== where.notificationClaimedAt.getTime()) return { count: 0 };
        Object.assign(row, data); return { count: 1 };
      },
      findUniqueOrThrow: async () => ({ ...row }),
    };
    Module._load = function(name, ...args) {
      if (name === "@/lib/prisma") return { getPrisma: () => ({ contactMessage }) };
      if (name === "./contact-email") return { sendContactEmail: async () => {
        sends++;
        if (mode === "failure") throw Object.assign(new Error("SECRET MUST NOT BE LOGGED"), { code: "EAUTH" });
        if (mode === "waiting") await new Promise(resolve => unblock = resolve);
        if (mode === "lost") row.notificationClaimedAt = new Date(Date.now() + 1000);
      }};
      return original.call(this, name, ...args);
    };
    const { notifyContactMessage } = require("./lib/contact-notification.ts");
    (async () => {
      reset();
      assert.equal(await notifyContactMessage(row.id), "accepted");
      assert.equal(row.notificationPending, false);
      assert.ok(row.notifiedAt instanceof Date);
      assert.equal(row.notificationClaimedAt, null);
      assert.equal(await notifyContactMessage(row.id), "accepted");
      assert.equal(sends, 1);
      reset(); mode = "failure";
      assert.equal(await notifyContactMessage(row.id), "pending");
      assert.equal(row.notificationPending, true);
      assert.equal(row.notificationClaimedAt, null);
      mode = "success";
      assert.equal(await notifyContactMessage(row.id), "accepted");
      reset(); mode = "waiting";
      const first = notifyContactMessage(row.id);
      await new Promise(resolve => setImmediate(resolve));
      const previous = sends;
      assert.equal(await notifyContactMessage(row.id), "pending");
      assert.equal(sends, previous);
      unblock(); await first;
      reset(); mode = "success";
      row.notificationClaimedAt = new Date(Date.now() - 121000);
      assert.equal(await notifyContactMessage(row.id), "accepted");
      reset(); mode = "lost";
      assert.equal(await notifyContactMessage(row.id), "pending");
      assert.equal(row.notificationPending, true);
      assert.ok(row.notificationClaimedAt !== null);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], { encoding: "utf8", timeout: 30_000 });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.doesNotMatch(result.stderr, /SECRET MUST NOT BE LOGGED/);
  assert.match(result.stderr, /EAUTH/);
});
