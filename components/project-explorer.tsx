"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { SiteLocale, SiteMessages } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/portfolio-data";

type Props = {
  projects: PortfolioProject[];
  locale: SiteLocale;
  messages: SiteMessages;
};

function ProjectScene({
  slug,
  messages,
}: {
  slug: string;
  messages: SiteMessages;
}) {
  const scene = messages.projects;
  if (slug === "mmc-go-drivers") {
    return (
      <div className="scene-driver" role="img" aria-label={scene.artAlt}>
        <div className="driver-map">
          <span className="map-route" />
          <span className="map-pin map-pin-one" />
          <span className="map-pin map-pin-two" />
          <span className="map-label">{scene.sceneRoute}</span>
        </div>
        <div className="driver-phone">
          <div className="phone-topline"><span /> 09:41</div>
          <div className="phone-greeting">
            {scene.sceneGreeting}<br /><b>{scene.sceneDriver}</b>
          </div>
          <div className="phone-trip">
            <span>{scene.sceneNext}</span>
            <strong>07:30</strong>
            <i />
          </div>
          <div className="phone-tabs"><span /><span /><span /><span /></div>
        </div>
        <span className="scene-coordinate">45° 26′ 12.8″ N</span>
      </div>
    );
  }

  if (slug === "saiway") {
    return (
      <div className="scene-saiway" role="img" aria-label={scene.artAlt}>
        <div className="saiway-route">
          <span className="saiway-airport">{scene.sceneAirport}</span>
          <span className="saiway-road" />
          <i className="saiway-pin" />
          <span className="saiway-card">
            <strong>{scene.sceneTransfer}</strong>
            <span>07:30 <i /> SIEM REAP</span>
          </span>
        </div>
        <span className="scene-coordinate">SAIWAY / 01</span>
      </div>
    );
  }

  if (slug === "khmera") {
    return (
      <div className="scene-khmera" role="img" aria-label={scene.artAlt}>
        <div className="khmera-sun" />
        <div className="khmera-temple">
          <span />
          <span />
          <span />
          <strong>{scene.sceneKhmera}</strong>
          <i>{scene.sceneKhmeraFooter}</i>
        </div>
        <span className="scene-coordinate">KHMERA / 04</span>
      </div>
    );
  }

  return (
    <div className="scene-association" role="img" aria-label={scene.artAlt}>
      <div className="association-sun" />
      <div className="association-paper">
        <div className="paper-header"><span>LA VOIX</span><i>—</i><span>VIENNE</span></div>
        <div className="paper-title">
          {scene.sceneAssociation}<br />{scene.sceneAssociationSecond}
        </div>
        <div className="paper-rule" />
        <div className="paper-columns"><span /><span /></div>
        <div className="paper-footer">{scene.sceneAssociationFooter}</div>
      </div>
      <span className="scene-coordinate">EDITION / WEB</span>
    </div>
  );
}

export function ProjectExplorer({ projects, locale, messages }: Props) {
  const categories = useMemo(
    () => [
      { slug: "all", name: messages.projects.all },
      ...Array.from(
        new Map(
          projects.map((project) => [project.category.slug, project.category]),
        ).values(),
      ),
    ],
    [messages.projects.all, projects],
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProjects = projects.filter(
    (project) =>
      activeCategory === "all" || project.category.slug === activeCategory,
  );

  return (
    <>
      <div className="project-filters" aria-label={messages.projects.filters}>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={activeCategory === category.slug ? "is-active" : ""}
            type="button"
            aria-pressed={activeCategory === category.slug}
            onClick={() => setActiveCategory(category.slug)}
          >
            {category.name}
            <span>
              {category.slug === "all"
                ? projects.length.toString().padStart(2, "0")
                : projects.filter(
                    (project) => project.category.slug === category.slug,
                  ).length.toString().padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article
              className={`project-card reveal project-card-${index % 2 ? "offset" : "lead"}`}
              key={project.id}
            >
              <Link
                className="project-card-link"
                href={`/${locale}/projects/${project.slug}`}
                aria-label={messages.projects.discover.replace(
                  "{title}",
                  project.title,
                )}
              >
                <div className="project-card-visual">
                  {project.coverImage ? (
                    <Image
                      className="project-cover-image"
                      src={project.coverImage}
                      alt={`${messages.projects.artAlt}: ${project.title}`}
                      fill
                      sizes="(max-width: 800px) 100vw, 58vw"
                    />
                  ) : (
                    <ProjectScene slug={project.slug} messages={messages} />
                  )}
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-open" aria-hidden="true">↗</span>
                </div>
                <div className="project-card-meta">
                  <div>
                    <span className="eyebrow">{project.category.name}</span>
                    <h3>{project.title}</h3>
                    <span className="project-status">
                      {project.status === "UNKNOWN"
                        ? messages.projects.statusUnknown
                        : project.status === "PRODUCTION"
                          ? messages.projects.statusProduction
                          : project.status === "TEST"
                            ? messages.projects.statusTest
                            : messages.projects.statusDevelopment}
                    </span>
                  </div>
                  <span className="project-card-description">
                    {project.shortDescription}
                  </span>
                </div>
                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">{messages.projects.empty}</p>
      )}
    </>
  );
}
