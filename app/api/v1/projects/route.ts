import { getPublicProjects } from "@/lib/project-service";
import { getSiteLocale, isSiteLocale, localizeProject } from "@/lib/i18n";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  try {
    const requestedLocale = searchParams.get("locale") ?? "en";
    if (!isSiteLocale(requestedLocale)) {
      return Response.json({ error: "Locale invalide." }, { status: 400 });
    }
    const locale = getSiteLocale(requestedLocale);
    const query = searchParams.get("q")?.trim().toLocaleLowerCase(locale) ?? "";
    const category = searchParams.get("category");
    const featuredOnly = searchParams.get("featured") === "true";
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const perPage = Math.min(
      50,
      Math.max(1, Number(searchParams.get("perPage") ?? 20)),
    );

    if (!Number.isInteger(page) || !Number.isInteger(perPage)) {
      return Response.json({ error: "Pagination invalide." }, { status: 400 });
    }

    const localizedProjects = (await getPublicProjects()).map((project) =>
      localizeProject(project, locale),
    );
    const filtered = localizedProjects.filter((project) => {
      const matchesQuery =
        !query ||
        `${project.title} ${project.shortDescription} ${project.technologies.join(" ")}`
          .toLocaleLowerCase(locale)
          .includes(query);
      return (
        matchesQuery &&
        (!category || project.category.slug === category) &&
        (!featuredOnly || project.featured)
      );
    });

    return Response.json({
      data: filtered.slice((page - 1) * perPage, page * perPage),
      pagination: { page, perPage, total: filtered.length },
    });
  } catch (error) {
    console.error("Erreur lors du chargement des projets publics.", error);
    return Response.json(
      { error: "Les projets sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
