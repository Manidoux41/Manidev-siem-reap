import { connection } from "next/server";
import { getPublicProjects } from "@/lib/project-service";
import { getSiteLocale, isSiteLocale, localizeProject } from "@/lib/i18n";

export async function GET(request: Request) {
  await connection();
  try {
    const requestedLocale =
      new URL(request.url).searchParams.get("locale") ?? "en";
    if (!isSiteLocale(requestedLocale)) {
      return Response.json({ error: "Locale invalide." }, { status: 400 });
    }
    const locale = getSiteLocale(requestedLocale);
    const projects = (await getPublicProjects())
      .map((project) => localizeProject(project, locale))
      .filter((project) => project.featured);
    return Response.json({ data: projects });
  } catch (error) {
    console.error("Erreur lors du chargement des projets mis en avant.", error);
    return Response.json(
      { error: "Les projets sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
