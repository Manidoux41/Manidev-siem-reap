import { getMessages, type SiteLocale } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/portfolio-data";

export function ProjectDestinations({
  project,
  locale,
}: {
  project: Pick<PortfolioProject, "liveUrl" | "appUrl">;
  locale: SiteLocale;
}) {
  const { detail } = getMessages(locale);
  return (
    <>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          {detail.website} <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.appUrl && project.appUrl !== project.liveUrl && (
        <a href={project.appUrl} target="_blank" rel="noreferrer">
          {detail.application} <span aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}
