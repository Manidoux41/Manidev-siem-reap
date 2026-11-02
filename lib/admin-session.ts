import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { getPrisma, databaseConfigured } from "@/lib/prisma";

const cookieName = "portfolio_admin_session";
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionDurationMs);

  await getPrisma().adminSession.create({
    data: { tokenHash: hashToken(token), userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function getAdminUser() {
  if (!databaseConfigured) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return null;

  const session = await getPrisma().adminSession.findFirst({
    where: { tokenHash: hashToken(token), expiresAt: { gt: new Date() } },
    include: { user: true },
  });
  return session?.user ?? null;
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (token && databaseConfigured) {
    await getPrisma().adminSession.deleteMany({
      where: { tokenHash: hashToken(token) },
    });
  }

  cookieStore.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
