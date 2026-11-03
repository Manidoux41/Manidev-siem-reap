import assert from "node:assert/strict";
import test from "node:test";
import { commercialOffers } from "../lib/commercial-offers";
import { locales } from "../lib/i18n";
import { verifiedProjects } from "../lib/portfolio-data";

test("commercial offers have consistent localized scopes and existing portfolio references", () => {
  for (const locale of locales) {
    const content = commercialOffers[locale];
    const compactScript = locale === "zh" || locale === "ja";
    assert.deepEqual(content.items.map((item) => item.id), ["web", "business", "mobile", "automation"]);
    assert.ok(content.quote.length > (compactScript ? 1 : 5));
    assert.ok(content.terms.length > (compactScript ? 40 : 150));
    for (const offer of content.items) {
      assert.equal(offer.deliverables.length, 4);
      assert.ok(offer.audience.length > (compactScript ? 8 : 30));
      assert.ok(offer.outcome.length > (compactScript ? 10 : 50));
      for (const slug of offer.projects) {
        assert.ok(verifiedProjects.some((project) => project.slug === slug), slug);
      }
    }
    assert.deepEqual(content.items[3].projects, []);
    assert.ok(content.aiNote.length > (compactScript ? 25 : 100));
  }
  assert.equal(commercialOffers.fr.quote, "Sur devis");
});
