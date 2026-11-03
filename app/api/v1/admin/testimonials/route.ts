import { getAdminUser } from "@/lib/admin-session";
import { databaseConfigured } from "@/lib/prisma";
import { getAdminTestimonials } from "@/lib/testimonials";

export async function GET() {
  if (!await getAdminUser()) return Response.json({ error: "Authentification requise." }, { status: 401 });
  if (!databaseConfigured) return Response.json({ error: "Base de données indisponible." }, { status: 503 });
  try {
    return Response.json({ data: await getAdminTestimonials() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Testimonial administration loading failed.", error);
    return Response.json({ error: "Impossible de charger les témoignages." }, { status: 500 });
  }
}
