import { getAdminUser } from "@/lib/admin-session";
import { getPrisma, databaseConfigured } from "@/lib/prisma";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ error: "Authentification requise." }, { status: 401 });
  }
  if (!databaseConfigured) {
    return Response.json({ error: "Base de données indisponible." }, { status: 503 });
  }

  try {
    const data = await getPrisma().contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return Response.json({ data });
  } catch (error) {
    console.error("Erreur lors du chargement des messages privés.", error);
    return Response.json({ error: "Impossible de charger les messages." }, { status: 500 });
  }
}
