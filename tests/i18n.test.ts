import assert from "node:assert/strict";
import test from "node:test";
import {
  getMessages,
  getSiteLocale,
  isSiteLocale,
  localizeProject,
  localizedPath,
  locales,
} from "../lib/i18n";
import { verifiedProjects } from "../lib/portfolio-data";

test("the supported locales are English, French, German, and Spanish", () => {
  assert.deepEqual(locales, ["en", "fr", "de", "es"]);
  assert.equal(isSiteLocale("de"), true);
  assert.equal(isSiteLocale("it"), false);
  assert.equal(getSiteLocale("unsupported"), "en");
});

test("language switching preserves the current localized route", () => {
  assert.equal(localizedPath("/fr/projects/khmera", "de"), "/de/projects/khmera");
  assert.equal(localizedPath("/en", "es"), "/es");
  assert.equal(localizedPath("/projects/saiway", "fr"), "/fr/projects/saiway");
  assert.equal(localizedPath("/fr/projects/khmera?from=share", "en"), "/en/projects/khmera?from=share");
});

test("curated project content is translated across the supported locales", () => {
  for (const locale of locales) {
    const messages = getMessages(locale);
    for (const project of verifiedProjects) {
      const localized = localizeProject(project, locale);
      assert.ok(localized.title);
      assert.ok(localized.shortDescription);
      assert.ok(localized.description);
      assert.ok(localized.category.name);
      assert.ok(messages.header.language);
      if (locale !== "en") {
        assert.notEqual(
          localized.shortDescription,
          verifiedProjects.find(({ slug }) => slug === project.slug)
            ?.shortDescription,
        );
      }
    }
  }
});

test("Saiway and KHMERA remain in the verified public project snapshot", () => {
  assert.deepEqual(
    verifiedProjects.map(({ slug }) => slug),
    [
      "mmc-go-drivers",
      "la-voix-des-enfants-places",
      "saiway",
      "khmera",
    ],
  );
  assert.equal(
    verifiedProjects.find(({ slug }) => slug === "khmera")?.liveUrl,
    "https://khmera.vercel.app",
  );
});
