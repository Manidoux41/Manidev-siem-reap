import { getAdminUser } from "@/lib/admin-session";
import { getPrisma } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { readBusinessCardInput } from "@/lib/admin-business-cards";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Authentification requise." }, { status: 401 });
  try {
    const data = await getPrisma().businessCard.findMany({
      where: { userId: admin.id },
      select: { id: true, label: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    return Response.json({ data });
  } catch (error) {
    console.error("Échec du chargement des cartes de visite.", error);
    return Response.json({ error: "Impossible de charger les cartes. Vérifiez les migrations." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Authentification requise." }, { status: 401 });
  const input = await readBusinessCardInput(request);
  if (input.response) return input.response;
  try {
    const data = await getPrisma().businessCard.create({
      data: { userId: admin.id, label: input.data.label, data: input.data },
      select: { id: true, label: true, updatedAt: true },
    });
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Échec de la sauvegarde de la carte de visite.", error);
    return Response.json({ error: "Impossible d’enregistrer la carte." }, { status: 500 });
  }
}
