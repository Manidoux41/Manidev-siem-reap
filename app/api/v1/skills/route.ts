import { connection } from "next/server";
import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { verifiedProjects } from "@/lib/portfolio-data";
import { aiSkill } from "@/lib/profile-skills";
import { getMessages, getSiteLocale, isSiteLocale } from "@/lib/i18n";

export async function GET(request: Request) {
  await connection();
  const requestedLocale = new URL(request.url).searchParams.get("locale") ?? "en";
  if (!isSiteLocale(requestedLocale)) return Response.json({ error: "Locale invalide." }, { status: 400 });
  const { about } = getMessages(getSiteLocale(requestedLocale));
  try {
    const data = databaseConfigured
      ? await getPrisma().skill.findMany({
          where: { published: true },
          orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
        })
      : [...Array.from(
          new Set(verifiedProjects.flatMap((project) => project.technologies)),
        ).map((name, sortOrder) => ({
          id: name.toLowerCase(),
          name,
          category: "Technologies utilisées",
          description: null,
          sortOrder,
        })), aiSkill];
    return Response.json({ data: data.map((skill) =>
      skill.name === aiSkill.name && skill.category === aiSkill.category
        ? { ...skill, name: about.aiLabel, description: about.aiDescription }
        : skill,
    ) });
  } catch (error) {
    console.error("Erreur lors du chargement des compétences.", error);
    return Response.json(
      { error: "Les compétences sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
