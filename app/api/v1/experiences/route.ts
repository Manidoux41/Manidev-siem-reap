import { connection } from "next/server";
import { prisma, databaseConfigured } from "@/lib/prisma";

export async function GET() {
  await connection();
  try {
    const data = databaseConfigured
      ? await prisma.experience.findMany({
          where: { published: true },
          orderBy: { sortOrder: "asc" },
        })
      : [];
    return Response.json({ data });
  } catch (error) {
    console.error("Erreur lors du chargement des expériences.", error);
    return Response.json(
      { error: "Les expériences sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
