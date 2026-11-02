import { connection } from "next/server";
import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { getCategoryName, getSiteLocale, isSiteLocale } from "@/lib/i18n";
import { verifiedProjects } from "@/lib/portfolio-data";

export async function GET(request: Request) {
  await connection();
  try {
    const requestedLocale =
      new URL(request.url).searchParams.get("locale") ?? "en";
    if (!isSiteLocale(requestedLocale)) {
      return Response.json({ error: "Locale invalide." }, { status: 400 });
    }
    const locale = getSiteLocale(requestedLocale);
    const categories = databaseConfigured
      ? await getPrisma().category.findMany({
          where: { projects: { some: { published: true } } },
          select: { name: true, slug: true, description: true },
          orderBy: { sortOrder: "asc" },
        })
      : verifiedProjects.map(({ category }) => category);
    return Response.json({
      data: Array.from(
        new Map(categories.map((category) => [category.slug, category])).values(),
      ).map((category) => ({
        ...category,
        name: getCategoryName(locale, category.slug, category.name),
      })),
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories.", error);
    return Response.json(
      { error: "Les catégories sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
