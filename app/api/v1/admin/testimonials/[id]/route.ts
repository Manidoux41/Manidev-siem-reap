import { getAdminUser } from "@/lib/admin-session";
import { databaseConfigured, getPrisma } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { testimonialModerationSchema } from "@/lib/testimonials";

type Context = { params: Promise<{ id: string }> };

async function guard(request: Request) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Origine invalide." }, { status: 403 });
  if (!await getAdminUser()) return Response.json({ error: "Authentification requise." }, { status: 401 });
  if (!databaseConfigured) return Response.json({ error: "Base de données indisponible." }, { status: 503 });
}

export async function PATCH(request: Request, { params }: Context) {
  const denied = await guard(request);
  if (denied) return denied;
  let body: unknown;
  try { body = await request.json(); } catch {
    return Response.json({ error: "Corps JSON invalide." }, { status: 400 });
  }
  const parsed = testimonialModerationSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Statut invalide." }, { status: 422 });
  try {
    const { id } = await params;
    const updated = await getPrisma().testimonial.updateMany({
      where: {
        id,
        ...(parsed.data.status === "APPROVED" ? { publicationConsent: true, project: { published: true } } : {}),
      },
      data: { status: parsed.data.status },
    });
    if (!updated.count) return Response.json({ error: "Témoignage absent, projet non publié ou consentement absent." }, { status: 404 });
    return Response.json({ message: parsed.data.status === "APPROVED" ? "Témoignage approuvé." : "Témoignage rejeté et dépublié." });
  } catch (error) {
    console.error("Testimonial moderation failed.", error);
    return Response.json({ error: "Impossible de modérer le témoignage." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const { id } = await params;
    const deleted = await getPrisma().testimonial.deleteMany({ where: { id } });
    if (!deleted.count) return Response.json({ error: "Témoignage introuvable." }, { status: 404 });
    return Response.json({ message: "Témoignage définitivement supprimé." });
  } catch (error) {
    console.error("Testimonial deletion failed.", error);
    return Response.json({ error: "Impossible de supprimer le témoignage." }, { status: 500 });
  }
}
