import test from "node:test";
import { runTestimonialFixture } from "./testimonial-fixture";

test("public submission persists PENDING with real consent and server-selected published project", () => {
  runTestimonialFixture(`
    const response = await POST(request({ ...payload, displayName: "  Pseudonym  ", testimony: "  " + payload.testimony + "  " }));
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { status: "PENDING" });
    assert.equal(rows.length, 1);
    assert.equal(rows[0].displayName, payload.displayName);
    assert.equal(rows[0].testimony, payload.testimony);
    assert.equal(rows[0].projectId, payload.projectId);
    assert.equal(rows[0].status, "PENDING");
    assert.equal(rows[0].publicationConsent, true);
    assert.ok(rows[0].consentedAt instanceof Date);
    assert.equal("email" in rows[0], false);
    assert.equal("website" in rows[0], false);
    assert.deepEqual(await publicData(), []);
    assert.equal((await adminGET()).status, 401);
    admin = { id: "admin" };
    const persisted = (await (await adminGET()).json()).data;
    assert.equal(persisted[0].testimony, payload.testimony);
    assert.equal(persisted[0].status, "PENDING");
    fail = true;
    assert.equal((await POST(request())).status, 500);
    assert.equal(rows.length, 1);
    fail = false;
    configured = false;
    assert.equal((await POST(request())).status, 503);
    assert.deepEqual(await publicData(), []);
    configured = true;
    await DELETE(request({}, "DELETE"), context(rows[0].id));
    assert.equal(rows.length, 0);
  `);
});

test("submission rejects malformed, extra, bounded or unconsented inputs without writing", () => {
  runTestimonialFixture(`
    const invalid = [
      { ...payload, publicationConsent: false }, { ...payload, publicationConsent: "true" },
      { ...payload, publicationConsent: undefined }, { ...payload, projectId: "draft-project" },
      { ...payload, projectId: "missing" }, { ...payload, projectId: "" },
      { ...payload, displayName: " " }, { ...payload, displayName: "x".repeat(101) },
      { ...payload, testimony: "short" }, { ...payload, testimony: "x".repeat(2001) },
      { ...payload, website: "bot" }, { ...payload, status: "APPROVED" },
      { ...payload, email: "private@example.test" }, { ...payload, company: "Company" },
      { ...payload, rating: 5 }, { ...payload, projectName: "Unverified" },
      { ...payload, consentedAt: new Date().toISOString() }, null,
    ];
    for (let i = 0; i < invalid.length; i++) {
      assert.equal((await POST(request(invalid[i], "POST", "https://example.test", "invalid-" + i))).status, 422);
    }
    const broken = new Request("https://example.test/api/v1/testimonials", {
      method: "POST", headers: { origin: "https://example.test", "x-real-ip": "broken" }, body: "{",
    });
    assert.equal((await POST(broken)).status, 400);
    assert.equal(writes, 0);
    assert.equal(rows.length, 0);
  `);
});

test("real origin and rate guards fail closed with an independent testimonial budget", () => {
  runTestimonialFixture(`
    for (const origin of ["", "https://attacker.test", "https://example.test.attacker.test", "invalid"]) {
      assert.equal((await POST(request(payload, "POST", origin))).status, 403);
    }
    assert.equal(rateRows.size, 0);
    for (let i = 0; i < 5; i++) assert.equal((await POST(request())).status, 201);
    assert.equal((await POST(request())).status, 429);
    assert.equal(rows.length, 5);
    const key = require("node:crypto").createHash("sha256").update("testimonials:fixture").digest("hex");
    assert.equal(rateRows.get(key).count, 5);
    assert.equal(await isRateLimited("contact:fixture", 5, 3600000), false);
    rateRows.get(key).resetAt = new Date(Date.now() - 1);
    assert.equal((await POST(request())).status, 201);
    rateFail = true;
    assert.equal((await POST(request())).status, 503);
    assert.equal(rows.length, 6);
  `);
});
