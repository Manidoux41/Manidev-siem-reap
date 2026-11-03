import { getPrisma } from "@/lib/prisma";
import { sendContactEmail } from "./contact-email";

export async function notifyContactMessage(id: string): Promise<"accepted" | "pending"> {
  const prisma = getPrisma();
  const now = new Date();
  const claimed = await prisma.contactMessage.updateMany({
    where: { id, notificationPending: true, OR: [
      { notificationClaimedAt: null },
      { notificationClaimedAt: { lt: new Date(now.getTime() - 120_000) } },
    ] },
    data: { notificationClaimedAt: now },
  });
  if (!claimed.count) {
    const existing = await prisma.contactMessage.findUniqueOrThrow({ where: { id } });
    return existing.notifiedAt ? "accepted" : "pending";
  }
  try {
    const message = await prisma.contactMessage.findUniqueOrThrow({ where: { id } });
    await sendContactEmail(message);
    const confirmed = await prisma.contactMessage.updateMany({
      where: { id, notificationPending: true, notificationClaimedAt: now },
      data: { notificationPending: false, notifiedAt: new Date(), notificationClaimedAt: null },
    });
    if (!confirmed.count) {
      console.error("Réservation de notification expirée avant confirmation.", { messageId: id });
      return "pending";
    }
    return "accepted";
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error
      && typeof error.code === "string"
      && ["EAUTH", "ECONNECTION", "ETIMEDOUT", "EDNS", "ESOCKET", "EENVELOPE", "EMESSAGE"].includes(error.code)
      ? error.code : "CONFIGURATION_OU_ENVOI_NON_CONFIRME";
    console.error("Notification e-mail de contact non confirmée ; relance nécessaire.", { messageId: id, code });
    await prisma.contactMessage.updateMany({
      where: { id, notificationClaimedAt: now },
      data: { notificationClaimedAt: null },
    });
    return "pending";
  }
}
