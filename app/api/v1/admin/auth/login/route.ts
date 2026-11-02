import { z } from "zod";
import { createAdminSession } from "@/lib/admin-session";
import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { isRateLimited, requestAddress, hasSameOrigin } from "@/lib/rate-limit";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  }
  try {
    if (
      await isRateLimited(
        `admin-login:${requestAddress(request)}`,
        5,
        15 * 60 * 1000,
      )
    ) {
      return Response.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }
  } catch (error) {
    console.error("Échec du contrôle de fréquence de connexion.", error);
    return Response.json(
      { error: "La connexion est momentanément indisponible." },
      { status: 503 },
    );
  }
  if (!databaseConfigured) {
    return Response.json(
      { error: "La base PostgreSQL doit être configurée avant la connexion." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const parsed = credentialsSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Identifiants invalides." }, { status: 422 });
  }

  try {
    const email = parsed.data.email.toLowerCase();
    const user = await getPrisma().adminUser.findUnique({ where: { email } });
    const valid =
      user && (await verifyPassword(parsed.data.password, user.passwordHash));
    if (!user || !valid) {
      return Response.json(
        { error: "Adresse e-mail ou mot de passe incorrect." },
        { status: 401 },
      );
    }

    await createAdminSession(user.id);
    await getPrisma().adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    return Response.json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("Échec de l'authentification administrateur.", error);
    return Response.json(
      { error: "La connexion est momentanément indisponible." },
      { status: 500 },
    );
  }
}
