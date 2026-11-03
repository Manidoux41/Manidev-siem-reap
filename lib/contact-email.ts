import nodemailer from "nodemailer";
import { z } from "zod";

const configSchema = z.object({
  GMAIL_SMTP_USER: z.string().trim().toLowerCase().email().refine((value) => value.endsWith("@gmail.com"), "Utilisez une adresse Gmail."),
  GMAIL_SMTP_APP_PASSWORD: z.string().transform((value) => value.replace(/\s/g, "")).pipe(z.string().regex(/^[a-zA-Z]{16}$/)),
});

export function gmailConfig(environment: Record<string, string | undefined> = process.env) {
  const parsed = configSchema.safeParse(environment);
  if (!parsed.success) throw new Error("Configurez GMAIL_SMTP_USER et GMAIL_SMTP_APP_PASSWORD (mot de passe d’application Gmail).");
  return parsed.data;
}

export function contactEmail(message: { id: string; name: string; email: string; subject: string; message: string }, sender: string) {
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");
  return {
    from: { name: "Manidev — Contact", address: sender },
    to: "manfredparbatia@gmail.com",
    replyTo: { name: oneLine(message.name), address: message.email },
    subject: `[Manidev] ${oneLine(message.subject)}`,
    text: `Nouveau message du portfolio Manidev\n\nNom : ${message.name}\nE-mail : ${message.email}\nObjet : ${message.subject}\n\n${message.message}\n\nRéférence : ${message.id}`,
    messageId: `<contact-${message.id}@manidev-siem-reap.vercel.app>`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function sendContactEmail(message: Parameters<typeof contactEmail>[0]) {
  const config = gmailConfig();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: config.GMAIL_SMTP_USER, pass: config.GMAIL_SMTP_APP_PASSWORD },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 15000,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });
  try {
    const result = await transport.sendMail(contactEmail(message, config.GMAIL_SMTP_USER));
    if (!result.accepted.some((address) => String(address).toLowerCase() === "manfredparbatia@gmail.com")) {
      throw new Error("Gmail n’a pas accepté le destinataire de la notification.");
    }
  } finally {
    transport.close();
  }
}
