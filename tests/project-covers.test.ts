import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { verifiedProjects } from "../lib/portfolio-data";
import { projectCover } from "../lib/project-covers";

test("all fourteen added projects have distinct, renderable nonblank illustrations", async () => {
  const additions = verifiedProjects.slice(4);
  assert.equal(additions.length, 14);
  assert.equal(new Set(additions.map((project) => project.coverImage)).size, 14);
  for (const project of additions) {
    assert.ok(project.coverImage, project.slug);
    assert.equal(projectCover(project.slug, null), project.coverImage);
    const image = sharp(`public${project.coverImage}`);
    const metadata = await image.metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 750);
    const { channels } = await image.stats();
    assert.ok(channels.some((channel) => channel.stdev > 30), `${project.slug} must not be blank`);
  }
});

test("illustrations do not replace custom project images or original scenes", () => {
  assert.equal(projectCover("cv-builder-app", "/custom.png"), "/custom.png");
  assert.equal(projectCover("saiway", null), null);
  assert.equal(projectCover("unknown-project", null), null);
});
