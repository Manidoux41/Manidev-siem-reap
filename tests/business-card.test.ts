import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { cardLayout, createBusinessCardPdf } from "../lib/business-card";
import { businessCardSchema } from "../lib/business-card-schema";
import { readBusinessCardInput } from "../lib/admin-business-cards";

const cardData = {
  label: "Test", details: { name: "Test", title: "", address: "", whatsapp: "", telegram: "", website: "" },
  images: { portrait: "/images/profile-portrait.webp", whatsappQr: "", telegramQr: "" },
  showPortrait: false, cropMarks: true,
};

test("saved cards validate all fields and reject remote, oversized or unsafe images", () => {
  assert.ok(businessCardSchema.safeParse(cardData).success);
  for (const portrait of ["https://example.test/photo.png", "data:image/svg+xml,<svg/>", "data:image/png;base64,invalid", "x".repeat(700_001)]) {
    assert.equal(businessCardSchema.safeParse({ ...cardData, images: { ...cardData.images, portrait } }).success, false);
  }
  assert.equal(businessCardSchema.safeParse({ ...cardData, label: "" }).success, false);
  assert.equal(businessCardSchema.safeParse({ ...cardData, showPortrait: "false" }).success, false);
});

test("card API rejects malformed JSON, invalid fields and oversized bodies", async () => {
  const makeRequest = (body: string) => new Request("https://example.test/api/v1/admin/business-cards", { method: "POST", body });
  const valid = await readBusinessCardInput(makeRequest(JSON.stringify(cardData)));
  assert.deepEqual(valid.data, cardData);
  assert.equal((await readBusinessCardInput(makeRequest("{"))).response?.status, 400);
  assert.equal((await readBusinessCardInput(makeRequest("{}"))).response?.status, 422);
  assert.equal((await readBusinessCardInput(makeRequest("x".repeat(2_200_001)))).response?.status, 413);
});

test("business cards export ten actual 85 x 55 mm cards on one A4 page", async () => {
  const png = await sharp({
    create: { width: 85, height: 55, channels: 3, background: "#ffad3b" },
  }).png().toBuffer();
  const pdf = createBusinessCardPdf(`data:image/png;base64,${png.toString("base64")}`, true);
  assert.equal(pdf.getNumberOfPages(), 1);
  assert.ok(Math.abs(pdf.internal.pageSize.getWidth() - 210) < 0.01);
  assert.ok(Math.abs(pdf.internal.pageSize.getHeight() - 297) < 0.01);
  const output = pdf.output();
  assert.match(output, /^%PDF-/);
  assert.equal(output.match(/\/I0 Do/g)?.length, 10);
  const transforms = Array.from(output.matchAll(/([\d.]+) 0 0 ([\d.]+) ([\d.]+) ([\d.]+) cm\n\/I0 Do/g));
  assert.equal(transforms.length, 10);
  for (const [, width, height, x, y] of transforms) {
    const mm = 25.4 / 72;
    assert.ok(Math.abs(Number(width) * mm - 85) < 0.01);
    assert.ok(Math.abs(Number(height) * mm - 55) < 0.01);
    assert.ok(Number(x) >= 0 && Number(y) >= 0);
    assert.ok((Number(x) + Number(width)) * mm <= 210);
    assert.ok((Number(y) + Number(height)) * mm <= 297);
  }
  assert.equal(cardLayout.count, cardLayout.columns * cardLayout.rows);
  const withoutMarks = createBusinessCardPdf(`data:image/png;base64,${png.toString("base64")}`, false).output();
  assert.ok(output.length > withoutMarks.length);
});
