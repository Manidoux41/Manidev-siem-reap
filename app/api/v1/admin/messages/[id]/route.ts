import { getAdminUser } from "@/lib/admin-session";
import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { contactStatusSchema } from "@/lib/validation";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  try {
    const { id } = await params;
    const deleted = await getPrisma().contactMessage.deleteMany({ where: { id } });
    if (!deleted.count) {
      return Response.json({ error: "Message introuvable." }, { status: 404 });
    }
    return Response.json({ message: "Message définitivement supprimé." });
  } catch (error) {
    console.error("Erreur lors de la suppression du message.", error);
    return Response.json(
      { error: "Impossible de supprimer le message pour le moment." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const status = contactStatusSchema.safeParse(
    (body as { status?: unknown } | null)?.status,
  );
  if (!status.success) {
    return Response.json({ error: "Statut de message invalide." }, { status: 422 });
  }

  try {
    const { id } = await params;
    await getPrisma().contactMessage.update({
      where: { id },
      data: { status: status.data },
    });
    return Response.json({ message: "Statut mis à jour." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message.", error);
    return Response.json({ error: "Message introuvable." }, { status: 404 });
  }
}
