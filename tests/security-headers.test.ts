import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config";

test("browser security headers apply to pages, APIs and public assets", async () => {
  const rules = await nextConfig.headers?.();
  const global = rules?.find((rule) => rule.source === "/:path*");
  assert.ok(global);
  const headers = new Map(global.headers.map(({ key, value }) => [key, value]));
  assert.equal(nextConfig.poweredByHeader, false);
  assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(headers.get("X-Frame-Options"), "DENY");
  assert.equal(headers.get("Referrer-Policy"), "strict-origin-when-cross-origin");
  assert.equal(headers.get("Permissions-Policy"), "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  const enforced = headers.get("Content-Security-Policy");
  assert.ok(enforced);
  for (const directive of ["base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'"]) {
    assert.ok(enforced.includes(directive));
  }
  assert.ok(!enforced.includes("script-src"), "Next.js inline bootstrap must not be blocked without nonces");
  assert.ok(headers.get("Content-Security-Policy-Report-Only")?.includes("script-src 'self'"));
  if (process.env.NODE_ENV === "production") {
    assert.equal(headers.get("Strict-Transport-Security"), "max-age=31536000");
  } else {
    assert.equal(headers.has("Strict-Transport-Security"), false);
  }
  for (const source of ["/admin/:path*", "/api/:path*"]) {
    assert.ok(rules?.some((rule) => rule.source === source && rule.headers.some(({ key }) => key === "X-Robots-Tag")));
  }
});
