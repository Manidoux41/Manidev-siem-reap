import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { ProjectDestinations } from "../components/project-destinations";
import { locales, getMessages } from "../lib/i18n";
import { verifiedProjects } from "../lib/portfolio-data";

test("new destinations match the exact GitHub homepage values", () => {
  const expected = {
    "voix-et-enfance": "https://voix-et-enfance.vercel.app",
    "cv-builder-app": "https://cv-builder-app-two.vercel.app",
    "association-declaration": "https://association-declaration.vercel.app",
    "gestion-planning": "https://gestion-planning-delta.vercel.app",
    "nos-liens-nos-enfants-contre-l-ase": "https://nos-liens-nos-enfants-contre-l-ase.vercel.app",
  };
  for (const [slug, destination] of Object.entries(expected)) {
    const project = verifiedProjects.find((item) => item.slug === slug);
    assert.ok(project);
    assert.equal(project.liveUrl ?? project.appUrl, destination);
  }
  assert.equal(verifiedProjects.find((item) => item.slug === "saiway")?.liveUrl, "https://gestion-planning-91ve.vercel.app");
});

test("destination links are localized, external, optional and deduplicated", () => {
  for (const locale of locales) {
    const html = renderToStaticMarkup(createElement(ProjectDestinations, {
      locale, project: { liveUrl: "https://website.example/", appUrl: "https://app.example/" },
    }));
    assert.ok(html.includes(getMessages(locale).detail.website));
    assert.ok(html.includes(getMessages(locale).detail.application));
    assert.equal((html.match(/target="_blank" rel="noreferrer"/g) ?? []).length, 2);
    assert.equal(renderToStaticMarkup(createElement(ProjectDestinations, {
      locale, project: { liveUrl: null, appUrl: null },
    })), "");
    const same = renderToStaticMarkup(createElement(ProjectDestinations, {
      locale, project: { liveUrl: "https://same.example/", appUrl: "https://same.example/" },
    }));
    assert.equal((same.match(/<a /g) ?? []).length, 1);
  }
});

test("GitHub-verified destinations fill missing database links without overwriting custom links", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    const { verifiedProjects } = require("./lib/portfolio-data.ts");
    const verified = verifiedProjects.find(p => p.liveUrl);
    let row = { ...verified, updatedAt: new Date(), technologies: [], liveUrl: null, appUrl: null };
    Module._load = function(name, ...args) {
      if(name === "@/lib/prisma") return {databaseConfigured:true,getPrisma:()=>({project:{
        findMany:async()=>[row], findFirst:async()=>row,
      }})};
      return original.call(this,name,...args);
    };
    const { getPublicProject, getPublicProjects } = require("./lib/project-service.ts");
    (async()=>{
      assert.equal((await getPublicProject(row.slug)).liveUrl, verified.liveUrl);
      assert.equal((await getPublicProjects())[0].liveUrl, verified.liveUrl);
      const application = verifiedProjects.find(p => p.appUrl);
      row = { ...application, updatedAt: new Date(), technologies: [], liveUrl: null, appUrl: null };
      assert.equal((await getPublicProject(row.slug)).appUrl, application.appUrl);
      row.appUrl = "https://custom-app.example/";
      assert.equal((await getPublicProject(row.slug)).appUrl, row.appUrl);
      row.liveUrl = "https://custom.example/";
      assert.equal((await getPublicProject(row.slug)).liveUrl, row.liveUrl);
      row.githubUrl = "https://github.com/example/other"; row.liveUrl = null;
      assert.equal((await getPublicProject(row.slug)).liveUrl, null);
    })().catch(error=>{console.error(error);process.exitCode=1});
  `], { encoding: "utf8", timeout: 30_000 });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
