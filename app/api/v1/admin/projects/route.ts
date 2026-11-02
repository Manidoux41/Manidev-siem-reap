import { getAdminUser } from "@/lib/admin-session";
import { createProject } from "@/lib/admin-projects";
import { prisma, databaseConfigured } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/rate-limit";
import { projectInputSchema } from "@/lib/validation";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ error: "Authentification requise." }, { status: 401 });
  }
  if (!databaseConfigured) {
    return Response.json({ error: "Base de données indisponible." }, { status: 503 });
  }

  try {
    const data = await prisma.project.findMany({
      include: {
        category: { select: { name: true, slug: true } },
        technologies: {
          include: { technology: { select: { name: true } } },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return Response.json({
      data: data.map((project) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        description: project.description,
        problem: project.problem,
        solution: project.solution,
        status: project.status,
        category: project.category.name,
        technologies: project.technologies.map(({ technology }) => technology.name),
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        appUrl: project.appUrl,
        coverImage: project.coverImage,
        featured: project.featured,
        published: project.published,
        sortOrder: project.sortOrder,
      })),
    });
  } catch (error) {
    console.error("Erreur lors du chargement des projets administrés.", error);
    return Response.json({ error: "Impossible de charger les projets." }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const project = await createProject(parsed.data);
    return Response.json({ data: { id: project.id, slug: project.slug } }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du projet.", error);
    return Response.json(
      { error: "Impossible de créer ce projet. Vérifiez son slug et ses liens." },
      { status: 409 },
    );
  }
}
