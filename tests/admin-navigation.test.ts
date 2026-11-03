import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { adminApiEndpoints, adminSections } from "../lib/admin-navigation";

test("admin tasks have unique identifiers and every API action targets an existing task", () => {
  const sections = new Set(adminSections.map((item) => item.id));
  assert.equal(sections.size, adminSections.length);
  assert.equal(new Set(adminApiEndpoints.map((item) => item.path)).size, adminApiEndpoints.length);
  for (const endpoint of adminApiEndpoints) {
    assert.ok(sections.has(endpoint.section));
  }
});

test("the admin API catalog covers every implemented route and HTTP method", async () => {
  const root = path.resolve("app/api/v1");
  const implemented = new Map<string, string[]>();
  async function walk(directory: string): Promise<void> {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(filename);
      else if (entry.name === "route.ts") {
        const source = await readFile(filename, "utf8");
        const endpoint = `/${path.relative(root, directory).split(path.sep).join("/")}`
          .replace(/\[([^\]]+)\]/g, "{$1}");
        const methods = Array.from(source.matchAll(/export async function (GET|POST|PATCH|DELETE|PUT)\b/g), (match) => match[1]);
        implemented.set(endpoint, methods.sort());
      }
    }
  }
  await walk(root);
  assert.equal(adminApiEndpoints.length, implemented.size);
  for (const endpoint of adminApiEndpoints) {
    assert.deepEqual([...endpoint.methods].sort(), implemented.get(endpoint.path), endpoint.path);
  }
});
