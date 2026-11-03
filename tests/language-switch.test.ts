import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("the selector navigates the whole document using the real route, query and anchor", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    Module._load = function(name, ...args) {
      if (name === "react") return { ...original.call(this, name, ...args), useState: () => [false, () => {}] };
      if (name === "next/link") return "a";
      if (name === "@/components/brand-logo") return { BrandLogo: () => null };
      if (name === "@/components/linkedin-link") return { LinkedInLink: () => null };
      return original.call(this, name, ...args);
    };
    const { SiteHeader } = require("./components/site-header.tsx");
    const { locales } = require("./lib/i18n.ts");
    let destination;
    global.window = { location: {
      pathname: "/fr/projects/khmera", search: "?from=share", hash: "#details",
      assign: value => destination = value,
    }};
    const header = SiteHeader({ locale: "fr" });
    const find = node => {
      if (!node || typeof node !== "object") return;
      if (node.type === "select") return node;
      for (const child of [node.props?.children].flat(Infinity)) {
        const found = find(child); if (found) return found;
      }
    };
    const select = find(header);
    assert.ok(select);
    assert.deepEqual(select.props.children.map(option => option.props.value), locales);
    for (const locale of locales) {
      select.props.onChange({ target: { value: locale } });
      assert.equal(destination, "/" + locale + "/projects/khmera?from=share#details");
    }
    window.location.pathname = "/ja/services";
    window.location.hash = "#contact";
    select.props.onChange({ target: { value: "km" } });
    assert.equal(destination, "/km/services?from=share#contact");
    select.props.onChange({ target: { value: "invalid" } });
    assert.equal(destination, "/km/services?from=share#contact");
  `], { encoding: "utf8", timeout: 30_000 });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
