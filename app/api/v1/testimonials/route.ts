import { databaseConfigured, getPrisma } from "@/lib/prisma";
import { hasSameOrigin, isRateLimited, requestAddress } from "@/lib/rate-limit";
import { getPublicTestimonials, testimonialSchema } from "@/lib/testimonials";

export async function GET(request: Request) {
  try {
    const projectId = new URL(request.url).searchParams.get("projectId") ?? undefined;
    return Response.json({ data: await getPublicTestimonials(projectId) }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Testimonial loading failed.", error);
    return Response.json({ error: "Testimonials unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  try {
    if (await isRateLimited(`testimonials:${requestAddress(request)}`, 5, 60 * 60 * 1000)) {
      return Response.json({ error: "Too many attempts." }, { status: 429 });
    }
  } catch {
    return Response.json({ error: "Form unavailable." }, { status: 503 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid submission." }, { status: 422 });
  if (!databaseConfigured) return Response.json({ error: "Form unavailable." }, { status: 503 });
  try {
    const prisma = getPrisma();
    const project = await prisma.project.findFirst({
      where: { id: parsed.data.projectId, published: true },
      select: { id: true },
    });
    if (!project) return Response.json({ error: "Published project not found." }, { status: 422 });
    const { displayName, testimony, publicationConsent } = parsed.data;
    await prisma.testimonial.create({
      data: { projectId: project.id, displayName, testimony, publicationConsent, consentedAt: new Date(), status: "PENDING" },
    });
    return Response.json({ status: "PENDING" }, { status: 201 });
  } catch (error) {
    console.error("Testimonial saving failed.", error);
    return Response.json({ error: "Submission could not be saved." }, { status: 500 });
  }
}
