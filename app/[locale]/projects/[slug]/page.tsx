import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import {
  getMessages,
  getSiteLocale,
  localizeProject,
} from "@/lib/i18n";
import { getPublicProject, getPublicProjects } from "@/lib/project-service";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { seoContent } from "@/lib/seo-content";
import { StructuredData } from "@/components/structured-data";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  const locale = getSiteLocale(routeLocale);
  const project = await getPublicProject(slug);
  const messages = getMessages(locale);
  if (!project) return { title: messages.detail.notFoundTitle, robots: { index: false, follow: false } };

  const localizedProject = localizeProject(project, locale);
  return pageMetadata(locale, `/projects/${slug}`, `${localizedProject.title} — ${messages.projects.title} | Manidev · Manfred Parbatia`, localizedProject.shortDescription);
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

function ProjectFallback() {
  const locale = "en";
  const messages = getMessages(locale);
  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}`} />
      <main className="detail-page">
        <section className="detail-hero" aria-busy="true">
          <p className="eyebrow">{messages.detail.selected}</p>
        </section>
      </main>
    </>
  );
}

async function ProjectContent({ params }: PageProps) {
  await connection();
  const { locale: routeLocale, slug } = await params;
  const locale = getSiteLocale(routeLocale);
  const messages = getMessages(locale);
  const [project, projects, settings] = await Promise.all([
    getPublicProject(slug),
    getPublicProjects(),
    getPublicSiteSettings(),
  ]);
  if (!project) notFound();

  const localizedProject = localizeProject(project, locale);
  const otherProjects = projects
    .filter((item) => item.slug !== project.slug)
    .map((item) => localizeProject(item, locale));
  const path = `/${locale}/projects/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path), name: localizedProject.title,
        description: localizedProject.shortDescription, inLanguage: locale,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": absoluteUrl(`${path}#project`) },
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumb`) },
      },
      {
        "@type": "CreativeWork", "@id": absoluteUrl(`${path}#project`),
        name: localizedProject.title, description: localizedProject.description,
        url: absoluteUrl(path), inLanguage: locale,
        creator: { "@type": "Person", "@id": absoluteUrl("/#person"), name: "Manfred Parbatia" },
        keywords: localizedProject.technologies,
        ...(localizedProject.coverImage ? { image: absoluteUrl(localizedProject.coverImage) } : {}),
        ...(localizedProject.githubUrl ? { codeRepository: localizedProject.githubUrl, "@type": "SoftwareSourceCode" } : {}),
      },
      {
        "@type": "BreadcrumbList", "@id": absoluteUrl(`${path}#breadcrumb`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: seoContent[locale].home, item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: localizedProject.title, item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <>
      <ScrollEffects />
      <StructuredData data={data} />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}/projects/${slug}`}
        githubUrl={settings["site.github"]}
        telegramUrl={settings["site.telegram"]}
      />
      <main className="detail-page">
        <section
          className={`detail-hero detail-hero-${localizedProject.category.slug}`}
        >
          <div className="detail-hero-top">
            <Link href={`/${locale}/#projets`} className="back-link">
              ← {messages.detail.allProjects}
            </Link>
            <span className="eyebrow">{localizedProject.category.name}</span>
          </div>
          <p className="eyebrow detail-kicker">{messages.detail.selected}</p>
          <h1>{localizedProject.title}<span>.</span></h1>
          <p className="detail-lead">{localizedProject.shortDescription}</p>
          <p className="detail-status">
            {localizedProject.status === "UNKNOWN"
              ? messages.detail.status
              : localizedProject.status === "PRODUCTION"
                ? messages.detail.production
                : localizedProject.status === "TEST"
                  ? messages.detail.testing
                  : messages.detail.development}
          </p>
          <div className="detail-tech">
            {localizedProject.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        {localizedProject.coverImage && (
          <div className="detail-cover">
            <Image
              src={localizedProject.coverImage}
              alt={`${messages.projects.artAlt}: ${localizedProject.title}`}
              fill
              sizes="100vw"
            />
          </div>
        )}

        <section className="section detail-body">
          <div className="detail-copy">
            <div className="detail-block reveal">
              <p className="eyebrow">{messages.detail.project}</p>
              <p>{localizedProject.description}</p>
            </div>
            {localizedProject.problem && (
              <div className="detail-block reveal">
                <p className="eyebrow">{messages.detail.need}</p>
                <p>{localizedProject.problem}</p>
              </div>
            )}
            {localizedProject.solution && (
              <div className="detail-block reveal">
                <p className="eyebrow">{messages.detail.approach}</p>
                <p>{localizedProject.solution}</p>
              </div>
            )}
            {localizedProject.slug === "la-voix-des-enfants-places" && (
              <p className="detail-caveat">{messages.detail.associationCaveat}</p>
            )}
            {localizedProject.slug === "khmera" && (
              <p className="detail-caveat">{messages.detail.khmeraCaveat}</p>
            )}
          </div>
          <aside className="detail-links">
            <p className="eyebrow">{messages.detail.explore}</p>
            {localizedProject.githubUrl && (
              <a
                href={localizedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                {messages.detail.repository} <span aria-hidden="true">↗</span>
              </a>
            )}
            {localizedProject.liveUrl && (
              <a
                href={localizedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                {messages.detail.website} <span aria-hidden="true">↗</span>
              </a>
            )}
            {localizedProject.appUrl && (
              <a
                href={localizedProject.appUrl}
                target="_blank"
                rel="noreferrer"
              >
                {messages.detail.application} <span aria-hidden="true">↗</span>
              </a>
            )}
          </aside>
        </section>
        {otherProjects.length > 0 && (
          <section className="next-project section">
            <p className="eyebrow">{messages.detail.next}</p>
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/projects/${item.slug}`}
              >
                {item.title} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </section>
        )}
      </main>
      <footer className="site-footer">
        <Link className="wordmark" href={`/${locale}`}>
          <BrandLogo />
        </Link>
        <p>{messages.about.motto}</p>
        <Link href={`/${locale}/#contact`}>
          {messages.footer.contact} ↗
        </Link>
        <span>© {new Date().getFullYear()} Manfred Parbatia</span>
      </footer>
    </>
  );
}
