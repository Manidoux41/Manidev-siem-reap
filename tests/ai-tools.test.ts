import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { AiTools } from "../components/ai-tools";
import { aiToolsContent } from "../lib/ai-tools";
import { locales } from "../lib/i18n";

test("AI tools explain capabilities, development use and safeguards in every language", () => {
  for (const locale of locales) {
    const content = aiToolsContent[locale];
    const compactScript = locale === "zh" || locale === "ja";
    assert.deepEqual(content.tools.map((tool) => tool.name), ["ChatGPT", "Claude", "Gemini"]);
    assert.equal(new Set(content.tools.map((tool) => tool.id)).size, 3);
    assert.ok(content.safeguards.length > (compactScript ? 70 : 200));
    assert.ok(content.disclaimer.length > (compactScript ? 10 : 50));
    const html = renderToStaticMarkup(createElement(AiTools, { locale }));
    for (const tool of content.tools) {
      assert.ok(tool.capabilities.length > (compactScript ? 10 : 50));
      assert.ok(tool.usage.length > (compactScript ? 15 : 80));
      assert.ok(html.includes(`/images/ai/${tool.id}.svg`));
      assert.ok(html.includes(`<h3>${tool.name}</h3>`));
    }
    assert.equal((html.match(/scope="row"/g) ?? []).length, 3);
    assert.equal((html.match(/scope="col"/g) ?? []).length, 3);
    assert.equal((html.match(/<td[ >]/g) ?? []).length, 6);
    assert.ok(html.includes('<table class="ai-tools-table" aria-labelledby="ai-tools-title">'));
    assert.ok(html.includes(content.capabilitiesLabel));
    assert.ok(html.includes(content.usageLabel));
  }
});

test("local AI logos render nonblank with their license retained", async () => {
  for (const id of ["chatgpt", "claude", "gemini"]) {
    const svg = await readFile(`public/images/ai/${id}.svg`);
    assert.doesNotMatch(svg.toString(), /<script|<foreignObject|https?:\/\/(?!www\.w3\.org)/i);
    const stats = await sharp(svg).resize(80, 80).png().stats();
    assert.ok(stats.channels.some((channel) => channel.stdev > 10), `${id} logo is blank`);
  }
  assert.match(await readFile("public/images/ai/LICENSE", "utf8"), /Copyright \(c\) 2023 LobeHub/);
});
