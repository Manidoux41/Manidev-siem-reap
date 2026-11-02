import { connection } from "next/server";
import { prisma, databaseConfigured } from "@/lib/prisma";
import { verifiedProjects } from "@/lib/portfolio-data";

export async function GET() {
  await connection();
  try {
    const data = databaseConfigured
      ? await prisma.skill.findMany({
          where: { published: true },
          orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
        })
      : Array.from(
          new Set(verifiedProjects.flatMap((project) => project.technologies)),
        ).map((name, sortOrder) => ({
          id: name.toLowerCase(),
          name,
          category: "Technologies utilisées",
          description: null,
          sortOrder,
        }));
    return Response.json({ data });
  } catch (error) {
    console.error("Erreur lors du chargement des compétences.", error);
    return Response.json(
      { error: "Les compétences sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
