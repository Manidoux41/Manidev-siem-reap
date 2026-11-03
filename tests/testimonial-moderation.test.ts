import test from "node:test";
import { runTestimonialFixture } from "./testimonial-fixture";

test("moderation requires auth/origin, persists approval and rejection, and deletes only selected testimony", () => {
  runTestimonialFixture(`
    await POST(request());
    await POST(request({ ...payload, displayName: "Keep me" }));
    const id = rows[0].id;
    const patch = (data = { status: "APPROVED" }, origin = "https://example.test") => PATCH(request(data, "PATCH", origin), context(id));
    assert.equal((await adminGET()).status, 401);
    assert.equal((await patch()).status, 401);
    assert.equal((await DELETE(request({}, "DELETE"), context(id))).status, 401);
    admin = { id: "admin" };
    for (const origin of ["", "https://attacker.test"]) {
      assert.equal((await patch(undefined, origin)).status, 403);
      assert.equal((await DELETE(request({}, "DELETE", origin), context(id))).status, 403);
    }
    configured = false;
    assert.equal((await adminGET()).status, 503);
    assert.equal((await patch()).status, 503);
    assert.equal((await DELETE(request({}, "DELETE"), context(id))).status, 503);
    configured = true;
    assert.equal(rows[0].status, "PENDING");
    assert.equal((await patch()).status, 200);
    assert.equal((await publicData()).length, 1);
    assert.equal((await (await adminGET()).json()).data[0].status, "APPROVED");
    assert.equal((await patch({ status: "REJECTED" })).status, 200);
    assert.deepEqual(await publicData(), []);
    assert.equal(rows[0].status, "REJECTED");
    assert.equal((await patch()).status, 200);
    assert.equal((await DELETE(request({}, "DELETE"), context(id))).status, 200);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].displayName, "Keep me");
    assert.deepEqual(await publicData(), []);
    assert.equal((await DELETE(request({}, "DELETE"), context(id))).status, 404);
    assert.equal((await patch()).status, 404);
  `);
});

test("admin cannot fabricate consent, approve private projects, or hide persistence errors", () => {
  runTestimonialFixture(`
    await POST(request());
    admin = { id: "admin" };
    const id = rows[0].id;
    const patch = data => PATCH(request(data, "PATCH"), context(id));
    for (const data of [{ status: "PENDING" }, { status: "INVALID" }, null,
      { status: "APPROVED", publicationConsent: true }, { status: "APPROVED", displayName: "Edited" },
      { status: "APPROVED", consentedAt: new Date().toISOString() }]) {
      assert.equal((await patch(data)).status, 422);
    }
    assert.equal((await PATCH(new Request("https://example.test/api/v1/admin/testimonials/" + id, {
      method: "PATCH", headers: { origin: "https://example.test" }, body: "{",
    }), context(id))).status, 400);
    rows[0].publicationConsent = false;
    assert.equal((await patch({ status: "APPROVED" })).status, 404);
    assert.equal(rows[0].publicationConsent, false);
    rows[0].publicationConsent = true;
    projects[0].published = false;
    assert.equal((await patch({ status: "APPROVED" })).status, 404);
    assert.equal((await patch({ status: "REJECTED" })).status, 200);
    projects[0].published = true;
    fail = true;
    assert.equal((await patch({ status: "APPROVED" })).status, 500);
    assert.equal((await DELETE(request({}, "DELETE"), context(id))).status, 500);
    assert.equal((await adminGET()).status, 500);
    assert.equal((await GET(request(undefined, "GET"))).status, 503);
    assert.equal(rows[0].status, "REJECTED");
    assert.equal(rows.length, 1);
  `);
});
