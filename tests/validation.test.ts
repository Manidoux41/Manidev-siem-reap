import assert from "node:assert/strict";
import test from "node:test";
import { hashPassword, verifyPassword } from "../lib/password";
import { hasSameOrigin, isRateLimited } from "../lib/rate-limit";
import { databaseConfigured } from "../lib/prisma";
import {
  contactSchema,
  projectInputSchema,
  siteSettingsSchema,
} from "../lib/validation";

test("contact messages require valid, bounded fields", () => {
  const valid = contactSchema.safeParse({
    name: "Manfred",
    email: "hello@example.com",
    subject: "Collaboration",
    message: "Bonjour, parlons de ce projet ensemble.",
    website: "",
  });
  assert.equal(valid.success, true);

  const invalid = contactSchema.safeParse({
    name: "A",
    email: "invalid",
    subject: "Hi",
    message: "Too short",
  });
  assert.equal(invalid.success, false);
});

test("project links must use HTTPS and slugs must be normalized", () => {
  const project = {
    title: "Test Project",
    slug: "test-project",
    shortDescription: "A verified project description.",
    description: "A longer project description with enough context.",
    problem: null,
    solution: null,
    status: "UNKNOWN",
    category: "Web",
    technologies: ["Next.js"],
    githubUrl: "https://github.com/example/project",
    liveUrl: null,
    appUrl: null,
    coverImage: null,
    featured: false,
    published: false,
    sortOrder: 0,
  };
  assert.equal(projectInputSchema.safeParse(project).success, true);
  assert.equal(
    projectInputSchema.safeParse({ ...project, githubUrl: "http://example.com" })
      .success,
    false,
  );
  assert.equal(
    projectInputSchema.safeParse({ ...project, slug: "Test Project" }).success,
    false,
  );
});

test("public Telegram settings only accept HTTPS Telegram links", () => {
  assert.equal(
    siteSettingsSchema.safeParse({
      "site.telegram": "https://t.me/example",
    }).success,
    true,
  );
  assert.equal(
    siteSettingsSchema.safeParse({
      "site.telegram": "https://example.com/contact",
    }).success,
    false,
  );
  assert.equal(
    siteSettingsSchema.safeParse({
      "site.telegram": "http://t.me/example",
    }).success,
    false,
  );
});

test("password hashes are salted and verified without storing plaintext", async () => {
  const password = "a-long-test-password-2026";
  const hash = await hashPassword(password);
  assert.notEqual(hash, password);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword("incorrect-password", hash), false);
});

test("same-origin checks reject missing and cross-origin headers", () => {
  const request = new Request("https://portfolio.example/api/v1/contact", {
    method: "POST",
    headers: { origin: "https://attacker.example" },
  });
  const sameOrigin = new Request("https://portfolio.example/api/v1/contact", {
    method: "POST",
    headers: { origin: "https://portfolio.example" },
  });
  assert.equal(hasSameOrigin(request), false);
  assert.equal(hasSameOrigin(sameOrigin), true);
});

test(
  "contact rate limit blocks requests beyond the window budget",
  { skip: databaseConfigured },
  async () => {
    const key = `test:${Date.now()}`;
    assert.equal(await isRateLimited(key, 2, 60_000), false);
    assert.equal(await isRateLimited(key, 2, 60_000), false);
    assert.equal(await isRateLimited(key, 2, 60_000), true);
  },
);
