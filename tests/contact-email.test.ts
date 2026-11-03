import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { contactEmail, gmailConfig } from "../lib/contact-email";

test("Gmail configuration rejects missing secrets and normalizes app passwords", () => {
  assert.throws(() => gmailConfig({}));
  assert.throws(() => gmailConfig({ GMAIL_SMTP_USER: "sender@gmail.com", GMAIL_SMTP_APP_PASSWORD: "regular-password" }));
  assert.throws(() => gmailConfig({ GMAIL_SMTP_USER: "sender@example.test", GMAIL_SMTP_APP_PASSWORD: "abcdefghijklmnop" }));
  assert.deepEqual(gmailConfig({ GMAIL_SMTP_USER: " Sender@Gmail.com ", GMAIL_SMTP_APP_PASSWORD: "abcd efgh ijkl mnop" }), {
    GMAIL_SMTP_USER: "sender@gmail.com", GMAIL_SMTP_APP_PASSWORD: "abcdefghijklmnop",
  });
});

test("mail uses a fixed recipient, authenticated sender and safe plain-text content", () => {
  const mail = contactEmail({
    id: "test-id", name: "Visitor\r\nBcc: attacker", email: "visitor@example.test",
    subject: "Quote\nInjected", message: "<script>alert(1)</script>\nProject description",
  }, "sender@gmail.com");
  assert.equal(mail.to, "manfredparbatia@gmail.com");
  assert.equal(mail.from.address, "sender@gmail.com");
  assert.equal(mail.replyTo.address, "visitor@example.test");
  assert.doesNotMatch(mail.replyTo.name, /[\r\n]/);
  assert.doesNotMatch(mail.subject, /[\r\n]/);
  assert.match(mail.text, /Project description/);
  assert.equal("html" in mail, false);
  assert.equal(mail.disableFileAccess, true);
  assert.equal(mail.disableUrlAccess, true);
  assert.equal(mail.messageId, "<contact-test-id@manidev-siem-reap.vercel.app>");
});

test("SMTP confirms only recipient acceptance and closes transport on every outcome", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", `
    const assert = require("node:assert/strict");
    const Module = require("node:module");
    const original = Module._load;
    let mode = "accepted", closed = 0;
    Module._load = function(name, ...args) {
      if (name === "nodemailer") return { createTransport: options => {
        assert.equal(options.host, "smtp.gmail.com");
        assert.equal(options.port, 465);
        assert.equal(options.secure, true);
        assert.equal(options.tls.rejectUnauthorized, true);
        return {
          sendMail: async mail => {
            assert.equal(mail.to, "manfredparbatia@gmail.com");
            if (mode === "failure") throw Object.assign(new Error("SMTP unavailable"), { code: "ECONNECTION" });
            return { accepted: mode === "accepted" ? ["manfredparbatia@gmail.com"] : [] };
          },
          close: () => closed++,
        };
      }};
      return original.call(this, name, ...args);
    };
    const { sendContactEmail } = require("./lib/contact-email.ts");
    (async () => {
      const message = { id: "fixture", name: "Test", email: "test@example.test", subject: "Quote", message: "Test only" };
      await sendContactEmail(message);
      mode = "rejected"; await assert.rejects(sendContactEmail(message));
      mode = "failure"; await assert.rejects(sendContactEmail(message));
      assert.equal(closed, 3);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `], {
    encoding: "utf8", timeout: 30_000,
    env: { ...process.env, GMAIL_SMTP_USER: "fixture@gmail.com", GMAIL_SMTP_APP_PASSWORD: "abcdefghijklmnop" },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
