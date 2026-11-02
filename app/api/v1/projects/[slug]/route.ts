import { getPublicProject } from "@/lib/project-service";
import { getSiteLocale, isSiteLocale, localizeProject } from "@/lib/i18n";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const requestedLocale =
      new URL(request.url).searchParams.get("locale") ?? "en";
    if (!isSiteLocale(requestedLocale)) {
      return Response.json({ error: "Locale invalide." }, { status: 400 });
    }
    const locale = getSiteLocale(requestedLocale);
    const { slug } = await params;
    const project = await getPublicProject(slug);
    if (!project) {
      return Response.json({ error: "Projet introuvable." }, { status: 404 });
    }
    return Response.json({ data: localizeProject(project, locale) });
  } catch (error) {
    console.error("Erreur lors du chargement du projet.", error);
    return Response.json(
      { error: "Le projet est momentanément indisponible." },
      { status: 500 },
    );
  }
}
