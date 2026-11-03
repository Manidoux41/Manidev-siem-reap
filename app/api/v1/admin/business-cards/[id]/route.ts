import { getAdminUser } from "@/lib/admin-session";
import { getPrisma } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { readBusinessCardInput } from "@/lib/admin-business-cards";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Authentification requise." }, { status: 401 });
  try {
    const { id } = await params;
    const data = await getPrisma().businessCard.findFirst({ where: { id, userId: admin.id } });
    if (!data) return Response.json({ error: "Carte introuvable." }, { status: 404 });
    return Response.json({ data });
  } catch (error) {
    console.error("Échec du chargement de la carte de visite.", error);
    return Response.json({ error: "Impossible de charger la carte." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Context) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Authentification requise." }, { status: 401 });
  const input = await readBusinessCardInput(request);
  if (input.response) return input.response;
  try {
    const { id } = await params;
    const result = await getPrisma().businessCard.updateMany({
      where: { id, userId: admin.id },
      data: { label: input.data.label, data: input.data },
    });
    if (!result.count) return Response.json({ error: "Carte introuvable." }, { status: 404 });
    return Response.json({ message: "Carte enregistrée." });
  } catch (error) {
    console.error("Échec de la modification de la carte de visite.", error);
    return Response.json({ error: "Impossible d’enregistrer la carte." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Authentification requise." }, { status: 401 });
  try {
    const { id } = await params;
    const result = await getPrisma().businessCard.deleteMany({ where: { id, userId: admin.id } });
    if (!result.count) return Response.json({ error: "Carte introuvable." }, { status: 404 });
    return Response.json({ message: "Carte supprimée." });
  } catch (error) {
    console.error("Échec de la suppression de la carte de visite.", error);
    return Response.json({ error: "Impossible de supprimer la carte." }, { status: 500 });
  }
}
