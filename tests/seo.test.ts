import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { stat } from "node:fs/promises";
import sharp from "sharp";
import { locales } from "../lib/i18n";
import { seoContent } from "../lib/seo-content";
import { absoluteUrl, homeStructuredData, languageAlternates, pageMetadata, serializeStructuredData, socialImage } from "../lib/seo";
import robots from "../app/robots";
import nextConfig from "../next.config";

test("localized metadata has unique identity/local intent, absolute canonicals and matching share URLs", () => {
  for (const locale of locales) {
    const content = seoContent[locale];
    assert.match(content.title, /Manfred Parbatia.*Manidev.*Siem Reap/);
    assert.match(content.description, /Siem Reap/);
    assert.ok(content.description.length <= 180);
    for (const suffix of ["", "/services", "/projects/saiway"]) {
      const metadata = pageMetadata(locale, suffix, content.title, content.description);
      assert.deepEqual(metadata.title, { absolute: content.title });
      assert.equal(metadata.alternates?.canonical, absoluteUrl(`/${locale}${suffix}`));
      assert.deepEqual(metadata.alternates?.languages, languageAlternates(suffix));
      assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical);
      assert.ok(metadata.twitter && "card" in metadata.twitter);
      assert.equal(metadata.twitter.card, "summary_large_image");
    }
    assert.equal(content.offers.length, 3);
    assert.equal(content.faqs.length, 4);
    assert.ok(content.process.every((step) => step.length > 60));
  }
});

test("structured data identifies the person, brand and location without fabricated ratings or contacts", () => {
  for (const locale of locales) {
    const data = homeStructuredData(locale, "https://github.com/Manidoux41");
    const person = data["@graph"].find((entry) => entry["@type"] === "Person");
    assert.ok(person && "homeLocation" in person && "sameAs" in person);
    assert.equal(person.name, "Manfred Parbatia");
    assert.equal(person.alternateName, "Manidev");
    assert.ok(person.homeLocation);
    assert.ok(person.sameAs);
    assert.equal(person.homeLocation.address.addressCountry, "KH");
    assert.ok(person.sameAs.includes("https://www.linkedin.com/in/manfred-p-804a72198/"));
    const serialized = serializeStructuredData(data);
    assert.doesNotMatch(serialized, /aggregateRating|priceRange|telephone/);
    assert.deepEqual(JSON.parse(serialized), data);
  }
  const malicious = { name: '</script><script>alert("test")</script>' };
  const escaped = serializeStructuredData(malicious);
  assert.equal(escaped.includes("<"), false);
  assert.deepEqual(JSON.parse(escaped), malicious);
});

test("robots advertises canonical sitemap and lets crawlers see admin noindex", async () => {
  const rules = robots();
  assert.equal(rules.sitemap, absoluteUrl("/sitemap.xml"));
  assert.deepEqual(rules.rules, { userAgent: "*", allow: "/", disallow: ["/api/"] });
  const headers = await nextConfig.headers?.();
  for (const source of ["/admin/:path*", "/api/:path*"]) {
    assert.ok(headers?.some((rule) => rule.source === source && rule.headers.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, nofollow")));
  }
});

test("social preview is a real optimized 1200 by 630 image", async () => {
  const { width, height, format } = await sharp(`public${socialImage}`).metadata();
  assert.equal(width, 1200);
  assert.equal(height, 630);
  assert.equal(format, "jpeg");
  assert.ok((await stat(`public${socialImage}`)).size < 300_000);
});

test("sitemap includes all locales/services/published projects, real update dates and no private or redirect URLs", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    Module._load = function(name, ...args) {
      if (name === "next/server") return { connection: async () => {} };
      if (name === "@/lib/project-service") return { getPublicProjects: async () => [
        { slug: "published-project", featured: true, updatedAt: "2026-11-01T12:00:00.000Z", coverImage: "/images/profile-portrait.webp" },
      ] };
      return original.call(this, name, ...args);
    };
    (async () => {
      const sitemap = await require("./app/sitemap.ts").default();
      assert.equal(sitemap.length, 12);
      assert.ok(sitemap.every(entry => entry.url.startsWith("https://canonical.example/")));
      assert.ok(sitemap.every(entry => Object.keys(entry.alternates.languages).length === 5));
      assert.ok(sitemap.every(entry => !/admin|api|localhost/.test(entry.url)));
      assert.equal(sitemap.filter(entry => entry.url.endsWith("/services")).length, 4);
      assert.ok(sitemap.filter(entry => entry.url.includes("/projects/")).every(entry => entry.lastModified === "2026-11-01T12:00:00.000Z"));
      assert.ok(sitemap.filter(entry => !entry.url.includes("/projects/")).every(entry => !entry.lastModified));
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], { cwd: process.cwd(), encoding: "utf8", timeout: 30_000, env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://canonical.example", DATABASE_URL: "", DATABASE_URL_POOLED: "", POSTGRES_URL: "", PRISMA_DATABASE_URL: "" } });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
