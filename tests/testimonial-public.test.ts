import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../lib/i18n";
import { testimonialMessages } from "../lib/testimonial-messages";
import { runTestimonialFixture } from "./testimonial-fixture";

test("public read projects only the three allowed fields and hides pending/rejected/unpublished/unconsented entries", () => {
  runTestimonialFixture(`
    await POST(request());
    const base = rows[0];
    rows.push({ ...base, id: "approved", status: "APPROVED" });
    rows.push({ ...base, id: "rejected", status: "REJECTED" });
    rows.push({ ...base, id: "no-consent", status: "APPROVED", publicationConsent: false });
    rows.push({ ...base, id: "private-project", status: "APPROVED", projectId: "draft-project" });
    const response = await GET(request(undefined, "GET"));
    assert.equal(response.headers.get("cache-control"), "no-store");
    const data = (await response.json()).data;
    assert.deepEqual(data, [{ displayName: payload.displayName, testimony: payload.testimony, project: { title: "Published project" } }]);
    const filtered = await GET(new Request("https://example.test/api/v1/testimonials?projectId=draft-project"));
    assert.deepEqual((await filtered.json()).data, []);
    assert.equal((await GET(new Request("https://example.test/api/v1/testimonials?projectId="))).status, 400);
    projects[0].published = false;
    assert.deepEqual(await publicData(), []);
    projects[0].published = true;
    admin = { id: "admin" };
    await PATCH(request({ status: "REJECTED" }, "PATCH"), context("approved"));
    assert.deepEqual(await publicData(), []);
    configured = false;
    assert.deepEqual(await publicData(), []);
  `);
});

test("localized public form sends explicit consent and confirms persistence without silent or false success", () => {
  runTestimonialFixture(`
    const previousLoad = Module._load;
    const react = require("react");
    let hook = 0, states = [], resetCount = 0, responseStatus = 201, responseBody = { status: "PENDING" };
    Module._load = function(name, ...args) {
      if (name === "react") return { ...react, useState: initial => {
        const index = hook++; states[index] = initial;
        return [initial, value => { states[index] = value; }];
      }};
      return previousLoad.call(this, name, ...args);
    };
    global.FormData = class { get(key) { return ({ ...payload, publicationConsent: "on" })[key]; } };
    global.fetch = async (url, options) => {
      assert.equal(url, "/api/v1/testimonials");
      assert.equal(options.method, "POST");
      assert.deepEqual(JSON.parse(options.body), payload);
      if (responseStatus === 0) throw new Error("Offline");
      return Response.json(responseBody, { status: responseStatus });
    };
    const { TestimonialForm } = require("./components/testimonial-form.tsx");
    const { testimonialMessages } = require("./lib/testimonial-messages.ts");
    const { locales } = require("./lib/i18n.ts");
    const find = (node, predicate) => {
      if (!node || typeof node !== "object") return;
      if (predicate(node)) return node;
      for (const child of [node.props?.children].flat(Infinity)) {
        const found = find(child, predicate); if (found) return found;
      }
    };
    for (const locale of locales) {
      hook = 0;
      const form = TestimonialForm({ locale, projects, available: true });
      assert.equal(form.type, "form");
      const consent = find(form, node => node.props?.name === "publicationConsent");
      assert.equal(consent.props.type, "checkbox");
      assert.equal(consent.props.required, true);
      assert.equal(consent.props.defaultChecked, undefined);
      const select = find(form, node => node.type === "select");
      assert.equal(select.props.children[1][0].props.value, "published-project");
      assert.equal(find(form, node => node.props?.role === "status").props["aria-live"], "polite");
      const event = { preventDefault() {}, currentTarget: { reset() { resetCount++; } } };
      responseStatus = 201; responseBody = { status: "PENDING" };
      const before = resetCount;
      await form.props.onSubmit(event);
      assert.equal(resetCount, before + 1);
      assert.equal(states[1], testimonialMessages[locale].saved);
      assert.equal(states[2], false);
      for (const status of [200, 422, 429, 503, 500, 0]) {
        responseStatus = status; responseBody = { error: "Not saved" };
        await form.props.onSubmit(event);
        assert.equal(resetCount, before + 1);
        assert.equal(states[2], true);
        assert.notEqual(states[1], testimonialMessages[locale].saved);
        assert.equal(states[0], false);
      }
      hook = 0;
      assert.equal(TestimonialForm({ locale, projects: [], available: false }).props.children, testimonialMessages[locale].unavailable);
    }
  `);
});

test("all seven locales provide complete distinct form and consent messages", () => {
  const keys = Object.keys(testimonialMessages.en).sort();
  for (const locale of locales) {
    assert.deepEqual(Object.keys(testimonialMessages[locale]).sort(), keys);
    for (const value of Object.values(testimonialMessages[locale])) assert.ok(value.trim().length > 0);
    if (locale !== "en") {
      for (const key of keys as (keyof typeof testimonialMessages.en)[]) {
        assert.notEqual(testimonialMessages[locale][key], testimonialMessages.en[key]);
      }
    }
  }
});
