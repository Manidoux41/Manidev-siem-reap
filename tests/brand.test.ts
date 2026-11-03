import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

function luminance(hex: string) {
  const rgb = hex.match(/[a-f0-9]{2}/gi);
  assert.ok(rgb);
  return rgb.map((value) => {
    const channel = parseInt(value, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

test("Manidev text and accent pairs preserve WCAG AA contrast", async () => {
  const css = await readFile("app/globals.css", "utf8");
  const token = (name: string) => {
    const value = css.match(new RegExp(`--${name}: (#[a-f0-9]{6});`))?.[1];
    assert.ok(value, name);
    return value;
  };
  const pairs = [
    [token("ink"), token("paper")],
    [token("ink-muted"), token("dark-soft")],
    [token("accent"), token("dark-soft")],
    [token("dark"), token("accent")],
    [token("dark"), token("accent-hover")],
    [token("success"), token("paper")],
    [token("error"), token("paper")],
    ["#45627d", token("paper-light")],
    [token("dark"), token("paper-light")],
  ];
  for (const [foreground, background] of pairs) {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    const ratio = (values[0] + 0.05) / (values[1] + 0.05);
    assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
  }
  assert.doesNotMatch(css, /#d7ff54|#c4ee40|215, 255, 84/);
});

test("the logo has a transparent background without a CSS panel", async () => {
  const { data, info } = await sharp("public/images/logo-manidev-brand.webp")
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparent = 0;
  for (let offset = 3; offset < data.length; offset += info.channels) {
    if (data[offset] === 0) transparent++;
  }
  assert.ok(transparent / (info.width * info.height) > 0.5);
  assert.equal(data[3], 0);
  const css = await readFile("app/globals.css", "utf8");
  const rule = css.match(/\.brand-logo \{([^}]+)\}/)?.[1];
  assert.ok(rule);
  assert.match(rule, /background: transparent/);
  assert.doesNotMatch(rule, /border:|background: white/);
});

test("the brand assets are available and favicon contains the logo-derived PNG", async () => {
  const [original, optimized, favicon] = await Promise.all([
    readFile("public/images/logo-manidev.png"),
    readFile("public/images/logo-manidev-brand.webp"),
    readFile("app/favicon.ico"),
  ]);
  assert.ok(original.length > 0);
  assert.equal(optimized.toString("ascii", 8, 12), "WEBP");
  assert.equal(favicon.readUInt16LE(2), 1);
  const offset = favicon.readUInt32LE(18);
  assert.deepEqual(favicon.subarray(offset, offset + 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
});
