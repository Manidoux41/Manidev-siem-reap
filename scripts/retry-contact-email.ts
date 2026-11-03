import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { gmailConfig } = await import("../lib/contact-email");
  const { notifyContactMessage } = await import("../lib/contact-notification");
  const { getPrisma } = await import("../lib/prisma");
  gmailConfig();
  const prisma = getPrisma();
  try {
    const pending = await prisma.contactMessage.findMany({
      where: { notificationPending: true },
      select: { id: true }, orderBy: { createdAt: "asc" }, take: 20,
    });
    let remaining = 0;
    for (const message of pending) {
      if (await notifyContactMessage(message.id) === "pending") remaining++;
    }
    console.log(`${pending.length - remaining} notification(s) confirmée(s), ${remaining} en attente dans ce lot (20 maximum).`);
    if (remaining) process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error("Relance impossible. Vérifiez la configuration Gmail, la connexion PostgreSQL et les migrations.");
  process.exitCode = 1;
});
