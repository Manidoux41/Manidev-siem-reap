import { getAdminUser } from "@/lib/admin-session";
import { updateProject } from "@/lib/admin-projects";
import { prisma, databaseConfigured } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { projectInputSchema } from "@/lib/validation";

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
  const parsed = projectInputSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Données de projet invalides.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const { id } = await params;
    const project = await updateProject(id, parsed.data);
    return Response.json({ data: { id: project.id, slug: project.slug } });
  } catch (error) {
    console.error("Erreur lors de la modification du projet.", error);
    return Response.json(
      { error: "Projet introuvable ou données incompatibles." },
      { status: 404 },
    );
  }
}

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
    await prisma.project.delete({ where: { id } });
    return Response.json({ message: "Projet supprimé." });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet.", error);
    return Response.json({ error: "Projet introuvable." }, { status: 404 });
  }
}
