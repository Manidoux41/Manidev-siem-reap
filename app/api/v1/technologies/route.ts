import { connection } from "next/server";
import { prisma, databaseConfigured } from "@/lib/prisma";
import { verifiedProjects } from "@/lib/portfolio-data";

export async function GET() {
  await connection();
  try {
    const data = databaseConfigured
      ? await prisma.technology.findMany({
          where: { projects: { some: { project: { published: true } } } },
          select: { name: true, slug: true, category: true, icon: true },
          orderBy: { name: "asc" },
        })
      : Array.from(
          new Set(verifiedProjects.flatMap((project) => project.technologies)),
        ).map((name) => ({
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: "Confirmé par les projets",
          icon: null,
        }));
    return Response.json({ data });
  } catch (error) {
    console.error("Erreur lors du chargement des technologies.", error);
    return Response.json(
      { error: "Les technologies sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
