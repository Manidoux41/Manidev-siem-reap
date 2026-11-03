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
import { githubRepositoryKey } from "../lib/github-repository";
import { verifiedProjects } from "../lib/portfolio-data";

test("the supported locales are English, French, German, and Spanish", () => {
  assert.deepEqual(locales, ["en", "fr", "de", "es"]);
  assert.equal(isSiteLocale("de"), true);
  assert.equal(isSiteLocale("it"), false);
  assert.equal(getSiteLocale("unsupported"), "en");
});

test("the professional qualification is included in every language", () => {
  for (const locale of locales) {
    const { about } = getMessages(locale);
    assert.match(about.education, /2023/);
    assert.match(about.education, /OpenClassrooms/);
    assert.match(about.education, /IV/);
    assert.ok(about.educationLabel);
    assert.doesNotMatch(about.description, /self-taught|autodidact/i);
  }
});
test("language switching preserves the current localized route", () => {
  assert.equal(localizedPath("/fr/projects/khmera", "de"), "/de/projects/khmera");
  assert.equal(localizedPath("/en", "es"), "/es");
  assert.equal(localizedPath("/projects/saiway", "fr"), "/fr/projects/saiway");
  assert.equal(localizedPath("/fr/projects/khmera?from=share", "en"), "/en/projects/khmera?from=share");
});

test("AI specialization is described in all supported languages", () => {
  for (const locale of locales) {
    const { about } = getMessages(locale);
    assert.ok(about.aiLabel.length > 10);
    assert.ok(about.aiDescription.length > 50);
  }
  assert.match(getMessages("fr").about.aiDescription, /spécialisé dans l’utilisation de l’IA/);
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

test("the public project snapshot contains unique repositories and labeled experiments", () => {
  assert.equal(verifiedProjects.length, 18);
  assert.deepEqual(
    verifiedProjects.map(({ slug }) => slug),
    [
      "mmc-go-drivers",
      "la-voix-des-enfants-places",
      "saiway",
      "khmera",
      "voix-et-enfance",
      "cv-builder-app",
      "association-declaration",
      "gestion-planning",
      "nos-liens-nos-enfants-contre-l-ase",
      "cv-international-manfred",
      "mmcgodrivers-website",
      "tuktukgo",
      "test-vs-2",
      "testapprn",
      "flutter-first-app",
      "frontend2-simplon-best",
      "backend-for-frontend2-simplon-best",
      "simplon-drivers-app",
    ],
  );
  const repositoryKeys = verifiedProjects.map(({ githubUrl }) =>
    githubRepositoryKey(githubUrl),
  );
  assert.ok(repositoryKeys.every((key) => key !== null));
  assert.equal(new Set(repositoryKeys).size, verifiedProjects.length);

  const projectBySlug = new Map(verifiedProjects.map((project) => [project.slug, project]));
  assert.equal(projectBySlug.get("test-vs-2")?.status, "TEST");
  assert.match(projectBySlug.get("test-vs-2")?.title ?? "", /fork/i);
  assert.match(projectBySlug.get("test-vs-2")?.description ?? "", /michaelbaze1987-cloud\/test-vs-2/);
  assert.equal(projectBySlug.get("flutter-first-app")?.status, "TEST");
  assert.match(projectBySlug.get("flutter-first-app")?.title ?? "", /tutorial/i);
  assert.equal(projectBySlug.get("testapprn")?.status, "TEST");
  assert.match(projectBySlug.get("testapprn")?.title ?? "", /test app/i);
  assert.match(projectBySlug.get("simplon-drivers-app")?.description ?? "", /local SQLite/i);
  assert.match(projectBySlug.get("simplon-drivers-app")?.description ?? "", /does not claim/i);
  assert.equal(projectBySlug.has("manidev-siem-reap"), false);
  assert.equal(projectBySlug.has("test"), false);
});

test("GitHub repository URLs and repository names normalize to the same identity", () => {
  assert.equal(
    githubRepositoryKey("https://GitHub.com/Manidoux41/mmc-go-drivers.git/"),
    "manidoux41/mmc-go-drivers",
  );
  assert.equal(
    githubRepositoryKey("Manidoux41/MMC-Go-Drivers"),
    "manidoux41/mmc-go-drivers",
  );
  assert.equal(githubRepositoryKey("https://example.com/owner/repo"), null);
});

test("existing MMC, La Voix, Saiway, and KHMERA entries remain present", () => {
  const projectBySlug = new Map(verifiedProjects.map((project) => [project.slug, project]));
  assert.ok(projectBySlug.has("mmc-go-drivers"));
  assert.ok(projectBySlug.has("la-voix-des-enfants-places"));
  assert.ok(projectBySlug.has("saiway"));
  assert.ok(projectBySlug.has("khmera"));
  assert.equal(
    projectBySlug.get("khmera")?.liveUrl,
    "https://khmera.vercel.app",
  );
});
