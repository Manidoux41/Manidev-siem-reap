import { getAdminUser } from "@/lib/admin-session";
import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { siteSettingsSchema } from "@/lib/validation";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ error: "Authentification requise." }, { status: 401 });
  }
  if (!databaseConfigured) {
    return Response.json({ error: "Base de données indisponible." }, { status: 503 });
  }

  try {
    const data = await getPrisma().siteSetting.findMany({
      where: {
        key: {
          in: [
            "site.title",
            "site.description",
            "site.locale",
            "site.github",
            "site.telegram",
          ],
        },
      },
    });
    return Response.json({ data: Object.fromEntries(data.map((item) => [item.key, item.value])) });
  } catch (error) {
    console.error("Erreur lors du chargement des paramètres administrés.", error);
    return Response.json({ error: "Impossible de charger les paramètres." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  }
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ error: "Authentification requise." }, { status: 401 });
  }
  if (!databaseConfigured) {
    return Response.json({ error: "Base de données indisponible." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps JSON invalide." }, { status: 400 });
  }
  const parsed = siteSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Paramètres invalides.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const prisma = getPrisma();
    await prisma.$transaction(
      Object.entries(parsed.data).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        }),
      ),
    );
    return Response.json({ message: "Paramètres enregistrés." });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des paramètres.", error);
    return Response.json({ error: "Impossible d'enregistrer les paramètres." }, { status: 500 });
  }
}
